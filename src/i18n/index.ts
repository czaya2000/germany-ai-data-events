/* Entry point of the i18n layer: `t(locale)` for the strings, plus the
   helpers that turn stored values (city names, formats, hubs, costs) into
   display text. Path helpers are in ./paths.mjs, date/cost formatting in ./format.ts. */
import { de } from './de.ts';
import { en } from './en.ts';
import type { Messages } from './en.ts';
import type { Locale } from './format.ts';

export type { Messages, Locale };
export { INTL_LOCALE, localizeCost, formatDateRange, formatDateCompact, dateSpine, formatNumber } from './format.ts';

const TABLES: Record<Locale, Messages> = { de, en };

/** The UI strings for a locale. */
export function t(locale: Locale): Messages {
	return TABLES[locale];
}

/** Narrows anything (Astro.currentLocale, a prop) to a supported locale; German is the default. */
export function toLocale(value: unknown): Locale {
	return value === 'en' ? 'en' : 'de';
}

/** Fills "{n}" style placeholders. */
export function fmt(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

/** A stored place name for display: "Online (DE)" -> "Online"; German also "Munich" -> "München",
    "Other Germany" -> "Übrige Orte". Handles "Garching (Munich)". Unknown places show as stored. */
export function displayCity(city: string, locale: Locale): string {
	const names = t(locale).placeNames;
	if (names[city]) return names[city];
	const bracket = city.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
	if (bracket) {
		const inner = names[bracket[2]] ?? bracket[2];
		return `${names[bracket[1]] ?? bracket[1]} (${inner})`;
	}
	return city;
}

/** A stored format (the English enum value) for display: "Conference" -> "Konferenz". */
export function formatLabel(format: string, locale: Locale): string {
	return t(locale).hub.formats[format]?.label ?? format;
}

/** The wording of a city or type page in one language. `hub` is an entry of HUBS (src/lib/hubs.mjs). */
export interface HubLike {
	kind: string;
	slug: string;
	label: string;
}

export function hubText(hub: HubLike, locale: Locale) {
	const s = t(locale).hub;
	if (hub.kind === 'city') {
		const online = hub.slug === 'online';
		const other = hub.slug === 'other-germany';
		const label = displayCity(hub.label, locale);
		return {
			label,
			linkLabel: label,
			h1: online ? s.h1Online : other ? s.h1Other : s.h1City(label),
			where: online ? s.whereOnline : other ? s.whereOther : s.whereCity(label),
			nearby: s.nearby[hub.slug] ?? '',
			one: s.cityNoun[0],
			many: s.cityNoun[1],
			// Plain word for sentences that carry no adjective ("no upcoming events").
			plainMany: locale === 'de' ? 'Events' : 'events',
		};
	}
	const f = s.formats[hub.label];
	return {
		label: f.label,
		linkLabel: f.link,
		h1: s.h1Format(f.plural),
		where: s.whereFormat,
		nearby: '',
		one: f.upOne,
		many: f.upMany,
		plainMany: f.many,
	};
}
