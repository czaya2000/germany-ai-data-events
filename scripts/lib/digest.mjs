// Weekly digest: event selection, HTML rendering and audience filters.
// Pure functions (no network, no file reads) so pipeline/test/digest.test.mjs can
// import them offline. scripts/build-digest.mjs is the command-line wrapper.
//
// One set of events, rendered once per language (German and English). Each event
// sits inside a Buttondown (Django/Liquid) condition, so a reader only sees events
// whose city AND format match their tags; no choice means "all"
// (see src/lib/newsletter.mjs).

import {
	NEWSLETTER_CITIES,
	NEWSLETTER_FORMATS,
	newsletterCity,
	cityTag,
	formatTag,
} from '../../src/lib/newsletter.mjs';
import { blurbFor } from '../../src/lib/blurb.mjs';
import { SITE_URL, SITE_NAME } from '../../config/country.mjs';
import { hasEnded } from '../../src/lib/schedule.mjs';
import { displayCity, formatLabel, localizeCost, dateSpine, INTL_LOCALE } from '../../src/i18n/index.ts';

// Newsletter name in the masthead: the product name.
export const NEWSLETTER_NAME = SITE_NAME;

export const LOCALES = ['de', 'en'];
export const LANG_TAGS = { de: 'lang-de', en: 'lang-en' };

export const addDays = (iso, n) => {
	const d = new Date(`${iso}T00:00:00Z`);
	d.setUTCDate(d.getUTCDate() + n);
	return d.toISOString().slice(0, 10);
};

export function isoWeek(iso) {
	const d = new Date(`${iso}T00:00:00Z`);
	const day = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - day);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return { week: Math.ceil(((d - yearStart) / 86400000 + 1) / 7), year: d.getUTCFullYear() };
}

// ---- Copy per language ------------------------------------------------------

const COPY = {
	en: {
		subject: (week, year) => `German data & AI events · week ${week}, ${year}`,
		intro: 'Data and AI events in Germany, picked for your cities and event types.',
		soonTitle: 'Next two weeks',
		newLegend: 'new this week.',
		soonEmpty: 'Nothing in your cities and event types in the next two weeks.',
		freshTitle: 'New this week',
		freshNote: 'Added since last Monday, happening after the next two weeks.',
		freshEmpty: 'Nothing new for your cities and event types this week.',
		seeAll: 'See all upcoming events',
		manage: 'Change your cities and event types',
		until: (day, month) => `to ${day} ${month}`,
		looks: ['full cards with blurbs', 'full cards, no blurbs'],
	},
	de: {
		subject: (week, year) => `Daten- & KI-Events in Deutschland · KW ${week}, ${year}`,
		intro: 'Daten- und KI-Events in Deutschland, passend zu Ihren Städten und Formaten.',
		soonTitle: 'Die nächsten zwei Wochen',
		newLegend: 'neu diese Woche.',
		soonEmpty: 'In den nächsten zwei Wochen gibt es nichts in Ihren Städten und Formaten.',
		freshTitle: 'Neu diese Woche',
		freshNote: 'Seit letztem Montag hinzugekommen, nach den nächsten zwei Wochen.',
		freshEmpty: 'Diese Woche gibt es nichts Neues in Ihren Städten und Formaten.',
		seeAll: 'Alle kommenden Events ansehen',
		manage: 'Städte und Formate ändern',
		until: (day, month) => `bis ${day}. ${month}`,
		looks: ['volle Karten mit Kurztext', 'volle Karten ohne Kurztext'],
	},
};

// ---- Pick the events --------------------------------------------------------

// One section: every event that overlaps the window [from, today + ahead] (Europe/Berlin
// dates, both ends inclusive): (endDate ?? date) >= from AND date <= horizon. Being new
// (firstSeen) is NOT a reason to include an event; there is no "new this week" section.
// A multi-day event that began before `from` is shown from `from` on: its date is
// clamped, so the email never prints a day in the past (`startedEarlier` marks those).
// `now` (Europe/Berlin wall-clock "YYYY-MM-DDTHH:MM:SS", default: the start of `today`) also drops
// events that already ended earlier the same day (end time, else the end of the last day).
export function selectEvents(allEvents, { today, ahead = 14, from = today, now = `${today}T00:00:00` }) {
	const horizon = addDays(today, ahead); // inclusive
	const soon = allEvents
		.filter((e) => (e.endDate ?? e.date) >= from && e.date <= horizon && !hasEnded(e, now))
		.map((e) =>
			e.date < from
				? { ...e, date: from, startedEarlier: true, endDate: e.endDate === from ? undefined : e.endDate }
				: e,
		)
		.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
	return { today, from, horizon, soon };
}

// ---- Audience ---------------------------------------------------------------

/**
 * Buttondown API 2026-04-01 `filters` for one language's email. Tag IDs come from
 * GET /v1/tags (names are not accepted here).
 *   en: subscribers who have lang-en.
 *   de: subscribers who do NOT have lang-en, so lang-de and subscribers with no
 *       language tag (older signups) both get the German email.
 */
export function audienceFilters(locale, langEnTagId) {
	if (!langEnTagId) throw new Error('lang-en tag id is required');
	return {
		filters: [{ field: 'subscriber.tags', operator: locale === 'en' ? 'contains' : 'not_contains', value: langEnTagId }],
		groups: [],
		predicate: 'and',
	};
}

/** Same colour the newsletter's existing tags use. POST /v1/tags requires `color`. */
export const TAG_COLOR = '#FAFAFA';

/** Body for POST /v1/tags. */
export const newTagPayload = (name) => ({ name, color: TAG_COLOR });

// ---- Template conditions ----------------------------------------------------
// Django's {% if %} has no parentheses, but `and` binds tighter than `or`, so
//   'city-x' in subscriber.tags or 'city-a' not in tags and 'city-b' not in tags ...
// reads as "city x chosen, or no city chosen". Each event gets one such check
// for its city, nested around one for its format: nesting gives the AND.

const has = (tag) => `'${tag}' in subscriber.tags`;
const lacks = (tag) => `'${tag}' not in subscriber.tags`;
const NO_CITY = NEWSLETTER_CITIES.map((c) => lacks(cityTag(c.slug))).join(' and ');
const NO_FORMAT = NEWSLETTER_FORMATS.map((f) => lacks(formatTag(f.label))).join(' and ');
const cityCheck = (city) => `${has(cityTag(city))} or ${NO_CITY}`;
const formatCheck = (format) => `${has(formatTag(format))} or ${NO_FORMAT}`;

/** Wraps text so it only shows for matching readers. Null city = everyone. */
function wrap(event, text) {
	const city = newsletterCity(event.city);
	const inner = `{% if ${formatCheck(event.format)} %}\n${text}\n{% endif %}`;
	return city ? `{% if ${cityCheck(city)} %}\n${inner}\n{% endif %}` : inner;
}

// "Did anything match this reader?" as one OR of AND-groups, used only for the
// fallback line. Bounded by the distinct cities and formats in the section.
function anyMatchCondition(events) {
	const groups = new Set();
	for (const e of events) {
		const city = newsletterCity(e.city);
		const fmt = formatTag(e.format);
		const cityOpts = city ? [has(cityTag(city)), NO_CITY] : [null];
		for (const c of cityOpts) {
			for (const f of [has(fmt), NO_FORMAT]) groups.add([c, f].filter(Boolean).join(' and '));
		}
	}
	return [...groups].join(' or ');
}

// ---- Render -----------------------------------------------------------------

// Raw HTML with inline styles, so it looks like the website in every mail app
// (Gmail ignores most <style> rules). Same tokens as src/styles/theme.css.
const T = {
	bg: '#fbfbf9',
	ink: '#000000',
	ink2: '#3f3f45',
	muted: '#6b6b70',
	border: '#dededa',
	accent: '#e30613',
	font: 'Archivo,Helvetica,Arial,sans-serif',
};
const UTM = 'utm_source=newsletter&utm_medium=email&utm_campaign=digest';
// Also neutralises curly braces: an event title containing a double brace or a
// brace-percent pair must never be run as a template tag by Buttondown.
const esc = (s) =>
	String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/[{]/g, '&#123;')
		.replace(/[}]/g, '&#125;');

// Keeps the top section's blurbs to about two lines.
export function shortBlurb(text, max = 140) {
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s]+$/, '') + '…';
}

// Card meta line: ONLY the city and the time ("Berlin, 09:00", or just "Berlin").
// Never the venue, street or any other address part; the full address lives on the event page.
export function placeMeta(city, time) {
	return [city, time].map((x) => String(x ?? "").trim()).filter(Boolean);
}

const BUDGET_KB = 90; // Gmail clips emails over ~102 KB
// Template tags vanish when Buttondown renders, so leave them out of the count.
const sizeKb = (html) => Math.round(Buffer.byteLength(html.replace(/^\{%.*%\}$/gm, '')) / 1024);

export const digestSubject = (locale, today) => {
	const { week, year } = isoWeek(today);
	return COPY[locale].subject(week, year);
};

/** Builds one language's email: { subject, body, level, lookName, sizeKb, overBudget }. */
export function renderDigest(sel, locale) {
	const c = COPY[locale];
	const { soon, from, horizon, today } = sel;
	const localePrefix = locale === 'en' ? '/en' : '';
	const HOME = `${SITE_URL}${localePrefix}/?${UTM}`;
	const link = (e) => `${SITE_URL}${localePrefix}/events/${e.id}/?${UTM}`;
	const datePart = (iso, opts) =>
		new Intl.DateTimeFormat(INTL_LOCALE[locale], { ...opts, timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

	// Every anchor carries its colour inline with !important, so Buttondown's and Gmail's
	// default blue link style cannot win. Same values as the Swiss digest.
	const a = (href, text, color = T.ink) =>
		`<a href="${href}" style="color:${color} !important;text-decoration:underline !important;">${text}</a>`;
	const plainA = (href, text, extra = '') =>
		`<a href="${href}" style="${extra}color:${T.ink} !important;text-decoration:none !important;">${text}</a>`;
	const p = (html, style = '') =>
		`<p style="margin:0;font-family:${T.font};font-size:15px;line-height:1.5;color:${T.ink};${style}">${html}</p>`;

	function renderEvent(e, { blurb = true } = {}) {
		const s = dateSpine(e.date, locale);
		const end = e.endDate && e.endDate !== e.date ? dateSpine(e.endDate, locale) : null;
		const through = end ? `<br>${c.until(end.day, end.month)}` : '';
		const free = /^free\b(?! for\b)/i.test(e.cost.trim());
		const costText = localizeCost(e.cost, locale);
		const cost = /not listed/i.test(e.cost)
			? ''
			: free
				? `<b>${esc(costText)}</b>`
				: `<span style="color:${T.muted};">${esc(costText)}</span>`;
		const format = `<span style="border:1px solid ${T.border};padding:2px 8px;color:${T.ink2};">${esc(formatLabel(e.format, locale))}</span>`;
		const meta = placeMeta(displayCity(e.city, locale), e.time).map(esc).join(', ');
		const td = `border-bottom:1px solid ${T.border};font-family:${T.font};`;
		const b = blurbFor(e, locale);
		// A German email falls back to the English text when no German blurb exists yet.
		const blurbHtml =
			blurb && b.text
				? `<div${b.lang !== locale ? ` lang="${b.lang}"` : ''} style="font-size:13px;color:${T.muted};margin-top:3px;">${esc(shortBlurb(b.text))}</div>`
				: '';
		// ONE line, no newline or indent inside <tr>: Buttondown's markdown pass must not
		// turn line breaks into <p>/<pre> and break the table.
		return (
			`<tr><td valign="top" width="64" style="padding:18px 16px 18px 0;${td}">` +
			`<div style="font-size:28px;font-weight:600;line-height:1;">${s.day}</div>` +
			`<div style="font-size:12px;color:${T.muted};margin-top:5px;white-space:nowrap;">${s.weekday}, ${s.month}${through}</div>` +
			`</td><td valign="top" style="padding:18px 0;${td}">` +
			plainA(link(e), esc(e.title), 'font-size:18px;font-weight:500;line-height:1.28;letter-spacing:-0.01em;') +
			`<div style="font-size:14px;color:${T.ink2};margin-top:6px;">${meta}</div>` +
			blurbHtml +
			`<div style="font-size:13px;margin-top:10px;">${[format, cost].filter(Boolean).join('&nbsp;&nbsp;')}</div>` +
			`</td></tr>`
		);
	}

	const masthead = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:24px 0 18px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="padding-right:11px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="18" style="border:2px solid ${T.ink};"><tr><td height="4" style="height:4px;line-height:4px;font-size:0;background:${T.accent};">&nbsp;</td></tr><tr><td height="10" style="height:10px;line-height:10px;font-size:0;">&nbsp;</td></tr></table></td>
<td valign="middle" style="font-family:${T.font};font-size:19px;font-weight:700;letter-spacing:-0.015em;">${plainA(HOME, esc(NEWSLETTER_NAME))}</td>
</tr></table>
</td></tr>
<tr><td height="3" style="height:3px;line-height:3px;font-size:0;background:${T.accent};">&nbsp;</td></tr>
</table>`;

	const intro = `<div style="padding:28px 0 4px;">
${p(c.intro, `color:${T.ink2};`)}
</div>`;

	function section(title, note, events, empty, opts = {}) {
		const head = `<div style="padding:28px 0 14px;">
<h2 style="margin:0 0 6px;font-family:${T.font};font-size:26px;font-weight:600;line-height:1.15;letter-spacing:-0.02em;color:${T.ink};">${title}</h2>
${p(note, `font-size:14px;color:${T.muted};`)}
</div>`;
		const fallback = `<tr><td colspan="2" style="padding:18px 0;border-bottom:1px solid ${T.border};">${p(empty, `color:${T.ink2};`)}</td></tr>`;
		const list = events.map((e) => wrap(e, renderEvent(e, { blurb: opts.blurb !== false }))).join('\n');
		const rows =
			events.length === 0 ? fallback : `{% if ${anyMatchCondition(events)} %}\n${list}\n{% else %}\n${fallback}\n{% endif %}`;
		return `${head}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid ${T.ink};line-height:1.5;color:${T.ink};">
${rows}
</table>`;
	}

	const outro = `<div style="padding:28px 0 8px;">
${p(a(HOME, c.seeAll), 'font-weight:500;')}
${p(a('{{ manage_subscription_url }}', c.manage, T.muted), `margin-top:10px;font-size:13px;color:${T.muted};`)}
</div>`;

	function buildBody(top) {
		// German short months already end in a full stop ("Dez."): add one only if missing.
		const rangeText = `${datePart(from, { day: 'numeric', month: 'short' })} – ${datePart(horizon, { day: 'numeric', month: 'short' })}`;
		const range = rangeText.endsWith('.') ? rangeText : `${rangeText}.`;
		const sections = section(c.soonTitle, range, soon, c.soonEmpty, top);
		// The marker keeps the draft in Buttondown's plain (markdown) editor, which
		// passes raw HTML through. Its visual editor drops unsupported attributes.
		return `<!-- buttondown-editor-mode: plaintext -->
<style>a { color:${T.ink} !important; }</style>
<div style="background:${T.bg};padding:0 20px 24px;">
<div style="max-width:600px;margin:0 auto;font-family:${T.font};color:${T.ink};">
${masthead}
${intro}
${sections}
${outro}
</div>
</div>`;
	}

	// Worst case is a reader with no filters, who sees every row. Every event always
	// uses the same full Swiss card (date spine, title, place, chip); only the blurbs
	// are dropped when the email would pass the Gmail clip. Never a mixed layout.
	let level = 0;
	let body = buildBody({ blurb: true });
	if (sizeKb(body) > BUDGET_KB) {
		level = 1;
		body = buildBody({ blurb: false });
	}
	const look = c.looks[level];
	const kb = sizeKb(body);
	// Unfiltered size of each look, for the dry-run report.
	const looksKb = [{ blurb: true }, { blurb: false }].map((l) => sizeKb(buildBody(l)));
	return {
		subject: digestSubject(locale, today),
		body,
		level,
		lookName: look,
		sizeKb: kb,
		looksKb,
		overBudget: kb > BUDGET_KB,
	};
}
