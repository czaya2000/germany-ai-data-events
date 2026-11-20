// Tests for the i18n layer: locale paths (with and without a base path), the
// language switch, key parity between de.ts and en.ts, and the localisation
// of costs and dates. Offline; loads the .ts files through Node's type stripping.
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createLocalePaths, hubPath, legalPath } from '../../src/i18n/paths.mjs';
import { HUBS } from '../../src/lib/hubs.mjs';
import { de } from '../../src/i18n/de.ts';
import { en } from '../../src/i18n/en.ts';
import { t, displayCity, formatLabel, hubText, fmt, toLocale } from '../../src/i18n/index.ts';
import { localizeCost, formatDateRange, formatDateCompact, dateSpine, weekRangeLabel, formatNumber } from '../../src/i18n/format.ts';

const BASE = '/germany-ai-data-events';
const p = createLocalePaths(BASE);
const root = createLocalePaths('');

test('localePath: German at the root, English under /en/, base respected', () => {
	assert.equal(p.localePath('/', 'de'), `${BASE}/`);
	assert.equal(p.localePath('/', 'en'), `${BASE}/en/`);
	assert.equal(p.localePath('/events/x/', 'de'), `${BASE}/events/x/`);
	assert.equal(p.localePath('/events/x/', 'en'), `${BASE}/en/events/x/`);
	assert.equal(p.localePath('/contact/?topic=sponsor', 'en'), `${BASE}/en/contact/?topic=sponsor`);
	assert.equal(p.localePath('/#subscribe', 'de'), `${BASE}/#subscribe`);
	assert.equal(root.localePath('/', 'en'), '/en/');
	assert.equal(root.localePath('/berlin/', 'de'), '/berlin/');
	// A path that already has a prefix or the base is not prefixed twice.
	assert.equal(p.localePath(`${BASE}/en/berlin/`, 'en'), `${BASE}/en/berlin/`);
});

test('switchLocalePath: home', () => {
	assert.equal(p.switchLocalePath(`${BASE}/`, 'en'), `${BASE}/en/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/`, 'de'), `${BASE}/`);
	assert.equal(p.switchLocalePath(`${BASE}/`, 'de'), `${BASE}/`);
	assert.equal(p.switchLocalePath('/', 'en'), `${BASE}/en/`, 'a path without the base works too');
	assert.equal(root.switchLocalePath('/', 'en'), '/en/');
	assert.equal(root.switchLocalePath('/en/', 'de'), '/');
});

test('switchLocalePath: hub pages map to the translated slug, city slugs stay', () => {
	assert.equal(p.switchLocalePath(`${BASE}/konferenzen/`, 'en'), `${BASE}/en/conferences/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/conferences/`, 'de'), `${BASE}/konferenzen/`);
	assert.equal(p.switchLocalePath(`${BASE}/webinare/`, 'en'), `${BASE}/en/webinars/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/webinars/`, 'de'), `${BASE}/webinare/`);
	for (const same of ['workshops', 'meetups', 'networking', 'berlin', 'munich', 'other-germany', 'online']) {
		assert.equal(p.switchLocalePath(`${BASE}/${same}/`, 'en'), `${BASE}/en/${same}/`);
		assert.equal(p.switchLocalePath(`${BASE}/en/${same}/`, 'de'), `${BASE}/${same}/`);
	}
	assert.equal(root.switchLocalePath('/konferenzen/', 'en'), '/en/conferences/');
});

test('switchLocalePath: event pages keep the id, query and hash survive', () => {
	assert.equal(p.switchLocalePath(`${BASE}/events/some-id/`, 'en'), `${BASE}/en/events/some-id/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/events/some-id/`, 'de'), `${BASE}/events/some-id/`);
	assert.equal(
		p.switchLocalePath(`${BASE}/?city=Munich&format=Meetup#subscribe`, 'en'),
		`${BASE}/en/?city=Munich&format=Meetup#subscribe`,
	);
	assert.equal(p.switchLocalePath(`${BASE}/en/conferences/?q=ai`, 'de'), `${BASE}/konferenzen/?q=ai`);
});

test('legal pages: Impressum and Datenschutz have English twins', () => {
	assert.equal(p.switchLocalePath(`${BASE}/impressum/`, 'en'), `${BASE}/en/legal-notice/`);
	assert.equal(p.switchLocalePath(`${BASE}/datenschutz/`, 'en'), `${BASE}/en/privacy/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/legal-notice/`, 'de'), `${BASE}/impressum/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/privacy/`, 'de'), `${BASE}/datenschutz/`);
	assert.deepEqual(p.alternates('/datenschutz/'), { de: '/datenschutz/', en: '/en/privacy/' });
	assert.deepEqual(p.alternates('/en/legal-notice/'), { en: '/en/legal-notice/', de: '/impressum/' });
	assert.deepEqual(['de', 'en'].map((l) => legalPath('datenschutz', l)), ['/datenschutz/', '/privacy/']);
	assert.deepEqual(['de', 'en'].map((l) => legalPath('impressum', l)), ['/impressum/', '/legal-notice/']);
	assert.deepEqual(p.alternates(`${BASE}/konferenzen/`), { de: '/konferenzen/', en: '/en/conferences/' });
});

test('legal pages: the source keeps [[TODO]] placeholders for owner facts and invents none', () => {
	for (const f of ['ImpressumPage', 'DatenschutzPage']) {
		const src = readFileSync(new URL(`../../src/views/${f}.astro`, import.meta.url), 'utf8');
		assert.ok((src.match(/\[\[TODO/g) ?? []).length >= 10, `${f} lost its placeholders`);
		assert.doesNotMatch(src, /\+49|\bDE\d{9}\b|stra(ß|ss)e \d/i, `${f} contains what looks like a real fact`);
	}
	const priv = readFileSync(new URL('../../src/views/DatenschutzPage.astro', import.meta.url), 'utf8');
	for (const word of ['Umami', 'Vercel', 'Supabase', 'Buttondown', 'FormSubmit', 'Data Privacy Framework', 'Art. 77', 'GitHub Pages']) {
		assert.ok(priv.includes(word), `privacy text no longer mentions ${word}`);
	}
});

test('switchLocalePath: 404 page', () => {
	assert.equal(p.switchLocalePath(`${BASE}/404.html`, 'en'), `${BASE}/en/404/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/404/`, 'de'), `${BASE}/404.html`);
});

test('hubPath: every hub has a distinct German and English slug set', () => {
	const de = HUBS.map((h) => hubPath(h, 'de'));
	const en = HUBS.map((h) => hubPath(h, 'en'));
	assert.equal(new Set(de).size, HUBS.length);
	assert.equal(new Set(en).size, HUBS.length);
	assert.ok(de.includes('/konferenzen/') && en.includes('/conferences/'));
	assert.ok(de.includes('/berlin/') && en.includes('/berlin/'));
});

/* ---- key parity -------------------------------------------------------- */

function shape(value, path = '') {
	const out = [];
	if (Array.isArray(value)) {
		out.push(`${path}: array`);
		value.forEach((v, i) => out.push(...shape(v, `${path}[${i}]`)));
	} else if (typeof value === 'function') {
		out.push(`${path}: function(${value.length})`);
	} else if (value && typeof value === 'object') {
		for (const k of Object.keys(value).sort()) out.push(...shape(value[k], path ? `${path}.${k}` : k));
	} else {
		out.push(`${path}: ${typeof value}`);
	}
	return out;
}

test('de.ts and en.ts have exactly the same keys, with the same kind of value', () => {
	// placeNames is an open map (stored name -> display name); each language lists only its own differences.
	const { placeNames: _a, ...deRest } = de;
	const { placeNames: _b, ...enRest } = en;
	assert.deepEqual(shape(deRest), shape(enRest));
});

test('no translated string is empty, except the deliberate ones', () => {
	const empty = (o, path = '') =>
		Object.entries(o).flatMap(([k, v]) =>
			typeof v === 'string'
				? v === '' ? [`${path}${k}`] : []
				: v && typeof v === 'object' && !Array.isArray(v) ? empty(v, `${path}${k}.`) : [],
		);
	// 'online' has no nearby places.
	const allowed = new Set(['hub.nearby.online']);
	for (const table of [de, en]) assert.deepEqual(empty(table).filter((k) => !allowed.has(k)), []);
});

test('German text is actually German where the key is plain UI copy', () => {
	for (const key of ['calendarOpen', 'contact']) assert.notEqual(de.nav[key], en.nav[key]);
	assert.equal(de.calendar.title, 'Kalender abonnieren');
	assert.equal(de.subscribe.open, 'Newsletter abonnieren');
	assert.equal(t('de'), de);
	assert.equal(t('en'), en);
	assert.equal(toLocale('en'), 'en');
	assert.equal(toLocale(undefined), 'de');
});

/* ---- display values ---------------------------------------------------- */

test('city and format display names', () => {
	assert.equal(displayCity('Online (DE)', 'de'), 'Online');
	assert.equal(displayCity('Online (DE)', 'en'), 'Online');
	assert.equal(displayCity('Other Germany', 'de'), 'Übrige Orte');
	assert.equal(displayCity('Other Germany', 'en'), 'Other Germany');
	assert.equal(displayCity('Munich', 'de'), 'München');
	assert.equal(displayCity('Garching (Munich)', 'de'), 'Garching (München)');
	assert.equal(displayCity('Leipzig', 'de'), 'Leipzig');
	assert.equal(formatLabel('Conference', 'de'), 'Konferenz');
	assert.equal(formatLabel('Conference', 'en'), 'Conference');
	for (const f of ['Meetup', 'Workshop', 'Networking', 'Webinar']) assert.equal(formatLabel(f, 'de'), f);
});

test('hub wording per language', () => {
	const berlin = HUBS.find((h) => h.slug === 'berlin');
	const conf = HUBS.find((h) => h.slug === 'conferences');
	assert.equal(hubText(berlin, 'en').h1, 'AI & Data Events in Berlin');
	assert.equal(hubText(berlin, 'de').h1, 'KI- und Daten-Events in Berlin');
	assert.equal(hubText(conf, 'de').h1, 'KI- und Daten-Konferenzen in Deutschland');
	assert.equal(hubText(conf, 'en').h1, 'AI & Data Conferences in Germany');
	assert.equal(t('de').hub.subFormat(1, hubText(conf, 'de').one, hubText(conf, 'de').where),
		'1 anstehende Konferenz in ganz Deutschland, täglich geprüft.');
	assert.equal(fmt('{n} Events', { n: 3 }), '3 Events');
});

/* ---- cost -------------------------------------------------------------- */

const nb = (s) => s.replace(/ /g, ' ');

test('localizeCost: German', () => {
	assert.equal(localizeCost('Free', 'de'), 'Kostenlos');
	assert.equal(localizeCost('Not listed', 'de'), 'Nicht angegeben');
	assert.equal(nb(localizeCost('EUR 49', 'de')), '49 €');
	assert.equal(nb(localizeCost('From EUR 199', 'de')), 'ab 199 €');
	assert.equal(nb(localizeCost('EUR 1,200', 'de')), '1.200 €');
	assert.equal(nb(localizeCost('150 EUR', 'de')), '150 €');
	assert.equal(nb(localizeCost('EUR 690 excl. VAT', 'de')), '690 € zzgl. MwSt.');
	assert.equal(nb(localizeCost('EUR 49.90', 'de')), '49,90 €');
	assert.equal(nb(localizeCost('Free for members / EUR 25 guests', 'de')), 'Kostenlos für Mitglieder / 25 € Gäste');
});

test('localizeCost: English is returned as stored', () => {
	for (const c of ['Free', 'Not listed', 'EUR 49', 'From EUR 199', 'Free for members / EUR 25 guests']) {
		assert.equal(localizeCost(c, 'en'), c);
	}
});

/* ---- dates ------------------------------------------------------------- */

test('date ranges and compact dates per locale', () => {
	assert.equal(formatDateRange('2026-11-12', undefined, 'en'), '12 Nov 2026');
	assert.equal(formatDateRange('2026-11-12', undefined, 'de'), '12. Nov. 2026');
	assert.equal(formatDateRange('2026-11-12', '2026-11-13', 'de'), '12. Nov. 2026 – 13. Nov. 2026');
	assert.equal(formatDateCompact('2026-11-12', '2026-11-13', 'en'), '12–13 Nov 2026');
	assert.equal(formatDateCompact('2026-11-12', '2026-11-13', 'de'), '12.–13. Nov. 2026');
	assert.equal(formatDateCompact('2026-11-30', '2026-12-02', 'en'), '30 Nov – 2 Dec 2026');
	assert.equal(formatDateCompact('2026-11-30', '2026-12-02', 'de'), '30. Nov. – 2. Dez. 2026');
	assert.equal(formatDateCompact('2026-12-30', '2027-01-02', 'en'), '30 Dec 2026 – 2 Jan 2027');
});

test('date spine: weekday and month in the locale, no trailing dots', () => {
	assert.deepEqual(dateSpine('2026-11-19', 'en'), { weekday: 'Thu', day: 19, month: 'Nov' });
	assert.deepEqual(dateSpine('2026-11-19', 'de'), { weekday: 'Do', day: 19, month: 'Nov' });
	assert.match(dateSpine('2026-03-04', 'de').month, /^Mär/);
	assert.equal(dateSpine('2026-10-05', 'de').weekday, 'Mo');
});

test('week labels and numbers', () => {
	assert.equal(weekRangeLabel('2026-09-07', 'en'), '7 – 13 September');
	assert.equal(weekRangeLabel('2026-09-07', 'de'), '7. – 13. September');
	assert.equal(weekRangeLabel('2026-09-28', 'de'), '28. September – 4. Oktober');
	assert.equal(formatNumber(1234, 'de'), '1.234');
	assert.equal(formatNumber(1234, 'en'), '1,234');
});

test('isoDateIn / today: the date in Europe/Berlin, not UTC; SITE_TODAY freezes it', async () => {
	const { isoDateIn, today } = await import('../../src/i18n/format.ts');
	// 23:30 UTC on 22 Nov is already 00:30 on the 23rd in Berlin (CET, UTC+1).
	assert.equal(isoDateIn(new Date('2026-11-22T23:30:00Z')), '2026-11-23');
	// Summer time (UTC+2): 22:30 UTC on 30 Jun is 00:30 on 1 Jul.
	assert.equal(isoDateIn(new Date('2026-06-30T22:30:00Z')), '2026-07-01');
	assert.equal(isoDateIn(new Date('2026-03-29T00:30:00Z')), '2026-03-29'); // DST switch day
	const saved = process.env.SITE_TODAY;
	process.env.SITE_TODAY = '2026-11-18';
	assert.equal(today(), '2026-11-18');
	process.env.SITE_TODAY = 'garbage';
	assert.match(today(), /^\d{4}-\d{2}-\d{2}$/);
	if (saved === undefined) delete process.env.SITE_TODAY;
	else process.env.SITE_TODAY = saved;
});
