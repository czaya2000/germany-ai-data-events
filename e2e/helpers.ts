import { expect, type Page } from '@playwright/test';

/* The e2e build freezes "today" at Wed 2026-11-18 (SITE_TODAY in e2e/serve.mjs). Tests move the browser's
   clock with Playwright's page.clock; the browser's time zone is America/Los_Angeles (playwright.config.ts),
   so a test also proves the site uses Europe/Berlin, not the visitor's zone. */
export const NOW = {
	wed: '2026-11-18T12:00:00+01:00',
	/** Sunday 22 Nov, 23:30 in Berlin (still Sunday). */
	sunLate: '2026-11-22T23:30:00+01:00',
	/** Monday 23 Nov, 00:30 in Berlin; still Sunday afternoon in Los Angeles. */
	monEarly: '2026-11-23T00:30:00+01:00',
	/** Monday 30 Nov, 23:30 in Berlin (last day of the month). */
	novEnd: '2026-11-30T23:30:00+01:00',
	/** Tuesday 1 Dec, 00:30 in Berlin; still 30 Nov in Los Angeles. */
	decStart: '2026-12-01T00:30:00+01:00',
};

export const LOCALES = ['de', 'en'] as const;
export type Loc = (typeof LOCALES)[number];

/** Path of a page in a language ("/berlin/" -> "/en/berlin/"). */
export const at = (loc: Loc, path: string) => (loc === 'en' ? `/en${path}` : path);

export const TXT = {
	de: { week: 'Diese Woche', month: 'Dieser Monat', all: 'Alle', count: (n: number) => (n === 1 ? '1 Event' : `${n} Events`) },
	en: { week: 'This week', month: 'This month', all: 'All', count: (n: number) => (n === 1 ? '1 event' : `${n} events`) },
};

/** Freezes the browser clock (it keeps ticking from there) and opens the page. */
export async function open(page: Page, url: string, now: string = NOW.wed) {
	await page.clock.install({ time: new Date(now) });
	await page.goto(url);
	await expect(page.locator('#result-count')).not.toBeEmpty();
}

export const titles = (page: Page) =>
	page.$$eval('.row:not([hidden]) .title', (els) => els.map((e) => (e.textContent || '').replace(/\(new\)|\(neu\)/, '').trim()));

export const shownCount = (page: Page) => page.locator('#result-count').innerText();

/** Visible rows, the count text and the visible week headings must agree. */
export async function expectConsistent(page: Page, loc: Loc) {
	const list = await titles(page);
	await expect(page.locator('#result-count')).toHaveText(TXT[loc].count(list.length));
	const emptyVisible = await page.locator('#empty-state').isVisible();
	expect(emptyVisible, 'empty-state visible only when the list is empty').toBe(list.length === 0);
	// A heading is visible only when it has at least one visible row.
	const orphan = await page.$$eval('.band:not([hidden])', (bands) =>
		bands.filter((b) => !document.querySelector(`.row:not([hidden])[data-band="${(b as HTMLElement).dataset.band}"]`)).length,
	);
	expect(orphan, 'week headings without visible rows').toBe(0);
	// Each visible row sits under the heading of its own week.
	const misplaced = await page.$$eval('.row:not([hidden])', (rows) =>
		rows.filter((r) => {
			let p = r.previousElementSibling;
			while (p && !p.classList.contains('band')) p = p.previousElementSibling;
			return !p || (p as HTMLElement).dataset.band !== (r as HTMLElement).dataset.band || (p as HTMLElement).hidden;
		}).map((r) => r.querySelector('.title')?.textContent),
	);
	expect(misplaced, 'rows under the wrong or a hidden week heading').toEqual([]);
	return list;
}

export const tab = (page: Page, loc: Loc, which: 'all' | 'week' | 'month') =>
	page.locator(`.when-tab[data-when="${which}"]`).filter({ hasText: TXT[loc][which] });
