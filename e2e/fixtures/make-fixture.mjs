// Regenerates e2e/fixtures/events.json:  node e2e/fixtures/make-fixture.mjs
// Fixture "today" is Wed 2026-11-18, so "this week" is Mon 16 .. Sun 22 Nov (Europe/Berlin).
import { writeFileSync } from 'node:fs';

const mk = (id, title, date, endDate, city, format, extra = {}) => ({
	id,
	title,
	date,
	...(endDate ? { endDate } : {}),
	...(extra.time ? { time: extra.time } : {}),
	city,
	venue: 'Fixture Hall',
	format,
	topics: ['AI'],
	organiser: 'Fixture Org',
	cost: 'Free',
	url: 'https://example.org/' + id + '/',
	source: 'fixture',
	blurb: 'Fixture blurb for ' + title + '.',
	blurb_en: 'Fixture blurb for ' + title + '.',
	blurb_de: 'Fixture-Beschreibung für ' + title + '.',
	firstSeen: '2026-11-01',
});

const events = [
	mk('b-started-earlier', 'Berlin Started Earlier', '2026-11-16', '2026-11-18', 'Berlin', 'Conference'), // multi-day, ends today
	mk('b-wed', 'Berlin Wednesday Talk', '2026-11-18', null, 'Berlin', 'Meetup', { time: '18:00' }), // today
	mk('b-sat', 'Berlin Saturday Workshop', '2026-11-21', null, 'Berlin', 'Workshop'),
	mk('b-sun', 'Berlin Sunday Meetup', '2026-11-22', null, 'Berlin', 'Meetup'), // last day of the week
	mk('b-mon', 'Berlin Next Monday', '2026-11-23', null, 'Berlin', 'Meetup'), // first day of next week
	mk('b-thu', 'Berlin Next Thursday', '2026-11-26', null, 'Berlin', 'Conference'),
	mk('b-running', 'Berlin Running Series', '2026-11-02', '2026-12-18', 'Berlin', 'Workshop'), // started long ago, still running
	mk('b-sun-span', 'Berlin Weekend Spanning', '2026-11-22', '2026-11-24', 'Berlin', 'Conference'), // starts Sunday, ends next week
	mk('b-dec', 'Berlin December Summit', '2026-12-03', null, 'Berlin', 'Conference'),
	mk('m-thu', 'Munich Thursday Meetup', '2026-11-19', null, 'Munich', 'Meetup'),
	mk('m-next', 'Munich Next Week', '2026-11-24', null, 'Garching (Munich)', 'Workshop'),
	mk('h-fri', 'Hamburg Friday Webinar', '2026-11-20', null, 'Hamburg', 'Webinar'),
	mk('o-tue', 'Online Tuesday Webinar', '2026-11-17', '2026-11-19', 'Online (DE)', 'Webinar'), // started yesterday
	mk('o-dec', 'Online December Webinar', '2026-12-10', null, 'Online (DE)', 'Webinar'),
	mk('f-nov30', 'Frankfurt Month End', '2026-11-30', null, 'Frankfurt', 'Networking'),
	mk('l-dec', 'Leipzig December Meetup', '2026-12-01', null, 'Leipzig', 'Meetup'),
];
events.sort((a, b) => a.date.localeCompare(b.date));
writeFileSync(new URL('./events.json', import.meta.url), JSON.stringify(events, null, '\t') + '\n');
console.log(events.length + ' fixture events');
