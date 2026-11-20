// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { HUBS, isHubLive } from './src/lib/hubs.mjs';
import { SITE_ORIGIN, BASE, INDEXABLE } from './config/country.mjs';
import { LOCALES, DEFAULT_LOCALE, LOCALE_PREFIX, hubPath, alternates } from './src/i18n/paths.mjs';

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));

// Ended events keep their page, marked "Past event" and still indexable, but
// leave the sitemap: it lists what is coming up.
const today = new Date().toISOString().slice(0, 10);
// A live event wins over an archived one with the same id (a recurring event
// that reuses its id), exactly as getAllEvents() does for the page itself.
const liveEvents = readJson('./src/data/events.json');
const liveIds = new Set(liveEvents.map((e) => e.id));
// Sitemap URLs carry the base path (and /en/ for English), so compare against full paths.
const endedPaths = new Set(
	[...liveEvents, ...readJson('./src/data/archive.json').filter((e) => !liveIds.has(e.id))]
		.filter((e) => (e.endDate ?? e.date) < today)
		.flatMap((e) => LOCALES.map((l) => `${BASE}${LOCALE_PREFIX[l]}/events/${e.id}/`)),
);
const lastScan = readJson('./src/data/meta.json').lastScan;

// City and type pages (/berlin/, /conferences/): those with too few upcoming
// events are noindex, so they stay out of the sitemap as well.
const upcoming = liveEvents.filter((e) => (e.endDate ?? e.date) >= today);
const hubFullPaths = (hubs) => hubs.flatMap((h) => LOCALES.map((l) => `${BASE}${LOCALE_PREFIX[l]}${hubPath(h, l)}`));
const hubPaths = new Set(hubFullPaths(HUBS));
const thinHubPaths = new Set(hubFullPaths(HUBS.filter((h) => !isHubLive(h, upcoming))));
const homePaths = new Set(LOCALES.map((l) => `${BASE}${LOCALE_PREFIX[l]}/`));

// Language: German at the root, English under /en/ (pages live in src/pages and src/pages/en;
// helpers and path rules in src/i18n/paths.mjs).
const HREFLANG = { de: 'de', en: 'en' };

// https://astro.build/config
export default defineConfig({
	site: SITE_ORIGIN,
	// '/germany-ai-data-events' on GitHub Pages; '' once a custom domain is set (config/country.mjs).
	base: BASE || '/',
	i18n: {
		locales: LOCALES,
		defaultLocale: DEFAULT_LOCALE,
		routing: { prefixDefaultLocale: false },
	},
	// Old addresses that would otherwise break: /privacy/ became /datenschutz/, and the two
	// English type slugs that now live under /en/ have German names at the root.
	redirects: {
		'/privacy': `${BASE}/datenschutz/`,
		'/conferences': `${BASE}/konferenzen/`,
		'/webinars': `${BASE}/webinare/`,
	},
	integrations: INDEXABLE
		? [
				sitemap({
					// Both languages, each page with its hreflang alternates (see serialize).
					i18n: { defaultLocale: DEFAULT_LOCALE, locales: HREFLANG },
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
						const out = homePaths.has(path) || hubPaths.has(path) ? { ...item, lastmod: lastScan } : { ...item };
						// Alternates come from our own path rules, because the translated type pages
						// have different slugs (/konferenzen/ and /en/conferences/).
						const alt = alternates(path);
						out.links = alt
							? [
									{ url: `${SITE_ORIGIN}${BASE}${alt.de}`, lang: HREFLANG.de },
									{ url: `${SITE_ORIGIN}${BASE}${alt.en}`, lang: HREFLANG.en },
									{ url: `${SITE_ORIGIN}${BASE}${alt.de}`, lang: 'x-default' },
								]
							: undefined;
						return out;
					},
				}),
			]
		: [],
});
