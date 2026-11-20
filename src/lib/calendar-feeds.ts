import { SITE_NAME, SITE_URL, cityGroup, compareCities, eventUrl, blurbFor, type EventEntry } from './events';
import type { IcsEvent } from './ics';
import { t, displayCity, formatLabel, type Locale } from '../i18n';
import { LOCALE_PREFIX } from '../i18n/paths.mjs';

/* One calendar feed per filter combination: all events, each city, each
   format, and each non-empty city × format pair. Built at `astro build`
   by src/pages/calendar/[feed].ics.ts, and listed in the "Save to my
   calendar" modal (src/components/CalendarSubscribe.astro). */

export interface Feed {
	slug: string; // file name without .ics
	name: string; // X-WR-CALNAME
	city: string; // city slug, or '' for all
	format: string; // format slug, or '' for all
	events: EventEntry[];
}

export interface FeedOption {
	slug: string;
	label: string;
}

/** "Köln" → "koln", "Online (DE)" → "online-de". */
export function slugify(s: string): string {
	return s
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function feedSlug(city: string, format: string): string {
	return [city, format].filter(Boolean).join('__') || 'all';
}

/** Site path of a feed: German text at /calendar/, English text at /en/calendar/ (same file names, same UIDs). */
export function feedPath(slug: string, locale: Locale = 'de'): string {
	return `${LOCALE_PREFIX[locale]}/calendar/${slug}.ics`;
}

export function feedHttpsUrl(slug: string, locale: Locale = 'de'): string {
	return `${SITE_URL}${feedPath(slug, locale)}`;
}

export function toIcsEvent(e: EventEntry, locale: Locale = 'en'): IcsEvent {
	return {
		id: e.id,
		title: e.data.title,
		date: e.data.date,
		endDate: e.data.endDate,
		time: e.data.time,
		city: e.data.city,
		venue: e.data.venue,
		organiser: e.data.organiser,
		blurb: blurbFor(e.data, locale).text,
		pageUrl: eventUrl(e.id, locale),
	};
}

/** Slugs come from the stored (English) value, labels are shown in the page language. */
function options(values: string[], toLabel: (v: string) => string, compare?: (a: string, b: string) => number): FeedOption[] {
	return [...new Set(values)]
		.map((v) => ({ slug: slugify(v), label: toLabel(v) }))
		.sort((a, b) => (compare ? compare(a.label, b.label) : a.label.localeCompare(b.label)));
}

export function feedOptions(events: EventEntry[], locale: Locale = 'en') {
	return {
		cities: options(events.map((e) => cityGroup(e.data.city)), (v) => displayCity(v, locale), compareCities),
		formats: options(events.map((e) => e.data.format), (v) => formatLabel(v, locale)),
	};
}

export function listFeeds(events: EventEntry[], locale: Locale = 'en'): Feed[] {
	const { cities, formats } = feedOptions(events, locale);
	const cityChoices = [{ slug: '', label: '' }, ...cities];
	const formatChoices = [{ slug: '', label: '' }, ...formats];
	const feeds: Feed[] = [];
	const seen = new Set<string>();

	for (const c of cityChoices) {
		for (const f of formatChoices) {
			const matching = events.filter(
				(e) =>
					(!c.slug || slugify(cityGroup(e.data.city)) === c.slug) &&
					(!f.slug || slugify(e.data.format) === f.slug),
			);
			const slug = feedSlug(c.slug, f.slug);
			// "all" is always written, even if empty, so the link never 404s.
			if (matching.length === 0 && slug !== 'all') continue;
			if (seen.has(slug)) throw new Error(`Duplicate calendar feed slug: ${slug}`);
			seen.add(slug);
			feeds.push({
				slug,
				name: t(locale).calendar.feedName(SITE_NAME, [c.label, f.label].filter(Boolean)),
				city: c.slug,
				format: f.slug,
				events: matching,
			});
		}
	}
	return feeds;
}
