import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { utcToLocal, zonedToUtc, addDays, daysBetween } from '../lib/time.mjs';
import { parseIcs } from '../lib/ical.mjs';
import { canonicalUrl, ledgerKeys, parseDateText, costFromPrice } from '../lib/normalize.mjs';
import { citiesCompatible, detectCity, hubLabel, hubSlug } from '../lib/city.mjs';
import { dropReason, loadKeywords } from '../lib/filter.mjs';
import { emptyLedger, lookup, matchesExisting, prune, record, touch, updateMissing, loadLedger, saveJson } from '../lib/ledger.mjs';
import { applyCap, candidateId, chunk, compactCandidate, MAX_INPUT_CHARS } from '../lib/work.mjs';
import { getText } from '../lib/cache.mjs';
import { prepare } from '../prepare.mjs';
import { cand } from './helpers.mjs';

const kw = loadKeywords();
const base = { today: '2026-11-20', windowDays: 120, kw };
const mk = (o) => {
	const c = cand(o);
	c.keys = ledgerKeys(c);
	c.key = c.keys[0];
	return c;
};

// ---- time ----
test('UTC to Europe/Berlin around the March 2027 DST switch (28 Mar, 01:00 UTC)', () => {
	assert.deepEqual(utcToLocal(Date.parse('2027-03-28T00:30:00Z')), { date: '2027-03-28', time: '01:30' }); // CET
	assert.deepEqual(utcToLocal(Date.parse('2027-03-28T01:30:00Z')), { date: '2027-03-28', time: '03:30' }); // CEST
});
test('UTC to Europe/Berlin around the October 2026 DST switch (25 Oct, 01:00 UTC)', () => {
	assert.deepEqual(utcToLocal(Date.parse('2026-10-25T00:30:00Z')), { date: '2026-10-25', time: '02:30' }); // CEST
	assert.deepEqual(utcToLocal(Date.parse('2026-10-25T01:30:00Z')), { date: '2026-10-25', time: '02:30' }); // CET
	assert.deepEqual(utcToLocal(Date.parse('2026-10-24T22:30:00Z')), { date: '2026-10-25', time: '00:30' }); // date rolls over
});
test('zonedToUtc handles other zones and DST', () => {
	assert.equal(new Date(zonedToUtc(2026, 11, 20, 18, 0, 'Europe/Berlin')).toISOString(), '2026-11-20T17:00:00.000Z');
	assert.equal(new Date(zonedToUtc(2026, 7, 1, 18, 0, 'Europe/Berlin')).toISOString(), '2026-07-01T16:00:00.000Z');
	assert.equal(new Date(zonedToUtc(2026, 11, 20, 12, 0, 'America/New_York')).toISOString(), '2026-11-20T17:00:00.000Z');
});
test('ICS: UTC times and floating TZID times are both converted to Berlin', () => {
	const ics = [
		'BEGIN:VCALENDAR', 'VERSION:2.0',
		'BEGIN:VEVENT', 'UID:a', 'DTSTART:20261024T223000Z', 'DTEND:20261025T003000Z', 'SUMMARY:UTC event', 'END:VEVENT',
		'BEGIN:VEVENT', 'UID:b', 'DTSTART;TZID=Europe/London:20261120T170000', 'DTEND;TZID=Europe/London:20261120T180000', 'SUMMARY:London event', 'END:VEVENT',
		'END:VCALENDAR', '',
	].join('\r\n');
	const { events } = parseIcs(ics);
	assert.equal(events[0].start, '2026-10-25');
	assert.equal(events[0].time, '00:30–02:30'); // 22:30Z-00:30Z around the switch = 00:30-02:30 local
	assert.equal(events[1].time, '18:00–19:00'); // London 17:00 = Berlin 18:00
});
test('date helpers', () => {
	assert.equal(addDays('2026-11-30', 1), '2026-12-01');
	assert.equal(daysBetween('2026-11-20', '2027-03-20'), 120);
});

// ---- text ----
test('date text parsing, German and English', () => {
	assert.deepEqual(parseDateText('Summit: 16.–20. November 2026, Berlin'), { start: '2026-11-16', end: '2026-11-20' });
	assert.deepEqual(parseDateText('AI.SUMMIT 2026: 24. November 2026, Hamburg'), { start: '2026-11-24', end: '2026-11-24' });
	assert.deepEqual(parseDateText('happening on December 10, 2026'), { start: '2026-12-10', end: '2026-12-10' });
	assert.deepEqual(parseDateText('Dec 10-11, 2026'), { start: '2026-12-10', end: '2026-12-11' });
	assert.deepEqual(parseDateText('1.–2. Dezember 2026'), { start: '2026-12-01', end: '2026-12-02' });
	assert.deepEqual(parseDateText('Termin 05.03.2027'), { start: '2027-03-05', end: '2027-03-05' });
	assert.equal(parseDateText('no date here'), null);
});
test('canonical URLs and ledger keys', () => {
	assert.equal(canonicalUrl('https://www.meetup.com/PyData-Berlin/events/317368516/?utm_source=x'), 'meetup.com/pydata-berlin/events/317368516');
	assert.equal(canonicalUrl('https://lu.ma/abc123?utm_medium=y'), 'luma.com/abc123');
	assert.equal(canonicalUrl('https://www.eventbrite.de/e/ai-monday-tickets-2003969207846?aff=x'), 'eventbrite/2003969207846');
	assert.equal(canonicalUrl('https://Example.com/a/b/?utm_campaign=1&id=7#frag'), 'example.com/a/b?id=7');
	const keys = ledgerKeys({ url: 'https://example.com/x/', title: 'AI Meetup 2026 Berlin', start: '2026-12-01' });
	assert.deepEqual(keys, ['u:example.com/x', 't:ai|2026-12-01']);
});
test('cost formatting', () => {
	assert.equal(costFromPrice({ isFree: true }), 'Free');
	assert.equal(costFromPrice({ priceFrom: 49, currency: 'EUR' }), 'EUR 49');
	assert.equal(costFromPrice({ priceFrom: 199, priceTo: 499, currency: 'EUR' }), 'From EUR 199');
	assert.equal(costFromPrice({}), null);
});
test('city detection, hubs and compatibility', () => {
	assert.equal(detectCity('Haus 3, 80331 München'), 'Munich');
	assert.equal(detectCity('Frankfurt am Main'), 'Frankfurt');
	assert.equal(detectCity('Sankt Georgen im Schwarzwald'), null);
	assert.equal(hubSlug('Potsdam'), 'berlin');
	assert.equal(hubLabel('Leipzig'), 'Other Germany');
	assert.equal(hubLabel('Online (DE)'), 'Online (DE)');
	assert.equal(citiesCompatible('Berlin', 'Potsdam'), true);
	assert.equal(citiesCompatible('Berlin', 'Munich'), false);
	assert.equal(citiesCompatible('Leipzig', 'Dresden'), false);
	assert.equal(citiesCompatible(null, 'Munich'), true);
	assert.equal(citiesCompatible('Online (DE)', 'Munich'), true);
});

// ---- filters ----
test('filter: country, online, window, cancelled, duration, keyword, exclude', () => {
	assert.equal(dropReason(mk({ title: 'AI Meetup' }), base), null);
	assert.equal(dropReason(mk({ country: 'CH' }), base), 'country');
	assert.equal(dropReason(mk({ country: null, online: true, onlineOk: true }), base), null);
	assert.equal(dropReason(mk({ country: null, online: true, onlineOk: false }), base), 'country');
	assert.equal(dropReason(mk({ start: '2026-11-01', end: '2026-11-05' }), base), 'window');
	assert.equal(dropReason(mk({ start: '2026-11-18', end: '2026-11-21' }), base), null); // still running
	assert.equal(dropReason(mk({ start: '2027-03-21', end: '2027-03-21' }), base), 'window'); // day 121
	assert.equal(dropReason(mk({ start: '2027-03-20', end: '2027-03-20' }), base), null); // day 120
	assert.equal(dropReason(mk({ title: 'AI Night (abgesagt)' }), base), 'cancelled');
	assert.equal(dropReason(mk({ title: 'AI Night verschoben' }), base), 'cancelled');
	assert.equal(dropReason(mk({ cancelled: true }), base), 'cancelled');
	assert.equal(dropReason(mk({ start: '2026-12-01', end: '2027-02-20' }), base), 'long');
	assert.equal(dropReason(mk({ start: '2026-12-01', end: '2027-02-20', trust: 'curated' }), base), null);
	assert.equal(dropReason(mk({ title: 'Pottery evening', desc: 'clay' }), base), 'keyword');
	assert.equal(dropReason(mk({ title: 'Pottery evening', acceptAll: true }), base), null);
	assert.equal(dropReason(mk({ title: 'Speed dating for data people' }), base), 'excluded');
	for (const t of ['Databricks Summit', 'KI in der Praxis', 'Künstliche Intelligenz Konferenz', 'Power BI Usergroup', 'dbt meetup', 'Data Mesh Day', 'RAG workshop', 'Microsoft Fabric Hands-on', 'MLOps Stammtisch', 'Agentic coding']) {
		assert.equal(dropReason(mk({ title: t }), base), null, t);
	}
	assert.equal(dropReason(mk({ title: 'Evening', desc: 'About data platforms' }), base), null); // description counts
});

// ---- ledger ----
test('ledger: known by URL key or by title+date key; rejected stays known', () => {
	const l = emptyLedger();
	const a = mk({ title: 'AI Night Berlin', url: 'https://example.com/ai-night' });
	record(l, a, 'rejected', { today: '2026-11-20', reason: 'offtopic' });
	assert.equal(lookup(l, a).decision, 'rejected');
	const sameUrl = mk({ title: 'Renamed', url: 'https://example.com/ai-night/?utm_source=x' });
	assert.equal(lookup(l, sameUrl)?.decision, 'rejected');
	const sameTitle = mk({ title: 'AI Night', url: 'https://other.example/xyz' });
	assert.equal(lookup(l, sameTitle)?.decision, 'rejected');
	assert.equal(lookup(l, mk({ title: 'Other', url: 'https://example.com/other' })), null);
});
test('ledger: touch updates lastSeen and merges sources; prune drops entries 7 days after the end', () => {
	const l = emptyLedger();
	const a = mk({ end: '2026-12-01', start: '2026-12-01' });
	record(l, a, 'accepted', { today: '2026-11-20', eventId: 'ev1' });
	touch(lookup(l, a), { ...a, sourceId: 'other' }, '2026-11-25');
	assert.equal(lookup(l, a).lastSeen, '2026-11-25');
	assert.deepEqual(lookup(l, a).sources, ['t', 'other']);
	assert.equal(prune(l, '2026-12-08'), 0);
	assert.ok(Object.keys(l.entries).length > 0);
	assert.ok(prune(l, '2026-12-09') > 0);
	assert.equal(Object.keys(l.entries).length, 0);
});
test('ledger: vanished events removed only after two successful misses, never on a failed fetch, once per day', () => {
	const l = emptyLedger();
	const a = mk({ sourceId: 'mcml', start: '2026-12-10', end: '2026-12-10', url: 'https://mcml.ai/events/x/' });
	record(l, a, 'accepted', { today: '2026-11-20', eventId: 'ev-mcml' });
	const whole = new Set(['mcml']);
	const run = (day, ok, seen) => updateMissing(l, { seen: new Map([['mcml', new Set(seen)]]), okSources: new Set(ok ? ['mcml'] : []), wholeCalendar: whole, today: day });
	assert.deepEqual(run('2026-11-21', false, []), []); // fetch failed: nothing counted
	l.lastMissingCheck = null;
	assert.deepEqual(run('2026-11-22', true, []), []); // first miss
	assert.deepEqual(run('2026-11-22', true, []), []); // same day again: not double counted
	assert.equal(lookup(l, a).missingDays, 1);
	assert.deepEqual(run('2026-11-23', true, []), ['ev-mcml']); // second consecutive miss
	l.lastMissingCheck = null;
	lookup(l, a).missingDays = 1;
	assert.deepEqual(run('2026-11-24', true, [a.key]), []); // seen again: reset
	assert.equal(lookup(l, a).missingDays, 0);
});
test('known events: match against events.json by URL or fuzzy title+date', () => {
	const existing = [{ title: 'MLcon Berlin 2026', date: '2026-11-16', city: 'Berlin', url: 'https://mlconference.ai/berlin/' }];
	assert.ok(matchesExisting(mk({ title: 'Something else', url: 'https://mlconference.ai/berlin/?utm_source=x', start: '2026-11-16' }), existing));
	assert.ok(matchesExisting(mk({ title: 'MLConf Berlin 2026', url: 'https://hackevents.net/x', start: '2026-11-16' }), existing));
	assert.equal(matchesExisting(mk({ title: 'PyData Berlin', url: 'https://x.example/p', start: '2026-12-03' }), existing), null);
});

// ---- caps and hand-off ----
test('caps: soonest first, rest deferred; bootstrap chunks of 60', () => {
	const list = Array.from({ length: 150 }, (_, i) => mk({ title: `AI ${i}`, start: addDays('2026-12-01', 150 - i), end: addDays('2026-12-01', 150 - i), url: `https://example.com/${i}`, key: `u:${i}` }));
	const { send, deferred } = applyCap(list, 120);
	assert.equal(send.length, 120);
	assert.equal(deferred.length, 30);
	assert.ok(send.at(-1).start < deferred[0].start);
	const parts = chunk(send.map(compactCandidate));
	assert.deepEqual(parts.map((p) => p.length), [60, 60]);
	assert.equal(chunk(Array.from({ length: 61 }, (_, i) => i)).length, 2);
});
test('compact candidate: no URL field, desc capped at 500, total under the per-candidate cap', () => {
	const c = mk({ title: 'T'.repeat(150), desc: 'x'.repeat(600), organiser: 'O'.repeat(100), venue: 'V'.repeat(150), key: 'u:1' });
	const r = compactCandidate(c);
	assert.ok(!('url' in r));
	assert.ok(JSON.stringify(r).length <= MAX_INPUT_CHARS);
	assert.match(r.id, /^c_[0-9a-f]{10}$/);
	assert.equal(candidateId(c), r.id);
});

// ---- conditional GET ----
test('conditional GET: 304 reuses the cached body; no body file means no conditional headers', async () => {
	const dir = mkdtempSync(join(tmpdir(), 'cache-'));
	const calls = [];
	const fetchImpl = async (url, init) => {
		calls.push(init.headers);
		if (init.headers['If-None-Match']) return new Response(null, { status: 304 });
		return new Response('BODY', { status: 200, headers: { etag: '"v1"' } });
	};
	const ctx = { cacheDir: dir, etags: {}, fetchImpl };
	process.env.PIPELINE_MIN_GAP_MS = '0';
	const r1 = await getText('https://example.com/feed', ctx);
	assert.equal(r1.text, 'BODY');
	assert.equal(ctx.etags['https://example.com/feed'].etag, '"v1"');
	const r2 = await getText('https://example.com/feed', ctx);
	assert.equal(r2.fromCache, true);
	assert.equal(r2.text, 'BODY');
	const fresh = { cacheDir: mkdtempSync(join(tmpdir(), 'cache-')), etags: ctx.etags, fetchImpl };
	const r3 = await getText('https://example.com/feed', fresh);
	assert.equal(r3.fromCache, false);
	assert.equal(calls.at(-1)['If-None-Match'], undefined);
});

// ---- end to end with a fake network ----
test('prepare (offline): one failing source never fails the run; failure recorded', async () => {
	const ics = readFileSync(new URL('../fixtures/hessian.ics', import.meta.url), 'utf8');
	const fetchImpl = async (url) => {
		if (String(url).includes('hessian.ai')) return new Response(ics, { status: 200, headers: { 'content-type': 'text/calendar' } });
		return new Response('nope', { status: 404 });
	};
	const res = await prepare({ dry: true, scrape: false, only: ['hessian-ai', 'mcml'], today: '2026-11-20', fetchImpl });
	assert.equal(res.report.feedTotal, 2);
	assert.equal(res.report.feedOk, 1);
	assert.ok(res.report.problems.some((p) => p.startsWith('mcml: FAILED')));
	assert.ok(res.report.sources.find((s) => s.id === 'hessian-ai').fetched > 0);
	assert.match(res.md, /Per city \(after dedupe\)/);
});
