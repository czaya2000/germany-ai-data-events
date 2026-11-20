// Offline tests: the digest HTML must survive Buttondown's markdown pass and render as
// the Swiss event cards. The Liquid conditions are evaluated locally for sample subscribers,
// then the resulting HTML is checked structurally. No network, no API key.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectEvents, renderDigest, placeMeta } from '../../scripts/lib/digest.mjs';

const ev = (o) => ({
	id: 'x', title: 'T', date: '2026-11-25', city: 'Berlin', venue: 'Mitte', format: 'Meetup', topics: [],
	organiser: 'o', cost: 'Free', url: 'https://example.org', source: 's', firstSeen: '2026-11-21',
	blurb: 'English only', blurb_en: 'English blurb', blurb_de: 'Deutscher Text', ...o,
});

const MANY = Array.from({ length: 12 }, (_, i) =>
	ev({
		id: `m${i}`,
		title: `Event number ${i}`,
		city: ['Berlin', 'Hamburg', 'Munich', 'Frankfurt'][i % 4],
		format: ['Meetup', 'Conference', 'Webinar'][i % 3],
		venue: i % 2 ? '' : 'House of AI',
	}),
).concat([
	ev({ id: 'dup1', title: 'Dup Berlin', city: 'Berlin', venue: 'Berlin', time: '09:00' }),
	ev({ id: 'dup2', title: 'Dup Hamburg', city: 'Hamburg', venue: 'House of AI Hamburg', time: '10:00–12:00' }),
]);
const sel = selectEvents(MANY, { today: '2026-11-23' });

// Evaluates the exact grammar we emit: 'tag' in subscriber.tags / not in, joined by and / or.
function evalCond(cond, tags) {
	const js = cond
		.replace(/'([^']+)' not in subscriber\.tags/g, (_, t) => (tags.includes(t) ? 'false' : 'true'))
		.replace(/'([^']+)' in subscriber\.tags/g, (_, t) => (tags.includes(t) ? 'true' : 'false'))
		.replace(/\band\b/g, '&&')
		.replace(/\bor\b/g, '||');
	assert.match(js, /^[\sa-z&|]+$/, `unexpected condition: ${cond}`);
	assert.match(js, /^(\s|true|false|&&|\|\|)+$/, `unexpected condition: ${cond}`);
	return Function(`return (${js});`)();
}

// Renders if/else/endif (each on its own line) for a subscriber with the given tags.
function renderLiquid(body, tags) {
	const out = [];
	const stack = [];
	const on = () => stack.every((f) => f.active);
	for (const line of body.split('\n')) {
		let m;
		if ((m = line.match(/^\{% if (.*) %\}$/))) {
			const v = on() && evalCond(m[1], tags);
			stack.push({ active: v, taken: v });
		} else if (/^\{% else %\}$/.test(line)) {
			const f = stack.at(-1);
			f.active = !f.taken;
		} else if (/^\{% endif %\}$/.test(line)) stack.pop();
		else {
			assert.doesNotMatch(line, /\{%/, 'template tag must stand alone on its line');
			if (on()) out.push(line);
		}
	}
	assert.equal(stack.length, 0, 'unbalanced if/endif');
	return out.join('\n');
}

// Strict balance check: fails on any unclosed or crossed tag. Returns table/tr/td counts.
function checkWellFormed(html) {
	const stack = [];
	const counts = { table: 0, tr: 0, td: 0 };
	for (const m of html.replaceAll(/<!--[\s\S]*?-->/g, '').matchAll(/<(\/?)([a-z0-9]+)\b[^>]*?(\/?)>/gi)) {
		const [, close, name, self] = m;
		const n = name.toLowerCase();
		if (['br', 'img', 'hr'].includes(n) || self) continue;
		if (!close) {
			stack.push(n);
			if (n in counts) counts[n]++;
		} else assert.equal(stack.pop(), n, `crossed or unclosed tag before </${n}>`);
	}
	assert.deepEqual(stack, [], 'unclosed tags');
	return counts;
}

const rowsOf = (html) => html.match(/<tr><td valign="top" width="64".*<\/td><\/tr>/g) ?? [];

for (const locale of ['de', 'en']) {
	for (const [label, tags] of [
		['no tags', []],
		['some tags', ['city-berlin', 'format-meetup']],
		['only a format tag', ['format-webinar']],
	]) {
		test(`digest HTML (${locale}, subscriber with ${label}): well-formed, uniform cards, no duplicate city`, () => {
			const r = renderDigest(sel, locale);
			const html = renderLiquid(r.body, tags);
			const counts = checkWellFormed(html);
			const rows = rowsOf(html);
			assert.ok(rows.length > 0);
			assert.ok(counts.table >= 1 && counts.tr >= rows.length);
			if (!tags.length) assert.equal(rows.length, MANY.length); // unfiltered reader sees all
			for (const row of rows) {
				assert.equal((row.match(/<td\b/g) ?? []).length, 2); // date cell + content cell
				assert.equal((row.match(/<tr\b/g) ?? []).length, 1);
				assert.equal((row.match(/width="64"/g) ?? []).length, 1);
				assert.match(row, /font-size:28px;font-weight:600/);
				assert.match(row, /margin-top:10px;">/); // format chip line
				assert.doesNotMatch(row, /\n/);
				const meta = row.match(/font-size:14px;color:#3f3f45;margin-top:6px;">([^<]*)</)[1];
				const parts = meta.split(', ').map((x) => x.toLowerCase());
				assert.equal(new Set(parts).size, parts.length, `duplicate in "${meta}"`);
			}
			assert.equal((r.body.match(/<tr><td style="padding:10px 0/g) ?? []).length, 0); // no compact rows
		});
	}

	test(`generated body (${locale}): no newline, blank or indented line inside event rows; if/endif wrap whole rows`, () => {
		const { body } = renderDigest(sel, locale);
		const lines = body.split('\n');
		assert.ok(lines.some((l) => l.startsWith('<tr><td valign="top" width="64"') && l.endsWith('</td></tr>')));
		for (const l of lines) {
			if (l.includes('width="64"')) assert.ok(l.startsWith('<tr>') && l.endsWith('</tr>'), l.slice(0, 80));
		}
		assert.ok(!lines.some((l) => l.trim() === ''), 'blank line in body');
		assert.ok(!lines.some((l) => /^\s+\S/.test(l)), 'indented line in body');
		lines.forEach((l, i) => {
			if (!l.startsWith('<tr><td valign="top" width="64"')) return;
			assert.match(lines[i - 1], /^(\{% (if .*|else) %\}|\{% endif %\}|<table.*)$/);
			assert.match(lines[i + 1], /^(\{% (endif|else) %\}|<\/table>)$/);
		});
	});
}

test('placeMeta never repeats the city', () => {
	assert.deepEqual(placeMeta('Berlin', 'Berlin', '09:00'), ['Berlin', '09:00']);
	assert.deepEqual(placeMeta('Berlin', '', ''), ['Berlin']);
	assert.deepEqual(placeMeta('Hamburg', 'House of AI Hamburg', '10:00–12:00'), ['House of AI Hamburg', '10:00–12:00']);
	assert.deepEqual(placeMeta('Hamburg', 'Hamburg', undefined), ['Hamburg']);
	assert.deepEqual(placeMeta('Munich', 'Alte Messe', '18:00'), ['Munich', 'Alte Messe', '18:00']);
});
