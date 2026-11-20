// Generic ICS source (hessian.ai, bwcon, GFW, agentconfs, aieventlist city feeds, hackevents) and the Meetup variant.
import { parseIcs } from '../lib/ical.mjs';
import { getText } from '../lib/cache.mjs';
import { canonicalCity, detectCity, ONLINE } from '../lib/city.mjs';
import { cleanOrganiser, makeCandidate } from '../lib/normalize.mjs';

export async function fetchSource(src, ctx) {
	const r = await getText(src.url, ctx, { accept: 'text/calendar, */*' });
	if (!r.ok) throw new Error('HTTP ' + r.status);
	if (!r.text.includes('BEGIN:VCALENDAR')) throw new Error('not an iCalendar document');
	return parseIcs(r.text);
}

function urlsIn(text) {
	return [...String(text).matchAll(/https?:\/\/[^\s\\<>"]+/g)].map((m) => m[0].replace(/[).,]+$/, ''));
}

/** parsed = { calName, events } from parseIcs. */
export function normalise(parsed, src) {
	const out = [];
	for (const ev of parsed.events) {
		const desc = ev.description;
		const loc = ev.location || '';
		let url = ev.url;
		let organiser = '';
		let country = null;
		const extraUrls = [];
		let online = /^online\b|\bonline event\b|\bwebinar\b/i.test(loc) || /^online$/i.test(loc.trim());

		if (src.type === 'meetup') {
			organiser = cleanOrganiser(parsed.calName) || src.id.replace(/^meetup:/, '');
			if (!url) url = urlsIn(desc).find((u) => /meetup\.com\/[^/]+\/events\/\d+/.test(u)) ?? '';
			online = /\b(virtual event|online event|online[- ]only|rein online|virtuell)\b/i.test(desc.slice(0, 700));
		} else if (src.type === 'hackevents') {
			const reg = /Register:\s*(\S+)/.exec(desc)?.[1];
			const det = /Details:\s*(\S+)/.exec(desc)?.[1];
			if (reg) url = reg;
			if (det) extraUrls.push(det);
			organiser = (/Organizer:\s*([^\n\\]+?)\s*(?:\\n|\n|Going:|$)/.exec(desc)?.[1] ?? '').trim();
		} else if (src.id.startsWith('agentconfs')) {
			// "Berlin, Germany" / "Online"
			if (/\bGermany\b/i.test(loc)) country = 'DE';
			else if (loc) country = 'XX';
		}
		const cleanDesc = desc.replace(/^[^\n]*\n/, src.type === 'meetup' ? '' : '$&').replace(/\s+/g, ' ');
		let city = detectCity(loc) ?? (src.type === 'meetup' ? detectCity(cleanDesc.slice(0, 400)) : null);
		if (!city && !online) city = canonicalCity(src.cityHint);
		if (online && !city) city = ONLINE;
		if (online) city = ONLINE;
		// Meetup groups with a city hint keep it for physical events without a parseable location.
		for (const x of urlsIn(desc)) if (/meetup\.com\/[^/]+\/events\/\d+/.test(x) && x !== url) extraUrls.push(x);

		const c = makeCandidate(
			{
				title: ev.title, start: ev.start, end: ev.end, time: ev.time, city, venue: loc && !online ? loc : undefined,
				organiser, url, extraUrls, desc: cleanDesc, online, country, cancelled: ev.status === 'CANCELLED',
			},
			src,
		);
		if (c) out.push(c);
	}
	return out;
}
