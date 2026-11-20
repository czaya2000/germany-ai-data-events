import { getCollection, type CollectionEntry } from 'astro:content';
import { NEWSLETTER_CITIES, newsletterCity } from './newsletter.mjs';

export const NEW_WINDOW_DAYS = 5;

/* Site-wide values come from config/country.mjs. SITE_URL includes the base
   path (empty on the custom domain; kept so a path prefix still works if
   custom domain exists), so `${SITE_URL}/x/` is always a correct absolute URL
   and withBase('/x/') a correct site-relative one. */
export {
	SITE_URL,
	SITE_NAME,
	SITE_TAGLINE,
	SITE_HEADLINE,
	SITE_SUBHEADLINE,
	INSTAGRAM_URL,
	LINKEDIN_URL,
	FORM_ENDPOINT,
	GOOGLE_SITE_VERIFICATION,
	INDEXABLE,
} from '../../config/country.mjs';
import { BASE, SITE_URL, SITE_HOST, CURRENCY } from '../../config/country.mjs';
import { today } from '../i18n/format.ts';
import type { Locale } from '../i18n/format.ts';

/** Prefix a site path ("/events/x/") with the base path, for href and src. */
export function withBase(path: string): string {
	return `${BASE}${path}`;
}

export type EventEntry = CollectionEntry<'events'>;

export { blurbFor } from './blurb.mjs';
export type BlurbLocale = 'de' | 'en';

/** Registration links carry UTM tags so organisers can see in their own
    analytics how many registrations this site sent them — the number a
    featured listing is eventually sold on. Existing params and fragments
    are preserved; anything that is not an http(s) URL is returned as-is. */
export function outboundUrl(url: string): string {
	try {
		const u = new URL(url);
		if (u.protocol !== 'http:' && u.protocol !== 'https:') return url;
		if (!u.searchParams.has('utm_source')) {
			u.searchParams.set('utm_source', SITE_HOST);
			u.searchParams.set('utm_medium', 'referral');
			u.searchParams.set('utm_campaign', 'listing');
		}
		return u.toString();
	} catch {
		return url;
	}
}

/** Best guess at the organiser's own web page, for the Event `organizer.url`
    that Google asks for. Usually the registration site's home page; for a
    Meetup event, the group page. Ticketing platforms are not the organiser,
    so for those it returns undefined and the field is left out. */
const TICKETING_HOSTS = /(^|\.)(luma\.com|lu\.ma|eventbrite\.[a-z.]+|bookwhen\.com)$/;
export function organiserUrl(url: string): string | undefined {
	try {
		const u = new URL(url);
		const host = u.hostname.replace(/^www\./, '');
		if (host === 'meetup.com') {
			const group = u.pathname.split('/').filter(Boolean)[0];
			return group ? `https://www.meetup.com/${group}/` : undefined;
		}
		if (TICKETING_HOSTS.test(host)) return undefined;
		return `${u.protocol}//${u.host}/`;
	} catch {
		return undefined;
	}
}

/** The event's own listing page, tagged so Umami can tell which social
    network a visit came from (app in-browsers usually send no referrer). */
export function socialListingUrl(id: string, network: string): string {
	return `${eventUrl(id)}?utm_source=${network}&utm_medium=social&utm_campaign=autopost`;
}

export function isNew(firstSeen: string, ref = today()): boolean {
	const ageMs = Date.parse(ref) - Date.parse(firstSeen);
	return ageMs >= 0 && ageMs <= NEW_WINDOW_DAYS * 24 * 60 * 60 * 1000;
}

export async function getUpcomingEvents(): Promise<EventEntry[]> {
	const entries = await getCollection('events');
	const t = today();
	return entries
		.filter((e) => (e.data.endDate ?? e.data.date) >= t)
		.sort((a, b) => a.data.date.localeCompare(b.data.date));
}

/** True once the event's last day is before today. */
export function isEnded(data: { date: string; endDate?: string }, ref = today()): boolean {
	return (data.endDate ?? data.date) < ref;
}

/** Live events plus archived ones, for building every event page. A live
    entry wins if an id is in both files. */
export async function getAllEvents(): Promise<EventEntry[]> {
	const live = await getCollection('events');
	const ids = new Set(live.map((e) => e.id));
	const archived = (await getCollection('archive')).filter((e) => !ids.has(e.id));
	return [...live, ...(archived as unknown as EventEntry[])];
}

// The City filter, calendar feeds and "Upcoming in …" use the newsletter's
// cities (config/country.mjs via src/lib/newsletter.mjs), so every list on the site matches the
// signup form. Event pages, cards and the social feed keep the exact place.

/** Main city for the City filter, e.g. "Garching" → "Munich", "Leipzig" → "Other Germany". */
export function cityGroup(city: string): string {
	// "Online (DE)" stays as written, so its calendar feed keeps its address.
	if (/^online\b/i.test(city)) return city;
	const slug = newsletterCity(city);
	const hit = NEWSLETTER_CITIES.find((c) => c.slug === slug);
	if (hit) return hit.label;
	// "Nationwide", or a place not mapped yet (npm run validate warns about those).
	const bracket = city.match(/\(([^)]+)\)\s*$/);
	return (bracket ? bracket[1] : city).trim();
}

/** City list order: Online first, then cities A–Z. */
export function compareCities(a: string, b: string): number {
	const online = (s: string) => (/^online\b/i.test(s) ? 0 : 1);
	return online(a) - online(b) || a.localeCompare(b);
}

/** True only when the event as a whole is free: the cost text starts with
    "Free". "Free for members / EUR 25 guests" and "EUR 5 in person / free
    livestream" are not free events. */
export function isFree(cost: string): boolean {
	return /^free\b(?! for\b)/i.test(cost.trim());
}

/** What the cost text lets us state as fact in the Event markup. A price is
    given only for "Free" or one plain amount ("EUR 450", "150 EUR", "EUR 690
    excl. VAT", with an optional note in brackets that names no other amount).
    Tiered, "from", "not listed" and ticket-platform texts give no price.
    Availability is stated only when the text says "sold out". */
export function offerFacts(cost: string): {
	price?: string;
	priceCurrency?: string;
	availability?: string;
} {
	const text = cost.trim();
	const out: { price?: string; priceCurrency?: string; availability?: string } = {};
	if (/\bsold out\b/i.test(text)) out.availability = 'https://schema.org/SoldOut';
	if (isFree(text)) return { ...out, price: '0', priceCurrency: CURRENCY };
	const m =
		text.match(/^(EUR) ?(\d[\d,']*)(?: excl\. VAT)?(?: \(([^)]*)\))?$/) ??
		text.match(/^()(\d[\d,']*) (EUR)$/);
	if (!m) return out;
	const currency = m[1] || m[3];
	const note = m[1] ? (m[3] ?? '') : '';
	if (/EUR|\bfree\b/i.test(note)) return out;
	return { ...out, price: m[2].replace(/[,']/g, ''), priceCurrency: currency };
}

/** The place without the main city in brackets: "Thônex (Geneva)" → "Thônex". */
export function placeName(city: string): string {
	return city.replace(/\s*\([^)]*\)\s*$/, '').trim() || city;
}

/** Absolute address of an event page. German (the default language, at the root) unless asked otherwise. */
export function eventUrl(slug: string, locale: Locale = 'de'): string {
	return `${SITE_URL}${locale === 'en' ? '/en' : ''}/events/${slug}/`;
}

/* Dates, week bands and costs are formatted per locale in src/i18n/format.ts. */
export {
	today,
	dateSpine,
	formatDateRange,
	formatDateCompact,
	formatLastScan,
	weekStart,
	weekRangeLabel,
	weekBand,
	type WeekBand,
} from '../i18n/format.ts';

/** getStaticPaths for the event pages (German and English share it): one page per live or archived event id. */
export async function eventStaticPaths() {
	const entries = await getAllEvents();
	return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}
