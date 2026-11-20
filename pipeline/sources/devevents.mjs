// dev.events RSS (global). The date and place live only in the description:
//   "<name> is happening on <Month d, yyyy> in <City>, Germany, Europe."  Items that do not match are ignored.
import { getText } from '../lib/cache.mjs';
import { parseRss } from '../lib/feeds.mjs';
import { detectCity, canonicalCity, ONLINE } from '../lib/city.mjs';
import { makeCandidate, parseDateText } from '../lib/normalize.mjs';

export async function fetchSource(src, ctx) {
	const r = await getText(src.url, ctx, { accept: 'application/rss+xml, */*' });
	if (!r.ok) throw new Error('HTTP ' + r.status);
	return parseRss(r.text);
}

const RE = /is happening on ([A-Za-z]+ \d{1,2}(?:\s*-\s*\d{1,2})?,\s*\d{4})\s*(?:in|,)?\s*([^.]*?)(?:\.|$)/;

export function normalise(it, src) {
	const m = RE.exec(it.description);
	if (!m) return null;
	const d = parseDateText(m[1]);
	if (!d) return null;
	const place = m[2] || '';
	const germany = /Germany/i.test(place);
	const online = /^\s*Online/i.test(place);
	if (!germany && !online) return null;
	const first = place.split(',')[0].trim();
	return makeCandidate(
		{
			title: it.title, start: d.start, end: d.end, city: online ? ONLINE : canonicalCity(first) ?? detectCity(place),
			url: it.link, desc: it.categories.join(', '), online, country: germany ? 'DE' : null,
		},
		src,
	);
}
