// Eventbrite search pages: JSON-LD ItemList of Event. No API key needed.
import { getText } from '../lib/cache.mjs';
import { canonicalUrl, makeCandidate, stripHtml } from '../lib/normalize.mjs';
import { canonicalCity, ONLINE } from '../lib/city.mjs';
import { addDays } from '../lib/time.mjs';

/** Extract Event objects from every ld+json block of an HTML page. */
export function parseEventbrite(html) {
	const events = [];
	for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
		let j;
		try { j = JSON.parse(m[1]); } catch { continue; }
		for (const block of Array.isArray(j) ? j : [j]) {
			if (block?.['@type'] === 'ItemList') {
				for (const el of block.itemListElement ?? []) {
					const it = el.item ?? el;
					if (it?.['@type'] === 'Event' || /Event$/.test(it?.['@type'] ?? '')) events.push(it);
				}
			} else if (/Event$/.test(block?.['@type'] ?? '')) events.push(block);
		}
	}
	return events;
}

export async function fetchSource(src, ctx) {
	const maxPages = ctx.limit ? 1 : (src.maxPages ?? 5);
	const seen = new Set();
	const all = [];
	for (const keyword of src.keywords) {
		for (let page = 1; page <= maxPages; page++) {
			const url = `https://www.eventbrite.de/d/germany--${src.citySlug}/${keyword}/?page=${page}`;
			const r = await getText(url, { ...ctx, cacheDir: undefined }, { accept: 'text/html' });
			if (!r.ok) {
				if (page === 1 && !all.length) throw new Error('HTTP ' + r.status);
				break;
			}
			const evs = parseEventbrite(r.text);
			let fresh = 0;
			for (const e of evs) {
				const k = canonicalUrl(e.url ?? '');
				if (!k || seen.has(k)) continue;
				seen.add(k);
				all.push(e);
				fresh++;
			}
			if (!fresh) break;
		}
	}
	return all;
}

export function normalise(e, src) {
	if (!e?.name || !e.startDate) return null;
	const loc = e.location ?? {};
	const addr = loc.address ?? {};
	const online = /Online/.test(e.eventAttendanceMode ?? '') && !/Mixed/.test(e.eventAttendanceMode ?? '');
	const start = String(e.startDate).slice(0, 10);
	const end = e.endDate ? String(e.endDate).slice(0, 10) : start;
	const timeM = /T(\d{2}:\d{2})/.exec(e.startDate);
	const country = (addr.addressCountry ?? '').toString().toUpperCase().slice(0, 2) || null;
	return makeCandidate(
		{
			title: stripHtml(e.name),
			start,
			end,
			time: timeM && timeM[1] !== '00:00' ? timeM[1] : undefined,
			city: online ? ONLINE : canonicalCity(addr.addressLocality) ?? canonicalCity(src.cityHint),
			venue: [loc.name, addr.streetAddress].filter(Boolean).join(', ') || undefined,
			url: e.url,
			desc: stripHtml(e.description ?? ''),
			online,
			country: online ? null : country,
		},
		src,
	);
}
