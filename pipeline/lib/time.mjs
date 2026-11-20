// Time helpers. Everything is converted to Europe/Berlin local date/time.
import { TIMEZONE } from '../../config/country.mjs';

const fmtCache = new Map();
function dtf(tz) {
	if (!fmtCache.has(tz)) {
		fmtCache.set(
			tz,
			new Intl.DateTimeFormat('en-CA', {
				timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
				hour: '2-digit', minute: '2-digit', second: '2-digit',
			}),
		);
	}
	return fmtCache.get(tz);
}
const pad = (n) => String(n).padStart(2, '0');

/** Wall-clock parts of a UTC instant in a zone. */
export function partsInZone(ms, tz = TIMEZONE) {
	const o = {};
	for (const p of dtf(tz).formatToParts(new Date(ms))) o[p.type] = p.value;
	return { y: +o.year, mo: +o.month, d: +o.day, h: +o.hour, mi: +o.minute, s: +o.second };
}

/** UTC instant (ms) -> { date: 'YYYY-MM-DD', time: 'HH:MM' } in Europe/Berlin. */
export function utcToLocal(ms, tz = TIMEZONE) {
	const p = partsInZone(ms, tz);
	return { date: `${p.y}-${pad(p.mo)}-${pad(p.d)}`, time: `${pad(p.h)}:${pad(p.mi)}` };
}

/** Wall-clock time in `tz` -> UTC ms (handles DST by fixed-point iteration). */
export function zonedToUtc(y, mo, d, h, mi, tz) {
	const guess = Date.UTC(y, mo - 1, d, h, mi);
	let t = guess;
	for (let i = 0; i < 3; i++) {
		const p = partsInZone(t, tz);
		const asUtc = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi);
		t += guess - asUtc;
	}
	return t;
}

export function isoToLocal(iso, tz = TIMEZONE) {
	const ms = Date.parse(iso);
	return Number.isNaN(ms) ? null : utcToLocal(ms, tz);
}

export function today(now = Date.now()) {
	return utcToLocal(now).date;
}
export function addDays(date, n) {
	const [y, m, d] = date.split('-').map(Number);
	return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}
export function daysBetween(a, b) {
	return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86400000);
}
export function timeRange(startT, endT) {
	if (!startT) return undefined;
	return endT && endT !== startT ? `${startT}–${endT}` : startT;
}
export const MONTHS = {
	january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
	july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};
