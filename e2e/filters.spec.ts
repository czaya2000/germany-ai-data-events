import { test, expect, type Page } from '@playwright/test';
import { LOCALES, NOW, at, open, titles, expectConsistent, tab, TXT, type Loc } from './helpers';

/* City, format, search and time-range filters on the home page and on hub pages: they combine, reset,
   keep the visible list, the count and the week headings in step, and survive the language switch. */

/** Opens the dropdown if it is closed and ticks one box, like a visitor would. */
async function tick(page: Page, name: 'city' | 'format', value: string) {
	if (await page.locator(`#${name}-panel`).isHidden()) await page.locator(`#${name}-toggle`).click();
	await page.locator(`#${name}-panel input[value="${value}"]`).check();
	await page.keyboard.press('Escape'); // close it so it does not cover the controls below
	await expect(page.locator(`#${name}-panel`)).toBeHidden();
}

async function search(page: Page, text: string) {
	await page.locator('#search-toggle').click();
	await page.locator('#filter-search').fill(text);
}

for (const loc of LOCALES) {
	test.describe(`filters (${loc})`, () => {
		test('no filter: every upcoming event is listed and counted', async ({ page }) => {
			await open(page, at(loc, '/'), NOW.wed);
			expect((await expectConsistent(page, loc)).length).toBe(16);
		});

		test('city and format combine; Clear resets', async ({ page }) => {
			await open(page, at(loc, '/'), NOW.wed);
			await tick(page, 'city', 'Berlin');
			expect((await expectConsistent(page, loc)).length).toBe(9);
			await tick(page, 'format', 'Meetup');
			expect((await expectConsistent(page, loc)).sort()).toEqual(
				['Berlin Next Monday', 'Berlin Sunday Meetup', 'Berlin Wednesday Talk'],
			);
			await tick(page, 'city', 'Munich'); // two cities, one format
			expect((await expectConsistent(page, loc)).sort()).toEqual(
				['Berlin Next Monday', 'Berlin Sunday Meetup', 'Berlin Wednesday Talk', 'Munich Thursday Meetup'],
			);
			await page.locator('#city-toggle').click();
			await page.locator('#city-clear').click();
			await page.keyboard.press('Escape');
			await page.locator('#format-toggle').click();
			await page.locator('#format-clear').click();
			expect((await expectConsistent(page, loc)).length).toBe(16);
			await expect(page).not.toHaveURL(/city=|format=/);
		});

		test('city + format + week + search all combine, and the URL records them', async ({ page }) => {
			await open(page, at(loc, '/'), NOW.wed);
			await tick(page, 'city', 'Berlin');
			await tick(page, 'format', 'Meetup');
			await tab(page, loc, 'week').click();
			expect((await expectConsistent(page, loc)).sort()).toEqual(['Berlin Sunday Meetup', 'Berlin Wednesday Talk']);
			await search(page, 'SUNDAY');
			expect(await expectConsistent(page, loc)).toEqual(['Berlin Sunday Meetup']);
			await expect(page).toHaveURL(/q=SUNDAY/);
			await expect(page).toHaveURL(/city=Berlin/);
			await expect(page).toHaveURL(/format=Meetup/);
			await expect(page).toHaveURL(/when=week/);
		});

		test('no match shows the empty text, count 0 and no week headings', async ({ page }) => {
			await open(page, at(loc, '/berlin/'), NOW.wed);
			await search(page, 'zzzz-nothing');
			expect(await expectConsistent(page, loc)).toEqual([]);
			await expect(page.locator('#empty-state')).toHaveText(loc === 'de' ? /Keine Events passen/ : /No events match/);
			await page.locator('#filter-search').fill('');
			expect((await expectConsistent(page, loc)).length).toBe(9);
		});

		test('state from the URL is applied on load', async ({ page }) => {
			await open(page, at(loc, '/?city=Berlin&city=Munich&format=Meetup&when=week&q=talk'), NOW.wed);
			expect(await expectConsistent(page, loc)).toEqual(['Berlin Wednesday Talk']);
			await expect(page.locator('#filter-search')).toHaveValue('talk');
			await expect(page.locator('#city-toggle')).toContainText('+1');
		});

		test('an unknown city or format value in the URL is ignored, not "no results"', async ({ page }) => {
			await open(page, at(loc, '/?city=Atlantis&format=Opera'), NOW.wed);
			expect((await expectConsistent(page, loc)).length).toBe(16);
		});

		test('the hash survives a filter change', async ({ page }) => {
			await open(page, at(loc, '/?when=week#subscribe'), NOW.wed);
			await tab(page, loc, 'month').click();
			await expect(page).toHaveURL(/when=month#subscribe$/);
		});

		test('hub pages have no filter for what they already answer', async ({ page }) => {
			await open(page, at(loc, '/berlin/'), NOW.wed);
			await expect(page.locator('#city-filter')).toHaveCount(0);
			await expect(page.locator('#format-filter')).toHaveCount(1);
			await open(page, at(loc, loc === 'de' ? '/konferenzen/' : '/conferences/'), NOW.wed);
			await expect(page.locator('#format-filter')).toHaveCount(0);
			await expect(page.locator('#city-filter')).toHaveCount(1);
			expect((await expectConsistent(page, loc)).length).toBe(4); // Started Earlier, Thursday, Dec Summit, Weekend Spanning
		});

		test('Escape closes the filter panel and returns focus to its button', async ({ page }) => {
			await open(page, at(loc, '/'), NOW.wed);
			await page.locator('#city-toggle').click();
			await expect(page.locator('#city-panel')).toBeVisible();
			await expect(page.locator('#city-toggle')).toHaveAttribute('aria-expanded', 'true');
			await page.keyboard.press('Escape');
			await expect(page.locator('#city-panel')).toBeHidden();
			await expect(page.locator('#city-toggle')).toBeFocused();
		});

		test('the time-range buttons expose their state to assistive tech', async ({ page }) => {
			await open(page, at(loc, '/?when=month'), NOW.wed);
			for (const w of ['all', 'week', 'month'] as const) {
				await expect(tab(page, loc, w)).toHaveAttribute('aria-pressed', w === 'month' ? 'true' : 'false');
			}
			// A role="tablist" would require role="tab" children plus panels; plain toggle buttons are the honest markup.
			await expect(page.locator('[role="tab"]')).toHaveCount(0);
		});
	});
}

test.describe('language switch', () => {
	test('keeps filters and hash; DE <-> EN land on the same page', async ({ page }) => {
		await open(page, '/?city=Berlin&when=week#subscribe', NOW.wed);
		await page.getByRole('link', { name: 'EN', exact: true }).click();
		await expect(page).toHaveURL(/\/en\/\?city=Berlin&when=week#subscribe$/);
		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		expect((await expectConsistent(page, 'en')).length).toBe(6);
		await expect(tab(page, 'en', 'week')).toHaveAttribute('aria-pressed', 'true');
		await expect(page.locator('#city-toggle')).toHaveText(/Berlin/);
		await page.getByRole('link', { name: 'DE', exact: true }).click();
		await expect(page).toHaveURL(/\/\?city=Berlin&when=week#subscribe$/);
		await expect(page.locator('html')).toHaveAttribute('lang', 'de');
		await expect(page.locator('#result-count')).toHaveText('6 Events');
	});

	test('format hubs map to their translated slug and keep the query', async ({ page }) => {
		await open(page, '/konferenzen/?when=week', NOW.wed);
		await page.getByRole('link', { name: 'EN', exact: true }).click();
		await expect(page).toHaveURL(/\/en\/conferences\/\?when=week$/);
		await page.getByRole('link', { name: 'DE', exact: true }).click();
		await expect(page).toHaveURL(/\/konferenzen\/\?when=week$/);
	});

	test('city names are translated in the filter, values stay English (Munich <-> München)', async ({ page }) => {
		await open(page, '/?city=Munich', NOW.wed);
		await expect(page.locator('#city-toggle')).toHaveText(/München/);
		await page.getByRole('link', { name: 'EN', exact: true }).click();
		await expect(page.locator('#city-toggle')).toHaveText(/Munich/);
	});

	test('German page has no English UI copy and the English page no German', async ({ page }) => {
		await open(page, '/', NOW.wed);
		const de = await page.locator('body').innerText();
		for (const w of ['This week', 'This month', 'events shown', 'Save to my calendar', 'All events']) expect(de).not.toContain(w);
		expect(de).toContain('Kostenlos');
		await open(page, '/en/', NOW.wed);
		const en = await page.locator('body').innerText();
		for (const w of ['Diese Woche', 'Dieser Monat', 'angezeigt', 'Kalender abonnieren', 'Kostenlos']) expect(en).not.toContain(w);
		expect(en).toContain('Free');
		expect(TXT.en.week).toBe('This week');
	});
});

export type { Loc };
