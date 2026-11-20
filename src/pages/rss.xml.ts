import type { APIRoute } from 'astro';
import { buildRss } from '../lib/rss';

/* German RSS feed; the English one is /en/rss.xml (src/pages/en/rss.xml.ts). See src/lib/rss.ts. */
export const GET: APIRoute = async () =>
	new Response(await buildRss('de'), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
