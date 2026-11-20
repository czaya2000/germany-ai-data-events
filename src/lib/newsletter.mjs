// The weekly digest (Buttondown).
//
// Subscribers pick cities and event types on the signup form. Each choice is a
// Buttondown tag: `city-<slug>` and `format-<slug>`. The digest shows an event
// when its city AND its format match. Picking no city means every city, and
// picking no format means every format.
//
// This is a fixed list on purpose: Buttondown tags must stay stable, so smaller
// places go to the nearest big city here. The homepage City filter, calendar
// feeds and "Upcoming in …" use the same list (cityGroup in events.ts).
// The list and the place mapping live in config/country.mjs.
//
// Plain .mjs so both Astro and the Node scripts (validator, digest) can import it.

import { BUTTONDOWN_USERNAME as USERNAME, CITIES, PLACE_TO_CITY } from '../../config/country.mjs';

export const BUTTONDOWN_USERNAME = USERNAME;
export const SUBSCRIBE_ACTION = `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`;

export const NEWSLETTER_CITIES = CITIES;

export const NEWSLETTER_FORMATS = [
	{ slug: 'meetup', label: 'Meetup' },
	{ slug: 'conference', label: 'Conference' },
	{ slug: 'workshop', label: 'Workshop' },
	{ slug: 'networking', label: 'Networking' },
	{ slug: 'webinar', label: 'Webinar' },
];

function slug(s) {
	return s
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Newsletter city slug for an event's `city` field.
 * Returns null when the event should go to every subscriber: "Nationwide",
 * or a place not in the mapping yet (the validator warns about those).
 * "Garching (Munich)" checks "Garching" first, then "Munich".
 */
export function newsletterCity(city) {
	const text = city.trim();
	if (/^online\b/i.test(text)) return 'online';
	if (/^nationwide\b/i.test(text)) return null;
	const bracket = text.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
	const candidates = bracket ? [bracket[1], bracket[2]] : [text];
	for (const place of candidates) {
		const hit = PLACE_TO_CITY[slug(place)];
		if (hit) return hit;
	}
	return null;
}

/** True when a place is deliberately sent to everyone, rather than unmapped. */
export function isNationwide(city) {
	return /^nationwide\b/i.test(city.trim());
}

export const cityTag = (citySlug) => `city-${citySlug}`;
export const formatTag = (format) => `format-${slug(format)}`;
