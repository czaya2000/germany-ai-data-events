import test from 'node:test';
import assert from 'node:assert/strict';
import { dedupe, sameEvent } from '../lib/dedupe.mjs';
import { ledgerKeys, normTitle } from '../lib/normalize.mjs';
import { cand } from './helpers.mjs';

// [titleA, cityA, dateA, titleB, cityB, dateB]. Titles are real ones seen in the 20 Nov 2026 feeds.
const SAME = [
	['MLConf Berlin 2026', 'Berlin', '2026-11-16', 'MLcon Berlin 2026', 'Berlin', '2026-11-16'],
	['MLcon Berlin 2026', 'Berlin', '2026-11-16', 'MLCon Berlin 2026', 'Berlin', '2026-11-16'],
	['AI Engineering Summit 2026', 'Berlin', '2026-11-16', 'AI Engineering Summit Berlin 2026', 'Berlin', '2026-11-16'],
	['DevFest Münster 2026', 'Münster', '2026-11-21', 'DevFest Münster 2026: Agentic AI Hackathon', 'Münster', '2026-11-21'],
	['AI Coding Hackathon November 2026 Köln', 'Cologne', '2026-11-20', 'AI Coding Hackathon November 2026 — STARTPLATZ Köln', 'Cologne', '2026-11-20'],
	['AI.SUMMIT 2026', 'Hamburg', '2026-11-24', 'AI.SUMMIT 2026 Hamburg', 'Hamburg', '2026-11-24'],
	['AI Transformation Camp München – separates Ticket erforderlich', 'Munich', '2026-11-20', 'AI Transformation Camp München', 'Munich', '2026-11-20'],
	['Hamburger Indie Treff #51 – Play26 Special', 'Hamburg', '2026-11-20', 'Hamburger Indie Treff #51', 'Hamburg', '2026-11-20'],
	['Vibe Hackathon Cologne', 'Cologne', '2026-11-20', 'Vibe Hackathon Köln', 'Cologne', '2026-11-20'],
	['Berlin Robotics & AI Hackathon: HackLab x BRISA', 'Berlin', '2026-11-21', 'Robotics & AI Hackathon HackLab BRISA', 'Berlin', '2026-11-21'],
	['PyData Global 2026', 'Online (DE)', '2026-12-09', 'PyData Global 2026 (virtual)', 'Berlin', '2026-12-09'],
	['Lab2Market AI x Cyber', 'Frankfurt', '2026-11-19', 'Lab2Market AI x Cyber', 'Frankfurt', '2026-11-20'], // one day apart (timezone shift)
	['AI Engineering Summit 2026', 'Berlin', '2026-11-16', 'AI Engineering Summit 2026', 'Potsdam', '2026-11-16'], // same hub
];

const DIFFERENT = [
	['MLcon Berlin 2026', 'Berlin', '2026-11-16', 'API Conference 2026', 'Berlin', '2026-11-16'],
	['AI Engineering Summit 2026', 'Berlin', '2026-11-16', 'AI Coding Hackathon November 2026 Köln', 'Cologne', '2026-11-20'],
	['AI & Matcha: Frühstücksevent', 'Hamburg', '2026-11-20', 'AI Coding Hackathon November 2026 Köln', 'Cologne', '2026-11-20'],
	['build fridays hamburg - work on your startup alongside others', 'Hamburg', '2026-11-20', 'agentic coding studio', 'Hamburg', '2026-11-21'],
	['Vibe Hackathon Cologne', 'Cologne', '2026-11-20', 'AI Coding Hackathon November 2026 Köln', 'Cologne', '2026-11-20'],
	['DevFest 2026', 'Münster', '2026-11-21', 'DevFest 2026', 'Hamburg', '2026-11-21'], // same title, different city
	['CAIML #45', 'Cologne', '2026-11-17', 'CAIML #46', 'Cologne', '2026-12-15'], // different dates
	['PyData Berlin', 'Berlin', '2026-12-03', 'PyData Hamburg', 'Hamburg', '2026-12-03'],
	['Hamburger Indie Treff #51', 'Hamburg', '2026-11-20', 'Hamburger Indie Treff #52', 'Hamburg', '2026-12-04'],
	['Data Engineering Meetup', 'Berlin', '2026-12-01', 'Data Science Meetup', 'Berlin', '2026-12-01'],
	['Vibe Kode 2026', 'Berlin', '2026-11-16', 'AI Engineering Summit 2026', 'Berlin', '2026-11-16'],
	['Smart Country Convention 2027', 'Berlin', '2027-10-05', 'Brains on Silicon 2027', 'Dresden', '2027-10-27'],
	['Die KI-Werkstatt: Offenes Prompting-Treffen für Einsteiger und Profis', 'Mainz', '2026-11-20', 'Friday Making Hours', 'Heidelberg', '2026-11-20'],
];

const ev = (t, c, d) => ({ title: t, city: c, start: d });

test('dedupe: 13 real positive pairs are the same event', () => {
	assert.ok(SAME.length >= 12);
	for (const [ta, ca, da, tb, cb, db] of SAME) {
		assert.equal(sameEvent(ev(ta, ca, da), ev(tb, cb, db)), true, `${ta} == ${tb}`);
	}
});

test('dedupe: 13 real negative pairs stay separate', () => {
	assert.ok(DIFFERENT.length >= 12);
	for (const [ta, ca, da, tb, cb, db] of DIFFERENT) {
		assert.equal(sameEvent(ev(ta, ca, da), ev(tb, cb, db)), false, `${ta} != ${tb}`);
	}
});

test('normTitle strips years, numbering, stop words and city names', () => {
	assert.equal(normTitle('AI.SUMMIT 2026 Hamburg'), 'ai summit');
	assert.equal(normTitle('Hamburger Indie Treff #51'), 'hamburger indie treff');
	assert.equal(normTitle('Über KI und Daten für Köln'), 'uber ki daten');
});

function mk(over) {
	const c = cand(over);
	c.keys = ledgerKeys(c);
	c.key = c.keys[0];
	return c;
}

test('cluster: best source wins, organiser URL preferred, gaps filled from the others', () => {
	const hack = mk({ title: 'MLConf Berlin 2026', url: 'https://hackevents.net/de/events/mlconf', sourceId: 'hackevents-ai', sourceType: 'hackevents', role: 'lead', trust: 'noisy', start: '2026-11-16', end: '2026-11-20' });
	const org = mk({ title: 'MLcon Berlin 2026', url: 'https://mlconference.ai/berlin/', sourceId: 'deutschlandki', sourceType: 'rss', trust: 'curated', organiser: 'Developer Media', start: '2026-11-16', end: '2026-11-20', venue: 'Maritim proArte' });
	const lu = mk({ title: 'Totally Different Event', url: 'https://luma.com/abc', sourceId: 'luma-berlin', sourceType: 'luma', start: '2026-11-16' });
	const merges = [];
	const out = dedupe([hack, org, lu], { onMerge: (a, b) => merges.push([a.sourceId, b.sourceId]) });
	assert.equal(out.length, 2);
	const cl = out.find((c) => c.members.length === 2);
	assert.equal(cl.sourceId, 'deutschlandki'); // curated beats the lead aggregator
	assert.equal(cl.url, 'https://mlconference.ai/berlin/'); // organiser URL over the aggregator
	assert.deepEqual(cl.sources.sort(), ['deutschlandki', 'hackevents-ai']);
	assert.equal(cl.organiser, 'Developer Media');
	assert.equal(merges.length, 1);
});

test('cluster: Meetup record outranks aggregators and Luma', () => {
	const a = mk({ title: 'AI Beavers Meetup', url: 'https://brainberg.eu/x', sourceId: 'brainberg', sourceType: 'brainberg', role: 'lead' });
	const b = mk({ title: 'AI Beavers Meetup', url: 'https://www.meetup.com/ai-beavers/events/1/', sourceId: 'meetup:ai-beavers', sourceType: 'meetup', trust: 'curated' });
	const [one] = dedupe([a, b]);
	assert.equal(one.sourceId, 'meetup:ai-beavers');
	assert.equal(one.url, 'https://www.meetup.com/ai-beavers/events/1/');
	assert.equal(one.trust, 'curated');
});
