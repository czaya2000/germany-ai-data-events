// Ledger: remembers every decision so nothing is judged twice. Keys: u:<canonical url>, t:<normTitle>|<date>.
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { addDays } from './time.mjs';
import { ledgerKeys, normTitle } from './normalize.mjs';
import { sameEvent } from './dedupe.mjs';

export function loadJson(path, fallback) {
	if (!existsSync(path)) return fallback;
	try {
		return JSON.parse(readFileSync(path, 'utf8'));
	} catch {
		return fallback;
	}
}
export function saveJson(path, data) {
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, JSON.stringify(data, null, '\t') + '\n');
}

export const emptyLedger = () => ({ version: 1, lastMissingCheck: null, entries: {} });
export function loadLedger(path) {
	const l = loadJson(path, null);
	return l && l.entries ? l : emptyLedger();
}

/** A candidate is known if any of its keys is in the ledger. Returns the entry or null. */
export function lookup(ledger, cand) {
	for (const k of cand.keys ?? ledgerKeys(cand)) {
		const e = ledger.entries[k];
		if (e) return e;
	}
	return null;
}

/** Record a decision under every key of the candidate. */
export function record(ledger, cand, decision, { today, eventId, reason } = {}) {
	const entry = {
		decision,
		...(eventId ? { eventId } : {}),
		...(reason ? { reason } : {}),
		firstSeen: today,
		lastSeen: today,
		end: cand.end,
		sources: [...new Set(cand.sources ?? [cand.sourceId])],
		missingDays: 0,
	};
	for (const k of cand.keys ?? ledgerKeys(cand)) {
		ledger.entries[k] = { ...entry, ...(ledger.entries[k]?.firstSeen ? { firstSeen: ledger.entries[k].firstSeen } : {}) };
	}
	return entry;
}

/** Update lastSeen/sources on a known entry; resets missingDays. */
export function touch(entry, cand, today) {
	entry.lastSeen = today;
	entry.missingDays = 0;
	entry.end = cand.end ?? entry.end;
	entry.sources = [...new Set([...(entry.sources ?? []), ...(cand.sources ?? [cand.sourceId])])];
}

/** Drop entries 7 days after the event's end date. Returns the number pruned. */
export function prune(ledger, today, graceDays = 7) {
	let n = 0;
	for (const [k, e] of Object.entries(ledger.entries)) {
		if (e.end && addDays(e.end, graceDays) < today) {
			delete ledger.entries[k];
			n++;
		}
	}
	return n;
}

/**
 * Cancelled/vanished events: for curated sources that list the whole future calendar, an accepted
 * event missing from a SUCCESSFUL fetch of its own source on two consecutive daily runs is reported.
 * `seen` is a Map<sourceId, Set<key>> of keys returned this run; `okSources` the sources that fetched fine.
 * Returns the list of eventIds to remove. Runs at most once per day.
 */
export function updateMissing(ledger, { seen, okSources, wholeCalendar, today }) {
	if (ledger.lastMissingCheck === today) return [];
	ledger.lastMissingCheck = today;
	const remove = new Set();
	for (const [k, e] of Object.entries(ledger.entries)) {
		if (e.decision !== 'accepted' || !k.startsWith('u:') || !e.eventId) continue;
		const own = (e.sources ?? []).filter((s) => wholeCalendar.has(s));
		if (own.length !== (e.sources ?? []).length || !own.length) continue;
		if (e.end < today) continue;
		if (!own.every((s) => okSources.has(s))) continue; // never remove on a failed fetch
		const present = own.some((s) => seen.get(s)?.has(k));
		if (present) e.missingDays = 0;
		else if (++e.missingDays >= 2) remove.add(e.eventId);
	}
	return [...remove];
}

/** Match a candidate against already-published events (events.json / archive.json). */
export function matchesExisting(cand, existing) {
	const urlKeys = new Set(cand.keys.filter((k) => k.startsWith('u:')));
	for (const ev of existing) {
		const evUrlKey = ledgerKeys({ url: ev.url, title: '', start: ev.date }).find((k) => k.startsWith('u:'));
		if (evUrlKey && urlKeys.has(evUrlKey)) return ev;
		if (sameEvent({ title: cand.title, start: cand.start, city: cand.city }, { title: ev.title, start: ev.date, city: ev.city })) return ev;
	}
	return null;
}

export { normTitle };
