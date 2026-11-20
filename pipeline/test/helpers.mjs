import { readFileSync } from 'node:fs';

export const fixture = (name) => readFileSync(new URL('../fixtures/' + name, import.meta.url), 'utf8');

/** A minimal source config for tests. */
export const src = (over = {}) => ({ id: 't', type: 'ics', label: 'T', trust: 'noisy', country: 'DE', onlineOk: true, ...over });

/** A minimal Candidate. */
export function cand(over = {}) {
	return {
		title: 'AI Meetup', start: '2026-12-01', end: '2026-12-01', city: 'Berlin', organiser: '', url: 'https://example.com/e/1',
		extraUrls: [], desc: '', online: false, country: 'DE', sourceId: 't', sourceLabel: 'T', sourceType: 'ics',
		trust: 'noisy', keys: ['u:example.com/e/1'], key: 'u:example.com/e/1', ...over,
	};
}
