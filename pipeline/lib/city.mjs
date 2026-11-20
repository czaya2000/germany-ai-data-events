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
