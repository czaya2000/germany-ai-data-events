// City detection and grouping. Event `city` values use the English name.
import { CITIES, PLACE_TO_CITY } from '../../config/country.mjs';

export const ONLINE = 'Online (DE)';
export const NATIONWIDE = 'Nationwide';

/** lowercase, strip diacritics, collapse non-letters to single spaces */
export function fold(s) {
	return String(s ?? '')
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/ß/g, 'ss')
		.toLowerCase();
}
const slugify = (s) => fold(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// [needle (folded, whole-word), English display name]
const NAMES = [
	['berlin', 'Berlin'], ['potsdam', 'Potsdam'],
	['munich', 'Munich'], ['muenchen', 'Munich'], ['munchen', 'Munich'], ['garching', 'Garching'],
	['hamburg', 'Hamburg'], ['norderstedt', 'Norderstedt'],
	['frankfurt', 'Frankfurt'], ['darmstadt', 'Darmstadt'], ['mainz', 'Mainz'], ['wiesbaden', 'Wiesbaden'], ['offenbach', 'Offenbach'],
	['cologne', 'Cologne'], ['koeln', 'Cologne'], ['koln', 'Cologne'], ['bonn', 'Bonn'],
	['dusseldorf', 'Düsseldorf'], ['duesseldorf', 'Düsseldorf'], ['leverkusen', 'Leverkusen'],
	['stuttgart', 'Stuttgart'], ['tubingen', 'Tübingen'], ['tuebingen', 'Tübingen'], ['ludwigsburg', 'Ludwigsburg'],
	['esslingen', 'Esslingen'], ['boblingen', 'Böblingen'], ['sindelfingen', 'Sindelfingen'],
	['leipzig', 'Leipzig'], ['dresden', 'Dresden'], ['nuremberg', 'Nuremberg'], ['nurnberg', 'Nuremberg'], ['nuernberg', 'Nuremberg'],
	['karlsruhe', 'Karlsruhe'], ['heidelberg', 'Heidelberg'], ['munster', 'Münster'], ['muenster', 'Münster'], ['ulm', 'Ulm'],
	['kassel', 'Kassel'], ['hanover', 'Hanover'], ['hannover', 'Hanover'], ['bremen', 'Bremen'], ['dortmund', 'Dortmund'],
	['essen', 'Essen'], ['mannheim', 'Mannheim'], ['freiburg', 'Freiburg'], ['aachen', 'Aachen'], ['saarbrucken', 'Saarbrücken'],
	['augsburg', 'Augsburg'], ['jena', 'Jena'], ['erfurt', 'Erfurt'], ['rostock', 'Rostock'], ['kiel', 'Kiel'],
	['paderborn', 'Paderborn'], ['bochum', 'Bochum'], ['regensburg', 'Regensburg'], ['wurzburg', 'Würzburg'],
	['wuerzburg', 'Würzburg'], ['magdeburg', 'Magdeburg'], ['braunschweig', 'Braunschweig'], ['warendorf', 'Warendorf'],
	['kaiserslautern', 'Kaiserslautern'], ['konstanz', 'Konstanz'], ['siegen', 'Siegen'], ['oldenburg', 'Oldenburg'],
	['chemnitz', 'Chemnitz'], ['gottingen', 'Göttingen'], ['luebeck', 'Lübeck'], ['lubeck', 'Lübeck'], ['halle', 'Halle'],
	['ingolstadt', 'Ingolstadt'], ['bielefeld', 'Bielefeld'], ['duisburg', 'Duisburg'], ['wolfsburg', 'Wolfsburg'],
];
const NAME_RE = new RegExp('(?:^|[^a-z])(' + NAMES.map((n) => n[0]).join('|') + ')(?![a-z])');
const NAME_MAP = new Map(NAMES);

/** First known German city named in `text`, as its English display name, or null. */
export function detectCity(text) {
	const m = NAME_RE.exec(fold(text));
	return m ? NAME_MAP.get(m[1]) : null;
}

/** Normalise a free-form city value ("München", "Frankfurt am Main") to our English name, or keep it trimmed. */
export function canonicalCity(raw) {
	if (!raw) return null;
	const s = String(raw).trim();
	if (!s) return null;
	return detectCity(s) ?? s;
}

/** City hub slug for a city name ('berlin', ..., 'other-germany', 'online', or null if unknown). */
export function hubSlug(city) {
	if (!city) return null;
	if (city === ONLINE) return 'online';
	if (city === NATIONWIDE) return null;
	return PLACE_TO_CITY[slugify(city)] ?? 'other-germany';
}

export function hubLabel(city) {
	const slug = hubSlug(city);
	if (!slug) return 'Unknown';
	return CITIES.find((c) => c.slug === slug)?.label ?? 'Other Germany';
}

/** Cities are compatible when equal, either is unknown/online/nationwide, or both sit in the same hub. */
export function citiesCompatible(a, b) {
	if (!a || !b) return true;
	if (a === ONLINE || b === ONLINE || a === NATIONWIDE || b === NATIONWIDE) return true;
	if (a === b) return true;
	const ha = hubSlug(a), hb = hubSlug(b);
	return ha === hb && ha !== 'other-germany';
}

/** Every distinct known German city named in `text` (English display names). */
export function citiesIn(text) {
	const re = new RegExp(NAME_RE.source, 'g');
	const out = new Set();
	const t = fold(text);
	let m;
	while ((m = re.exec(t))) {
		out.add(NAME_MAP.get(m[1]));
		re.lastIndex = m.index + m[0].length - 1; // the lookahead char may start the next match
	}
	return out;
}

const onlyCity = (set) => (set.size === 1 ? Array.from(set)[0] : null);

/** The city a venue string points to, only when it names exactly one known city. */
export const cityFromVenue = (venue) => (venue ? onlyCity(citiesIn(venue)) : null);

/** The city a URL points to (hostname, subdomain or path), only when it names exactly one known city. */
export function cityFromUrl(url) {
	let u;
	try { u = new URL(String(url ?? '').trim()); } catch { return null; }
	let path = u.pathname;
	try { path = decodeURIComponent(path); } catch { /* keep raw */ }
	return onlyCity(citiesIn(`${u.hostname} ${path}`));
}

/**
 * Pick the event city. The feed city is overridden when the venue string, or else the URL, names exactly
 * one known city that is not compatible with it (same city or same hub is no conflict).
 * Venue beats URL when both name a city. Online and nationwide events are left alone.
 */
export function resolveCity({ city, venue, url, online } = {}) {
	if (online || city === ONLINE || city === NATIONWIDE) return city ?? null;
	let v = cityFromVenue(venue);
	const u = cityFromUrl(url);
	// A venue that is only the feed city's own name ("Munich") is no independent evidence.
	if (v && city && isBareCity(venue) && citiesCompatible(city, v)) v = null;
	const evident = v ?? u;
	if (!evident || !city) return city ?? evident ?? null;
	if (citiesCompatible(city, evident)) return city;
	// The feed city and the URL agree against a street-address venue: two sources against one, keep the feed city.
	if (v && u && citiesCompatible(city, u)) return city;
	return evident;
}

/** True when a venue string is nothing but a city name ("Munich", "Berlin, Germany"). */
function isBareCity(venue) {
	const rest = fold(venue).replace(/\b(germany|deutschland|de)\b/g, '');
	let t = rest;
	for (const c of citiesIn(venue)) for (const [needle, name] of NAMES) if (name === c) t = t.split(needle).join('');
	return !/[a-z0-9]/.test(t);
}
