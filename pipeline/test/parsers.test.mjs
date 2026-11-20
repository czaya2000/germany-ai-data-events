import test from 'node:test';
import assert from 'node:assert/strict';
import { parseIcs } from '../lib/ical.mjs';
import { parseRss, parseAtom } from '../lib/feeds.mjs';
import { normalise as normIcs } from '../sources/ics.mjs';
import { normalise as normBrainberg } from '../sources/brainberg.mjs';
import { normalise as normLuma } from '../sources/luma.mjs';
import { normalise as normEb, parseEventbrite } from '../sources/eventbrite.mjs';
import { normalise as normRss } from '../sources/rss.mjs';
import { normalise as normAtom } from '../sources/atom.mjs';
import { normalise as normDev } from '../sources/devevents.mjs';
import { normalise as normConfs } from '../sources/confstech.mjs';
import { groupsIn } from '../sources/meetup.mjs';
import { reduceHtml, robotsAllows } from '../sources/scrape.mjs';
import { fixture, src } from './helpers.mjs';

const ics = (name, s) => normIcs(parseIcs(fixture(name)), s);

test('Meetup ICS: group name as organiser, Berlin wall time, canonical meetup URL', () => {
	const out = ics('meetup-ics2.ics', src({ id: 'meetup:betreute-intelligenz', type: 'meetup', cityHint: 'Nuremberg' }));
	assert.ok(out.length >= 3);
	const first = out[0];
	assert.equal(first.organiser, 'KI-Community Betreute Intelligenz');
	assert.equal(first.start, '2026-11-26');
	assert.equal(first.time, '17:00–19:00');
	assert.match(first.url, /^https:\/\/www\.meetup\.com\/betreute-intelligenz\/events\/\d+/);
	assert.ok(first.keys[0].startsWith('u:meetup.com/betreute-intelligenz/events/'));
});

test('Meetup ICS: multi-day virtual event', () => {
	const out = ics('meetup-ics.ics', src({ id: 'meetup:pydata-berlin', type: 'meetup', cityHint: 'Berlin' }));
	const g = out.find((c) => /PyData Global/.test(c.title));
	assert.equal(g.start, '2026-12-09');
	assert.equal(g.end, '2026-12-10');
	assert.equal(g.online, true);
	assert.equal(g.city, 'Online (DE)');
});

test('hackevents ICS: all-day dates (exclusive DTEND), Register URL wins, details URL kept', () => {
	const out = ics('hackevents-ai.ics', src({ id: 'hackevents-ai', type: 'hackevents', role: 'lead' }));
	const m = out.find((c) => c.title === 'MLConf Berlin 2026');
	assert.equal(m.start, '2026-11-16');
	assert.equal(m.end, '2026-11-20');
	assert.match(m.url, /^https:\/\/mlconference\.ai\//);
	assert.ok(m.extraUrls.some((u) => u.includes('hackevents.net')));
	assert.equal(m.city, 'Berlin');
	assert.equal(m.role, 'lead');
});

test('hessian.AI ICS: location gives city, Online gives Online (DE)', () => {
	const out = ics('hessian.ics', src({ id: 'hessian-ai', cityHint: 'Frankfurt' }));
	assert.ok(out.some((c) => c.city === 'Frankfurt'));
	assert.ok(out.some((c) => c.city === 'Online (DE)'));
});

test('agentconfs ICS: country from LOCATION', () => {
	const out = ics('agentconfs.ics', src({ id: 'agentconfs', country: undefined, trust: 'curated' }));
	const de = out.filter((c) => c.country === 'DE');
	assert.ok(de.length >= 3);
	assert.ok(out.some((c) => c.country !== 'DE'));
	assert.ok(de.every((c) => /Germany/.test(c.title) || c.city));
});

test('aieventlist city ICS and bwcon ICS parse', () => {
	assert.ok(ics('aieventlist-berlin.ics', src({ id: 'aieventlist-berlin', cityHint: 'Berlin' })).length > 0);
	const bw = ics('bwcon.ics', src({ id: 'bwcon' }));
	assert.ok(bw.length > 0);
	assert.ok(bw.every((c) => /^\d{4}-\d{2}-\d{2}$/.test(c.start)));
});

test('Brainberg JSON: UTC to Berlin, registration URL preferred, cost', () => {
	const j = JSON.parse(fixture('brainberg.json'));
	const out = j.events.map((e) => normBrainberg(e, src({ id: 'brainberg', type: 'brainberg', role: 'lead' }))).filter(Boolean);
	assert.ok(out.length >= 6);
	assert.ok(out.every((c) => c.country));
	assert.ok(out.some((c) => c.city === 'Berlin'));
	const withUrl = out.filter((c) => c.url);
	assert.ok(withUrl.length > 0);
});

test('Luma JSON: UTC start converted to Berlin, short slug becomes luma.com URL', () => {
	const j = JSON.parse(fixture('luma-berlin.json'));
	const out = j.entries.map((e) => normLuma(e, src({ id: 'luma-berlin', type: 'luma', cityHint: 'Berlin' }))).filter(Boolean);
	assert.ok(out.length >= 6);
	const e = out.find((c) => c.title === 'The Basic Brain: Neuromyths');
	assert.equal(e.start, '2026-11-20');
	assert.equal(e.time, '18:00–19:00'); // 17:00Z-18:00Z in CET
	assert.equal(e.url, 'https://luma.com/3h6qr0bk');
	assert.equal(e.key, 'u:luma.com/3h6qr0bk');
	assert.equal(e.country, 'DE');
});

test('Eventbrite JSON-LD: ItemList of Event', () => {
	const evs = parseEventbrite(fixture('eventbrite.html'));
	assert.ok(evs.length >= 5);
	const out = evs.map((e) => normEb(e, src({ id: 'eventbrite-berlin', type: 'eventbrite', cityHint: 'Berlin' }))).filter(Boolean);
	assert.equal(out[0].title, 'AI Monday x Planetarium');
	assert.equal(out[0].start, '2026-11-30');
	assert.equal(out[0].city, 'Berlin');
	assert.equal(out[0].country, 'DE');
	assert.match(out[0].key, /^u:eventbrite\/\d+$/);
});

test('MCML RSS: date from URL slug', () => {
	const items = parseRss(fixture('mcml.xml'));
	assert.ok(items.length >= 3);
	const c = normRss(items[0], src({ id: 'mcml', type: 'rss', dateMode: 'slug-date', cityHint: 'Munich', trust: 'curated' }));
	assert.equal(c.start, '2027-01-17');
	assert.equal(c.city, 'Munich');
});

test('LMU RSS: pubDate is the event date', () => {
	const items = parseRss(fixture('lmu.xml'));
	const c = normRss(items[0], src({ id: 'lmu', type: 'rss', dateMode: 'pubdate', cityHint: 'Munich' }));
	assert.equal(c.start, '2025-10-17'); // pubDate "Fri, 17 Oct 2025 00:00:00 +0200"
});

test('DeutschlandKI RSS: German date range and city from the title', () => {
	const items = parseRss(fixture('deutschlandki.xml'));
	const c = normRss(items.find((i) => i.title.startsWith('MLcon')), src({ id: 'deutschlandki', type: 'rss', dateMode: 'text', trust: 'curated', country: undefined }));
	assert.equal(c.start, '2026-11-16');
	assert.equal(c.end, '2026-11-20');
	assert.equal(c.city, 'Berlin');
	assert.equal(c.title, 'MLcon Berlin 2026');
});

test('aieventlist RSS: date range in the title', () => {
	const items = parseRss(fixture('aieventlist.xml'));
	const c = normRss(items.find((i) => i.title.startsWith('DevFest')), src({ id: 'aieventlist-europe', type: 'rss', dateMode: 'text', trust: 'curated', country: undefined }));
	assert.equal(c.start, '2026-11-21');
	assert.equal(c.city, 'Münster');
});

test('Startup City Hamburg RSS: no event date in the feed, nothing invented', () => {
	const items = parseRss(fixture('startupcity.xml'));
	assert.ok(items.length > 5);
	const dated = items.map((i) => normRss(i, src({ id: 'startupcity-hamburg', type: 'rss', dateMode: 'text', cityHint: 'Hamburg' }))).filter(Boolean);
	assert.ok(dated.length < items.length);
});

test('CAIML Atom: dated entries only, date from URL', () => {
	const entries = parseAtom(fixture('caiml.xml'));
	assert.ok(entries.length >= 3);
	const c = normAtom(entries.find((e) => /caiml-045/.test(e.link)), src({ id: 'caiml', type: 'atom', cityHint: 'Cologne', trust: 'curated' }));
	assert.equal(c.start, '2026-11-17');
	assert.equal(c.city, 'Cologne');
});

test('dev.events RSS: date and place only from the description, non-German ignored', () => {
	const items = parseRss(fixture('devevents.xml'));
	const out = items.map((i) => normDev(i, src({ id: 'devevents', type: 'devevents', country: undefined }))).filter(Boolean);
	assert.ok(out.length < items.length);
	assert.ok(out.every((c) => c.country === 'DE' || c.online));
	assert.ok(out.some((c) => c.country === 'DE'));
});

test('confs.tech JSON: Germany only', () => {
	const arr = JSON.parse(fixture('confstech.json'));
	const out = arr.map((c) => normConfs(c, src({ id: 'confstech', type: 'confstech', country: undefined }))).filter(Boolean);
	assert.ok(out.length > 0);
	assert.ok(out.every((c) => c.country === 'DE'));
});

test('Meetup group discovery regex', () => {
	const g = groupsIn('https://www.meetup.com/Berlin-AI/events/123456/', 'see meetup.com/foo_bar/events/9 and https://www.meetup.com/find/events/1');
	assert.deepEqual([...g].sort(), ['berlin-ai', 'foo_bar']);
});

test('scrape: page reduced to text with links, scripts and nav removed; robots respected', () => {
	const { text, links } = reduceHtml(fixture('scrape.html'), 'https://www.bifold.berlin/news-events/events');
	assert.ok(text.length > 200);
	assert.ok(!/<script|<style/i.test(text));
	assert.ok(links.length >= 3);
	assert.match(text, /\[International Joint Symposium[^\]]*\]\(https:\/\/www\.bifold\.berlin\//);
	assert.ok(links.every((l) => /^https?:/.test(l.url)));
	const robots = 'User-agent: *\nDisallow: /private/\nAllow: /private/ok\n';
	assert.equal(robotsAllows(robots, '/events'), true);
	assert.equal(robotsAllows(robots, '/private/x'), false);
	assert.equal(robotsAllows(robots, '/private/ok'), true);
	assert.equal(robotsAllows('User-agent: *\nDisallow: /\n', '/anything'), false);
});
