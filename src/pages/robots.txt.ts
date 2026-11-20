import type { APIRoute } from 'astro';
import { SITE_URL, INDEXABLE } from '../lib/events';

/* While INDEXABLE is false (config/country.mjs) everything is disallowed, and
   every page also carries <meta name="robots" content="noindex, nofollow">.
   GitHub Pages cannot set response headers, so these two are the mechanism.
   The site is live (INDEXABLE is true): crawling is allowed and the sitemap is listed. */

const AI_AGENTS = [
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	'ClaudeBot',
	'Claude-SearchBot',
	'Claude-User',
	'PerplexityBot',
	'Perplexity-User',
	'Google-Extended',
	'Applebot-Extended',
	'CCBot',
];

export const GET: APIRoute = () => {
	const body = INDEXABLE
		? [
				'# Search engines and AI agents are welcome. Machine-readable data:',
				`#   ${SITE_URL}/llms.txt`,
				`#   ${SITE_URL}/llms-full.txt`,
				`#   ${SITE_URL}/events.json`,
				`#   ${SITE_URL}/rss.xml`,
				'',
				'User-agent: *',
				'Allow: /',
				'',
				...AI_AGENTS.map((a) => `User-agent: ${a}`),
				'Allow: /',
				'',
				`Sitemap: ${SITE_URL}/sitemap-index.xml`,
				'',
			].join('\n')
		: ['# Not open for indexing yet.', 'User-agent: *', 'Disallow: /', ''].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
