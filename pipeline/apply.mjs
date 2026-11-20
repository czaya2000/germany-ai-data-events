// pipeline:apply - validate the Claude step's output, merge into src/data/events.json, update the ledger.
// Reads work/candidates.full.json (feed facts: urls, dates), work/enrichment.json and work/chunk-NN/enrichment.json.
// Partial output is fine: candidates nobody answered stay out of the ledger and come back on the next prepare.
// No LLM and no network here. Exit 0 even when the Claude step produced nothing (the site deploys unchanged).
import { appendFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { WINDOW_DAYS } from '../config/country.mjs';
import { today as berlinToday } from './lib/time.mjs';
import { loadJson, loadLedger, lookup, matchesExisting, record, saveJson } from './lib/ledger.mjs';
import { sameEvent } from './lib/dedupe.mjs';
import { makeCandidate } from './lib/normalize.mjs';
import { Counter, parseEnrichment, verifyExtracted, verifyResults } from './lib/verify.mjs';
import { safeId } from './lib/work.mjs';
import { ONLINE, resolveCity } from './lib/city.mjs';
import { organiserOrDomain } from './lib/normalize.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));

export const slug = (s) =>
	String(s ?? '').normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').toLowerCase()
		.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** Stable unique id: slug of title + city + year; on collision the date, then a counter. */
export function makeId(ev, taken) {
	const base = [slug(ev.title).slice(0, 60), slug(ev.city), ev.date.slice(0, 4)].filter(Boolean).join('-');
	for (const id of [base, `${base}-${ev.date}`]) if (!taken.has(id)) return id;
	for (let i = 2; ; i++) if (!taken.has(`${base}-${ev.date}-${i}`)) return `${base}-${ev.date}-${i}`;
}

function readUnits(work) {
	const files = [];
	if (existsSync(join(work, 'enrichment.json'))) files.push(join(work, 'enrichment.json'));
	if (existsSync(work)) {
		for (const d of readdirSync(work).filter((n) => /^chunk-\d+$/.test(n)).sort()) {
			const f = join(work, d, 'enrichment.json');
			if (existsSync(f)) files.push(f);
		}
	}
	return files;
}

/** Core: pure over the files under `root`; `write: false` computes the summary only. */
export function applyEnrichment({ root = ROOT, today = berlinToday(), windowDays = WINDOW_DAYS, now = new Date(), write = true } = {}) {
	const P = {
		work: join(root, 'work'),
		events: join(root, 'src/data/events.json'),
		archive: join(root, 'src/data/archive.json'),
		meta: join(root, 'src/data/meta.json'),
		ledger: join(root, 'data/cache/ledger.json'),
		sources: join(root, 'config/sources.json'),
	};
	const ctx = { today, windowDays };
	const counts = new Counter();
	const warnings = [];
	const events = loadJson(P.events, []);
	const existing = [...events, ...loadJson(P.archive, [])];
	const ledger = loadLedger(P.ledger);
	const sources = loadJson(P.sources, []);

	const candList = loadJson(join(P.work, 'candidates.full.json'), []);
	const candidates = new Map(candList.map((c) => [c.id, c]));

	// ---- read the Claude step's output (any number of files) ----
	const files = readUnits(P.work);
	const results = [];
	const extracted = {};
	if (!files.length) warnings.push('no enrichment.json found: every candidate stays deferred, site unchanged');
	for (const f of files) {
		const r = parseEnrichment(readFileSync(f, 'utf8'));
		if (r.error) {
			counts.add('file:' + r.error);
			warnings.push(`${f.slice(root.length + 1).replaceAll('\\', '/')}: ${r.error}`);
			continue;
		}
		results.push(...r.results);
		for (const [k, v] of Object.entries(r.extracted)) extracted[k] = [...(extracted[k] ?? []), ...(Array.isArray(v) ? v : [])];
	}

	const v = verifyResults(results, candidates, ctx);
	for (const [k, n] of Object.entries(v.counts.n)) counts.add(k, n);

	// ---- accepted feed candidates, then verified scrape extractions ----
	const toAdd = v.accepted.map((a) => ({
		cand: a.cand, city: a.city, format: a.format, topics: a.topics, blurb: a.blurb, blurb_en: a.blurb_en, blurb_de: a.blurb_de, cost: a.cost,
		source: a.cand.sourceLabel, trust: a.cand.trust,
	}));
	const sourceBySafe = new Map(sources.filter((s) => s.type === 'scrape').map((s) => [safeId(s.id), s]));
	for (const [pid, items] of Object.entries(extracted)) {
		const src = sourceBySafe.get(pid);
		const tp = join(P.work, 'pages', `${pid}.txt`);
		const lp = join(P.work, 'pages', `${pid}.links.json`);
		if (!src || !existsSync(tp) || !existsSync(lp)) { counts.add('extract:invalid:unknown-page', Array.isArray(items) ? items.length : 1); continue; }
		const page = {
			text: readFileSync(tp, 'utf8'), links: loadJson(lp, []), url: src.url,
			curated: src.trust === 'curated', cityHint: src.cityHint,
		};
		const { accepted } = verifyExtracted(items, page, ctx, counts);
		for (const e of accepted) {
			const trust = src.trust === 'curated' ? 'curated' : 'noisy';
			const cand = makeCandidate({
				title: e.title, start: e.date, end: e.end, time: e.time, city: e.city, venue: e.venue, organiser: e.organiser,
				url: e.url, cost: e.cost, desc: e.blurb, online: e.city === ONLINE,
			}, { id: src.id, label: src.label, type: 'scrape', trust, country: 'DE' });
			if (!cand) { counts.add('extract:invalid:schema'); continue; }
			if (lookup(ledger, cand)) { counts.add('extract:known'); continue; }
			toAdd.push({ cand, city: e.city, format: e.format, topics: e.topics, blurb: e.blurb, blurb_en: e.blurb_en, blurb_de: e.blurb_de, cost: e.cost, source: src.label, trust, extracted: true });
		}
	}

	// ---- merge ----
	const taken = new Set(existing.map((e) => e.id));
	const added = [];
	let fromPages = 0;
	for (const a of toAdd) {
		const c = a.cand;
		const dupe = matchesExisting(c, existing) ?? added.find((e) => sameEvent({ title: c.title, start: c.start, city: c.city }, { title: e.title, start: e.date, city: e.city }));
		if (dupe) {
			record(ledger, c, 'rejected', { today, reason: 'duplicate' });
			counts.add('duplicate');
			continue;
		}
		const ev = {
			title: c.title,
			date: c.start,
			...(c.end && c.end > c.start ? { endDate: c.end } : {}),
			...(c.time ? { time: c.time } : {}),
			city: resolveCity({ city: a.city, venue: c.venue, url: c.url }),
			...(c.venue ? { venue: c.venue } : {}),
			format: a.format,
			topics: a.topics,
			organiser: organiserOrDomain(c.organiser, c.url) || a.source,
			cost: a.cost,
			url: c.url,
			source: a.source,
			blurb: a.blurb_en ?? a.blurb,
			blurb_en: a.blurb_en ?? a.blurb,
			...(a.blurb_de ? { blurb_de: a.blurb_de } : {}),
			firstSeen: today,
		};
		ev.id = makeId(ev, taken);
		taken.add(ev.id);
		added.push(ev);
		record(ledger, c, 'accepted', { today, eventId: ev.id });
		counts.add(a.extracted ? 'accepted:page' : 'accepted:feed');
		if (!a.blurb_de) counts.add('blurb-de-missing');
		if (a.extracted) fromPages++;
	}
	for (const { cand, reason } of v.rejected) record(ledger, cand, 'rejected', { today, reason });
	for (const { cand, reason } of v.deferred) record(ledger, cand, 'deferred', { today, reason });

	const merged = [...events, ...added.map(({ id, ...rest }) => ({ id, ...rest }))]
		.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));

	const summary = {
		today, files: files.length, candidates: candidates.size, answered: candidates.size - v.unanswered.length,
		accepted: added.length - fromPages,
		acceptedFromPages: fromPages,
		rejected: v.rejected.length, deferred: v.deferred.length, unanswered: v.unanswered.length,
		invalid: Object.entries(counts.n).filter(([k]) => k.includes('invalid') || k.startsWith('file:')).reduce((s, [, n]) => s + n, 0),
		counts: counts.n, totalEvents: merged.length, warnings,
		sample: added.slice(0, 3).map((e) => `${e.date} ${e.city}: ${e.title}`),
	};
	if (write) {
		saveJson(P.events, merged);
		saveJson(P.ledger, ledger);
		const meta = loadJson(P.meta, {});
		saveJson(P.meta, { ...meta, lastScan: now.toISOString().replace(/\.\d+Z$/, 'Z') });
	}
	return { summary, added, events: merged };
}

export function renderSummary(s) {
	const rows = Object.entries(s.counts).sort().map(([k, n]) => `| ${k} | ${n} |`);
	return [
		`## Apply summary (${s.today})`,
		'',
		`Candidates in work/: ${s.candidates}; answered: ${s.answered}; still unanswered (retried next prepare): ${s.unanswered}.`,
		`Accepted: ${s.accepted} from feeds, ${s.acceptedFromPages} from scrape pages. Rejected: ${s.rejected}. Deferred: ${s.deferred}. Invalid or dropped outputs: ${s.invalid}.`,
		`Events listed now: ${s.totalEvents}.`,
		...(s.sample.length ? ['', 'Sample: ' + s.sample.join(' | ')] : []),
		...(rows.length ? ['', '| counter | n |', '|---|---|', ...rows] : []),
	].join('\n');
}

function main() {
	const args = process.argv.slice(2);
	const { summary } = applyEnrichment({ today: args.includes('--today') ? args[args.indexOf('--today') + 1] : undefined, write: !args.includes('--dry-run') });
	const md = renderSummary(summary);
	console.log(md);
	for (const w of summary.warnings) console.log(`::warning::${w}`);
	if (summary.invalid) console.log(`::warning::${summary.invalid} invalid output item(s) dropped`);
	if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + '\n');
	if (args.includes('--dry-run')) return;
	writeFileSync(join(ROOT, 'work', 'apply-report.md'), md + '\n');
	// archive past events, then validate. A failing validation fails the step (nothing is pushed or deployed).
	for (const script of ['archive-past.mjs', 'validate-events.mjs']) {
		try {
			process.stdout.write(execFileSync(process.execPath, [join(ROOT, 'scripts', script)], { cwd: ROOT, encoding: 'utf8' }));
		} catch (e) {
			process.stdout.write(String(e.stdout ?? ''));
			process.stderr.write(String(e.stderr ?? ''));
			process.exit(1);
		}
	}
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
