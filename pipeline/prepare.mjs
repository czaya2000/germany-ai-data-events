// pipeline:prepare - fetch, normalise, filter, dedupe, consult the ledger, write work/ for the Claude step.
// No LLM calls of any kind here. Flags: --bootstrap, --limit N, --only id,id, --dry-run, --no-scrape, --today YYYY-MM-DD.
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { MAX_NEW_CANDIDATES_PER_RUN, MAX_PAGES_PER_RUN, SITE_SCOPE, WINDOW_DAYS } from '../config/country.mjs';
import { today as berlinToday } from './lib/time.mjs';
import { dropReason } from './lib/filter.mjs';
import { dedupe } from './lib/dedupe.mjs';
import { hubLabel } from './lib/city.mjs';
import { loadJson, loadLedger, lookup, matchesExisting, prune, record, saveJson, touch, updateMissing } from './lib/ledger.mjs';
import { buildReport } from './lib/report.mjs';
import { BOOTSTRAP_CAP, applyCap, candidateId, chunk, compactCandidate } from './lib/work.mjs';
import { MODULES, normaliseRaw, runFeedSource } from './sources/index.mjs';
import { groupsInCandidate, icsUrl } from './sources/meetup.mjs';
import { fetchPage } from './sources/scrape.mjs';
import { getText } from './lib/cache.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const P = {
	sources: join(ROOT, 'config/sources.json'),
	events: join(ROOT, 'src/data/events.json'),
	archive: join(ROOT, 'src/data/archive.json'),
	ledger: join(ROOT, 'data/cache/ledger.json'),
	groups: join(ROOT, 'data/cache/discovered-groups.json'),
	health: join(ROOT, 'data/cache/source-health.json'),
	rejected: join(ROOT, 'data/cache/rejected-sample.json'),
	httpCache: join(ROOT, 'data/cache/http'),
	work: join(ROOT, 'work'),
	report: join(ROOT, 'data/cache/last-prepare-report.md'),
	task: join(ROOT, 'pipeline/prompts/task.md'),
};

function parseArgs(argv) {
	const o = { bootstrap: false, dry: false, scrape: true, only: null, limit: 0, today: null };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--bootstrap') o.bootstrap = true;
		else if (a === '--dry-run') o.dry = true;
		else if (a === '--no-scrape') o.scrape = false;
		else if (a === '--limit') o.limit = Number(argv[++i]);
		else if (a === '--only') o.only = argv[++i].split(',');
		else if (a === '--today') o.today = argv[++i];
	}
	return o;
}

async function pool(items, n, fn) {
	const out = new Array(items.length);
	let i = 0;
	await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
		while (i < items.length) {
			const k = i++;
			out[k] = await fn(items[k], k);
		}
	}));
	return out;
}

const isoWeekday = (date) => ((new Date(date + 'T00:00:00Z').getUTCDay() + 6) % 7) + 1;

export async function prepare(opts = {}) {
	const t0 = Date.now();
	const today = opts.today ?? berlinToday();
	const windowDays = Number(process.env.WINDOW_DAYS ?? WINDOW_DAYS);
	const cap = opts.bootstrap ? BOOTSTRAP_CAP : Number(process.env.MAX_NEW_CANDIDATES_PER_RUN ?? MAX_NEW_CANDIDATES_PER_RUN);
	const maxPages = Number(process.env.MAX_PAGES_PER_RUN ?? MAX_PAGES_PER_RUN);

	const sources = JSON.parse(readFileSync(P.sources, 'utf8'));
	const health = loadJson(P.health, { sources: {}, etags: {}, pageHashes: {} });
	health.sources ??= {};
	health.etags ??= {};
	health.pageHashes ??= {};
	const groupsFile = loadJson(P.groups, { groups: {} });
	groupsFile.groups ??= {};
	const ledger = loadLedger(P.ledger);
	const existing = [...loadJson(P.events, []), ...loadJson(P.archive, [])];
	const rejectedSample = loadJson(P.rejected, { dedupeMerges: [], keywordRejects: [] });

	const ctx = { today, windowDays, limit: opts.limit || 0, cacheDir: P.httpCache, etags: health.etags, fetchImpl: opts.fetchImpl };

	// Discovered Meetup groups that passed the ICS check are polled from now on (trust: noisy).
	const known = new Set(sources.filter((s) => s.type === 'meetup').map((s) => s.id.slice(7)));
	const feeds = sources.filter((s) => s.type !== 'scrape');
	for (const [g, info] of Object.entries(groupsFile.groups)) {
		if (info.icsOk && !known.has(g)) {
			feeds.push({ id: 'meetup:' + g, type: 'meetup', label: 'Meetup', url: icsUrl(g), trust: 'noisy', onlineOk: true, country: 'DE', curatedCalendar: true, discovered: true });
			known.add(g);
		}
	}
	const selected = feeds.filter((s) => !opts.only || opts.only.includes(s.id));

	// ---- 1. fetch ----
	const results = await pool(selected, 8, async (src) => {
		const t = Date.now();
		const res = { src, candidates: [], rawCount: 0, ms: 0, error: null };
		try {
			const out = await runFeedSource(src, ctx);
			res.rawCount = out.rawCount;
			res.candidates = ctx.limit ? out.candidates.slice(0, ctx.limit) : out.candidates;
		} catch (e) {
			res.error = String(e.message ?? e).slice(0, 120);
		}
		res.ms = Date.now() - t;
		return res;
	});

	// ---- 2. Meetup group discovery (rule A1) ----
	const discovered = [];
	const maxDiscover = opts.bootstrap ? 80 : 25;
	const newGroups = new Map();
	for (const r of results) {
		for (const c of r.candidates) {
			for (const g of [...groupsInCandidate(c), ...(c.meetupGroups ?? [])]) {
				if (!known.has(g) && !groupsFile.groups[g] && !newGroups.has(g)) newGroups.set(g, r.src.id);
			}
		}
	}
	let tested = 0;
	for (const [g, via] of newGroups) {
		if (tested >= (ctx.limit ? 3 : maxDiscover)) break;
		tested++;
		const info = { firstSeen: today, via, trust: 'noisy', icsOk: false, checked: today };
		try {
			const r = await getText(icsUrl(g), ctx, { accept: 'text/calendar, */*', retries: 0 });
			const ct = r.headers?.get?.('content-type') ?? '';
			info.icsOk = r.ok && (/calendar/i.test(ct) || r.text.includes('BEGIN:VCALENDAR'));
			if (info.icsOk) {
				const src = { id: 'meetup:' + g, type: 'meetup', label: 'Meetup', url: icsUrl(g), trust: 'noisy', onlineOk: true, country: 'DE', curatedCalendar: true, discovered: true };
				const { parseIcs } = await import('./lib/ical.mjs');
				const out = normaliseRaw(src, parseIcs(r.text));
				results.push({ src, candidates: out.candidates, rawCount: out.rawCount, ms: 0, error: null });
			}
		} catch {
			info.icsOk = false;
		}
		groupsFile.groups[g] = info;
		discovered.push({ group: g, icsOk: info.icsOk });
	}

	// ---- 3. filter ----
	const drops = {};
	const stats = new Map();
	const kept = [];
	const seenKeys = new Map();
	for (const r of results) {
		const s = { id: r.src.id, trust: r.src.trust, fetched: r.candidates.length, inWindow: 0, kept: 0, inClusters: 0, primary: 0, error: r.error, ms: r.ms, raw: r.rawCount };
		stats.set(r.src.id, s);
		const seen = new Set();
		for (const c of r.candidates) {
			seen.add(c.key);
			const why = dropReason(c, { today, windowDays });
			if (why) drops[why] = (drops[why] ?? 0) + 1;
			if (!why || why === 'excluded' || why === 'keyword') s.inWindow++;
			if (why === 'keyword' && rejectedSample.keywordRejects.length < 60 && Math.random() < 0.05) {
				rejectedSample.keywordRejects.push({ title: c.title, date: c.start, source: c.sourceId });
			}
			if (!why) {
				s.kept++;
				kept.push(c);
			}
		}
		seenKeys.set(r.src.id, seen);
	}

	// ---- 4. dedupe ----
	const merges = [];
	const clusters = dedupe(kept, { onMerge: (a, b) => merges.push({ kept: a.title, merged: b.title, date: a.start, sources: [a.sourceId, b.sourceId] }) });
	const mergeSample = merges.filter((m) => m.kept !== m.merged).slice(0, 60);
	rejectedSample.dedupeMerges = mergeSample;
	for (const cl of clusters) {
		for (const id of cl.sources) stats.get(id).inClusters++;
		stats.get(cl.sourceId).primary++;
	}

	// ---- 5. known vs new ----
	const fresh = [];
	let knownCount = 0;
	for (const cl of clusters) {
		const entry = lookup(ledger, cl);
		if (entry) {
			knownCount++;
			cl._known = true;
			touch(entry, cl, today);
			// keep every key of the cluster pointing at the same decision
			for (const k of cl.keys) if (!ledger.entries[k]) ledger.entries[k] = { ...entry };
			continue;
		}
		if (matchesExisting(cl, existing)) {
			knownCount++;
			cl._known = true;
			continue;
		}
		fresh.push(cl);
	}

	// ---- 6. caps and work files ----
	const { send, deferred } = applyCap(fresh, cap);
	const pagesInfo = [];
	let pageFiles = [];

	const scrapeSources = sources.filter((s) => s.type === 'scrape' && (!opts.only || opts.only.includes(s.id)));
	const scrapeReport = [];
	const wd = isoWeekday(today);
	const due = scrapeSources.filter((s) => {
		if (s.js) return false;
		return [s.day, ...(s.extraDays ?? [])].includes(wd);
	});
	let order = due;
	if (opts.bootstrap) order = [...due, ...scrapeSources.filter((s) => !s.js && !due.includes(s))];
	const weekend = wd >= 6 && !opts.bootstrap;
	const toFetch = [];
	for (const s of scrapeSources) {
		if (s.js) scrapeReport.push({ id: s.id, status: 'skipped', detail: 'js: true (Playwright arrives later)' });
		else if (!opts.scrape || weekend) scrapeReport.push({ id: s.id, status: 'not due', detail: weekend ? 'weekend' : '--no-scrape' });
		else if (!order.includes(s)) scrapeReport.push({ id: s.id, status: 'not due', detail: `slot day ${s.day}` });
	}
	if (opts.scrape && !weekend) {
		for (const s of order) if (toFetch.length < maxPages) toFetch.push(s);
		for (const s of order.slice(toFetch.length)) scrapeReport.push({ id: s.id, status: 'deferred', detail: `cap of ${maxPages} pages per run` });
	}

	if (!opts.dry) {
		rmSync(P.work, { recursive: true, force: true });
		mkdirSync(join(P.work, 'pages'), { recursive: true });
	}
	const compact = send.map(compactCandidate);
	// Total size of the work/ input stays near 150 KB (daily mode; bootstrap works in chunks).
	let budget = Number(process.env.MAX_WORK_BYTES ?? 150000) - JSON.stringify(compact).length;
	for (const s of toFetch) {
		try {
			const pg = await fetchPage(s, ctx);
			if (pg.skipped) {
				scrapeReport.push({ id: s.id, status: 'skipped', detail: pg.skipped });
			} else if (health.pageHashes[s.id] === pg.hash && !opts.bootstrap) {
				scrapeReport.push({ id: s.id, status: 'unchanged', detail: 'page text hash unchanged', chars: pg.text.length, links: pg.links.length });
			} else if (!opts.bootstrap && pg.text.length + JSON.stringify(pg.links).length > budget) {
				scrapeReport.push({ id: s.id, status: 'deferred', detail: 'work/ size budget (150 KB) reached' });
			} else {
				budget -= pg.text.length + JSON.stringify(pg.links).length;
				health.pageHashes[s.id] = pg.hash;
				if (!opts.dry) {
					writeFileSync(join(P.work, 'pages', `${s.id.replace(/[^a-z0-9_-]/gi, '_')}.txt`), pg.text);
					writeFileSync(join(P.work, 'pages', `${s.id.replace(/[^a-z0-9_-]/gi, '_')}.links.json`), JSON.stringify(pg.links));
				}
				pageFiles.push(s.id);
				scrapeReport.push({ id: s.id, status: 'ready', chars: pg.text.length, links: pg.links.length });
			}
			health.sources[s.id] = { ...(health.sources[s.id] ?? {}), lastSuccess: today, consecutiveFailures: 0 };
		} catch (e) {
			scrapeReport.push({ id: s.id, status: 'FAILED', detail: String(e.message).slice(0, 100) });
			const h = (health.sources[s.id] ??= {});
			h.consecutiveFailures = (h.consecutiveFailures ?? 0) + 1;
			h.lastError = String(e.message).slice(0, 100);
		}
	}

	if (!opts.dry) {
		writeFileSync(join(P.work, 'candidates.full.json'), JSON.stringify(send.map((c) => ({ id: candidateId(c), ...stripBulk(c) }))));
		if (opts.bootstrap) {
			chunk(compact).forEach((part, i) => {
				const dir = join(P.work, `chunk-${String(i + 1).padStart(2, '0')}`);
				mkdirSync(dir, { recursive: true });
				writeFileSync(join(dir, 'candidates.json'), JSON.stringify(part));
			});
		}
		writeFileSync(join(P.work, 'candidates.json'), JSON.stringify(compact));
		const task = readFileSync(P.task, 'utf8')
			.replace('{{SITE_SCOPE}}', SITE_SCOPE)
			.replace('{{CANDIDATES_FILE}}', 'work/candidates.json')
			.replace('{{COUNT}}', String(compact.length))
			.replace('{{PAGES}}', pageFiles.length ? pageFiles.map((p) => `work/pages/${p}.txt`).join(', ') : 'none');
		writeFileSync(join(P.work, 'TASK.md'), task);
	}

	// ---- 7. health, ledger, state ----
	const warnings = [];
	for (const r of results) {
		const h = (health.sources[r.src.id] ??= {});
		h.recentCounts ??= [];
		if (r.error) {
			h.consecutiveFailures = (h.consecutiveFailures ?? 0) + 1;
			h.lastError = r.error;
		} else {
			if (r.candidates.length === 0 && h.recentCounts.length >= 7 && h.recentCounts.slice(-7).every((n) => n > 0)) {
				warnings.push(`${r.src.id}: returned zero items after 7 days of items`);
			}
			h.consecutiveFailures = 0;
			h.lastSuccess = today;
			h.lastCount = r.candidates.length;
			h.lastError = undefined;
			if (h.lastCountDate !== today) h.recentCounts = [...h.recentCounts, r.candidates.length].slice(-14);
			h.lastCountDate = today;
		}
	}

	const okSources = new Set(results.filter((r) => !r.error).map((r) => r.src.id));
	const wholeCalendar = new Set(sources.filter((s) => s.curatedCalendar).map((s) => s.id));
	for (const r of results) if (r.src.discovered) wholeCalendar.add(r.src.id);
	const removals = opts.dry ? [] : updateMissing(ledger, { seen: seenKeys, okSources, wholeCalendar, today });
	const pruned = opts.dry ? 0 : prune(ledger, today);

	// ---- 8. report ----
	const feedFailed = results.filter((r) => r.error);
	const cities = new Map();
	const others = new Map();
	for (const cl of clusters) {
		const label = cl.city === 'Online (DE)' ? 'Online (DE)' : cl.city === 'Nationwide' ? 'Nationwide' : hubLabel(cl.city);
		const e = cities.get(label) ?? { city: label, total: 0, known: 0, new: 0 };
		e.total++;
		cl._known ? e.known++ : e.new++;
		cities.set(label, e);
		if (label === 'Other Germany') others.set(cl.city, (others.get(cl.city) ?? 0) + 1);
	}
	const report = {
		today, windowDays, bootstrap: opts.bootstrap, limit: opts.limit,
		feedTotal: results.length, feedOk: results.length - feedFailed.length,
		totals: {
			fetched: sum(stats, 'fetched'), inWindow: sum(stats, 'inWindow'), kept: kept.length, clusters: clusters.length,
			known: knownCount, new: fresh.length, sent: send.length, deferred: deferred.length,
		},
		ledgerEntries: Object.keys(ledger.entries).length, pruned,
		sources: results.map((r) => ({ ...stats.get(r.src.id) })).sort((a, b) => b.fetched - a.fetched),
		scrape: scrapeReport,
		cities: [...cities.values()].sort((a, b) => b.total - a.total),
		otherPlaces: [...others].map(([city, n]) => ({ city, n })).sort((a, b) => b.n - a.n).slice(0, 15),
		drops: Object.fromEntries(Object.entries(drops).sort((a, b) => b[1] - a[1])),
		topClusters: clusters.filter((c) => c.members.length > 1).sort((a, b) => b.members.length - a.members.length).slice(0, 10)
			.map((c) => ({ n: c.members.length, title: c.title, sources: [...new Set(c.members.map((m) => m.sourceId))] })),
		problems: [
			...feedFailed.map((r) => `${r.src.id}: FAILED (${r.error})`),
			...results.filter((r) => !r.error && r.candidates.length === 0 && !r.src.discovered).map((r) => `${r.src.id}: empty (0 items${r.rawCount ? `, ${r.rawCount} raw` : ''})${r.src.note ? ' - ' + r.src.note : ''}`),
			...warnings.map((w) => 'WARNING ' + w),
		],
		discovered,
		notes: [
			`Ledger/ health/ cache files ${opts.dry ? 'NOT written (--dry-run)' : 'written'}; elapsed ${Math.round((Date.now() - t0) / 1000)} s.`,
			...(removals.length ? [`Vanished accepted events to remove (apply handles it): ${removals.join(', ')}`] : []),
			...(deferred.length ? [`Cap hit: ${deferred.length} candidates deferred to the next run (soonest first were sent).`] : []),
			...(opts.bootstrap ? [`Bootstrap: ${chunk(compact).length} chunk(s) of up to 60 under work/chunk-NN/.`] : []),
		],
	};
	const md = buildReport(report);

	if (!opts.dry) {
		saveJson(P.ledger, ledger);
		saveJson(P.groups, groupsFile);
		saveJson(P.health, health);
		saveJson(P.rejected, rejectedSample);
		writeFileSync(join(P.work, 'run-report.md'), md);
		copyFileSync(join(P.work, 'run-report.md'), P.report);
	}
	return { report, md, count: send.length, hasWork: send.length > 0 || pageFiles.length > 0, warnings };
}

const sum = (m, k) => [...m.values()].reduce((a, s) => a + s[k], 0);

/** Fields apply needs from the feed (urls, dates), kept out of what Claude reads. */
function stripBulk(c) {
	const { members, ...rest } = c;
	return rest;
}

async function main() {
	const opts = parseArgs(process.argv.slice(2));
	const { md, count, hasWork, warnings } = await prepare(opts);
	console.log(md);
	for (const w of warnings) console.log(`::warning::${w}`);
	console.log(`count=${count}`);
	if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `has_work=${hasWork}\ncount=${count}\n`);
	if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + '\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch((e) => {
		console.error('prepare failed:', e);
		process.exit(1);
	});
}
