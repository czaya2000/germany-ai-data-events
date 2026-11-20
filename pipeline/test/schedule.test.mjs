import { test } from 'node:test';
import assert from 'node:assert/strict';
import { endWall, endTimeOf, hasEnded, isRunningToday, cardMeta, wallClockIn, siteNow } from '../../src/lib/schedule.mjs';
import { selectEvents } from '../../scripts/lib/digest.mjs';
import { de } from '../../src/i18n/de.ts';
import { en } from '../../src/i18n/en.ts';

// "Now" is always a frozen Berlin wall-clock string here.
const FRI_EVENING = '2026-11-20T19:47:00';

test('endTimeOf: range gives the end, a lone start or nothing gives null', () => {
	assert.equal(endTimeOf('10:00–12:00'), '12:00');
	assert.equal(endTimeOf('9:00-17:30'), '17:30');
	assert.equal(endTimeOf('10:00'), null);
	assert.equal(endTimeOf(undefined), null);
});

test('endWall: end time on the last day, else 23:59:59 of the last day', () => {
	assert.equal(endWall({ date: '2026-11-20', time: '10:00–12:00' }), '2026-11-20T12:00:00');
	assert.equal(endWall({ date: '2026-11-20', time: '10:00' }), '2026-11-20T23:59:59');
	assert.equal(endWall({ date: '2026-11-16', endDate: '2026-11-20' }), '2026-11-20T23:59:59');
});

test('hasEnded at datetime granularity (the three same-day events from the live site)', () => {
	assert.equal(hasEnded({ date: '2026-11-20', time: '10:00–12:00' }, FRI_EVENING), true); // Hamburg
	assert.equal(hasEnded({ date: '2026-11-20', time: '14:00–17:00' }, FRI_EVENING), true); // Mainz
	assert.equal(hasEnded({ date: '2026-11-20', time: '17:00–19:00' }, FRI_EVENING), true); // Bochum
	assert.equal(hasEnded({ date: '2026-11-20', time: '19:00–21:00' }, FRI_EVENING), false); // still running
	assert.equal(hasEnded({ date: '2026-11-20' }, '2026-11-20T23:59:00'), false); // all-day: whole day
	assert.equal(hasEnded({ date: '2026-11-20' }, '2026-11-21T00:00:00'), true);
	assert.equal(hasEnded({ date: '2026-11-16', endDate: '2026-11-20' }, FRI_EVENING), false); // multi-day, last day
	assert.equal(hasEnded({ date: '2026-11-16', endDate: '2026-11-19' }, FRI_EVENING), true);
});

test('isRunningToday: began on or before today and not over (Today group rule)', () => {
	const conf = { date: '2026-11-16', endDate: '2026-11-20' };
	assert.equal(isRunningToday(conf, FRI_EVENING), true); // started earlier, ends today
	assert.equal(isRunningToday({ date: '2026-11-20', time: '19:00–21:00' }, FRI_EVENING), true);
	assert.equal(isRunningToday({ date: '2026-11-21' }, FRI_EVENING), false); // later: its own week
	assert.equal(isRunningToday({ date: '2026-11-20', time: '10:00–12:00' }, FRI_EVENING), false); // over
	assert.equal(isRunningToday(conf, '2026-11-21T00:05:00'), false);
});

test('wallClockIn / siteNow follow Europe/Berlin and the freeze variables', () => {
	assert.equal(wallClockIn(new Date('2026-11-20T18:47:00Z')), '2026-11-20T19:47:00'); // CET
	assert.equal(wallClockIn(new Date('2026-07-01T22:30:00Z')), '2026-07-02T00:30:00'); // CEST, next day
	const keepNow = process.env.SITE_NOW;
	const keepToday = process.env.SITE_TODAY;
	try {
		process.env.SITE_NOW = '2026-11-20T13:00:00+01:00';
		assert.equal(siteNow(), '2026-11-20T13:00:00');
		delete process.env.SITE_NOW;
		process.env.SITE_TODAY = '2026-11-18';
		assert.equal(siteNow(), '2026-11-18T00:00:00');
	} finally {
		if (keepNow === undefined) delete process.env.SITE_NOW;
		else process.env.SITE_NOW = keepNow;
		if (keepToday === undefined) delete process.env.SITE_TODAY;
		else process.env.SITE_TODAY = keepToday;
	}
});

test('cardMeta: city and time only, no venue', () => {
	assert.equal(cardMeta('Köln', '14:30–22:30'), 'Köln, 14:30–22:30');
	assert.equal(cardMeta('München', '09:00–20:00'), 'München, 09:00–20:00');
	assert.equal(cardMeta('Berlin', undefined), 'Berlin');
	assert.equal(cardMeta('Berlin', ''), 'Berlin');
});

test('"until" note and Today heading are defined per language', () => {
	assert.equal(de.listing.runsUntil(20, 'Nov'), 'läuft bis 20. Nov');
	assert.equal(en.listing.runsUntil(20, 'Nov'), 'until 20 Nov');
	assert.equal(de.listing.today, 'Heute');
	assert.equal(en.listing.today, 'Today');
});

test('digest selectEvents drops events that already ended today', () => {
	const ev = (title, o) => ({
		title, city: 'Berlin', format: 'Meetup', topics: [], organiser: 'x', cost: 'Free',
		url: 'https://e.org', source: 's', blurb: 'b', firstSeen: '2026-11-01', ...o,
	});
	const all = [
		ev('over', { date: '2026-11-20', time: '10:00–12:00' }),
		ev('later today', { date: '2026-11-20', time: '19:00–21:00' }),
		ev('all-day', { date: '2026-11-20' }),
		ev('conference', { date: '2026-11-16', endDate: '2026-11-20' }),
		ev('tomorrow', { date: '2026-11-21' }),
	];
	const titles = (now) => selectEvents(all, { today: '2026-11-20', now }).soon.map((e) => e.title).sort();
	assert.deepEqual(titles(FRI_EVENING), ['all-day', 'conference', 'later today', 'tomorrow']);
	assert.deepEqual(titles('2026-11-20T00:00:00'), ['all-day', 'conference', 'later today', 'over', 'tomorrow']);
});
