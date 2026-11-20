/* When does an event end? Pure functions on Europe/Berlin wall-clock strings
   ("YYYY-MM-DDTHH:MM:SS"), which compare correctly as plain strings, so no UTC
   offset or DST arithmetic is needed. Plain .mjs: used by Astro, the digest
   script and the node tests. The listing's client script mirrors endWall()
   (the server writes the value into data-end on every row). */
import { TIMEZONE } from '../../config/country.mjs';

const pad = (n) => String(n).padStart(2, '0');

/** The Berlin wall-clock "YYYY-MM-DDTHH:MM:SS" of an instant. */
export function wallClockIn(instant, timeZone = TIMEZONE) {
	const p = new Intl.DateTimeFormat('en-CA', {
		timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hourCycle: 'h23',
	})
		.formatToParts(instant)
		.reduce((acc, x) => ({ ...acc, [x.type]: x.value }), {});
	return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}`;
}

/** Now in Berlin wall-clock. Test hooks, unset in production: SITE_NOW (ISO instant, e.g.
    2026-11-20T13:00:00+01:00) freezes date and time; SITE_TODAY (YYYY-MM-DD) freezes the date
    at 00:00, so nothing has ended yet that day. */
export function siteNow() {
	const env = typeof process !== 'undefined' ? process.env : {};
	if (env?.SITE_NOW && !Number.isNaN(Date.parse(env.SITE_NOW))) return wallClockIn(new Date(env.SITE_NOW));
	if (env?.SITE_TODAY && /^\d{4}-\d{2}-\d{2}$/.test(env.SITE_TODAY)) return `${env.SITE_TODAY}T00:00:00`;
	return wallClockIn(new Date());
}

/** The end time of day of "09:00–17:30", "10:00-12:00" or "10:00 – 12:00" as "HH:MM"; null for a
    lone start time ("10:00"), no time, or anything else. */
export function endTimeOf(time) {
	const m = String(time ?? '').match(/^\s*\d{1,2}:\d{2}\s*[–—-]\s*(\d{1,2}):(\d{2})\s*$/);
	return m ? `${pad(Number(m[1]))}:${m[2]}` : null;
}

/** When the event is over, Berlin wall-clock: the end time on the last day, or the last second of the
    last day (endDate, else date) when there is no end time. */
export function endWall(data) {
	const day = data.endDate ?? data.date;
	const end = endTimeOf(data.time);
	return end ? `${day}T${end}:00` : `${day}T23:59:59`;
}

/** True once the event's end instant is before `now` (Berlin wall-clock; default: now). */
export function hasEnded(data, now = siteNow()) {
	return endWall(data) < now;
}

/** "Today" group rule: the event has not ended and began on or before the date of `now`. */
export function isRunningToday(data, now = siteNow()) {
	return !hasEnded(data, now) && data.date <= now.slice(0, 10);
}

/** Listing card meta line: ONLY the city and the time ("Köln, 14:30–22:30", or just "Berlin").
    Never the venue or address; those stay on the event page. The event data has no online or
    hybrid field, so no "+ online" is added (it would have to be parsed out of the venue text). */
export function cardMeta(city, time) {
	return [city, time]
		.map((x) => String(x ?? '').trim())
		.filter(Boolean)
		.join(', ');
}
