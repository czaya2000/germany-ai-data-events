// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { HUBS, isHubLive } from './src/lib/hubs.mjs';
import { SITE_ORIGIN, BASE, INDEXABLE } from './config/country.mjs';

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));

// Ended events keep their page, marked "Past event" and still indexable, but
// leave the sitemap: it lists what is coming up.
const today = new Date().toISOString().slice(0, 10);
// A live event wins over an archived one with the same id (a recurring event
// that reuses its id), exactly as getAllEvents() does for the page itself.
const liveEvents = readJson('./src/data/events.json');
const liveIds = new Set(liveEvents.map((e) => e.id));
// Sitemap URLs carry the base path, so compare against base-prefixed paths.
const endedPaths = new Set(
	[...liveEvents, ...readJson('./src/data/archive.json').filter((e) => !liveIds.has(e.id))]
		.filter((e) => (e.endDate ?? e.date) < today)
		.map((e) => `${BASE}/events/${e.id}/`),
);
const lastScan = readJson('./src/data/meta.json').lastScan;

// City and type pages (/berlin/, /conferences/): those with too few upcoming
// events are noindex, so they stay out of the sitemap as well.
const upcoming = liveEvents.filter((e) => (e.endDate ?? e.date) >= today);
const hubPaths = new Set(HUBS.map((h) => `${BASE}${h.path}`));
const thinHubPaths = new Set(HUBS.filter((h) => !isHubLive(h, upcoming)).map((h) => `${BASE}${h.path}`));

// https://astro.build/config
export default defineConfig({
	site: SITE_ORIGIN,
	// '/germany-ai-data-events' on GitHub Pages; '' once a custom domain is set (config/country.mjs).
	base: BASE || '/',
	integrations: INDEXABLE
		? [
				sitemap({
					// Post-submit confirmation pages are dead ends for search;
					filter: (page) =>
						!page.includes('/thanks/') &&
						!page.includes('/subscribe/confirmed/') &&
						!page.includes('/calendar/') &&
						!endedPaths.has(new URL(page).pathname) &&
						!thinHubPaths.has(new URL(page).pathname),
					// The homepage and the city/type pages change on every refresh; tell crawlers when.
					serialize: (item) => {
						const path = new URL(item.url).pathname;
						return path === `${BASE}/` || hubPaths.has(path) ? { ...item, lastmod: lastScan } : item;
					},
				}),
			]
		: [],
});
