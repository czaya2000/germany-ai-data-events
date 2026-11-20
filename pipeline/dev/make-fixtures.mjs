// One-off helper: save truncated (<50 KB) real responses into pipeline/fixtures/.
import { writeFileSync } from 'node:fs';
import { httpGet } from '../lib/http.mjs';

const OUT = new URL('../fixtures/', import.meta.url);
const LIMIT = 45000;

function truncIcs(t) {
	const head = t.slice(0, t.indexOf('BEGIN:VEVENT'));
	const parts = t.split('BEGIN:VEVENT').slice(1).map((p) => 'BEGIN:VEVENT' + p.split('END:VEVENT')[0] + 'END:VEVENT\r\n');
	let out = head;
	for (const p of parts) { if ((out + p).length > LIMIT) break; out += p; }
	return out + 'END:VCALENDAR\r\n';
}
function truncXml(t, tag) {
	const re = new RegExp('<' + tag + '[\\s>][\\s\\S]*?</' + tag + '>', 'g');
	const items = t.match(re) ?? [];
	if (!items.length) return t.slice(0, LIMIT);
	const first = t.indexOf(items[0]);
	const lastEnd = t.lastIndexOf('</' + tag + '>') + tag.length + 3;
	let out = t.slice(0, first);
	for (const it of items) { if ((out + it).length > LIMIT - 200) break; out += it; }
	return out + t.slice(lastEnd);
}

const jobs = [
	['meetup-ics.ics', 'https://www.meetup.com/pydata-berlin/events/ical/', truncIcs],
	['meetup-ics2.ics', 'https://www.meetup.com/betreute-intelligenz/events/ical/', truncIcs],
	['hackevents-ai.ics', 'https://www.hackevents.net/api/calendar?topic=ai-ml&country=de', truncIcs],
	['hessian.ics', 'https://www.hessian.ai/events/?ical=1', truncIcs],
	['agentconfs.ics', 'https://agentconfs.com/feeds/all.ics', truncIcs],
	['aieventlist-berlin.ics', 'https://aieventlist.ai/cities/berlin/events.ics', truncIcs],
	['bwcon.ics', 'https://events.bwcon.de/?ical=1', truncIcs],
	['brainberg.json', 'https://brainberg.eu/api/events?country=DE&limit=10', (t) => { const j = JSON.parse(t); j.events = j.events.slice(0, 8); return JSON.stringify(j, null, 1).slice(0, LIMIT); }],
	['luma-berlin.json', 'https://api.lu.ma/discover/get-paginated-events?discover_place_api_id=discplace-gCfX0s3E9Hgo3rG&pagination_limit=10', (t) => { const j = JSON.parse(t); j.entries = j.entries.slice(0, 8).map((e) => ({ api_id: e.api_id, event: e.event, calendar: { name: e.calendar?.name }, hosts: (e.hosts ?? []).map((h) => ({ name: h.name })) })); return JSON.stringify(j, null, 1).slice(0, LIMIT); }],
	['eventbrite.html', 'https://www.eventbrite.de/d/germany--berlin/artificial-intelligence/?page=1', (t) => { const m = [...t.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((x) => x[0]); return '<html><head>' + m.join('\n').slice(0, LIMIT) + '</head><body></body></html>'; }],
	['mcml.xml', 'https://mcml.ai/events/index.xml', (t) => truncXml(t, 'item')],
	['lmu.xml', 'https://www.lmu.de/de/newsroom/rss-feed-events.xml', (t) => truncXml(t, 'item')],
	['caiml.xml', 'https://caiml.events/feed.xml', (t) => truncXml(t, 'entry')],
	['deutschlandki.xml', 'https://deutschlandki.de/ki-events/feed.xml', (t) => truncXml(t, 'item')],
	['aieventlist.xml', 'https://aieventlist.ai/feed.xml', (t) => truncXml(t, 'item')],
	['devevents.xml', 'https://dev.events/rss.xml', (t) => truncXml(t, 'item')],
	['startupcity.xml', 'https://startupcity.hamburg/feed/events', (t) => truncXml(t, 'item')],
	['confstech.json', 'https://raw.githubusercontent.com/tech-conferences/conference-data/main/conferences/2026/data.json', (t) => JSON.stringify(JSON.parse(t).filter((c) => c.country === 'Germany').slice(0, 20)).slice(0, LIMIT)],
	['scrape.html', 'https://www.bifold.berlin/news-events/events', (t) => { const i = Math.max(0, t.indexOf('<main')); return '<html><body>' + t.slice(i, i + LIMIT); }],
];

for (const [name, url, fn] of jobs) {
	try {
		const r = await httpGet(url);
		if (!r.ok) { console.log('FAIL', name, r.status); continue; }
		const body = fn(r.text);
		writeFileSync(new URL(name, OUT), body);
		console.log('ok', name, body.length);
	} catch (e) {
		console.log('ERR', name, e.message);
	}
}
