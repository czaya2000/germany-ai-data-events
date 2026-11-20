import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyEnrichment, makeId } from '../apply.mjs';
import { checkCity, checkCost, containsUrl, parseEnrichment, registrable, titleOnPage, validateNode, SCHEMA } from '../lib/verify.mjs';
import { claudeArgs, parseArgs, planUnits, promptFor } from '../enrich-local.mjs';
import { renderTask } from '../lib/work.mjs';
import { ledgerKeys } from '../lib/normalize.mjs';
import { cand } from './helpers.mjs';

const TODAY = '2026-11-20';
const FIX = (n) => readFileSync(new URL('../fixtures/enrichment/' + n, import.meta.url), 'utf8');
const ids = (n) => 'c_' + String(n).padStart(10, '0');

/** Full candidates as prepare writes them to work/candidates.full.json. */
function fullCand(n, over = {}) {
	const url = `https://example.com/e/${n}`;
	const c = cand({ title: `Distinct Event Number ${['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'][n - 1]} Topic ${n * 7}`, url, start: '2026-12-0' + n, end: '2026-12-0' + n, city: 'Berlin', trust: 'noisy', extraUrls: [], ...over });
	c.keys = ledgerKeys(c);
	c.key = c.keys[0];
	c.sources = ['t'];
	c.id = ids(n);
	return c;
}

const PAGE_TEXT = 'Upcoming events\nData Platform Day Leipzig, 10 December 2026, Leipzig\nMore details on the organiser site.';
const PAGE_LINKS = [{ text: 'Data Platform Day Leipzig', url: 'https://demo.example/events/data-platform-day' }];

/** A throwaway repo root with work/, src/data, data/cache and config/sources.json. */
function sandbox({ cands = [1, 2, 3, 4, 5, 6].map((n) => fullCand(n, n === 4 ? { city: null } : {})), events = [], files = {} } = {}) {
	const root = mkdtempSync(join(tmpdir(), 'apply-'));
	for (const d of ['work/pages', 'src/data', 'data/cache', 'config']) mkdirSync(join(root, d), { recursive: true });
	writeFileSync(join(root, 'work/candidates.full.json'), JSON.stringify(cands));
	writeFileSync(join(root, 'src/data/events.json'), JSON.stringify(events));
	writeFileSync(join(root, 'src/data/archive.json'), '[]');
	writeFileSync(join(root, 'src/data/meta.json'), '{"lastScan":"2026-11-19T00:00:00Z"}');
	writeFileSync(join(root, 'config/sources.json'), JSON.stringify([{ id: 'scrape:demo', type: 'scrape', label: 'demo', url: 'https://demo.example/', trust: 'noisy' }]));
	writeFileSync(join(root, 'work/pages/scrape_demo.txt'), PAGE_TEXT);
	writeFileSync(join(root, 'work/pages/scrape_demo.links.json'), JSON.stringify(PAGE_LINKS));
	for (const [name, text] of Object.entries(files)) {
		mkdirSync(join(root, name, '..'), { recursive: true });
		writeFileSync(join(root, name), text);
	}
	return root;
}
const read = (root, f) => JSON.parse(readFileSync(join(root, f), 'utf8'));
const run = (root, extra = {}) => applyEnrichment({ root, today: TODAY, now: new Date('2026-11-20T08:00:00Z'), ...extra });

// ---------- schema validator ----------
test('schema: shipped schema accepts a good item and names the problem in bad ones', () => {
	const good = JSON.parse(FIX('good.json')).results[0];
	assert.deepEqual(validateNode(SCHEMA.definitions.result, good), []);
	assert.ok(validateNode(SCHEMA.definitions.result, { ...good, extra: 1 }).includes('unknown-field:extra'));
	assert.ok(validateNode(SCHEMA.definitions.result, { ...good, topics: [] }).length);
	assert.ok(validateNode(SCHEMA.definitions.result, { ...good, topics: ['a', 'b', 'c', 'd', 'e'] }).length);
	assert.ok(validateNode(SCHEMA.definitions.result, { ...good, confidence: 1.5 }).length);
	assert.ok(validateNode(SCHEMA.definitions.result, { ...good, cost: '49 Euro' }).length);
	assert.ok(validateNode(SCHEMA.definitions.result, { ...good, id: 'c_xyz' }).length);
});

test('helpers: URL detection, city check, cost check, page title match, registrable domain', () => {
	for (const s of ['see https://a.example/x', 'visit www.foo.org', 'mail us at acme.com']) assert.ok(containsUrl(s), s);
	for (const s of ['Talks on retrieval-augmented generation.', 'Node.js and dbt basics']) assert.ok(!containsUrl(s), s);
	assert.equal(checkCity('München'), 'Munich');
	assert.equal(checkCity('Frankfurt am Main'), 'Frankfurt');
	assert.equal(checkCity('online'), 'Online (DE)');
	assert.equal(checkCity('Paris'), null);
	assert.equal(checkCity('Freising', true), 'Freising'); // the feed's own hint may be a place we have no name for
	assert.equal(checkCost('EUR 49'), 'EUR 49');
	assert.equal(checkCost('EUR 49,50'), 'EUR 49.50');
	assert.equal(checkCost('CHF 20'), null);
	assert.ok(titleOnPage('Data Platform Day Leipzig', 'data platform day leipzig 10 december'));
	assert.ok(!titleOnPage('Invented Congress Bonn', 'data platform day leipzig'));
	assert.equal(registrable('www.sub.example.co.uk'), 'example.co.uk');
	assert.equal(registrable('www.demo.example'), 'demo.example');
});

test('parseEnrichment: malformed JSON, wrong shape, bare array, code fence', () => {
	assert.equal(parseEnrichment(FIX('malformed.json')).error, 'malformed-json');
	assert.equal(parseEnrichment('{"results": 5}').error, 'malformed-structure');
	assert.equal(parseEnrichment('"hello"').error, 'malformed-structure');
	assert.equal(parseEnrichment('[{"id":"x"}]').results.length, 1);
	assert.equal(parseEnrichment('```json\n{"results":[]}\n```').error, null);
});

// ---------- apply ----------
test('apply: good output is merged, rejected/deferred are ledgered, unanswered candidates stay out (partial output)', () => {
	const root = sandbox({ files: { 'work/enrichment.json': FIX('good.json') } });
	const { summary } = run(root);
	const events = read(root, 'src/data/events.json');
	assert.equal(events.length, 1);
	const e = events[0];
	assert.equal(e.id.startsWith('distinct-event-number-one'), true);
	assert.equal(e.url, 'https://example.com/e/1'); // from the feed, never the model
	assert.equal(e.date, '2026-12-01');
	assert.equal(e.city, 'Berlin');
	assert.equal(e.format, 'Meetup');
	assert.equal(e.firstSeen, TODAY);
	assert.deepEqual(Object.keys(e).sort(), ['blurb', 'blurb_en', 'city', 'cost', 'date', 'firstSeen', 'format', 'id', 'organiser', 'source', 'title', 'topics', 'url'].sort());
	assert.equal(summary.accepted, 1);
	assert.equal(summary.rejected, 1);
	assert.equal(summary.deferred, 2); // low confidence + no city
	assert.equal(summary.unanswered, 2); // candidates 5 and 6 got no answer
	const led = read(root, 'data/cache/ledger.json').entries;
	const dec = (n) => led[ledgerKeys(fullCand(n))[0]]?.decision;
	assert.equal(dec(1), 'accepted');
	assert.equal(dec(2), 'rejected');
	assert.equal(dec(3), 'deferred');
	assert.equal(led[ledgerKeys(fullCand(3))[0]].reason, 'low-confidence');
	assert.equal(led[ledgerKeys(fullCand(4))[0]].reason, 'no-city');
	assert.equal(dec(5), undefined, 'unanswered stays out of the ledger so prepare offers it again');
	assert.equal(dec(6), undefined);
	assert.equal(read(root, 'src/data/meta.json').lastScan, '2026-11-20T08:00:00Z');
});

test('apply: running twice does not duplicate events', () => {
	const root = sandbox({ files: { 'work/enrichment.json': FIX('good.json') } });
	run(root);
	const second = run(root);
	assert.equal(read(root, 'src/data/events.json').length, 1);
	assert.equal(second.summary.counts.duplicate, 1);
});

test('apply: malformed output file is counted; everything stays deferred and the site is unchanged', () => {
	const root = sandbox({ files: { 'work/enrichment.json': FIX('malformed.json') } });
	const { summary } = run(root);
	assert.equal(summary.counts['file:malformed-json'], 1);
	assert.equal(summary.invalid, 1);
	assert.equal(summary.accepted, 0);
	assert.equal(summary.unanswered, 6);
	assert.deepEqual(read(root, 'src/data/events.json'), []);
	assert.deepEqual(read(root, 'data/cache/ledger.json').entries ?? {}, {});
});

test('apply: no enrichment file at all is a warning, not a failure', () => {
	const { summary } = run(sandbox());
	assert.equal(summary.files, 0);
	assert.match(summary.warnings[0], /no enrichment\.json/);
	assert.equal(summary.unanswered, 6);
});

test('apply: injected URL field, URL in blurb, over-long blurb, unknown field, bad enum, unknown id, junk entry are all rejected and counted', () => {
	const root = sandbox({ files: { 'work/enrichment.json': FIX('bad-items.json') } });
	const { summary } = run(root);
	const n = summary.counts;
	assert.equal(n['invalid:unknown-field'], 2, 'injected url field + extra date field');
	assert.equal(n['invalid:url-in-text'], 1);
	assert.equal(n['invalid:blurb-too-long'], 1);
	assert.equal(n['invalid:schema'], 1, 'format outside the enum');
	assert.equal(n['invalid:unknown-id'], 1);
	assert.equal(n['invalid:not-an-object'], 1);
	assert.equal(summary.invalid, 7);
	const events = read(root, 'src/data/events.json');
	assert.equal(events.length, 1, 'only the control candidate 6 gets through');
	assert.equal(events[0].url, 'https://example.com/e/6');
	assert.equal(events[0].cost, 'EUR 49');
	assert.ok(JSON.stringify(events).indexOf('evil.example') === -1);
});

test('apply: a candidate whose feed date has left the window is dropped and counted (out-of-window)', () => {
	const stale = fullCand(1, { start: '2026-11-01', end: '2026-11-01' });
	const far = fullCand(2, { start: '2027-06-01', end: '2027-06-01' });
	const out = { results: [1, 2].map((n) => ({ id: ids(n), relevant: true, confidence: 0.9, format: 'Meetup', city: 'Berlin', topics: ['AI'], blurb: 'Fine.', cost: 'Free' })) };
	const root = sandbox({ cands: [stale, far], files: { 'work/enrichment.json': JSON.stringify(out) } });
	const { summary } = run(root);
	assert.equal(summary.counts['invalid:out-of-window'], 2);
	assert.equal(read(root, 'src/data/events.json').length, 0);
});

test('apply: a multi-day event already running today is in the window (regression: window uses end date, like prepare)', () => {
	const running = fullCand(1, { start: '2026-11-16', end: '2026-11-20' });
	const out = { results: [{ id: ids(1), relevant: true, confidence: 0.9, format: 'Conference', city: 'Berlin', topics: ['AI'], blurb: 'Fine.', cost: 'Free' }] };
	const root = sandbox({ cands: [running], files: { 'work/enrichment.json': JSON.stringify(out) } });
	const { summary } = applyEnrichment({ root, today: '2026-11-20', write: false });
	assert.equal(summary.counts['invalid:out-of-window'] ?? 0, 0);
	assert.equal(summary.accepted, 1);
});

test('apply: a date supplied by the model is an unknown field and is rejected', () => {
	const item = { id: ids(1), relevant: true, confidence: 0.9, format: 'Meetup', city: 'Berlin', topics: ['AI'], blurb: 'Fine.', cost: 'Free', date: '2031-01-01', time: '10:00' };
	const root = sandbox({ files: { 'work/enrichment.json': JSON.stringify({ results: [item] }) } });
	assert.equal(run(root).summary.counts['invalid:unknown-field'], 1);
});

test('apply: curated candidates are accepted regardless of relevance; noisy low-confidence is not', () => {
	const c1 = fullCand(1, { trust: 'curated' });
	const c2 = fullCand(2, { trust: 'noisy' });
	const base = { format: 'Conference', city: 'Berlin', topics: ['AI'], blurb: 'Fine.', cost: 'Free' };
	const out = { results: [{ id: ids(1), relevant: false, confidence: 0.3, ...base }, { id: ids(2), relevant: true, confidence: 0.5, ...base }] };
	const root = sandbox({ cands: [c1, c2], files: { 'work/enrichment.json': JSON.stringify(out) } });
	const { summary } = run(root);
	assert.equal(summary.accepted, 1);
	assert.equal(summary.deferred, 1);
});

test('apply: chunk outputs are merged, a partial chunk leaves the rest unanswered', () => {
	const root = sandbox({
		files: {
			'work/chunk-01/enrichment.json': JSON.stringify({ results: [JSON.parse(FIX('good.json')).results[0]] }),
			'work/chunk-02/enrichment.json': FIX('malformed.json'),
		},
	});
	const { summary } = run(root);
	assert.equal(summary.files, 2);
	assert.equal(summary.accepted, 1);
	assert.equal(summary.counts['file:malformed-json'], 1);
	assert.equal(summary.unanswered, 5);
});

test('apply: scrape extractions are verified in code (not on page, out of window, bad url, extra field dropped; one accepted)', () => {
	const root = sandbox({ cands: [], files: { 'work/enrichment.json': FIX('extracted.json') } });
	const { summary } = run(root);
	const n = summary.counts;
	assert.equal(n['extract:invalid:url-not-on-page'], 1);
	assert.equal(n['extract:invalid:out-of-window'], 1);
	assert.equal(n['extract:invalid:title-not-on-page'], 1);
	assert.equal(n['extract:invalid:unknown-field'], 1);
	assert.equal(summary.acceptedFromPages, 1);
	const [e] = read(root, 'src/data/events.json');
	assert.equal(e.url, 'https://demo.example/events/data-platform-day');
	assert.equal(e.city, 'Leipzig');
	assert.equal(e.source, 'demo');
	assert.equal(e.cost, 'EUR 90');
});

test('apply: written events satisfy the site rules (blurb length, no URL, 1-4 topics, valid url)', () => {
	const root = sandbox({ files: { 'work/enrichment.json': FIX('bad-items.json') } });
	run(root);
	for (const e of read(root, 'src/data/events.json')) {
		assert.ok(e.blurb.length <= 220 && !containsUrl(e.blurb));
		assert.ok(e.topics.length >= 1 && e.topics.length <= 4);
		assert.doesNotThrow(() => new URL(e.url));
		assert.match(e.date, /^\d{4}-\d{2}-\d{2}$/);
	}
});

test('makeId: stable slug of title + city + year, unique on collision', () => {
	const taken = new Set();
	const ev = { title: 'KI-Forum Köln #3', city: 'Cologne', date: '2026-12-01' };
	const a = makeId(ev, taken);
	assert.equal(a, 'ki-forum-koln-3-cologne-2026');
	taken.add(a);
	const b = makeId({ ...ev, date: '2026-12-08' }, taken);
	assert.equal(b, 'ki-forum-koln-3-cologne-2026-2026-12-08');
	taken.add(b);
	assert.equal(makeId({ ...ev, date: '2026-12-08' }, taken), 'ki-forum-koln-3-cologne-2026-2026-12-08-2');
});

// ---------- enrich-local ----------
test('enrich-local: plan for --limit takes the first N of the first chunk, no pages', () => {
	const work = mkdtempSync(join(tmpdir(), 'enrich-'));
	for (const c of ['chunk-01', 'chunk-02']) mkdirSync(join(work, c));
	mkdirSync(join(work, 'pages'));
	writeFileSync(join(work, 'pages/scrape_demo.txt'), 'x');
	const mk = (n, k) => Array.from({ length: n }, (_, i) => ({ id: ids(k * 100 + i) }));
	writeFileSync(join(work, 'chunk-01/candidates.json'), JSON.stringify(mk(60, 1)));
	writeFileSync(join(work, 'chunk-02/candidates.json'), JSON.stringify(mk(5, 2)));
	const limited = planUnits(work, parseArgs(['--limit', '10']));
	assert.equal(limited.length, 1);
	assert.equal(limited[0].name, 'chunk-01');
	assert.equal(limited[0].cands.length, 10);
	assert.deepEqual(limited[0].pages, []);
	const all = planUnits(work, parseArgs([]));
	assert.deepEqual(all.map((u) => u.name), ['chunk-01', 'chunk-02', 'pages']);
	assert.deepEqual(planUnits(work, parseArgs(['--chunk', '2'])).map((u) => u.name), ['chunk-02']);
	assert.throws(() => parseArgs(['--bogus']));
});

test('enrich-local: Claude only gets Read and Write, prompt names exactly one output file, no API/secret use', () => {
	const args = claudeArgs(parseArgs([]));
	assert.equal(args[args.indexOf('--allowedTools') + 1], 'Read,Write');
	assert.equal(args[args.indexOf('--max-turns') + 1], '8');
	const p = promptFor('/r/work/chunk-01/TASK.md', '/r/work/chunk-01/enrichment.json');
	assert.match(p, /Do not run commands/);
	const task = renderTask({ scope: 'SCOPE', candidatesFile: 'work/chunk-01/input.json', count: 10, outputFile: 'work/chunk-01/enrichment.json', pages: [] });
	assert.match(task, /untrusted data/);
	assert.match(task, /Write exactly one file, work\/chunk-01\/enrichment\.json/);
	assert.ok(!task.includes('{{'), 'no unreplaced placeholders');
	assert.ok(task.split(/\s+/).length < 700, 'task stays short');
});

test('no Node file references the Anthropic API, its SDK or the OAuth token variable', () => {
	const root = fileURLToPath(new URL('../../', import.meta.url));
	const bad = ['api.anthropic' + '.com', '@anthropic-ai' + '/sdk', 'CLAUDE_CODE' + '_OAUTH_TOKEN'];
	const walk = (d) => readdirSync(d).flatMap((n) => {
		const p = join(d, n);
		return statSync(p).isDirectory() ? (n === 'fixtures' ? [] : walk(p)) : /\.(mjs|ts|astro|json)$/.test(n) ? [p] : [];
	});
	for (const dir of ['pipeline', 'scripts', 'src', 'config']) {
		for (const f of walk(join(root, dir))) {
			const text = readFileSync(f, 'utf8');
			for (const b of bad) assert.ok(!text.includes(b), `${f} mentions ${b}`);
		}
	}
});

