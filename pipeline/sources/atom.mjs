// Atom sources (CAIML Cologne). Only entries that carry a date are kept: the date is taken from the
// /YYYY/MM/DD/ part of the entry URL, else from a date in the text; announcements without one are dropped.
import { getText } from '../lib/cache.mjs';
import { parseAtom } from '../lib/feeds.mjs';
import { makeCandidate, parseDateText, stripHtml } from '../lib/normalize.mjs';

export async function fetchSource(src, ctx) {
	const r = await getText(src.url, ctx, { accept: 'application/atom+xml, application/xml, text/xml, */*' });
	if (!r.ok) throw new Error('HTTP ' + r.status);
	if (!/<feed[\s>]/.test(r.text)) throw new Error('not an Atom document');
	return parseAtom(r.text);
}

export function normalise(e, src) {
	const body = stripHtml(e.summary || e.content);
	let d = null;
	const m = /\/(\d{4})\/(\d{2})\/(\d{2})\//.exec(e.link);
	if (m) d = { start: `${m[1]}-${m[2]}-${m[3]}`, end: `${m[1]}-${m[2]}-${m[3]}` };
	d ??= parseDateText(e.title) ?? parseDateText(body.slice(0, 400));
	if (!d) return null;
	return makeCandidate(
		{ title: e.title, start: d.start, end: d.end, city: src.cityHint, organiser: src.organiser, url: e.link, desc: body, country: 'DE' },
		src,
	);
}
