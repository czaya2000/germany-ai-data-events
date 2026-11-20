// Luma place-level discover API (undocumented; keep tolerant). Pull the whole place, filter by keyword in code.
import { httpJson } from '../lib/http.mjs';
import { isoToLocal, timeRange } from '../lib/time.mjs';
import { canonicalCity, ONLINE } from '../lib/city.mjs';
import { makeCandidate } from '../lib/normalize.mjs';

export async function fetchSource(src, ctx) {
	const all = [];
	let cursor;
	const maxPages = ctx.limit ? 1 : 12;
	for (let page = 0; page < maxPages; page++) {
		const u = new URL('https://api.lu.ma/discover/get-paginated-events');
		u.searchParams.set('discover_place_api_id', src.placeId);
		u.searchParams.set('pagination_limit', String(ctx.limit ? Math.min(ctx.limit, 50) : 50));
		if (cursor) u.searchParams.set('pagination_cursor', cursor);
		const j = await httpJson(u.toString(), { fetchImpl: ctx.fetchImpl ?? fetch });
		if (!Array.isArray(j.entries)) throw new Error('unexpected Luma response shape (no entries[])');
		all.push(...j.entries);
		if (!j.has_more || !j.next_cursor) break;
		cursor = j.next_cursor;
	}
	return all;
}

export function normalise(entry, src) {
	const e = entry.event;
	if (!e?.name || !e.start_at || !e.url) return null;
	const s = isoToLocal(e.start_at);
	const en = e.end_at ? isoToLocal(e.end_at) : null;
	if (!s) return null;
	const g = e.geo_address_info ?? {};
	const online = e.location_type === 'online';
	const host = (entry.hosts ?? []).map((h) => h.name).filter(Boolean)[0];
	return makeCandidate(
		{
			title: e.name,
			start: s.date,
			end: en && en.date >= s.date ? en.date : s.date,
			time: timeRange(s.time, en && en.date === s.date ? en.time : undefined),
			city: online ? ONLINE : canonicalCity(g.city) ?? src.cityHint,
			venue: online ? undefined : g.short_address || g.full_address || g.address,
			organiser: entry.calendar?.name || host,
			url: 'https://luma.com/' + e.url,
			desc: [entry.calendar?.name, host && 'Hosted by ' + host].filter(Boolean).join('. '),
			online,
			country: online ? null : g.country_code ? String(g.country_code).toUpperCase() : g.country === 'Germany' ? 'DE' : null,
		},
		src,
	);
}
