// Everything country-specific lives here. Plain .mjs so Astro, the Node
// scripts (validator, digest, indexnow) and the pipeline can all import it.
//
// Domain: germandataevents.com. The base path is derived from SITE_URL (empty
// on a bare domain). INDEXABLE is true since go-live (20 November 2026).
export const COUNTRY_CODE = 'DE';
export const COUNTRY_NAME = 'Germany';
export const TIMEZONE = 'Europe/Berlin';
export const CURRENCY = 'EUR';
export const LOCALE = 'en_DE';

export const SITE_NAME = 'German Data Events';
export const SITE_SHORT = 'German Data Events';

// Custom domain. public/CNAME must match the host.
const DEFAULT_SITE_URL = 'https://germandataevents.com';
const siteUrl = new URL(process.env.SITE_URL || DEFAULT_SITE_URL);
/** Origin only, no path: Astro's `site`. */
export const SITE_ORIGIN = siteUrl.origin;
/** Path prefix without trailing slash: '' on a custom domain. Astro's `base`. */
export const BASE = siteUrl.pathname.replace(/\/+$/, '');
/** Full site address with the base path, no trailing slash. */
export const SITE_URL = `${SITE_ORIGIN}${BASE}`;
export const SITE_HOST = siteUrl.host;
/** Domain part of calendar UIDs (<event id>@<domain>). */
export const UID_DOMAIN = siteUrl.hostname;

/** Source repository, used in the fetcher User-Agent until a contact email is set. */
export const REPO_URL = 'https://github.com/czaya2000/germany-ai-data-events';

// Live since go-live. While false: noindex + robots.txt Disallow + no sitemap + no IndexNow ping.
export const INDEXABLE = true;

// Owner-supplied values (open items are listed in the owner notes file).
export const CONTACT_EMAIL = 'hallo@germandataevents.com';
export const FORM_ENDPOINT = 'https://formsubmit.co/hallo@germandataevents.com';
export const BUTTONDOWN_USERNAME = 'german-data-events';
export const GOOGLE_SITE_VERIFICATION = '';
export const INDEXNOW_KEY = '';
/** Optional analytics. An empty value renders no tracking script at all. */
export const UMAMI_WEBSITE_ID = 'd4786ec0-dbc4-4041-8b01-bd87541dcaa5';
/** Self-hosted Umami (Vercel). */
export const UMAMI_SCRIPT_URL = 'https://umami-data-events.vercel.app/script.js';
export const CLOUDFLARE_BEACON_TOKEN = '';
export const LINKEDIN_URL = '';
export const INSTAGRAM_URL = '';

/** Contact string for the fetcher User-Agent: the contact email once set, the repo URL until then. */
export const FETCHER_CONTACT = CONTACT_EMAIL.startsWith('[[') ? REPO_URL : CONTACT_EMAIL;

export const SITE_TAGLINE =
	"Upcoming AI and data events across Germany: conferences, meetups and workshops in one place, each checked daily against the organiser's page.";
export const SITE_HEADLINE = 'Discover AI & Data Events Across Germany';
export const SITE_SUBHEADLINE = 'Conferences, meetups and workshops in one place, checked daily.';
export const SITE_SCOPE =
	`${SITE_NAME} is a curated list of upcoming AI and data events in Germany: ` +
	'meetups, conferences, workshops, networking evenings and webinars about machine learning, generative AI, ' +
	'data engineering, analytics, data platforms (Databricks, Snowflake, Microsoft Fabric), data governance and applied AI. ' +
	"Every listing links to the organiser's own page, and the list is refreshed every day. " +
	"Registration always happens on the organiser's site.";

/** The six headline cities, plus Online and Other Germany. Slugs are stable: they
    become newsletter tags (city-<slug>), hub URLs and calendar feed names. */
export const CITIES = [
	{ slug: 'berlin', label: 'Berlin' },
	{ slug: 'munich', label: 'Munich' },
	{ slug: 'hamburg', label: 'Hamburg' },
	{ slug: 'frankfurt', label: 'Frankfurt' },
	{ slug: 'cologne', label: 'Cologne' },
	{ slug: 'stuttgart', label: 'Stuttgart' },
	{ slug: 'online', label: 'Online (DE)' },
	{ slug: 'other-germany', label: 'Other Germany' },
];

/** Hub copy per city slug: the smaller places folded into the hub (see PLACE_TO_CITY). */
export const CITY_NEARBY = {
	berlin: 'Potsdam',
	munich: 'Garching and Ingolstadt',
	hamburg: 'Norderstedt',
	frankfurt: 'Darmstadt, Mainz, Wiesbaden, Königstein and Kaiserslautern',
	cologne: 'Bonn, Düsseldorf, Duisburg and Königswinter',
	stuttgart: 'Tübingen and Ludwigsburg',
	online: '',
	'other-germany': 'Leipzig, Dresden, Nuremberg, Karlsruhe, Heidelberg, Münster, Ulm, Kassel and more',
};

/** Place slug -> city slug. Event `city` values are stored under the English
    name; German spellings are accepted too. Unmapped places warn in `npm run validate`. */
export const PLACE_TO_CITY = {
	berlin: 'berlin', potsdam: 'berlin',
	munich: 'munich', munchen: 'munich', garching: 'munich', ingolstadt: 'munich',
	hamburg: 'hamburg', norderstedt: 'hamburg',
	frankfurt: 'frankfurt', 'frankfurt-am-main': 'frankfurt', darmstadt: 'frankfurt',
	mainz: 'frankfurt', wiesbaden: 'frankfurt', offenbach: 'frankfurt', 'konigstein-im-taunus': 'frankfurt', kaiserslautern: 'frankfurt',
	cologne: 'cologne', koln: 'cologne', bonn: 'cologne', dusseldorf: 'cologne', leverkusen: 'cologne',
	duisburg: 'cologne', konigswinter: 'cologne',
	stuttgart: 'stuttgart', tubingen: 'stuttgart', ludwigsburg: 'stuttgart', esslingen: 'stuttgart',
	boblingen: 'stuttgart', sindelfingen: 'stuttgart',
	leipzig: 'other-germany', dresden: 'other-germany', nuremberg: 'other-germany', nurnberg: 'other-germany',
	karlsruhe: 'other-germany', heidelberg: 'other-germany', munster: 'other-germany', ulm: 'other-germany',
	kassel: 'other-germany', hanover: 'other-germany', hannover: 'other-germany', bremen: 'other-germany',
	dortmund: 'other-germany', essen: 'other-germany', mannheim: 'other-germany', freiburg: 'other-germany',
	aachen: 'other-germany', saarbrucken: 'other-germany', augsburg: 'other-germany', jena: 'other-germany',
	erfurt: 'other-germany', rostock: 'other-germany', kiel: 'other-germany', paderborn: 'other-germany',
	bochum: 'other-germany', regensburg: 'other-germany', wurzburg: 'other-germany',
	magdeburg: 'other-germany', braunschweig: 'other-germany', 'weiden-in-der-oberpfalz': 'other-germany',
	warendorf: 'other-germany', erlangen: 'other-germany', furth: 'other-germany', chemnitz: 'other-germany',
};

// Pipeline defaults (used from phase 2 on).
export const WINDOW_DAYS = 120;
export const MAX_NEW_CANDIDATES_PER_RUN = 120;
export const MAX_PAGES_PER_RUN = 4;

// Aggregator / ticketing / listing platforms. An event whose organiser is unknown and whose url is on one of
// these gets the literal stored value NOT_LISTED (never the platform domain). Real organiser sites keep the
// registrable-domain fallback. Matched against the registrable domain of the event url.
export const NOT_LISTED = 'Not listed';
export const AGGREGATOR_DOMAINS = [
	'aieventlist.ai', 'agentconfs.com', 'eventbrite.de', 'eventbrite.com', 'eventbrite.co.uk', 'eventbrite.at', 'eventbrite.ch',
	'eventbrite.fr', 'eventbrite.nl', 'eventbrite.es', 'eventbrite.it', 'dev.events', 'brainberg.com', 'hackevents.net',
	'hackevents.org', 'allai.events', 'luma.com', 'lu.ma', 'meetup.com', 'confs.tech', 'bookwhen.com', 'tickettailor.com',
	'eventfrog.ch', 'xing.com', 'linkedin.com', 'facebook.com', 'konfhub.com', 'sessionize.com', 'ti.to', 'tito.io',
];
