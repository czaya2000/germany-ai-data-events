import type { APIRoute, GetStaticPaths } from 'astro';
import { getUpcomingEvents } from '../../../lib/events';
import { listFeeds, toIcsEvent, type Feed } from '../../../lib/calendar-feeds';
import { buildCalendar } from '../../../lib/ics';

/* English twin of src/pages/calendar/[feed].ics.ts: /en/calendar/<feed>.ics. */

export const getStaticPaths = (async () => {
	const feeds = listFeeds(await getUpcomingEvents(), 'en');
	return feeds.map((feed) => ({ params: { feed: feed.slug }, props: { feed } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ feed: Feed }> = ({ props }) => {
	const body = buildCalendar(props.feed.name, props.feed.events.map((e) => toIcsEvent(e, 'en')), new Date(), 'en');
	return new Response(body, {
		headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
	});
};
