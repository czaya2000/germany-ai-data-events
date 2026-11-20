// Hand-off files for the Claude step: caps, compact candidate records, chunking.
import { createHash } from 'node:crypto';

export const MAX_INPUT_CHARS = 1800; // per candidate, JSON-serialised
export const CHUNK_SIZE = 60;
export const BOOTSTRAP_CAP = 1000;

export const candidateId = (c) => 'c_' + createHash('sha1').update(c.key).digest('hex').slice(0, 10);

/** Soonest events first; the first `cap` are sent, the rest are deferred to the next run. */
export function applyCap(cands, cap) {
	const sorted = [...cands].sort((a, b) => a.start.localeCompare(b.start) || a.title.localeCompare(b.title));
	return { send: sorted.slice(0, cap), deferred: sorted.slice(cap) };
}

/** What Claude sees: no URL beyond what is needed, never anything to "improve". */
export function compactCandidate(c) {
	const rec = {
		id: candidateId(c),
		title: c.title,
		organiser: c.organiser || undefined,
		city: c.city || undefined,
		date: c.start,
		venue: c.venue || undefined,
		source: c.sourceLabels?.join(', ') ?? c.sourceLabel,
		trust: c.trust,
		desc: c.desc.slice(0, 500),
	};
	// Enforce the per-candidate input cap by shrinking the description.
	let s = JSON.stringify(rec);
	if (s.length > MAX_INPUT_CHARS) {
		rec.desc = rec.desc.slice(0, Math.max(0, rec.desc.length - (s.length - MAX_INPUT_CHARS)));
		s = JSON.stringify(rec);
	}
	return rec;
}

export function chunk(list, size = CHUNK_SIZE) {
	const out = [];
	for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
	return out;
}
