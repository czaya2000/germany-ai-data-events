// Dedupe: port of match() from reference/dedupe-and-keywords.py, plus clustering and merge.
import { citiesCompatible } from './city.mjs';
import { normTitle } from './normalize.mjs';
import { daysBetween } from './time.mjs';

/** Dice coefficient over character bigrams (stands in for difflib's ratio). */
export function charSimilarity(a, b) {
	if (a === b) return 1;
	if (a.length < 2 || b.length < 2) return 0;
	const grams = (s) => {
		const m = new Map();
		for (let i = 0; i < s.length - 1; i++) {
			const g = s.slice(i, i + 2);
			m.set(g, (m.get(g) ?? 0) + 1);
		}
		return m;
	};
	const ga = grams(a), gb = grams(b);
	let inter = 0;
	for (const [g, n] of ga) inter += Math.min(n, gb.get(g) ?? 0);
	return (2 * inter) / (a.length - 1 + (b.length - 1));
}

/** Title match on normalised titles. */
export function titlesMatch(nta, ntb) {
	if (nta && nta === ntb) return true;
	const ta = new Set(nta.split(' ').filter(Boolean));
	const tb = new Set(ntb.split(' ').filter(Boolean));
	if (!ta.size || !tb.size) return false;
	let inter = 0;
	for (const t of ta) if (tb.has(t)) inter++;
	const union = ta.size + tb.size - inter;
	if (inter / union >= 0.6) return true;
	const small = Math.min(ta.size, tb.size);
	if (small >= 2 && inter / small >= 0.8 && inter >= 2) return true;
	return charSimilarity(nta, ntb) >= 0.85;
}

/** a, b: { title, start, city, nt? }. */
export function sameEvent(a, b) {
	if (Math.abs(daysBetween(a.start, b.start)) > 1) return false;
	if (!citiesCompatible(a.city, b.city)) return false;
	return titlesMatch(a.nt ?? normTitle(a.title), b.nt ?? normTitle(b.title));
}

/** Lower is better: organiser/Meetup/Luma page, then Eventbrite, then curated, then aggregators. */
export function sourcePriority(c) {
	if (c.sourceType === 'meetup' || c.sourceType === 'luma') return 0;
	if (c.sourceType === 'eventbrite') return 1;
	if (c.role === 'lead') return 4;
	if (c.trust === 'curated') return 2;
	return 3;
}

const AGGREGATOR_HOSTS = /(^|\.)(hackevents\.net|brainberg\.eu|dev\.events|aieventlist\.ai|agentconfs\.com|allai\.events|confs\.tech)$/;
function urlRank(url) {
	try {
		const h = new URL(url).hostname;
		if (AGGREGATOR_HOSTS.test(h)) return 2;
		if (/(^|\.)(meetup\.com|luma\.com|lu\.ma|eventbrite\.[a-z.]+)$/.test(h)) return 0;
		return 1;
	} catch {
		return 3;
	}
}

/**
 * Cluster candidates and return one merged record per cluster.
 * Each result: { ...best, members: [{sourceId, title}], sources: [ids] }.
 */
export function dedupe(cands, { onMerge } = {}) {
	const sorted = cands
		.map((c) => ({ c, nt: normTitle(c.title) }))
		.sort((x, y) => sourcePriority(x.c) - sourcePriority(y.c) || (y.c.desc?.length ?? 0) - (x.c.desc?.length ?? 0));
	const clusters = [];
	const byDate = new Map(); // date -> clusters starting that date, for cheap lookup
	for (const item of sorted) {
		let home = null;
		for (let d = -1; d <= 1 && !home; d++) {
			const date = shift(item.c.start, d);
			for (const cl of byDate.get(date) ?? []) {
				if (sameEvent({ title: cl.rep.c.title, start: cl.rep.c.start, city: cl.rep.c.city, nt: cl.rep.nt },
					{ title: item.c.title, start: item.c.start, city: item.c.city, nt: item.nt })) {
					home = cl;
					break;
				}
			}
		}
		if (home) {
			home.members.push(item);
			onMerge?.(home.rep.c, item.c);
		} else {
			const cl = { rep: item, members: [item] };
			clusters.push(cl);
			if (!byDate.has(item.c.start)) byDate.set(item.c.start, []);
			byDate.get(item.c.start).push(cl);
		}
	}
	return clusters.map((cl) => mergeCluster(cl));
}

function shift(date, n) {
	if (!n) return date;
	const [y, m, d] = date.split('-').map(Number);
	return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

function mergeCluster(cl) {
	const best = { ...cl.rep.c };
	const others = cl.members.slice(1).map((m) => m.c);
	// Prefer the organiser's own registration URL over an aggregator URL.
	const all = cl.members.map((m) => m.c);
	const bestUrl = all
		.flatMap((c) => [c.url, ...(c.extraUrls ?? [])])
		.filter(Boolean)
		.sort((a, b) => urlRank(a) - urlRank(b))[0];
	if (bestUrl) best.url = bestUrl;
	for (const o of others) {
		for (const f of ['organiser', 'venue', 'time', 'cost']) if (!best[f] && o[f]) best[f] = o[f];
		if (!best.city && o.city) best.city = o.city;
		if ((best.desc?.length ?? 0) < (o.desc?.length ?? 0) && best.trust !== 'curated') best.desc = o.desc;
		best.extraUrls = [...new Set([...(best.extraUrls ?? []), o.url, ...(o.extraUrls ?? [])].filter(Boolean))];
		best.keys = [...new Set([...best.keys, ...o.keys])];
		best.trust = trustMax(best.trust, o.trust);
		best.acceptAll = best.acceptAll || o.acceptAll;
	}
	best.sources = [...new Set(all.map((c) => c.sourceId))];
	best.sourceLabels = [...new Set(all.map((c) => c.sourceLabel))];
	best.members = all.map((c) => ({ sourceId: c.sourceId, title: c.title }));
	return best;
}

const RANK = { curated: 0, noisy: 1, lead: 2 };
// A cluster is as trustworthy as its most trusted member.
function trustMax(a, b) {
	return (RANK[a] ?? 1) <= (RANK[b] ?? 1) ? a : b;
}
