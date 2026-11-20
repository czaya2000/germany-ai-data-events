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
import { displayCity, formatLabel, localizeCost, dateSpine, INTL_LOCALE } from '../../src/i18n/index.ts';

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
		looks: ['full rows with blurbs', 'full rows, no blurbs', 'one-line rows'],
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
		looks: ['volle Zeilen mit Kurztext', 'volle Zeilen ohne Kurztext', 'einzeilige Zeilen'],
	},
};

// ---- Pick the events --------------------------------------------------------

// One section: everything on (or still running) from `from` through today + `ahead`
// days (inclusive), Europe/Berlin dates. Being new (firstSeen) is NOT a reason to
// include an event, and there is no "new this week" section or marker.
export function selectEvents(allEvents, { today, ahead = 14, from = today }) {
	const horizon = addDays(today, ahead); // inclusive
	const upcoming = allEvents
		.filter((e) => (e.endDate ?? e.date) >= from)
		.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
	// Already running counts only for short events (a conference's last day), not
	// long series that started weeks ago.
	const startsSoon = (e) => e.date >= from || addDays(e.date, 7) >= (e.endDate ?? e.date);
	return {
		today,
		from,
		horizon,
		soon: upcoming.filter((e) => e.date <= horizon && startsSoon(e)),
	};
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

const TOP_LOOKS = [{ blurb: true }, { blurb: false }, { compact: true }];
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

	const a = (href, text, color = T.ink) => `<a href="${href}" style="color:${color};text-decoration:underline;">${text}</a>`;
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
		const meta = [displayCity(e.city, locale), e.venue, e.time].filter(Boolean).map(esc).join(', ');
		const td = `border-bottom:1px solid ${T.border};font-family:${T.font};`;
		const b = blurbFor(e, locale);
		// A German email falls back to the English text when no German blurb exists yet.
		const blurbHtml =
			blurb && b.text
				? `<div${b.lang !== locale ? ` lang="${b.lang}"` : ''} style="font-size:13px;color:${T.muted};margin-top:3px;">${esc(shortBlurb(b.text))}</div>\n`
				: '';
		return `<tr><td valign="top" width="64" style="padding:18px 16px 18px 0;${td}">
<div style="font-size:28px;font-weight:600;line-height:1;">${s.day}</div>
<div style="font-size:12px;color:${T.muted};margin-top:5px;white-space:nowrap;">${s.weekday}, ${s.month}${through}</div>
</td><td valign="top" style="padding:18px 0;${td}">
<a href="${link(e)}" style="font-size:18px;font-weight:500;line-height:1.28;letter-spacing:-0.01em;color:${T.ink};text-decoration:none;">${esc(e.title)}</a>
<div style="font-size:14px;color:${T.ink2};margin-top:6px;">${meta}</div>
${blurbHtml}<div style="font-size:13px;margin-top:10px;">${[format, cost].filter(Boolean).join('&nbsp;&nbsp;')}</div>
</td></tr>`;
	}

	// Last-resort size fallback: one line per event, date · title, then place · type.
	function renderCompact(e) {
		const s = dateSpine(e.date, locale);
		const city = displayCity(e.city, locale).replace(/\s*\(.*\)$/, '');
		return `<tr><td style="padding:10px 0;border-bottom:1px solid ${T.border};font-family:${T.font};font-size:15px;">
<span style="color:${T.muted};white-space:nowrap;">${s.weekday} ${s.day} ${s.month}</span>&nbsp; <a href="${link(e)}" style="color:${T.ink};font-weight:500;text-decoration:none;">${esc(e.title)}</a>
<div style="font-size:13px;color:${T.muted};">${esc(city)} · ${esc(formatLabel(e.format, locale))}</div>
</td></tr>`;
	}

	const masthead = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:24px 0 18px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="padding-right:11px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="18" style="border:2px solid ${T.ink};"><tr><td height="4" style="height:4px;line-height:4px;font-size:0;background:${T.accent};">&nbsp;</td></tr><tr><td height="10" style="height:10px;line-height:10px;font-size:0;">&nbsp;</td></tr></table></td>
<td valign="middle" style="font-family:${T.font};font-size:19px;font-weight:700;letter-spacing:-0.015em;"><a href="${HOME}" style="color:${T.ink};text-decoration:none;">${esc(SITE_NAME)}</a></td>
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
		const row = (e) => (opts.compact ? renderCompact(e) : renderEvent(e, { blurb: opts.blurb !== false }));
		const list = events.map((e) => wrap(e, row(e))).join('\n');
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
		const range = `${datePart(from, { day: 'numeric', month: 'short' })} – ${datePart(horizon, { day: 'numeric', month: 'short' })}.`;
		const sections = section(c.soonTitle, range, soon, c.soonEmpty, top);
		// The marker keeps the draft in Buttondown's plain (markdown) editor, which
		// passes raw HTML through. Its visual editor drops unsupported attributes.
		return `<!-- buttondown-editor-mode: plaintext -->
<div style="background:${T.bg};padding:0 20px 24px;">
<div style="max-width:600px;margin:0 auto;font-family:${T.font};color:${T.ink};">
${masthead}
${intro}
${sections}
${outro}
</div>
</div>`;
	}

	// Worst case is a reader with no filters, who sees every row.
	let level = 0;
	let body = buildBody(TOP_LOOKS[0]);
	while (sizeKb(body) > BUDGET_KB && level < TOP_LOOKS.length - 1) body = buildBody(TOP_LOOKS[++level]);
	const kb = sizeKb(body);
	return { subject: digestSubject(locale, today), body, level, lookName: c.looks[level], sizeKb: kb, overBudget: kb > BUDGET_KB };
}
