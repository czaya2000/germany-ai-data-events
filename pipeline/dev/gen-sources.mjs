// Generates config/sources.json from the registry in SOURCES.de.md (manually transcribed lists below).
// Re-run after editing the lists:  node pipeline/dev/gen-sources.mjs
import { writeFileSync } from 'node:fs';

const out = [];
const add = (s) => out.push(s);

// ---- A1 Meetup groups ----
const hint = {
	'pydata-berlin': 'Berlin', 'pydata-hamburg': 'Hamburg', 'ai-professionals-munich': 'Munich', 'munich-datageeks': 'Munich',
	'munchen-ai-machine-learning-and-computer-vision-meetup': 'Munich', ibmpoweraiberlin: 'Berlin',
	'data-ai-meetup-koln': 'Cologne', 'data-visualization-meetup-hamburg': 'Hamburg', 'berlin-computer-vision-group': 'Berlin',
	'berlin-women-in-machine-learning-and-data-science': 'Berlin', 'kaggle-berlin': 'Berlin', 'data-science-and-ai-frankfurt': 'Frankfurt',
	'applydata-munich': 'Munich', 'ai-agenten-frankfurt': 'Frankfurt', 'ai-nights-nurnberg': 'Nuremberg',
	'hamburg-data-science-meetup': 'Hamburg', 'clickhouse-meetup-munich': 'Munich', berlinai: 'Berlin',
	'ai-agents-munich': 'Munich', 'agentic-ai-frankfurt': 'Frankfurt', 'sovereign-ai-meetup-ulm': 'Ulm', 'bonner-ki-meetup': 'Bonn',
	'ai-school-leipzig': 'Leipzig', 'ai-cloud-innovation-karlsruhe': 'Karlsruhe', 'kassel-data-science-meetup': 'Kassel',
	'artificial-intelligence-meetup-frankfurt': 'Frankfurt', 'heidelberg-knowledge-graph-ai-hub': 'Heidelberg',
	'munich-snowflake-data-cloud-meetup-group': 'Munich', 'beads-berlin-ecosystem-for-analytics-and-data-systems': 'Berlin',
	awsughh: 'Hamburg', fra_aws: 'Frankfurt',
};
const curated = [
	'pydata-berlin', 'pydata-hamburg', 'ai-professionals-munich', 'munich-datageeks',
	'munchen-ai-machine-learning-and-computer-vision-meetup', 'ibmpoweraiberlin',
	'data-ai-meetup-koln', 'data-visualization-meetup-hamburg', 'berlin-computer-vision-group',
	'berlin-women-in-machine-learning-and-data-science', 'kaggle-berlin', 'data-science-and-ai-frankfurt', 'applydata-munich',
	'maikers-ai-community', 'bliss-speaker-series', 'betreute-intelligenz', 'pirateskills', 'ai-agenten-frankfurt',
	'ai-nights-nurnberg', 'hamburg-data-science-meetup', 'clickhouse-meetup-munich', 'berlinai',
];
const unreviewed = [
	'ai-agents-munich', 'agentic-ai-frankfurt', 'sovereign-ai-meetup-ulm', 'bonner-ki-meetup', 'ai-beavers', 'ai-school-leipzig',
	'ai-cloud-innovation-karlsruhe', 'kassel-data-science-meetup', 'artificial-intelligence-meetup-frankfurt',
	'heidelberg-knowledge-graph-ai-hub', 'munich-snowflake-data-cloud-meetup-group',
	'beads-berlin-ecosystem-for-analytics-and-data-systems', 'pass-microsoft-data-platform-usergroup-rheinland', 'awsughh',
	'fra_aws', 'prompting-lab', 'ai-transformation-camp',
];
for (const [list, trust] of [[curated, 'curated'], [unreviewed, 'noisy']]) {
	for (const g of list) {
		add({
			id: 'meetup:' + g, type: 'meetup', label: 'Meetup', url: `https://www.meetup.com/${g}/events/ical/`,
			trust, acceptAll: g.startsWith('pydata-'), onlineOk: true, country: 'DE', ...(hint[g] ? { cityHint: hint[g] } : {}),
			curatedCalendar: true,
		});
	}
}

// ---- A2 hackevents ----
for (const [id, topic] of [['hackevents-ai', 'ai-ml'], ['hackevents-data', 'data']]) {
	add({ id, type: 'hackevents', label: 'hackevents.net', url: `https://www.hackevents.net/api/calendar?topic=${topic}&country=de`, trust: 'noisy', role: 'lead', onlineOk: true, country: 'DE' });
}
// ---- A3 Brainberg ----
add({ id: 'brainberg', type: 'brainberg', label: 'Brainberg', url: 'https://brainberg.eu/api/events?country=DE&limit=100', trust: 'noisy', role: 'lead', onlineOk: true, country: 'DE' });
// ---- A4 Luma ----
for (const [city, placeId] of [['Berlin', 'discplace-gCfX0s3E9Hgo3rG'], ['Munich', 'discplace-P00kEGGGHNLEYGe'], ['Hamburg', 'discplace-xZzD6rDcDK12oi7'], ['Frankfurt', 'discplace-9fJOlBTzIKNMSda']]) {
	add({ id: 'luma-' + city.toLowerCase(), type: 'luma', label: 'Luma', placeId, url: `https://luma.com/discover/${city.toLowerCase()}/ai`, trust: 'noisy', onlineOk: true, cityHint: city });
}
// ---- A5 Eventbrite ----
for (const [city, slug] of [['Berlin', 'berlin'], ['Munich', 'm%C3%BCnchen'], ['Cologne', 'k%C3%B6ln'], ['Frankfurt', 'frankfurt-am-main'], ['Hamburg', 'hamburg'], ['Stuttgart', 'stuttgart']]) {
	add({ id: 'eventbrite-' + city.toLowerCase(), type: 'eventbrite', label: 'Eventbrite', citySlug: slug, keywords: ['artificial-intelligence', 'data-science', 'machine-learning'], maxPages: 3, url: `https://www.eventbrite.de/d/germany--${slug}/artificial-intelligence/`, trust: 'noisy', cityHint: city });
}
// ---- A6 research centres ----
add({ id: 'mcml', type: 'rss', label: 'mcml.ai', url: 'https://mcml.ai/events/index.xml', dateMode: 'slug-date', trust: 'curated', cityHint: 'Munich', country: 'DE', organiser: 'Munich Center for Machine Learning', curatedCalendar: true });
add({ id: 'hessian-ai', type: 'ics', label: 'hessian.AI', url: 'https://www.hessian.ai/events/?ical=1', trust: 'curated', cityHint: 'Frankfurt', country: 'DE', onlineOk: true, organiser: 'hessian.AI', curatedCalendar: true });
add({ id: 'lmu', type: 'rss', label: 'LMU Munich', url: 'https://www.lmu.de/de/newsroom/rss-feed-events.xml', dateMode: 'pubdate', trust: 'noisy', cityHint: 'Munich', country: 'DE', organiser: 'LMU Munich' });
add({ id: 'caiml', type: 'atom', label: 'CAIML', url: 'https://caiml.events/feed.xml', trust: 'curated', cityHint: 'Cologne', country: 'DE', organiser: 'CAIML Cologne' });
// ---- A7 conference and trade lists ----
add({ id: 'deutschlandki', type: 'rss', label: 'DeutschlandKI (CC BY 4.0)', url: 'https://deutschlandki.de/ki-events/feed.xml', dateMode: 'text', trust: 'curated', onlineOk: false, note: 'CC BY 4.0, attribution required' });
add({ id: 'aieventlist-europe', type: 'rss', label: 'aieventlist.ai', url: 'https://aieventlist.ai/feed.xml', dateMode: 'text', trust: 'curated', role: 'lead', note: 'global feed, Germany kept by city detection' });
for (const c of ['berlin', 'munich', 'frankfurt', 'hamburg', 'cologne', 'stuttgart']) {
	add({ id: 'aieventlist-' + c, type: 'ics', label: 'aieventlist.ai', url: `https://aieventlist.ai/cities/${c}/events.ics`, trust: 'curated', role: 'lead', cityHint: c[0].toUpperCase() + c.slice(1), country: 'DE', onlineOk: true });
}
add({ id: 'agentconfs', type: 'ics', label: 'agentconfs.com', url: 'https://agentconfs.com/feeds/all.ics', trust: 'curated', note: 'global; Germany kept when LOCATION ends in Germany' });
add({ id: 'devevents', type: 'devevents', label: 'dev.events', url: 'https://dev.events/rss.xml', trust: 'noisy' });
add({ id: 'confstech', type: 'confstech', label: 'confs.tech', url: 'https://raw.githubusercontent.com/tech-conferences/conference-data/main/conferences/{year}/data.json', trust: 'noisy' });
// ---- A8 regional ----
add({ id: 'bwcon', type: 'ics', label: 'bwcon', url: 'https://events.bwcon.de/?ical=1', trust: 'noisy', country: 'DE', onlineOk: true, organiser: 'bwcon' });
add({ id: 'gfw-warendorf', type: 'ics', label: 'GFW Warendorf', url: 'https://gfw-waf.de/veranstaltungen/?ical=1', trust: 'curated', cityHint: 'Warendorf', country: 'DE', organiser: 'GFW Warendorf' });
add({ id: 'startupcity-hamburg', type: 'rss', label: 'Startup City Hamburg', url: 'https://startupcity.hamburg/feed/events', dateMode: 'text', trust: 'noisy', cityHint: 'Hamburg', country: 'DE', organiser: 'Startup City Hamburg', note: 'feed items carry no event date (pubDate is the publish date); needs a per-page fetch' });

// ---- B scrape sources (day: ISO weekday of the rotation slot, see SOURCES.de.md B4) ----
const scrape = (id, url, day, extra = {}) => add({ id: 'scrape:' + id, type: 'scrape', label: id, url, trust: 'noisy', day, js: false, ...extra });
scrape('allai', 'https://allai.events/', 1, { role: 'lead', extraDays: [5], maxPages: 10 });
scrape('frankeundschwarz', 'https://www.frankeundschwarz.de/konferenz-finder', 1);
scrape('eventseye', 'https://www.eventseye.com/fairs/c1_trade-shows_germany.html', 1, { weekly: true });
scrape('conferenceindex', 'https://conferenceindex.org/conferences/artificial-intelligence/germany', 1);
scrape('ki-verband-community', 'https://community.ki-verband.de/', 1, { js: true });
scrape('ki-verband-events', 'https://ki-verband.de/veranstaltungen/', 1);
scrape('bitkom', 'https://bitkom-events.de/events', 1, { weekly: true });
scrape('bifold', 'https://www.bifold.berlin/news-events/events', 2, { cityHint: 'Berlin' });
scrape('cyber-valley', 'https://www.cyber-valley.de/events', 2, { js: true, cityHint: 'Tübingen' });
scrape('lamarr', 'https://lamarr-institute.org/current/events/', 2);
scrape('scads', 'https://scads.ai/event/', 2, { js: true });
scrape('appliedai', 'https://www.appliedai.de/en/company/events/', 2, { cityHint: 'Munich' });
scrape('ellis', 'https://ellis.eu/events', 2);
scrape('ellis-tuebingen', 'https://tuebingen.ellis.eu/events', 2, { cityHint: 'Tübingen' });
scrape('tum-mdsi', 'https://www.mdsi.tum.de/mdsi/aktuelles/veranstaltungen/', 2, { cityHint: 'Munich' });
scrape('tu-berlin', 'https://www.tu.berlin/veranstaltungen', 3, { cityHint: 'Berlin' });
scrape('hpi', 'https://hpi.de/news-events/events/', 3, { cityHint: 'Potsdam' });
scrape('kit', 'https://www.kit.edu/kit/veranstaltungskalender.php', 3, { cityHint: 'Karlsruhe' });
scrape('helmholtz-ai', 'https://www.helmholtz.ai/latest/events/', 3);
scrape('fraunhofer', 'https://www.fraunhofer.de/de/veranstaltungen-messen.html', 3);
scrape('gi', 'https://gi.de/aktuelles/veranstaltungen', 3);
scrape('gi-fb-ki', 'https://fb-ki.gi.de/veranstaltungen', 3);
scrape('mpg', 'https://www.mpg.de/events', 3, { js: true });
scrape('ai-hub-lmu', 'https://www.lmu.de/ai-hub/en/news-events/all-events/', 3, { cityHint: 'Munich' });
scrape('unternehmertum', 'https://www.unternehmertum.de/events/', 4, { cityHint: 'Munich' });
scrape('nextmedia-hamburg', 'https://nextmedia-hamburg.de/en/events/', 4, { cityHint: 'Hamburg' });
scrape('techquartier', 'https://techquartier.com/events', 4, { js: true, cityHint: 'Frankfurt' });
scrape('starthub-hessen', 'https://starthub-hessen.de/de/events/', 4);
scrape('startplatz', 'https://www.startplatz.de/events?tag=ai', 4, { cityHint: 'Cologne' });
scrape('startup-region-stuttgart', 'https://www.startup-region-stuttgart.de/termine/', 4, { cityHint: 'Stuttgart' });
scrape('it-region-stuttgart', 'https://it.region-stuttgart.de/termine/', 4, { cityHint: 'Stuttgart' });
scrape('aitinkerers-berlin', 'https://berlin.aitinkerers.org/', 4, { cityHint: 'Berlin' });
scrape('aitinkerers-munich', 'https://munich.aitinkerers.org/', 4, { cityHint: 'Munich' });
scrape('aitinkerers-hamburg', 'https://hamburg.aitinkerers.org/', 4, { cityHint: 'Hamburg' });

writeFileSync(new URL('../../config/sources.json', import.meta.url), JSON.stringify(out, null, '\t') + '\n');
console.log('sources:', out.length, 'feed:', out.filter((s) => s.type !== 'scrape').length);
