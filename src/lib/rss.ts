import { SITE_NAME, SITE_URL, blurbFor, eventUrl, formatDateRange, getUpcomingEvents } from './events';
import { SITE_SCOPE } from './public-data';
import { t, displayCity, formatLabel, localizeCost, organiserUnknown, type Locale } from '../i18n';
import { LOCALE_PREFIX } from '../i18n/paths.mjs';
import { stripEmoji } from './strip-emoji.mjs';

/* RSS 2.0 of upcoming events, newest listings first (by firstSeen), so a
   feed reader or agent sees what was just added. One feed per language:
   /rss.xml (German) and /en/rss.xml (English), same items, same links to the
   event pages of that language. Hand-written: it is a few lines and avoids
   another dependency. */

const esc = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function buildRss(locale: Locale): Promise<string> {
	const s = t(locale);
	const events = (await getUpcomingEvents()).sort(
		(a, b) => b.data.firstSeen.localeCompare(a.data.firstSeen) || a.data.date.localeCompare(b.data.date),
	);

	const items = events.map((entry) => {
		const e = entry.data;
		const url = eventUrl(entry.id, locale);
		const dateLabel = formatDateRange(e.date, e.endDate, locale);
		const city = displayCity(e.city, locale);
		const online = /^online\b/i.test(e.city);
		const where = online ? s.ics.online : [e.venue, city].filter(Boolean).join(', ');
		const blurb = blurbFor(e, locale).text;
		const summary = `${dateLabel}${e.time ? `, ${e.time}` : ''} · ${where} · ${formatLabel(e.format, locale)} · ${localizeCost(e.cost, locale)}. ${blurb}${organiserUnknown(e.organiser) ? '' : ` ${s.ics.organiser(e.organiser)}.`}`;
		return [
			'    <item>',
			`      <title>${esc(`${stripEmoji(e.title)} (${dateLabel}, ${city})`)}</title>`,
			`      <link>${url}</link>`,
			`      <guid isPermaLink="true">${url}</guid>`,
			`      <pubDate>${new Date(`${e.firstSeen}T06:00:00Z`).toUTCString()}</pubDate>`,
			`      <description>${esc(summary)}</description>`,
			`      <category>${esc(formatLabel(e.format, locale))}</category>`,
			...e.topics.map((topic) => `      <category>${esc(topic)}</category>`),
			'    </item>',
		].join('\n');
	});

	const home = `${SITE_URL}${LOCALE_PREFIX[locale]}/`;
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
		'  <channel>',
		`    <title>${esc(s.site.feedTitle(SITE_NAME))}</title>`,
		`    <link>${home}</link>`,
		`    <atom:link href="${SITE_URL}${LOCALE_PREFIX[locale]}/rss.xml" rel="self" type="application/rss+xml" />`,
		`    <description>${esc(locale === 'de' ? s.site.scope(SITE_NAME) : SITE_SCOPE)}</description>`,
		`    <language>${locale}</language>`,
		`    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
		'    <ttl>720</ttl>',
		...items,
		'  </channel>',
		'</rss>',
		'',
	].join('\n');
}
