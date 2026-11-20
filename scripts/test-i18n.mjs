#!/usr/bin/env node
/* Checks the two language versions in dist/ (run `npm run build` first):
   - dist/index.html (German) and dist/en/index.html (English) exist
   - <html lang> matches the folder; og:locale matches
   - hreflang alternates (de, en, x-default) point to built files and are
     reciprocal; the canonical is the page's own address
   - the DE | EN switch on every page: aria-current on the active language,
     the other link leads to a built file
   - no German UI phrases on English pages and no English UI phrases on German
     pages (event titles, blurbs and other stored data are left out)
   - robots meta follows INDEXABLE: no site-wide noindex, nofollow when true
     (only page-level noindex on thanks/confirmed/404 and thin hubs)
   - every internal href/src carries the base path and leads to a built file
   - newsletter forms carry the lang-de / lang-en tag; calendar links use the
     feed of the page's language
   Usage: npm run test:i18n */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE, SITE_URL, INDEXABLE } from '../config/country.mjs';
import { alternates } from '../src/i18n/paths.mjs';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
let failures = 0;
const fail = (msg) => {
	failures++;
	console.error('  ✗ ' + msg);
};

function walk(dir) {
	return readdirSync(dir).flatMap((name) => {
		const p = join(dir, name);
		return statSync(p).isDirectory() ? walk(p) : [p];
	});
}

if (!existsSync(join(dist, 'index.html'))) fail('dist/index.html (German home) is missing');
if (!existsSync(join(dist, 'en', 'index.html'))) fail('dist/en/index.html (English home) is missing');
if (failures) process.exit(1);

/** URL path (with base) -> file in dist, or null. */
function fileFor(urlPath) {
	let p = decodeURI(urlPath.split(/[?#]/)[0]);
	if (BASE) {
		if (p !== BASE && !p.startsWith(`${BASE}/`)) return null;
		p = p.slice(BASE.length) || '/';
	}
	const candidates = p.endsWith('/') ? [`${p}index.html`] : [p, `${p}/index.html`];
	for (const c of candidates) {
		const f = join(dist, c);
		if (existsSync(f) && statSync(f).isFile()) return f;
	}
	return null;
}

/** File in dist -> its URL path (with base). */
function urlFor(file) {
	const rel = '/' + relative(dist, file).split('\\').join('/');
	return BASE + (rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel);
}

const pages = walk(dist)
	.filter((f) => f.endsWith('.html'))
	.map((file) => ({ file, html: readFileSync(file, 'utf8') }))
	// Redirect stubs (/privacy/ and the old English type slugs) are not pages.
	.filter((p) => !/http-equiv="refresh"/i.test(p.html));
const localeOf = (file) => (relative(dist, file).split('\\').join('/').startsWith('en/') ? 'en' : 'de');
const counts = { de: 0, en: 0 };
const byUrl = new Map(pages.map((p) => [urlFor(p.file), p]));

// UI phrases that must not appear in the other language. Capitalised or specific enough
// not to match harmless substrings; stored data is removed before the scan.
const GERMAN = [
	'Kalender abonnieren', 'Newsletter abonnieren', 'Zurück zu allen Events', 'Alle Events', 'Diese Woche',
	'Dieser Monat', 'Zurücksetzen', 'Veranstalter', 'Uhrzeit', 'Anmeldeseite', 'Suchen', 'Weiter zu', 'Anstehende',
	'Seite nicht gefunden', 'Nachricht senden', 'Event einreichen', 'Postfach', 'Konferenz', 'Kostenlos',
	'Nicht angegeben', 'Städte', 'Schließen', 'Daten & Feeds', 'Geprüft über', 'Beim Veranstalter anmelden',
	'Zuletzt geprüft', 'angezeigt', 'Nach Stadt', 'Kontaktformular', 'Zur Prüfung senden', 'Danke', 'Wir senden',
	'Übrige Orte', 'München', 'Köln', 'Ihr wöchentlicher', 'Jeden Montag', 'KI- und Daten',
];
const ENGLISH = [
	'Save to my calendar', 'Get weekly digest', 'Back to all events', 'All events', 'This week', 'This month',
	'Clear', 'Search', 'Organiser', 'Venue', 'Upcoming', 'Page not found', 'Send message', 'Submit an event',
	'Check your inbox', 'Register with the organiser', 'Verified via', 'Data & feeds', 'Last scanned', 'Browse events',
	'Other cities', 'Send for review', 'Not listed', 'Thanks', "We'll send", 'Every Monday', 'Subscribe',
	'AI & Data', 'Weekly digest', 'Copy link', 'Close', 'Cities',
];

/** The page with stored data (event titles, blurbs, organisers…), scripts and styles removed. */
function uiText(html, isEventPage) {
	let h = html
		.replace(/<script(?![^>]*id="(?:cal-strings|listing-strings|invalid-strings)")[^>]*>[\s\S]*?<\/script>/g, '')
		.replace(/<style[\s\S]*?<\/style>/g, '')
		.replace(/<section class="alt-lang[\s\S]*?<\/section>/g, '') // English block on the German 404
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/<ul class="events"[^>]*>[\s\S]*?<\/ul>/, '')
		.replace(/<p class="blurb"[^>]*>[\s\S]*?<\/p>/g, '');
	if (isEventPage) {
		h = h
			.replace(/<title>[\s\S]*?<\/title>/, '')
			.replace(/<meta [^>]*>/g, '')
			.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '')
			.replace(/<dd[\s\S]*?<\/dd>/g, '')
			.replace(/<dateline[\s\S]*?<\/p>/g, '')
			.replace(/<p class="dateline[\s\S]*?<\/p>/g, '')
			.replace(/<ul class="onward"[^>]*>[\s\S]*?<\/ul>/, '')
			.replace(/<a class="btn accent register-btn"[\s\S]*?<\/a>/g, '')
			.replace(/<p class="register-note"[^>]*>[\s\S]*?<\/p>/g, '')
			.replace(/<p class="subscribe-title"[^>]*>[\s\S]*?<\/p>/g, '');
	}
	// Event-page data attributes and the feed-name JSON hold stored names.
	return h.replace(/ data-[a-z-]+="[^"]*"/g, '');
}

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

for (const { file, html } of pages) {
	const rel = relative(dist, file).split('\\').join('/');
	const locale = localeOf(file);
	counts[locale]++;
	const url = urlFor(file);
	const is404 = rel.endsWith('404.html') || rel.endsWith('404/index.html');
	const isEventPage = /(^|\/)events\//.test(rel);

	// Launch-ready: no owner placeholders or draft banners on any public page.
	if (/\[\[TODO|TODO/.test(html)) fail(`${rel}: contains TODO`);
	if (/class="todo"/.test(html)) fail(`${rel}: contains a draft banner`);

	// html lang, og:locale
	const lang = html.match(/<html lang="([^"]+)"/)?.[1];
	if (lang !== locale) fail(`${rel}: <html lang="${lang}"> but the page is ${locale}`);
	const og = html.match(/<meta property="og:locale" content="([^"]+)"/)?.[1];
	if (og !== (locale === 'de' ? 'de_DE' : 'en_DE')) fail(`${rel}: og:locale is ${og}`);

	// noindex
	if (!INDEXABLE && !/<meta name="robots" content="noindex, nofollow"/.test(html)) fail(`${rel}: no noindex meta`);
	if (INDEXABLE && /<meta name="robots" content="noindex, nofollow"/.test(html)) fail(`${rel}: site-wide noindex, nofollow while INDEXABLE is true`);

	// canonical
	const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
	if (canonical !== `${new URL(SITE_URL).origin}${url}`) fail(`${rel}: canonical ${canonical} is not the page's own address`);

	// hreflang
	const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]);
	if (alts.length) {
		const map = Object.fromEntries(alts);
		for (const l of ['de', 'en', 'x-default']) if (!map[l]) fail(`${rel}: hreflang ${l} missing`);
		if (map['x-default'] !== map.de) fail(`${rel}: x-default does not point to the German page`);
		if (map[locale] !== canonical) fail(`${rel}: hreflang ${locale} is not the canonical`);
		if (!/<meta property="og:locale:alternate"/.test(html)) fail(`${rel}: og:locale:alternate missing`);
		for (const l of ['de', 'en']) {
			const target = map[l] && new URL(map[l]).pathname;
			const other = target && byUrl.get(target);
			if (!other) {
				fail(`${rel}: hreflang ${l} -> ${map[l]} is not a built page`);
				continue;
			}
			const back = Object.fromEntries(
				[...other.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]),
			);
			if (back[locale] !== canonical) fail(`${rel}: hreflang pair with ${target} is not reciprocal`);
		}
	} else if (!is404) {
		fail(`${rel}: no hreflang alternates, but the page has a counterpart`);
	}

	// Impressum and privacy are one click away, in the page's own language
	const legal = locale === 'de' ? ['/impressum/', '/datenschutz/'] : ['/en/legal-notice/', '/en/privacy/'];
	for (const l of legal) if (!html.includes(`href="${BASE}${l}"`)) fail(`${rel}: no footer link to ${l}`);

	// language switch
	const nav = html.match(/<nav class="[^"]*lang-switch[^"]*"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
	if (!nav) fail(`${rel}: no language switch`);
	else {
		const links = [...nav.matchAll(/<a\s[^>]*>/g)].map((m) => m[0]);
		if (links.length !== 2) fail(`${rel}: language switch has ${links.length} links`);
		for (const a of links) {
			const hreflang = attr(a, 'hreflang');
			const href = attr(a, 'href');
			const current = / aria-current="/.test(a);
			if (current !== (hreflang === locale)) fail(`${rel}: aria-current on the wrong language link`);
			if (!href || !fileFor(href)) fail(`${rel}: switch link ${href} does not lead to a built file`);
			if (hreflang !== locale && href) {
				const targetUrl = new URL(href, 'https://x.invalid').pathname;
				const expectEn = hreflang === 'en';
				if (expectEn !== targetUrl.startsWith(`${BASE}/en/`)) fail(`${rel}: switch link ${href} is in the wrong language`);
			}
		}
	}

	// internal links
	const switchHrefs = new Set([...html.matchAll(/<a\s[^>]*data-lang-switch[^>]*>/g)].map((m) => attr(m[0], 'href')));
	const hrefs = [
		...[...html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]),
		...[...html.matchAll(/url\('(\/[^']*)'\)/g)].map((m) => m[1]),
	].filter((h) => !h.startsWith('//'));
	for (const h of hrefs) {
		if (BASE && h !== BASE && !h.startsWith(`${BASE}/`) && !h.startsWith(`${BASE}?`) && !h.startsWith(`${BASE}#`)) {
			fail(`${rel}: internal link without the base path: ${h}`);
		} else if (!fileFor(h)) fail(`${rel}: link ${h} leads to no built file`);
		// A link stays in the page's language, except to shared files.
		const path = BASE && h.startsWith(BASE) ? h.slice(BASE.length) : h;
		const neutral = /^\/(fonts|_astro|favicon|apple-touch|og-image|events\.json|llms|rss\.xml|[a-z-]+\.md)/.test(path);
		const toEnglish = path === '/en' || path.startsWith('/en/') || path.startsWith('/en?') || path.startsWith('/en#');
		// The German 404 deliberately links to the English home (GitHub Pages serves it for /en/ too).
		const notFoundToEn = is404 && locale === 'de' && path === '/en/';
		if (!neutral && !notFoundToEn && !switchHrefs.has(h) && toEnglish !== (locale === 'en')) fail(rel + ': link ' + h + " leaves the page's language");
	}

	// phrases
	const text = uiText(html, isEventPage);
	const wrong = locale === 'en' ? GERMAN : ENGLISH;
	for (const phrase of wrong) {
		if (text.includes(phrase)) fail(`${rel}: ${locale === 'en' ? 'German' : 'English'} UI phrase "${phrase}" on a ${locale} page`);
	}

	// newsletter tag and calendar feed language
	// Exactly one language tag per form: a radio pair, only the page language checked.
	for (const form of html.split('<form').filter((f) => /class="subscribe-form"/.test(f.slice(0, 400)))) {
		const radios = [...form.matchAll(/<input[^>]*type="radio"[^>]*>/g)].map((m) => m[0]).filter((i) => /name="tag"/.test(i));
		const values = radios.map((i) => attr(i, 'value')).sort().join();
		const checked = radios.filter((i) => /\schecked/.test(i)).map((i) => attr(i, 'value'));
		if (values !== 'lang-de,lang-en' || checked.join() !== `lang-${locale}`) {
			fail(`${rel}: newsletter form must offer lang-de and lang-en radios with only lang-${locale} checked`);
		}
		if (/type="hidden"[^>]*name="tag"/.test(form)) fail(`${rel}: newsletter form has a hidden tag input`);
	}
	const feeds = html.match(/<script type="application\/json" id="cal-feeds">(.*?)<\/script>/s)?.[1];
	if (feeds) {
		for (const f of Object.values(JSON.parse(feeds))) {
			const english = f.url.includes('/en/calendar/');
			if (english !== (locale === 'en')) fail(`${rel}: calendar link ${f.url} is not the ${locale} feed`);
		}
	}
}

// Every page that has a counterpart exists in both languages (same rules as the hreflang and the switch).
for (const url of byUrl.keys()) {
	const alt = alternates(url);
	if (!alt) continue;
	for (const l of ['de', 'en']) if (!byUrl.has(BASE + alt[l])) fail(url + ': counterpart ' + BASE + alt[l] + ' was not built');
}

// robots.txt, sitemap and the page-level robots meta follow INDEXABLE.
const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
const robotsMeta = (rel) => readFileSync(join(dist, rel), 'utf8').match(/<meta name="robots" content="([^"]+)"/)?.[1];
let sitemapUrls = 0;
if (INDEXABLE) {
	if (!/^User-agent: \*\nAllow: \/$/m.test(robots) || /^Disallow: \/$/m.test(robots)) fail('robots.txt does not allow crawling');
	if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap-index.xml`)) fail('robots.txt has no Sitemap line');
	if (!existsSync(join(dist, 'sitemap-index.xml'))) fail('sitemap-index.xml was not built');
	else {
		const children = [...readFileSync(join(dist, 'sitemap-index.xml'), 'utf8').matchAll(/<loc>[^<]*\/(sitemap-\d+\.xml)<\/loc>/g)].map((m) => m[1]);
		if (!children.length) fail('sitemap-index.xml lists no child sitemap');
		for (const c of children) {
			if (!existsSync(join(dist, c))) fail(`${c} was not built`);
			else sitemapUrls += (readFileSync(join(dist, c), 'utf8').match(/<loc>/g) || []).length;
		}
		if (!sitemapUrls) fail('sitemap lists no pages');
		for (const c of children) {
			const xml = readFileSync(join(dist, c), 'utf8');
			if (xml.includes('/thanks/') || xml.includes('/subscribe/confirmed/')) fail(`${c} lists a thanks/confirmed page`);
		}
	}
	for (const rel of ['index.html', 'en/index.html']) if (robotsMeta(rel)) fail(`${rel}: has robots meta "${robotsMeta(rel)}" but the site is indexable`);
	const ev = [...byUrl.keys()].find((u) => /\/events\/[^/]+\/$/.test(u) && !u.includes('/en/'));
	if (ev && robotsMeta(ev.slice(BASE.length + 1) + 'index.html')) fail(`${ev}: event page carries a robots meta`);
	for (const rel of ['subscribe/thanks/index.html', 'submit/thanks/index.html']) {
		if (existsSync(join(dist, rel)) && !/noindex/.test(robotsMeta(rel) || '')) fail(`${rel}: thanks page lost its noindex`);
	}
} else if (!/^Disallow: \/$/m.test(robots)) fail('robots.txt should disallow everything while INDEXABLE is false');

console.log(`${counts.de} German pages, ${counts.en} English pages checked` + (INDEXABLE ? `, ${sitemapUrls} sitemap URLs` : ''));
if (failures) {
	console.error(`\n${failures} problem${failures === 1 ? '' : 's'}`);
	process.exit(1);
}
console.log('i18n checks passed');
