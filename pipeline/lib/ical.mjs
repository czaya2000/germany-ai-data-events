// ICS parsing with ical.js. Output is source-neutral; times are converted to Europe/Berlin.
import ICAL from 'ical.js';
import { TIMEZONE } from '../../config/country.mjs';
import { addDays, timeRange, utcToLocal, zonedToUtc } from './time.mjs';

function when(prop) {
	if (!prop) return null;
	const t = prop.getFirstValue();
	if (!t) return null;
	const pad = (n) => String(n).padStart(2, '0');
	if (t.isDate) return { date: `${t.year}-${pad(t.month)}-${pad(t.day)}`, time: null, allDay: true };
	const isUtc = t.zone && (t.zone === ICAL.Timezone.utcTimezone || t.zone.tzid === 'UTC');
	let ms;
	if (isUtc) ms = Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute);
	else ms = zonedToUtc(t.year, t.month, t.day, t.hour, t.minute, prop.getParameter('tzid') || TIMEZONE);
	return { ...utcToLocal(ms, TIMEZONE), allDay: false };
}

/** Parse an ICS document into plain event objects. Never throws on a bad VEVENT. */
export function parseIcs(text) {
	let comp;
	try {
		comp = new ICAL.Component(ICAL.parse(text));
	} catch {
		return { calName: null, events: [] };
	}
	const calName = comp.getFirstPropertyValue('x-wr-calname') || comp.getFirstPropertyValue('name') || null;
	const events = [];
	for (const v of comp.getAllSubcomponents('vevent')) {
		try {
			const s = when(v.getFirstProperty('dtstart'));
			if (!s) continue;
			let e = when(v.getFirstProperty('dtend'));
			let endDate = e?.date ?? s.date;
			// DTEND for all-day events is exclusive.
			if (s.allDay && e) endDate = e.date > s.date ? addDays(e.date, -1) : s.date;
			const str = (n) => {
				const x = v.getFirstPropertyValue(n);
				return x == null ? '' : String(x);
			};
			events.push({
				uid: str('uid'),
				title: str('summary').trim(),
				start: s.date,
				end: endDate,
				time: s.allDay ? undefined : timeRange(s.time, e && !e.allDay && e.date === s.date ? e.time : undefined),
				allDay: s.allDay,
				description: str('description'),
				location: str('location'),
				url: str('url'),
				status: str('status').toUpperCase(),
			});
		} catch {
			/* skip broken VEVENT */
		}
	}
	return { calName, events };
}
