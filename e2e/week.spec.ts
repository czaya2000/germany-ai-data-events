import { test, expect } from '@playwright/test';
import { LOCALES, NOW, at, open, titles, expectConsistent, tab, TXT } from './helpers';

/* "This week" / "Diese Woche" and "This month" / "Dieser Monat": calendar week Monday to Sunday and
   calendar month in Europe/Berlin, today included, events that already started included, ended events never shown.
   Fixture: e2e/fixtures/events.json. The build's "today" is Wed 2026-11-18; the browser clock is moved per test. */

const sorted = (a: string[]) => [...a].sort();

const BERLIN_WEEK_WED = [
	'Berlin Running Series', // started 2 Nov, runs to 18 Dec
	'Berlin Started Earlier', // 16-18 Nov
	'Berlin Wednesday Talk',
	'Berlin Saturday Workshop',
	'Berlin Sunday Meetup',
	'Berlin Weekend Spanning', // Sun 22 - Tue 24
];

for (const loc of LOCALES) {
	test.describe(`week and month filter (${loc})`, () => {
		test('Berlin hub, This week = Monday-Sunday of the current week, not the next 7 days', async ({ page }) => {
			await open(page, at(loc, '/berlin/'), NOW.wed);
			await tab(page, loc, 'week').click();
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(sorted(BERLIN_WEEK_WED));
			expect(list).not.toContain('Berlin Next Monday'); // 23 Nov belongs to next week
			expect(list).not.toContain('Berlin Next Thursday');
			await expect(tab(page, loc, 'week')).toHaveAttribute('aria-pressed', 'true');
		});

		test('Berlin hub, ?when=week from a link gives the same list', async ({ page }) => {
			await open(page, at(loc, '/berlin/?when=week'), NOW.wed);
			expect(sorted(await expectConsistent(page, loc))).toEqual(sorted(BERLIN_WEEK_WED));
		});

		test('home, This week lists every city of the current week', async ({ page }) => {
			await open(page, at(loc, '/?when=week'), NOW.wed);
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(
				sorted([...BERLIN_WEEK_WED, 'Munich Thursday Meetup', 'Hamburg Friday Webinar', 'Online Tuesday Webinar']),
			);
		});

		test('Sunday 23:30 Berlin: Sunday events are still this week, Monday is not', async ({ page }) => {
			await open(page, at(loc, '/berlin/?when=week'), NOW.sunLate);
			const list = await expectConsistent(page, loc);
			// Everything up to Sat 21 Nov is over; Sun 22 and the event spanning into Monday are on.
			expect(sorted(list)).toEqual(sorted(['Berlin Running Series', 'Berlin Sunday Meetup', 'Berlin Weekend Spanning']));
		});

		test('Monday 00:30 Berlin (still Sunday in Los Angeles): the new week has started', async ({ page }) => {
			await open(page, at(loc, '/berlin/?when=week'), NOW.monEarly);
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(
				sorted(['Berlin Running Series', 'Berlin Weekend Spanning', 'Berlin Next Monday', 'Berlin Next Thursday']),
			);
		});

		test('events that ended before today are never listed, even on a page built earlier', async ({ page }) => {
			await open(page, at(loc, '/berlin/'), NOW.monEarly);
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(
				sorted(['Berlin Running Series', 'Berlin Weekend Spanning', 'Berlin Next Monday', 'Berlin Next Thursday', 'Berlin December Summit']),
			);
		});

		test('an event ending today is still listed today', async ({ page }) => {
			await open(page, at(loc, '/berlin/'), '2026-11-18T23:50:00+01:00');
			expect(await titles(page)).toContain('Berlin Started Earlier');
			await page.clock.setSystemTime(new Date('2026-11-19T00:10:00+01:00'));
			await page.reload();
			await expect(page.locator('#result-count')).not.toBeEmpty();
			expect(await titles(page)).not.toContain('Berlin Started Earlier');
		});

		test('This month runs to the last day of the month in Berlin', async ({ page }) => {
			await open(page, at(loc, '/?when=month'), NOW.novEnd);
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(sorted(['Berlin Running Series', 'Frankfurt Month End']));
		});

		test('This month on 1 Dec 00:30 Berlin (30 Nov in Los Angeles) is December', async ({ page }) => {
			await open(page, at(loc, '/?when=month'), NOW.decStart);
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(
				sorted(['Berlin Running Series', 'Berlin December Summit', 'Online December Webinar', 'Leipzig December Meetup']),
			);
		});

		test('the current week heading is marked from the visitor clock, not the build date', async ({ page }) => {
			await open(page, at(loc, '/berlin/'), NOW.monEarly);
			// The page was built on Wed 18 Nov; on Mon 23 Nov the running series belongs under 23-29 Nov.
			await expectConsistent(page, loc);
			await expect(page.locator('.band.current:not([hidden])')).toHaveCount(1);
			await expect(page.locator('.band.current:not([hidden])')).toContainText(loc === 'de' ? '23. – 29. November' : '23 – 29 November');
			await expect(page.locator('.band:not([hidden])').first()).toHaveClass(/current/);
			// ...and nothing is left under the week that is over.
			await expect(page.locator('.band[data-band="2026-11-16"]:not([hidden])')).toHaveCount(0);
		});

		test('All resets the time range', async ({ page }) => {
			await open(page, at(loc, '/berlin/?when=week'), NOW.wed);
			await tab(page, loc, 'all').click();
			expect((await expectConsistent(page, loc)).length).toBe(9);
			await expect(page).not.toHaveURL(/when=/);
			expect(TXT[loc].all).toBeTruthy();
		});
	});
}
