// Locale-aware paths. Plain .mjs (no Astro imports) so the node tests and
// scripts can use it.
//
// German is the default locale and lives at the root, English under /en/
// (Astro i18n: defaultLocale 'de', prefixDefaultLocale false, see astro.config.mjs).
// A "site path" is the path inside the site, without the base: "/events/x/".
// A "href" is a site path with the base and the locale prefix: "/germany-ai-data-events/en/events/x/".
//
// Rules for the counterpart of a page in the other language:
//   - home, city hubs, event pages, submit, contact, data, thanks pages: same path, other prefix;
//   - format hubs: the translated slug (/konferenzen/ <-> /en/conferences/);
//   - Impressum and Datenschutz exist in German only: no counterpart, the
//     switch link on those pages (and the legacy /privacy/) goes to the other language's home.

import { BASE } from '../../config/country.mjs';
import { HUBS } from '../lib/hubs.mjs';

export const LOCALES = ['de', 'en'];
export const DEFAULT_LOCALE = 'de';
/** URL prefix per locale (the default locale has none). */
export const LOCALE_PREFIX = { de: '', en: '/en' };
/** Hreflang / <html lang> values, and og:locale values. */
export const HTML_LANG = { de: 'de', en: 'en' };
export const OG_LOCALE = { de: 'de_DE', en: 'en_DE' };

/** Pages that exist in German only, at the root. "privacy" is the old name of "datenschutz". */
export const GERMAN_ONLY = ['datenschutz', 'impressum', 'privacy'];

export const isLocale = (v) => LOCALES.includes(v);

/** Site path of a city or format hub page in the given locale ("/konferenzen/"). */
export function hubPath(hub, locale) {
	return `/${locale === 'de' ? hub.slugDe : hub.slug}/`;
}

/** Splits "/x/?a=1#b" into the path and the "?a=1#b" suffix. */
function splitSuffix(href) {
	const i = href.search(/[?#]/);
	return i === -1 ? [href, ''] : [href.slice(0, i), href.slice(i)];
}

/**
 * Path helpers for one base path ('' or '/germany-ai-data-events'). The
 * exports below are bound to the configured base; tests build their own.
 */
export function createLocalePaths(base = BASE, hubs = HUBS) {
	const formatHubs = hubs.filter((h) => h.kind === 'format');

	/** Removes the base from a path that has it (a path without it is returned unchanged). */
	function stripBase(path) {
		if (base && (path === base || path.startsWith(`${base}/`) || path.startsWith(`${base}?`) || path.startsWith(`${base}#`))) {
			return path.slice(base.length) || '/';
		}
		return path;
	}

	/** { locale, path }: the language a path is in, and the path without its /en/ prefix. */
	function splitLocale(sitePath) {
		const [p, suffix] = splitSuffix(sitePath);
		if (p === '/en' || p.startsWith('/en/')) return { locale: 'en', path: (p.slice(3) || '/') + suffix };
		return { locale: 'de', path: p + suffix };
	}

	/** Href (with base) for a site path that is already in `locale`'s own slugs. */
	function localePath(path, locale = DEFAULT_LOCALE) {
		const sitePath = stripBase(path.startsWith('/') ? path : `/${path}`);
		const { path: bare } = splitLocale(sitePath);
		return `${base}${LOCALE_PREFIX[locale]}${bare}`;
	}

	/** The same site path in the other locale's slugs ("/konferenzen/" -> "/conferences/"), or null when
	    the page has no counterpart. Input and output have no locale prefix. */
	function translateBarePath(bare, from, to) {
		const [p, suffix] = splitSuffix(bare);
		const seg = p.split('/')[1] ?? '';
		if (GERMAN_ONLY.includes(seg)) return null;
		// The 404 page is a file at the root (404.html) and a folder under /en/.
		if (from === 'de' && to === 'en' && p === '/404.html') return '/404/';
		if (from === 'en' && to === 'de' && p === '/404/') return '/404.html';
		const hub = formatHubs.find((h) => (from === 'de' ? h.slugDe : h.slug) === seg);
		if (hub && p === `/${seg}/`) return `${hubPath(hub, to)}${suffix}`;
		return bare;
	}

	/** Site paths (with prefix, no base) of a page in every language, or null if it has no counterpart. */
	function alternates(sitePath) {
		const { locale, path } = splitLocale(stripBase(sitePath));
		const other = locale === 'de' ? 'en' : 'de';
		const translated = translateBarePath(path, locale, other);
		if (translated === null) return null;
		return {
			[locale]: `${LOCALE_PREFIX[locale]}${path}`,
			[other]: `${LOCALE_PREFIX[other]}${translated}`,
		};
	}

	/**
	 * Href of the same page in `target`, base included. `currentPath` is a path
	 * with or without the base, with an optional ?query and #hash (kept).
	 * Pages that exist in one language only (Impressum, Datenschutz) point to
	 * the target language's home page instead.
	 */
	function switchLocalePath(currentPath, targetLocale) {
		const { locale, path } = splitLocale(stripBase(currentPath));
		// The old /privacy/ is now /datenschutz/, whatever the target.
		if (targetLocale === 'de' && /^\/privacy\//.test(path)) return `${base}/datenschutz/`;
		if (locale === targetLocale) return `${base}${LOCALE_PREFIX[locale]}${path}`;
		const translated = translateBarePath(path, locale, targetLocale);
		if (translated === null) {
			// "privacy" was renamed: a German target gets the new page, an English one the home page.
			const [p] = splitSuffix(path);
			const seg = p.split('/')[1];
			if (targetLocale === 'de') return `${base}/${seg === 'privacy' ? 'datenschutz' : seg}/`;
			return `${base}${LOCALE_PREFIX[targetLocale]}/`;
		}
		return `${base}${LOCALE_PREFIX[targetLocale]}${translated}`;
	}

	return { base, stripBase, splitLocale, localePath, switchLocalePath, alternates, hubPath };
}

const bound = createLocalePaths();
export const { stripBase, splitLocale, localePath, switchLocalePath, alternates } = bound;
