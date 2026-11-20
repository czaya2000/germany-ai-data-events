// confs.tech conference-data JSON on GitHub, one file per year. Keep Germany only.
import { getText } from '../lib/cache.mjs';
import { canonicalCity, ONLINE } from '../lib/city.mjs';
import { makeCandidate } from '../lib/normalize.mjs';

export async function fetchSource(src, ctx) {
	const years = [Number(ctx.today.slice(0, 4)), Number(ctx.today.slice(0, 4)) + 1];
	const all = [];
	let okCount = 0;
	for (const y of years) {
		const r = await getText(src.url.replace('{year}', String(y)), ctx, { accept: 'application/json' });
		if (!r.ok) continue;
		okCount++;
		all.push(...JSON.parse(r.text));
	}
	if (!okCount) throw new Error('no yearly file reachable');
	return all;
}

export function normalise(c, src) {
	if (!c?.name || !c.startDate) return null;
	const germany = c.country === 'Germany';
	return makeCandidate(
		{
			title: c.name, start: c.startDate, end: c.endDate, city: c.online ? ONLINE : canonicalCity(c.city),
			url: c.url, desc: [c.name, c.city].filter(Boolean).join(' '), online: !!c.online, country: germany ? 'DE' : null,
		},
		src,
	);
}
