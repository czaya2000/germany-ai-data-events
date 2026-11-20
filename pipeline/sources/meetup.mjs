// Meetup group calendars (ICS) plus the self-expanding discovery rule (A1 in SOURCES.de.md).
export { fetchSource, normalise } from './ics.mjs';

const GROUP_URL = /meetup\.com\/([A-Za-z0-9_\-%.]+)\/events\/(\d+)/g;
const NOT_GROUPS = new Set(['events', 'find', 'topics', 'cities', 'apps', 'about', 'blog', 'pro', 'login', 'register']);

/** All Meetup group slugs mentioned in a piece of text or URL list. */
export function groupsIn(...texts) {
	const out = new Set();
	for (const t of texts) {
		for (const m of String(t ?? '').matchAll(GROUP_URL)) {
			const g = decodeURIComponent(m[1]).toLowerCase();
			if (!NOT_GROUPS.has(g)) out.add(g);
		}
	}
	return out;
}

export function groupsInCandidate(c) {
	return groupsIn(c.url, ...(c.extraUrls ?? []), c.desc);
}

export const icsUrl = (group) => `https://www.meetup.com/${group}/events/ical/`;
