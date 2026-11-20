import type { APIRoute, GetStaticPaths } from 'astro';
import { getUpcomingEvents } from '../../lib/events';
import { listFeeds, toIcsEvent, type Feed } from '../../lib/calendar-feeds';
import { buildCalendar } from '../../lib/ics';

/* Static calendar subscription feeds, regenerated on every build — so the
   daily refresh keeps them current with no workflow changes. Same
   date window as the homepage (getUpcomingEvents). German text at /calendar/,
   English at /en/calendar/ (src/pages/en/calendar/[feed].ics.ts): same files, same UIDs. */

export const getStaticPaths = (async () => {
	const feeds = listFeeds(await getUpcomingEvents(), 'de');
	return feeds.map((feed) => ({ params: { feed: feed.slug }, props: { feed } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ feed: Feed }> = ({ props }) => {
	const body = buildCalendar(props.feed.name, props.feed.events.map((e) => toIcsEvent(e, 'de')), new Date(), 'de');
	return new Response(body, {
		headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
	});
};
