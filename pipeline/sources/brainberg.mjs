// Brainberg JSON API (lead source). Pages by cursor; UTC times converted to Europe/Berlin.
import { httpJson } from '../lib/http.mjs';
import { isoToLocal, timeRange } from '../lib/time.mjs';
import { canonicalCity, detectCity, ONLINE } from '../lib/city.mjs';
import { costFromPrice, makeCandidate, stripHtml } from '../lib/normalize.mjs';
import { groupsIn } from './meetup.mjs';

export async function fetchSource(src, ctx) {
	const maxPages = ctx.limit ? 1 : 10;
	const all = [];
	let cursor;
	for (let page = 0; page < maxPages; page++) {
		const u = new URL(src.url);
		u.searchParams.set('from', ctx.today);
		if (ctx.limit) u.searchParams.set('limit', String(Math.min(ctx.limit, 100)));
		if (cursor) u.searchParams.set('cursor', cursor);
		const j = await httpJson(u.toString(), { fetchImpl: ctx.fetchImpl ?? fetch });
		all.push(...(j.events ?? []));
		cursor = j.nextCursor;
		if (!cursor) break;
	}
	return all;
}

const FORMAT_HINT = { meetup: 'Meetup', conference: 'Conference', workshop: 'Workshop', hackathon: 'Workshop' };

export function normalise(item, src) {
	const e = item.event ?? item;
	if (!e?.title || !e.startsAt) return null;
	const tz = e.timezone || 'Europe/Berlin';
	const s = isoToLocal(e.startsAt, 'Europe/Berlin');
	const en = e.endsAt ? isoToLocal(e.endsAt, 'Europe/Berlin') : null;
	if (!s) return null;
	const cc = item.country?.code ?? item.country?.iso2 ?? item.country?.countryCode ?? (typeof item.country === 'string' ? item.country : null);
	const cityName = item.city?.name ?? item.city?.title ?? (typeof item.city === 'string' ? item.city : null);
	const online = !!e.isOnline && !e.isHybrid;
	const urls = [e.registrationUrl, e.lumaUrl, e.eventbriteUrl, e.meetupUrl, e.websiteUrl, e.sourceUrl].filter(Boolean);
	const url = urls[0] ?? '';
	const extraUrls = urls.slice(1);
	const c = makeCandidate(
		{
			title: e.title,
			start: s.date,
			end: en && en.date >= s.date ? en.date : s.date,
			time: timeRange(s.time, en && en.date === s.date ? en.time : undefined),
			city: online ? ONLINE : canonicalCity(cityName) ?? detectCity(e.venueAddress ?? ''),
			venue: [e.venueName, e.venueAddress].filter(Boolean).join(', ') || undefined,
			organiser: e.organizerName,
			url,
			extraUrls,
			cost: costFromPrice(e),
			desc: stripHtml(e.shortDescription || e.description || ''),
			online,
			country: cc ? String(cc).toUpperCase().slice(0, 2) : 'DE',
			categoryHint: FORMAT_HINT[e.eventType],
		},
		src,
	);
	if (c) c.meetupGroups = [...groupsIn(e.meetupUrl)];
	return c;
}
