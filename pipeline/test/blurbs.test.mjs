import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifyResults, verifyExtracted, resolveBlurbs } from '../lib/verify.mjs';
import { blurbFor } from '../../src/lib/blurb.mjs';
import { selectInputs, toBatches, validateOutput, mergeBlurbs, outputComplete, writeBatch, parseArgs, TASK_TEXT } from '../backfill-blurbs.mjs';

const ID = 'c_0000000001';
const ctx = { today: '2026-11-20', windowDays: 120 };
const candidates = () => new Map([[ID, { id: ID, title: 'T', start: '2026-12-01', end: '2026-12-01', url: 'https://example.com/e/1', city: 'Berlin', trust: 'noisy' }]]);
const EN = 'Evening meetup in Berlin about data platforms and MLOps.';
const DE = 'Abendliches Treffen in Berlin zu Datenplattformen und MLOps.';
const item = (over = {}) => ({ id: ID, relevant: true, confidence: 0.9, format: 'Meetup', city: 'Berlin', topics: ['MLOps'], cost: 'Free', ...over });
const run = (it) => verifyResults([it], candidates(), ctx);

test('verify: blurb_en and blurb_de both present are accepted; blurb mirrors blurb_en', () => {
	const r = run(item({ blurb_en: EN, blurb_de: DE }));
	assert.equal(r.accepted.length, 1);
	assert.deepEqual([r.accepted[0].blurb, r.accepted[0].blurb_en, r.accepted[0].blurb_de], [EN, EN, DE]);
});

test('verify: a legacy blurb is read as blurb_en and blurb_de is missing', () => {
	const r = run(item({ blurb: EN }));
	assert.equal(r.accepted.length, 1);
	assert.equal(r.accepted[0].blurb_en, EN);
	assert.equal(r.accepted[0].blurb_de, null);
});

test('verify: no blurb at all is incomplete', () => {
	assert.equal(run(item()).counts.n['invalid:incomplete'], 1);
});

test('verify: German blurb over 240 characters is rejected', () => {
	const r = run(item({ blurb_en: EN, blurb_de: 'a '.repeat(121) }));
	assert.equal(r.accepted.length, 0);
	assert.equal(r.counts.n['invalid:blurb-too-long'], 1);
});

test('verify: German blurb with a URL is rejected', () => {
	const r = run(item({ blurb_en: EN, blurb_de: 'Mehr Informationen unter https://example.com/anmeldung gibt es dort.' }));
	assert.equal(r.accepted.length, 0);
	assert.equal(r.counts.n['invalid:url-in-text'], 1);
});

test('verify: identical German and English text is rejected', () => {
	const r = run(item({ blurb_en: EN, blurb_de: '  ' + EN.toUpperCase() }));
	assert.equal(r.accepted.length, 0);
	assert.equal(r.counts.n['invalid:blurb-identical'], 1);
	assert.equal(resolveBlurbs({ blurb_en: EN, blurb_de: EN }).problem, 'blurb-identical');
});

test('verify: scrape extraction accepts both blurbs and a legacy blurb', () => {
	const page = { text: 'Data Platform Day Leipzig 10 December', links: [{ text: 'x', url: 'https://demo.example/e' }], url: 'https://demo.example/', curated: false, cityHint: 'Leipzig' };
	const ev = { title: 'Data Platform Day Leipzig', date: '2026-12-10', city: 'Leipzig', organiser: 'Demo', url: 'https://demo.example/e', format: 'Conference', topics: ['Data'] };
	const both = verifyExtracted([{ ...ev, blurb_en: EN, blurb_de: DE }], page, ctx);
	assert.equal(both.accepted.length, 1);
	assert.equal(both.accepted[0].blurb_de, DE);
	const legacy = verifyExtracted([{ ...ev, blurb: EN }], page, ctx);
	assert.equal(legacy.accepted[0].blurb_en, EN);
	assert.equal(legacy.accepted[0].blurb_de, null);
	assert.equal(verifyExtracted([{ ...ev, blurb_en: EN, blurb_de: 'x'.repeat(300) }], page, ctx).accepted.length, 0);
	assert.equal(verifyExtracted([ev], page, ctx).accepted.length, 0);
});

test('blurbFor: locale and fallback rules', () => {
	assert.deepEqual(blurbFor({ blurb: 'L', blurb_en: 'E', blurb_de: 'D' }, 'de'), { text: 'D', lang: 'de' });
	assert.deepEqual(blurbFor({ blurb: 'L', blurb_en: 'E' }, 'de'), { text: 'E', lang: 'en' });
	assert.deepEqual(blurbFor({ blurb: 'L' }, 'de'), { text: 'L', lang: 'en' });
	assert.deepEqual(blurbFor({ blurb: 'L', blurb_en: 'E', blurb_de: 'D' }, 'en'), { text: 'E', lang: 'en' });
	assert.deepEqual(blurbFor({ blurb: 'L' }, 'en'), { text: 'L', lang: 'en' });
});

// ---------- backfill ----------
const ev = (n, over = {}) => ({ id: `e${n}`, title: `Event ${n}`, organiser: 'Org', city: 'Berlin', format: 'Meetup', blurb: `English blurb number ${n} about data.`, ...over });

test('backfill: selects only events lacking blurb_de, honours --limit, batches of at most 60', () => {
	const events = [ev(1), ev(2, { blurb_de: DE }), ...Array.from({ length: 130 }, (_, i) => ev(i + 3))];
	const inputs = selectInputs(events);
	assert.equal(inputs.length, 131);
	assert.deepEqual(Object.keys(inputs[0]), ['id', 'title', 'organiser', 'city', 'format', 'blurb_en']);
	assert.deepEqual(toBatches(inputs).map((b) => b.length), [60, 60, 11]);
	assert.equal(selectInputs(events, 5).length, 5);
	assert.equal(parseArgs(['--dry-run', '--limit', '3']).limit, 3);
	assert.throws(() => parseArgs(['--bogus']));
	assert.match(TASK_TEXT, /untrusted/);
});

test('backfill: canned output is validated per item and merged (blurb_en filled from blurb)', () => {
	const events = [ev(1), ev(2), ev(3), ev(4), ev(5), ev(6)];
	const inputs = selectInputs(events);
	const out = JSON.stringify({
		results: [
			{ id: 'e1', blurb_de: 'Deutscher Text über Daten, Nummer eins, ohne Link.' },
			{ id: 'e2', blurb_de: 'x'.repeat(241) },
			{ id: 'e3', blurb_de: 'Siehe www.example.com für alle Details dazu.' },
			{ id: 'e4', blurb_de: events[3].blurb },
			{ id: 'zz', blurb_de: 'Unbekannte ID, aber sonst ein gültiger Text.' },
			{ id: 'e1', blurb_de: 'Doppelte ID, zweiter Versuch mit anderem Text.' },
			{ id: 'e5', blurb_de: 'kurz' },
		],
	});
	const v = validateOutput(out, inputs);
	assert.deepEqual([...v.good.keys()], ['e1']);
	assert.deepEqual(v.bad, { 'too-long': 1, url: 1, identical: 1, 'unknown-id': 1, 'duplicate-id': 1, 'too-short': 1 });
	assert.equal(mergeBlurbs(events, v.good), 1);
	assert.equal(events[0].blurb_en, events[0].blurb);
	assert.equal(events[0].blurb, 'English blurb number 1 about data.');
	assert.ok(events[0].blurb_de.startsWith('Deutscher'));
	assert.equal(events[1].blurb_de, undefined);
	assert.equal(validateOutput('not json', inputs).error, 'malformed-json');
	assert.equal(validateOutput('[1', inputs).error, 'malformed-json');
	assert.equal(validateOutput('{"x":1}', inputs).error, 'malformed-structure');
});

test('backfill: resumable, a batch is done only when output.json is valid and complete', () => {
	const inputs = selectInputs([ev(1), ev(2)]);
	const dir = mkdtempSync(join(tmpdir(), 'bf-'));
	writeBatch(dir, inputs);
	assert.equal(outputComplete(dir, inputs), false);
	writeFileSync(join(dir, 'output.json'), '[broken');
	assert.equal(outputComplete(dir, inputs), false);
	const one = { id: 'e1', blurb_de: 'Erster deutscher Text zu Daten und KI.' };
	const two = { id: 'e2', blurb_de: 'Zweiter deutscher Text zu Daten und KI.' };
	writeFileSync(join(dir, 'output.json'), JSON.stringify({ results: [one] }));
	assert.equal(outputComplete(dir, inputs), false, 'partial answer is re-run');
	writeFileSync(join(dir, 'output.json'), JSON.stringify({ results: [one, two] }));
	assert.equal(outputComplete(dir, inputs), true);
});
