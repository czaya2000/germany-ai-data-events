// RSS sources. Each feed has quirks about where the event date lives; `src.dateMode` selects the rule:
//   slug-date  - date is the leading YYYY-MM-DD of the URL path (mcml.ai)
//   pubdate    - pubDate is the event date (LMU events feed)
//   text       - parse a German or English date from title, then description (DeutschlandKI, aieventlist, Startup City)
import { getText } from '../lib/cache.mjs';
import { parseRss } from '../lib/feeds.mjs';
import { detectCity, ONLINE } from '../lib/city.mjs';
import { makeCandidate, parseDateText, stripHtml } from '../lib/normalize.mjs';
import { utcToLocal } from '../lib/time.mjs';

export async function fetchSource(src, ctx) {
	const r = await getText(src.url, ctx, { accept: 'application/rss+xml, application/xml, text/xml, */*' });
	if (!r.ok) throw new Error('HTTP ' + r.status);
	const items = parseRss(r.text);
	if (!items.length && !/<rss|<channel/i.test(r.text)) throw new Error('not an RSS document');
	return items;
}

function dateFor(it, src, desc) {
	switch (src.dateMode) {
		case 'slug-date': {
			const m = /\/(\d{4}-\d{2}-\d{2})-/.exec(it.link);
			return m ? { start: m[1], end: m[1] } : null;
		}
		case 'pubdate': {
			const ms = Date.parse(it.pubDate);
			if (Number.isNaN(ms)) return null;
			const d = utcToLocal(ms).date;
			return { start: d, end: d };
		}
		default:
			return parseDateText(it.title) ?? parseDateText(desc);
	}
}

export function normalise(it, src) {
	const desc = stripHtml(it.description);
	const d = dateFor(it, src, desc);
	if (!d) return null;
	const title = it.title.replace(/\s*\((?:\d{1,2}\.\s*[–-]\s*)?\d{1,2}\.\s*[^)]*\d{4}\)\s*$/, '').replace(/:\s*\d{1,2}\.[^,]*\d{4},\s*[^,]+$/, '').trim() || it.title;
	const ortLine = /Ort:\s*([^\n]+)/.exec(desc)?.[1];
	const city = detectCity(ortLine ?? '') ?? detectCity(it.title) ?? detectCity(it.categories.join(' ')) ?? src.cityHint ?? null;
	const online = /\bonline\b/i.test(ortLine ?? '') && !detectCity(ortLine ?? '');
	return makeCandidate(
		{
			title, start: d.start, end: d.end, city: online ? ONLINE : city, venue: ortLine && !online ? ortLine : undefined,
			organiser: src.organiser, url: it.link || it.guid, desc, online, country: src.country ?? (city ? 'DE' : null),
		},
		src,
	);
}
