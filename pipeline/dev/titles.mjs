// Print normalised titles from the fixtures to craft dedupe test pairs.
import { readFileSync } from 'node:fs';
import { parseIcs } from '../lib/ical.mjs';
import { parseRss } from '../lib/feeds.mjs';
const rd = (f) => readFileSync(new URL('../fixtures/' + f, import.meta.url), 'utf8');
const show = (label, rows) => console.log(label + '\n' + rows.map((r) => '  ' + r).join('\n'));
show('hackevents', parseIcs(rd('hackevents-ai.ics')).events.slice(0, 14).map((e) => e.start + ' ' + e.title + ' | ' + e.location));
show('aieventlist', parseRss(rd('aieventlist.xml')).slice(0, 14).map((e) => e.title));
show('deutschlandki', parseRss(rd('deutschlandki.xml')).slice(0, 10).map((e) => e.title));
show('brainberg', JSON.parse(rd('brainberg.json')).events.map((e) => e.event.startsAt.slice(0, 10) + ' ' + e.event.title + ' | ' + e.city?.name));
show('luma', JSON.parse(rd('luma-berlin.json')).entries.map((e) => e.event.start_at.slice(0, 10) + ' ' + e.event.name));
show('agentconfs', parseIcs(rd('agentconfs.ics')).events.filter((e) => /Germany/.test(e.location)).slice(0, 8).map((e) => e.start + ' ' + e.title + ' | ' + e.location));
