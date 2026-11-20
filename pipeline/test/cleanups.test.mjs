import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cleanOrganiser, registrableDomain, organiserOrDomain, makeCandidate } from '../lib/normalize.mjs';
import { resolveCity, cityFromUrl, cityFromVenue } from '../lib/city.mjs';
import { buildReport } from '../lib/report.mjs';
import { newsletterCity, isNationwide } from '../../src/lib/newsletter.mjs';
import { normalise as normaliseIcs } from '../sources/ics.mjs';
import { src } from './helpers.mjs';

test('cleanOrganiser strips feed junk', () => {
	for (const junk of ['Going: 0', 'going: 12', '12 going', 'Attendees: 3', '3 attendees', 'Hosted by', 'Hosted by:', 'Organized by', '42', '  ', '', null, undefined, 'Meetup', 'Eventbrite', 'Luma', 'Brainberg', 'Organizer:']) {
		assert.equal(cleanOrganiser(junk), '', JSON.stringify(junk));
	}
});

test('cleanOrganiser keeps real names and removes prefixes/counters', () => {
	assert.equal(cleanOrganiser('hessian.AI'), 'hessian.AI');
	assert.equal(cleanOrganiser('Hosted by PyData Berlin'), 'PyData Berlin');
	assert.equal(cleanOrganiser('Organized by: AI Builders'), 'AI Builders');
	assert.equal(cleanOrganiser('AI Builders Going: 3'), 'AI Builders');
	assert.equal(cleanOrganiser('Acme · 12 going'), 'Acme');
	assert.equal(cleanOrganiser('Going Places GmbH'), 'Going Places GmbH');
	assert.equal(cleanOrganiser('Rouven Pampus'), 'Rouven Pampus');
});

test('registrableDomain and organiserOrDomain', () => {
	assert.equal(registrableDomain('https://www.ai-engineering-summit.de/x?y=1'), 'ai-engineering-summit.de');
	assert.equal(registrableDomain('https://berlin.aitinkerers.org/e/1'), 'aitinkerers.org');
	assert.equal(registrableDomain('https://events.example.co.uk/'), 'example.co.uk');
	assert.equal(registrableDomain('not a url'), '');
	assert.equal(organiserOrDomain('Going: 0', 'https://ai-engineering-summit.de/'), 'ai-engineering-summit.de');
	assert.equal(organiserOrDomain('Real Org', 'https://x.de/'), 'Real Org');
	assert.equal(organiserOrDomain('', ''), '');
});

test('organiserOrDomain: aggregator domains fall back to "Not listed", real sites keep the domain', () => {
	for (const url of [
		'https://aieventlist.ai/e/1', 'https://agentconfs.com/x', 'https://www.eventbrite.de/e/123', 'https://eventbrite.co.uk/e/1',
		'https://dev.events/conferences/x', 'https://brainberg.com/e', 'https://hackevents.net/y', 'https://allai.events/z',
		'https://lu.ma/abc', 'https://luma.com/abc', 'https://www.meetup.com/g/events/1/',
	]) assert.equal(organiserOrDomain('', url), 'Not listed', url);
	assert.equal(organiserOrDomain('Going: 0', 'https://luma.com/x'), 'Not listed');
	assert.equal(organiserOrDomain('aieventlist.ai', 'https://aieventlist.ai/e/1'), 'Not listed'); // old stored fallback
	assert.equal(organiserOrDomain('Not listed', 'https://hessian.ai/'), 'Not listed'); // idempotent
	assert.equal(organiserOrDomain('', 'https://hessian.ai/event'), 'hessian.ai');
	assert.equal(organiserOrDomain('', 'https://www.apiconference.net/x'), 'apiconference.net');
	assert.equal(organiserOrDomain('Real Org', 'https://luma.com/x'), 'Real Org');
});

test('organiser display: Not listed is localised, real names untouched', async () => {
	const { localizeOrganiser, organiserUnknown } = await import('../../src/i18n/format.ts');
	assert.equal(localizeOrganiser('Not listed', 'de'), 'Nicht angegeben');
	assert.equal(localizeOrganiser('Not listed', 'en'), 'Not listed');
	assert.equal(localizeOrganiser('hessian.ai', 'de'), 'hessian.ai');
	assert.ok(organiserUnknown('Not listed') && organiserUnknown('') && !organiserUnknown('X'));
});

test('makeCandidate cleans the organiser', () => {
	const c = makeCandidate({ title: 'T', start: '2026-12-01', organiser: 'Going: 0', city: 'Berlin' }, src());
	assert.equal(c.organiser, '');
});

test('hackevents feed "Going: 0" never becomes the organiser; meetup falls back to the group name', () => {
	const ics = (extra) => ({
		calName: extra.calName,
		events: [{ title: 'Event', start: '2026-12-01', end: '2026-12-01', description: extra.desc ?? '', location: '', url: 'https://www.meetup.com/some-group/events/123456/', status: '' }],
	});
	const m = normaliseIcs(ics({ calName: 'Hosted by' }), src({ type: 'meetup', id: 'meetup:some-group', cityHint: 'Berlin' }));
	assert.equal(m[0].organiser, 'some-group');
	const h = normaliseIcs(ics({ desc: 'Register: https://x.org/r\nOrganizer: Going: 0' }), src({ type: 'hackevents', id: 'hackevents' }));
	assert.equal(h[0].organiser, '');
});

test('resolveCity: Vibe Kode 2026 (url /berlin/, feed Munich, echo venue) is Berlin', () => {
	assert.equal(resolveCity({ city: 'Munich', venue: 'Munich', url: 'https://vibekode.it/berlin/#sdj-6ad1c04273938ec84eb1da82' }), 'Berlin');
	assert.equal(resolveCity({ city: 'Munich', url: 'https://vibekode.it/berlin/' }), 'Berlin');
});

test('resolveCity: subdomain, venue wins over url, exactly-one rule, online untouched', () => {
	assert.equal(resolveCity({ city: 'Munich', url: 'https://berlin.aitinkerers.org/p/1' }), 'Berlin');
	assert.equal(resolveCity({ city: 'Munich', venue: 'Factory, Hamburg', url: 'https://x.org/berlin/' }), 'Hamburg');
	assert.equal(resolveCity({ city: 'Munich', url: 'https://x.org/berlin-munich-tour/' }), 'Munich');
	assert.equal(resolveCity({ city: 'Munich', venue: 'Berlin and Hamburg' }), 'Munich');
	assert.equal(resolveCity({ city: 'Online (DE)', venue: 'Berlin', url: 'https://x.org/berlin/' }), 'Online (DE)');
	assert.equal(resolveCity({ city: 'Munich', online: true, url: 'https://x.org/berlin/' }), 'Munich');
	assert.equal(resolveCity({ city: 'Garching', url: 'https://x.org/munich/' }), 'Garching', 'same hub is no conflict');
	assert.equal(resolveCity({ city: 'Berlin', url: 'https://example.com/e/1' }), 'Berlin');
	assert.equal(resolveCity({ city: 'Frankfurt', venue: 'Cologne', url: 'https://www.hessian.ai/event/x/' }), 'Cologne');
});

test('resolveCity: feed city and url agreeing against a street venue keep the feed city', () => {
	assert.equal(resolveCity({ city: 'Warendorf', venue: 'Dieselstraße 11, Berlin', url: 'https://gfw-waf.de/kreis-warendorf-werkstatt/' }), 'Warendorf');
});

test('cityFromUrl / cityFromVenue need exactly one city', () => {
	assert.equal(cityFromUrl('https://vibekode.it/berlin/'), 'Berlin');
	assert.equal(cityFromUrl('https://x.org/berlinale'), null);
	assert.equal(cityFromUrl('https://x.org/berlin-hamburg'), null);
	assert.equal(cityFromVenue('Berlin, Berlin, Germany'), 'Berlin');
	assert.equal(cityFromVenue(''), null);
});

test('makeCandidate applies city precedence', () => {
	const c = makeCandidate({ title: 'Vibe Kode 2026', start: '2026-12-01', city: 'Munich', venue: 'Munich', url: 'https://vibekode.it/berlin/' }, src());
	assert.equal(c.city, 'Berlin');
});

test('every city in events.json maps to a newsletter city', () => {
	const events = JSON.parse(readFileSync(new URL('../../src/data/events.json', import.meta.url), 'utf8'));
	const unmapped = [...new Set(events.map((e) => e.city))].filter((c) => !isNationwide(c) && newsletterCity(c) === null);
	assert.deepEqual(unmapped, []);
	const groups = new Set(events.map((e) => newsletterCity(e.city)).filter(Boolean));
	const allowed = new Set(['berlin', 'munich', 'hamburg', 'frankfurt', 'cologne', 'stuttgart', 'online', 'other-germany']);
	for (const g of groups) assert.ok(allowed.has(g), g);
});

test('new places map to the nearest hub within ~100 km, else Other Germany', () => {
	const want = {
		Duisburg: 'cologne', Ingolstadt: 'munich', 'Königstein im Taunus': 'frankfurt', 'Königswinter': 'cologne', Kaiserslautern: 'frankfurt',
		'Weiden in der Oberpfalz': 'other-germany', Warendorf: 'other-germany', Erlangen: 'other-germany', 'Fürth': 'other-germany', Chemnitz: 'other-germany',
	};
	for (const [city, slug] of Object.entries(want)) assert.equal(newsletterCity(city), slug, city);
});

test('report shows disabled sources as disabled, not FAILED', () => {
	const base = {
		today: '2026-11-20', windowDays: 120, bootstrap: false, limit: 0, feedOk: 1, feedTotal: 1, feedDisabled: 1,
		totals: { fetched: 0, inWindow: 0, kept: 0, clusters: 0, known: 0, new: 0, sent: 0, deferred: 0 }, ledgerEntries: 0, pruned: 0,
		sources: [{ id: 'eventbrite-berlin', trust: 'noisy', fetched: 0, inWindow: 0, kept: 0, inClusters: 0, primary: 0, disabled: true, reason: 'blocked', ms: 0 }],
		scrape: [], cities: [], otherPlaces: [], drops: {}, topClusters: [], problems: [], discovered: [], notes: [],
	};
	const md = buildReport(base);
	assert.match(md, /disabled: blocked/);
	assert.doesNotMatch(md, /FAILED/);
	assert.match(md, /1 disabled/);
});
