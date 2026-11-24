// The digest is built Sunday evening for the Monday send: a Sunday date maps to the NEXT Monday.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { digestWeekStart, digestSubject, selectEvents, LOCALES } from '../../scripts/lib/digest.mjs';

test('digestWeekStart: Sunday -> next Monday, Monday stays, Tue-Sat snap back', () => {
	assert.equal(digestWeekStart('2026-11-22'), '2026-11-23'); // Sunday
	assert.equal(digestWeekStart('2026-11-23'), '2026-11-23'); // Monday
	assert.equal(digestWeekStart('2026-11-24'), '2026-11-23'); // Tuesday
	assert.equal(digestWeekStart('2026-11-20'), '2026-11-16'); // Friday
	assert.equal(digestWeekStart('2026-11-21'), '2026-11-16'); // Saturday
});

test('digestWeekStart: month and year boundaries', () => {
	assert.equal(digestWeekStart('2026-11-29'), '2026-11-30');
	assert.equal(digestWeekStart('2026-12-27'), '2026-12-28');
	assert.equal(digestWeekStart('2027-01-03'), '2027-01-04');
	assert.equal(digestWeekStart('2027-01-01'), '2026-12-28'); // Friday
});

test('Sunday and the following Monday give the same subject, incl. ISO week boundaries', () => {
	const cases = [
		['2026-11-22', '2026-11-23', 48],
		['2026-12-27', '2026-12-28', 53], // Sunday is week 52, coming Monday is week 53
		['2027-01-03', '2027-01-04', 1], // Sunday is week 53, coming Monday is week 1 of 2027
	];
	for (const [sun, mon, week] of cases) {
		for (const locale of LOCALES) {
			const a = digestSubject(locale, digestWeekStart(sun));
			const b = digestSubject(locale, digestWeekStart(mon));
			assert.equal(a, b);
			assert.match(a, new RegExp(`(?<!\\d)${week}(?!\\d)`));
		}
	}
});

test('Sunday and the following Monday select the same window; Sunday events are excluded', () => {
	const events = [
		{ id: 'sun', title: 'Sun', date: '2026-11-22', city: 'Paris', format: 'meetup' },
		{ id: 'mon', title: 'Mon', date: '2026-11-23', city: 'Paris', format: 'meetup' },
		{ id: 'end', title: 'End', date: '2026-12-07', city: 'Paris', format: 'meetup' },
		{ id: 'late', title: 'Late', date: '2026-12-08', city: 'Paris', format: 'meetup' },
	];
	const run = (d) => {
		const today = digestWeekStart(d);
		return selectEvents(events, { today, now: `${today}T00:00:00` });
	};
	const sun = run('2026-11-22');
	const mon = run('2026-11-23');
	assert.equal(sun.from, '2026-11-23');
	assert.equal(sun.horizon, '2026-12-07');
	assert.deepEqual(sun.soon.map((e) => e.id), mon.soon.map((e) => e.id));
	assert.deepEqual(sun.soon.map((e) => e.id), ['mon', 'end']);
});
