// Deterministic filters: Germany + window, cancelled, duration, keyword prefilter.
import { readFileSync } from 'node:fs';
import { addDays, daysBetween } from './time.mjs';
import { fold } from './city.mjs';

let KW;
export function loadKeywords(path = new URL('../../config/keywords.json', import.meta.url)) {
	const k = JSON.parse(readFileSync(path, 'utf8'));
	return { include: new RegExp(k.include, 'i'), exclude: new RegExp(k.exclude, 'i') };
}
export function keywords() {
	return (KW ??= loadKeywords());
}

const CANCEL_RE = /\b(cancel+ed|abgesagt|verschoben|postponed)\b/i;

/** Returns null when the candidate passes, otherwise the reason it was dropped. */
export function dropReason(c, { today, windowDays, kw = keywords(), maxDays = 45 }) {
	if (c.cancelled || CANCEL_RE.test(c.title)) return 'cancelled';
	const isDE = c.country === 'DE';
	if (!(isDE || (c.online && c.onlineOk))) return 'country';
	const limit = addDays(today, windowDays);
	if (c.end < today || c.start > limit) return 'window';
	if (c.trust !== 'curated' && daysBetween(c.start, c.end) > maxDays) return 'long';
	if (kw.exclude.test(c.title)) return 'excluded';
	if (!c.acceptAll) {
		const hay = fold(c.title + ' ' + c.desc.slice(0, 300));
		if (!kw.include.test(c.title + ' ' + c.desc.slice(0, 300)) && !kw.include.test(hay)) return 'keyword';
	}
	return null;
}
