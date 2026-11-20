/* Locale-aware formatting of dates, weekdays, months, costs and numbers.
   No Astro imports, so the node tests can load it. Stored data stays English
   ("Free", "EUR 49"); it is localised here at render time only. */
import { TIMEZONE, NOT_LISTED } from '../../config/country.mjs';

export type Locale = 'de' | 'en';

/** Intl locale per site language. */
export const INTL_LOCALE: Record<Locale, string> = { de: 'de-DE', en: 'en-GB' };

const DATE_RANGE_OPTS: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
const noDot = (s: string) => s.replace(/\.$/, '');

/** The calendar date (YYYY-MM-DD) of an instant in the site's time zone (Europe/Berlin), not UTC. */
export function isoDateIn(instant: Date, timeZone = TIMEZONE): string {
	const p = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' })
		.formatToParts(instant)
		.reduce<Record<string, string>>((acc, x) => ({ ...acc, [x.type]: x.value }), {});
	return `${p.year}-${p.month}-${p.day}`;
}

/** Today in Europe/Berlin. SITE_TODAY (YYYY-MM-DD) freezes it for the e2e build; production never sets it. */
export function today(): string {
	const frozen = typeof process !== 'undefined' ? process.env?.SITE_TODAY : undefined;
	return frozen && /^\d{4}-\d{2}-\d{2}$/.test(frozen) ? frozen : isoDateIn(new Date());
}

/** Weekday, day and month for the date column: "Thu", 12, "Nov" / "Do", 12, "Nov". */
export function dateSpine(date: string, locale: Locale = 'en') {
	const d = new Date(`${date}T00:00:00Z`);
	const f = (opts: Intl.DateTimeFormatOptions) =>
		noDot(new Intl.DateTimeFormat(INTL_LOCALE[locale], { ...opts, timeZone: 'UTC' }).format(d));
	return { weekday: f({ weekday: 'short' }), day: d.getUTCDate(), month: f({ month: 'short' }) };
}

export function formatDateRange(date: string, endDate?: string, locale: Locale = 'en'): string {
	const part = (iso: string) =>
		new Date(`${iso}T00:00:00Z`).toLocaleDateString(INTL_LOCALE[locale], { ...DATE_RANGE_OPTS, timeZone: 'UTC' });
	const start = part(date);
	if (!endDate || endDate === date) return start;
	return `${start} – ${part(endDate)}`;
}

/** "12 Nov 2026", "12–13 Nov 2026" or "30 Nov – 2 Dec 2026" (German: "12. Nov. 2026", "12.–13. Nov. 2026"):
    short enough for a page title. */
export function formatDateCompact(date: string, endDate?: string, locale: Locale = 'en'): string {
	const part = (iso: string, opts: Intl.DateTimeFormatOptions) =>
		new Date(`${iso}T00:00:00Z`).toLocaleDateString(INTL_LOCALE[locale], { ...opts, timeZone: 'UTC' });
	const full = part(endDate && endDate !== date ? endDate : date, DATE_RANGE_OPTS);
	if (!endDate || endDate === date) return full;
	if (date.slice(0, 7) === endDate.slice(0, 7)) {
		return `${Number(date.slice(8))}${locale === 'de' ? '.' : ''}–${full}`;
	}
	const start = part(
		date,
		date.slice(0, 4) === endDate.slice(0, 4) ? { day: 'numeric', month: 'short' } : DATE_RANGE_OPTS,
	);
	return `${start} – ${full}`;
}

/** "Last scanned" stamp: "20 Nov 2026, 06:30 Europe/Berlin" / "20.11.2026, 06:30 Europe/Berlin". */
export function formatLastScan(iso: string, locale: Locale = 'en'): string {
	const fmt = new Intl.DateTimeFormat(INTL_LOCALE[locale], {
		dateStyle: 'medium',
		timeStyle: 'short',
		timeZone: TIMEZONE,
	});
	return `${fmt.format(new Date(iso))} ${TIMEZONE}`;
}

/* ---- Week bands ------------------------------------------------------- */

/** Monday of the ISO week containing `date`, as YYYY-MM-DD. */
export function weekStart(date: string): string {
	const d = new Date(`${date}T00:00:00Z`);
	const shift = (d.getUTCDay() + 6) % 7; // Monday = 0
	d.setUTCDate(d.getUTCDate() - shift);
	return d.toISOString().slice(0, 10);
}

/** "7 – 13 September" / "7. – 13. September"; "28 September – 4 October" across a month boundary. */
export function weekRangeLabel(mondayISO: string, locale: Locale = 'en'): string {
	const intl = INTL_LOCALE[locale];
	const start = new Date(`${mondayISO}T00:00:00Z`);
	const end = new Date(start);
	end.setUTCDate(end.getUTCDate() + 6);
	const day = new Intl.DateTimeFormat(intl, { day: 'numeric', timeZone: 'UTC' });
	const dayMonth = new Intl.DateTimeFormat(intl, { day: 'numeric', month: 'long', timeZone: 'UTC' });
	const sameMonth = start.getUTCMonth() === end.getUTCMonth();
	const left = sameMonth ? `${day.format(start)}${locale === 'de' ? '.' : ''}` : dayMonth.format(start);
	return `${left} – ${dayMonth.format(end)}`;
}

export interface WeekBand {
	key: string;
	primary: string;
	current: boolean;
}

export function weekBand(mondayISO: string, locale: Locale = 'en', ref = today()): WeekBand {
	return {
		key: mondayISO,
		primary: weekRangeLabel(mondayISO, locale),
		current: mondayISO === weekStart(ref),
	};
}

/* ---- Cost ------------------------------------------------------------- */

const euro = (locale: Locale, amount: string) => {
	const n = Number(amount.replace(/[,']/g, ''));
	return new Intl.NumberFormat(INTL_LOCALE[locale], {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
	}).format(n);
};

/** True when the stored organiser is the literal "Not listed" (or empty): no real organiser is known. */
export function organiserUnknown(organiser: string | undefined | null): boolean {
	const o = (organiser ?? '').trim();
	return !o || o.toLowerCase() === NOT_LISTED.toLowerCase();
}

/** Organiser for display: the stored value; "Not listed" shows as "Nicht angegeben" in German. */
export function localizeOrganiser(organiser: string, locale: Locale = 'en'): string {
	if (!organiserUnknown(organiser)) return organiser;
	return locale === 'de' ? 'Nicht angegeben' : NOT_LISTED;
}

const AMOUNT =String.raw`(\d[\d,']*(?:\.\d{1,2})?)`;

/**
 * The cost text for display. Costs are stored in English ("Free", "Not listed",
 * "EUR 49", "From EUR 199", "EUR 690 excl. VAT"); English is returned as stored.
 * German: "Kostenlos", "Nicht angegeben", "49 €", "ab 199 €", "690 € zzgl. MwSt.".
 * Texts with other wording keep their words, with the amounts and the common
 * terms translated.
 */
export function localizeCost(cost: string, locale: Locale = 'en'): string {
	if (locale === 'en') return cost;
	const text = cost.trim();
	if (/^free$/i.test(text)) return 'Kostenlos';
	if (/^not listed$/i.test(text)) return 'Nicht angegeben';
	return text
		.replace(new RegExp(`\\bEUR ?${AMOUNT}`, 'g'), (_, n) => euro(locale, n))
		.replace(new RegExp(`${AMOUNT} ?EUR\\b`, 'g'), (_, n) => euro(locale, n))
		.replace(/^From\b/i, 'ab')
		.replace(/\bfrom\b/g, 'ab')
		.replace(/\bFree\b/g, 'Kostenlos')
		.replace(/\bfree\b/g, 'kostenlos')
		.replace(/\bexcl\. VAT\b/g, 'zzgl. MwSt.')
		.replace(/\bincl\. VAT\b/g, 'inkl. MwSt.')
		.replace(/\bsold out\b/gi, 'ausverkauft')
		.replace(/\bNot listed\b/g, 'Nicht angegeben')
		.replace(/\bin person\b/g, 'vor Ort')
		.replace(/\bfor members\b/g, 'für Mitglieder')
		.replace(/\bguests\b/g, 'Gäste');
}

/** A whole number in the locale's grouping ("1.200" / "1,200"). */
export function formatNumber(n: number, locale: Locale = 'en'): string {
	return new Intl.NumberFormat(INTL_LOCALE[locale]).format(n);
}
