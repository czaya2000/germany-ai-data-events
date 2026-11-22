// The digest renders at most MAX_EVENTS events per email (Gmail clips over ~102 KB);
// the rest sit behind a "see all N more events" button linking to the site's listing page.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectEvents, renderDigest, MAX_EVENTS } from '../../scripts/lib/digest.mjs';
import { SITE_URL } from '../../config/country.mjs';

const ev = (i) => ({
	id: `cap${String(i).padStart(3, '0')}`, title: `Cap event ${String(i).padStart(3, '0')}`,
	date: new Date(Date.UTC(2026, 10, 24 + Math.floor(i / 10))).toISOString().slice(0, 10),
	city: ['Berlin', 'Hamburg', 'Munich', 'Frankfurt'][i % 4], venue: '', format: ['Meetup', 'Conference', 'Webinar'][i % 3],
	topics: [], organiser: 'o', cost: 'Free', url: 'https://example.org', source: 's', firstSeen: '2026-11-21',
	blurb: 'x', blurb_en: 'English blurb', blurb_de: 'Deutscher Text',
});
const make = (n) => selectEvents(Array.from({ length: n }, (_, i) => ev(i)), { today: '2026-11-23', ahead: 60 });
const rows = (body) => body.match(/<tr><td valign="top" width="64"/g)?.length ?? 0;
const MORE = {
	de: (n) => `Alle ${n} weiteren Events auf der Website ansehen`,
	en: (n) => `See all ${n} more events on the site`,
};

test('MAX_EVENTS is 60', () => assert.equal(MAX_EVENTS, 60));

for (const locale of ['de', 'en']) {
	test(`digest cap (${locale}): more than MAX_EVENTS -> first MAX_EVENTS in order, plus the "more" button`, () => {
		const sel = make(MAX_EVENTS + 17);
		const r = renderDigest(sel, locale);
		assert.equal(rows(r.body), MAX_EVENTS);
		assert.equal(r.shown, MAX_EVENTS);
		assert.equal(r.hidden, 17);
		// soonest first: the first 60 of the sorted list are shown, the rest are not
		for (const e of sel.soon.slice(0, MAX_EVENTS)) assert.ok(r.body.includes(`/events/${e.id}/`));
		for (const e of sel.soon.slice(MAX_EVENTS)) assert.ok(!r.body.includes(`/events/${e.id}/`));
		const prefix = locale === 'en' ? '/en' : '';
		assert.ok(r.body.includes(`>${MORE[locale](17)}</a>`));
		assert.match(r.body, new RegExp(`<a href="${SITE_URL}${prefix}/\\?utm_[^"]*"[^>]*>${MORE[locale](17)}</a>`));
		// the button is outside every Liquid condition: filtered readers get it too
		const lines = r.body.split('\n');
		const at = lines.findIndex((l) => l.includes(MORE[locale](17)));
		assert.ok(!lines[at].includes('{%'));
		assert.ok(lines.slice(0, at).filter((l) => /^\{% if /.test(l)).length === lines.slice(0, at).filter((l) => /^\{% endif %\}$/.test(l)).length, 'button sits inside an open {% if %}');
	});

	test(`digest cap (${locale}): exactly MAX_EVENTS or fewer -> no "more" line`, () => {
		for (const n of [5, MAX_EVENTS]) {
			const r = renderDigest(make(n), locale);
			assert.equal(rows(r.body), n);
			assert.equal(r.hidden, 0);
			assert.doesNotMatch(r.body, /weiteren Events auf der Website|more events on the site/);
		}
	});

	test(`digest cap (${locale}): a full cap with blurbs stays under the 95 KB budget`, () => {
		const r = renderDigest(make(200), locale);
		assert.ok(r.sizeKb < 95, `${r.sizeKb} KB`);
		assert.equal(r.overBudget, false);
	});
}

test('digest cap: unfiltered tag-free size is measured without template tags', () => {
	const r = renderDigest(make(MAX_EVENTS + 5), 'en');
	assert.ok(Buffer.byteLength(r.body) / 1024 > r.sizeKb); // template tags are excluded from the count
});
