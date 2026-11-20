# Event sources: Germany edition

Counterpart of `SOURCES.md` in the Swiss edition. Compiled 20 Nov 2026 from `/workspace/germany-ai-data-event-sources.md` and `/workspace/germany-competitive-check.md`, then re-checked live the same day from the build box (HTTP status, content type, and where useful the payload shape).

**Status legend**

- `VERIFIED` means the URL returned HTTP 200 with the expected format (ICS, RSS, Atom or JSON, not an HTML page) on 20 Nov 2026.
- `UNVERIFIED` means it was seen in research but not fetched successfully, or only listed by a search index. Never rely on it before testing it.
- `DROPPED` means it is broken or useless and should not be fetched.

**Trust classes** (they decide how much LLM work an event needs, see `CLAUDE-BRIEF.md` section 5)

- `curated`: an AI/data-specific source. An event that passes the keyword prefilter is accepted without an LLM relevance check. The LLM only writes the blurb and fills a missing city or type.
- `noisy`: a general platform or aggregator. Keyword prefilter, then an LLM yes/no on every new candidate.
- `lead`: an aggregator that mostly re-lists other sources (AllAI, Brainberg, hackevents city field). Use it to find events and group URLs, and prefer the organiser or Meetup/Luma page as the registration URL when the dedupe cluster has one.

Where a feed is global (agentconfs, dev.events, confs.tech, aieventlist Europe RSS) the fetcher must drop everything that is not in Germany or genuinely online with a German organiser.

Polite fetching rules for every source: send a normal desktop browser User-Agent plus a contact string, at most 1 request per second per host, conditional GET (`ETag` / `If-Modified-Since`) where the server supports it, and isolate failures per source so one dead feed never fails the run.

---

## A. FEED sources (deterministic Node fetchers, no LLM to fetch)

### A1. Meetup group calendars (ICS, one request per group)

- Template: `https://www.meetup.com/{group}/events/ical/`
- Format: iCalendar. Each `VEVENT` has `UID` (`event_<id>@meetup.com`), `DTSTART;TZID=Europe/Berlin`, `DTEND`, `SUMMARY`, `DESCRIPTION`, `URL;VALUE=URI`, `STATUS`. The location is usually inside `DESCRIPTION` or `LOCATION`; check per group. The ICS only lists upcoming events.
- Trust: `curated` for the AI/data groups below. Counts are the number of upcoming `VEVENT`s on 20 Nov 2026.
- All 39 groups below returned HTTP 200 `text/calendar` today.
- **Self-expanding rule:** whenever any other source links to `https://www.meetup.com/{group}/events/{id}`, add `{group}` to `data/cache/discovered-groups.json`, test its ICS once, and poll it from then on if it returns `text/calendar`. Review new groups weekly, because a group that is not about AI/data (a language-exchange meetup) must be removed or blocked.

**Seed groups with upcoming events** (VERIFIED)

- `pydata-berlin` (2), `pydata-hamburg` (2), `ai-professionals-munich` (1, PyData Munich), `munich-datageeks` (1), `munchen-ai-machine-learning-and-computer-vision-meetup` (3), `ibmpoweraiberlin` (2, "The Journey to AI @ Berlin")

**Seed groups with no upcoming events today** (VERIFIED, keep polling, not dead)

- `data-ai-meetup-koln`, `data-visualization-meetup-hamburg`, `berlin-computer-vision-group`, `berlin-women-in-machine-learning-and-data-science`, `kaggle-berlin`, `data-science-and-ai-frankfurt`, `applydata-munich`

**Groups found in the coverage sample, with upcoming events** (VERIFIED)

- `maikers-ai-community` (3), `bliss-speaker-series` (6), `betreute-intelligenz` (9), `pirateskills` (7), `ai-agenten-frankfurt` (2), `ai-nights-nurnberg` (4), `hamburg-data-science-meetup` (1), `clickhouse-meetup-munich` (1), `berlinai` (1)

**Groups seen with in-window events, ICS now also verified** (VERIFIED; relevance not reviewed, so run them through the `noisy` path first)

- `ai-agents-munich` (1), `agentic-ai-frankfurt` (1), `sovereign-ai-meetup-ulm` (1), `bonner-ki-meetup` (1), `ai-beavers` (10), `ai-school-leipzig` (1), `ai-cloud-innovation-karlsruhe` (1), `kassel-data-science-meetup` (1), `artificial-intelligence-meetup-frankfurt` (1), `heidelberg-knowledge-graph-ai-hub` (1), `munich-snowflake-data-cloud-meetup-group` (1), `beads-berlin-ecosystem-for-analytics-and-data-systems` (1), `pass-microsoft-data-platform-usergroup-rheinland` (1), `awsughh` (1), `fra_aws` (1), `prompting-lab` (3), `ai-transformation-camp` (1)

Note: the research notes say the original seed list had 14 groups, but only 13 are named in the notes, so the 14th is unknown. Do not guess it.

### A2. hackevents.net (ICS, two topics)

- `https://www.hackevents.net/api/calendar?topic=ai-ml&country=de` (VERIFIED, 229 KB, about 232 events at any date)
- `https://www.hackevents.net/api/calendar?topic=data&country=de` (VERIFIED, 63 KB, about 60 events)
- Format: iCalendar, `REFRESH-INTERVAL PT6H`. Fields: `UID` (`<slug>@hackevents.net`), `DTSTART` (often `VALUE=DATE`), `SUMMARY`, `DESCRIPTION` (contains `Details:` and `Register:` URLs), `LOCATION` (a city name), `URL` (the organiser's registration page).
- Trust: `noisy`, role `lead`. The `LOCATION` city is unreliable: some Münster, Warendorf and Stuttgart events carry "Berlin". Re-derive the city from the registration page or the text where possible, and let the LLM fix the city for accepted events.
- Use `URL` (the organiser page) as the registration URL, not the hackevents page.

### A3. Brainberg (JSON API)

- `https://brainberg.eu/api/events?country=DE&limit=100&from=YYYY-MM-DD&cursor=<nextCursor>` (VERIFIED)
- Response: `{ "events": [ { "event": {...}, "city": {...}, "country": {...} } ], "nextCursor": "<uuid>" }`. Stop when `nextCursor` is missing.
- `event` fields seen: `id`, `title`, `slug`, `description`, `shortDescription`, `category` (for example `ai_applied`, `software_dev`), `eventType` (`meetup`, `conference`, `hackathon`, `workshop`), `tags`, `startsAt`, `endsAt` (UTC ISO), `timezone`, `isOnline`, `isHybrid`, `venueName`, `venueAddress`, `websiteUrl`, `registrationUrl`, `lumaUrl`, `eventbriteUrl`, `meetupUrl`, `confsTechUrl`, `devEventsUrl`, `isFree`, `priceFrom`, `priceTo`, `currency`, `source`, `sourceUrl`, `organizerName`, `updatedAt`. City filter parameters exist (city slug, category) but their exact names are UNVERIFIED; the country filter above is enough.
- Trust: `noisy`, role `lead`. About 300 German events in all tech categories, about 84 AI/data in the next 120 days. It re-lists Meetup, dev.events, Eventbrite, eventseye, confs.tech and Luma, so prefer `meetupUrl` / `lumaUrl` / `registrationUrl` over `websiteUrl` as the registration link and use `meetupUrl` for group discovery.

### A4. Luma (public discover API used by luma.com itself)

- `https://api.lu.ma/discover/get-paginated-events?discover_place_api_id=<PLACE>&pagination_limit=50&pagination_cursor=<next_cursor>` (VERIFIED anonymously on 20 Nov 2026; this is the endpoint the public discover pages call, not a documented API, so it may change. Keep the fetcher tolerant and report breakage in the source health file).
- Response: `{ "entries": [ { "api_id", "event": { "name", "start_at", "end_at", "timezone", "url" (a short slug, link = `https://luma.com/<url>`), "location_type", "geo_address_info": { "city", "country_code", "full_address", ... } }, "calendar": {...}, "hosts": [ { "name" } ], ... } ], "has_more": true, "next_cursor": "..." }`. Page until `has_more` is false (Berlin returned 50 + 4 = 54, which matches the place's `event_count`).
- Times are UTC (`...Z`); convert to Europe/Berlin local date and time.
- Place IDs (VERIFIED from each discover page's `__NEXT_DATA__` `pageProps.place.api_id`):
  - Berlin `discplace-gCfX0s3E9Hgo3rG` (page https://luma.com/discover/berlin/ai, 54 events)
  - Munich `discplace-P00kEGGGHNLEYGe` (https://luma.com/discover/munich/ai, 20)
  - Hamburg `discplace-xZzD6rDcDK12oi7` (https://luma.com/discover/hamburg/ai, 23)
  - Frankfurt `discplace-9fJOlBTzIKNMSda` (https://luma.com/discover/frankfurt/ai, 10)
  - Cologne: `https://luma.com/discover/cologne/ai` returned HTTP 404, and no place ID was found. DROPPED until a place ID is found another way.
  - Stuttgart: the discover page loaded but exposed no place ID. UNVERIFIED.
- A category filter exists on the site (`cat-ai`), but the API parameter name was not confirmed (two guessed names both returned unfiltered pages). Pull the whole place and filter by keyword in code.
- Also worth a calendar-level pull (UNVERIFIED API shape): TUM.ai `https://luma.com/TUMai`.
- Trust: `noisy`. Many Luma events are not about AI (the Berlin place carries GTM, networking and career events). Keyword prefilter, then LLM yes/no.
- Each Luma event's `url` is also the registration URL.

### A5. Eventbrite (JSON-LD in search pages)

- Pattern: `https://www.eventbrite.de/d/germany--{city}/{keyword}/?page={n}`, parse `<script type="application/ld+json">` whose `@type` is `ItemList`; every `itemListElement` is an `Event` with `name`, `startDate`, `endDate`, `url`, `description`, and `location` (`name`, `address.addressLocality`, `streetAddress`). About 14 to 20 events per page (VERIFIED today).
- City slugs that returned results (VERIFIED): `berlin`, `münchen` (URL-encoded as `m%C3%BCnchen`; `munich` redirects there), `köln` (`k%C3%B6ln`), `frankfurt-am-main`, `hamburg`, `stuttgart`.
- Keyword slugs used in the research: `artificial-intelligence`, `data-science`, `machine-learning`. Paginate until a page has no new URLs (cap at 5 pages per city and keyword).
- Trust: `noisy`. Keyword results are fuzzy (1,013 in-window items before the AI filter, 105 after). Mixed `.de`, `.com` and `.ch` hostnames appear in the event URLs; that is normal.
- No official Eventbrite API is needed; do not require an API key.

### A6. Research centres and universities

- **MCML Munich** RSS `https://mcml.ai/events/index.xml` (VERIFIED, upcoming events) and JSON archive `https://mcml.ai/events.json` (VERIFIED, 1.4 MB, about 415 events; dates live in the HTML or URL, so use the RSS for upcoming and the JSON only for backfill). Trust `curated`, city Munich.
- **hessian.AI** ICS `https://www.hessian.ai/events/?ical=1` (VERIFIED, The Events Calendar plugin, `REFRESH-INTERVAL PT1H`, about 8 upcoming). Trust `curated`, region Frankfurt / Rhine-Main (Darmstadt).
- **LMU Munich** university-wide events RSS `https://www.lmu.de/de/newsroom/rss-feed-events.xml` (VERIFIED). Trust `noisy`: everything at the university, filter hard.
- **CAIML Cologne** Atom `https://caiml.events/feed.xml` (VERIFIED, 10 entries, includes announcements as well as events). Trust `curated`, city Cologne. Use only entries that have a date.

### A7. Conference and trade lists

- **DeutschlandKI KI-Events** RSS `https://deutschlandki.de/ki-events/feed.xml` (VERIFIED, 52 items, built 9 Nov so slow). Trust `curated`, mostly conferences and fairs. **Licence: CC BY 4.0, attribution required.** Show "Source: DeutschlandKI (CC BY 4.0)" for events whose only source is this feed, and still verify against the organiser page.
- **aieventlist.ai**: Europe RSS `https://aieventlist.ai/feed.xml` (VERIFIED, 172 items, filter Germany) and per-city ICS `https://aieventlist.ai/cities/{city}/events.ics` plus RSS `https://aieventlist.ai/cities/{city}/feed.xml`, with `{city}` in `berlin`, `munich`, `frankfurt`, `hamburg`, `cologne`, `stuttgart` (all VERIFIED, HTTP 200 both formats; Stuttgart had zero events today). Trust `curated`, role cross-check. Wrong paths such as `/berlin/events.ics` return 404.
- **agentconfs.com** ICS `https://agentconfs.com/feeds/all.ics` (VERIFIED, 248 KB, global, `PT12H` refresh; `LOCATION` is like `Berlin\, Germany` or `Online`). Also advertised on the site: `/feeds/cfp.ics` and `/feeds/early-bird.ics` (UNVERIFIED content). Keep only events whose location ends in `Germany`. Trust `curated`, small (about 13 in window).
- **dev.events** RSS `https://dev.events/rss.xml` (VERIFIED, 100 items, global; `<pubDate>` is NOT the event date). The event date and place are only in the `<description>` text, in the form `"<name> is happening on <Month d, yyyy> in <City>, Germany, Europe."`, so parse with a regex and ignore items that do not match. A per-event ICS exists at `https://dev.events/ical/{guid}` (VERIFIED for one event; `DTSTART;VALUE=DATE`, `LOCATION`, `URL`). Use the RSS to find German items, then fetch the per-event ICS only for those. Trust `noisy`, about 7 German items per 100.
- **confs.tech** JSON in GitHub: `https://raw.githubusercontent.com/tech-conferences/conference-data/main/conferences/{year}/data.json` (VERIFIED for 2026 and 2027; `artificial-intelligence.json` returns 404 for both). Fields: `name`, `url`, `startDate`, `endDate`, `city`, `country`, `online`. Keep `country == "Germany"`, then keyword prefilter. Trust `noisy`, low yield (0 AI/data events in the window today), cheap to keep.

### A8. Regional and ecosystem calendars

- **bwcon** (Baden-Württemberg, helps Stuttgart) ICS `https://events.bwcon.de/?ical=1` (VERIFIED, `wp-events-plugin.com` generator). RSS `https://events.bwcon.de/feed/` is mentioned in research but not re-fetched today (UNVERIFIED). Trust `noisy`, city from `LOCATION`.
- **GFW Warendorf** ICS `https://gfw-waf.de/veranstaltungen/?ical=1` (VERIFIED). Small "KI-Werkstatt" series, region Münster/Warendorf. Trust `curated` for KI titles only.
- **Startup City Hamburg** RSS `https://startupcity.hamburg/feed/events` (VERIFIED, 30 items). Broad startup events, trust `noisy`, city Hamburg.
- **KI Bundesverband** `https://ki-verband.de/feed/` is a general WordPress news RSS (VERIFIED as RSS), not an event calendar. Treat as `lead` only; the real event list is a scrape source (B5).

---

## B. SCRAPE sources (no usable feed)

These need HTML, and sometimes a headless browser. Do not send whole pages to an agent. The pipeline fetches each page (plain `fetch`, or Playwright for JS-only pages), strips it to readable text of at most about 8,000 tokens, and hands it to the daily Claude step, which returns a JSON list of events that code then verifies (`CLAUDE-BRIEF.md` section 5.5). Rotate them: each source runs once every 7 days, in a fixed weekday slot, capped at 4 pages per day. Sources marked "weekly" can run less often.

### B1. Aggregators and lead lists

- **AllAI.events** `https://allai.events/` (`?page=N`). No feed. Cards carry `data-event-id`, an `h3` title and meta spans. About 269 German events in the window, the largest single list. Role `lead`: most entries link to Luma, Eventbrite or Meetup, so extract the outbound links and let the existing fetchers confirm them. Check the site's terms and robots.txt before scraping; keep to 1 request per 2 seconds, cap at 10 pages. Do not republish its descriptions.
- **Franke & Schwarz Konferenz-Finder** `https://www.frankeundschwarz.de/konferenz-finder`. DACH B2B fairs and conferences; use only the "KI & Data" category (about 5 German events in the window).
- **eventseye.com** `https://www.eventseye.com/fairs/c1_trade-shows_germany.html`. Trade-fair database (HTTP 200); mostly not AI. Weekly, low value.
- **conferenceindex.org** `https://conferenceindex.org/conferences/artificial-intelligence/germany`. Academic "ICxxx" events of low quality (3 in window). Optional.
- **KI Bundesverband community** `https://community.ki-verband.de/` (JS page, mostly online vendor webinars) and events `https://ki-verband.de/veranstaltungen/` (regional groups; some members-only). Weekly.
- **Bitkom** `https://bitkom-events.de/events` (summits, none AI by title today). Weekly.
- **ki-und-roboter.de** `https://ki-und-roboter.de/ki-und-roboter-events-kalender/` (fairs; overlaps DeutschlandKI), **experte.de** `https://www.experte.de/events/ki` (overlaps DeutschlandKI). Optional.

### B2. German AI competence centres and institutes

- **BIFOLD Berlin** `https://www.bifold.berlin/news-events/events` (and workshops `https://www.bifold.berlin/news-events/scientific-workshops`). TYPO3, no ICS (`?type=150` returns HTML).
- **Cyber Valley** `https://www.cyber-valley.de/events` (Stuttgart/Tübingen; JS-heavy, use Playwright). Do not use `https://www.cyber-valley.org/en/events` (TLS error). The WordPress `https://cyber-valley.de/feed/` has no event items.
- **Lamarr Institute** `https://lamarr-institute.org/current/events/` (NRW). The `/feed/` returned HTTP 429, so it is UNVERIFIED; scrape the page.
- **ScaDS.AI Dresden/Leipzig** `https://scads.ai/event/` (page says JavaScript is required, `?ical=1` returns HTML; use Playwright).
- **appliedAI Initiative** `https://www.appliedai.de/en/company/events/` (Munich) and `https://www.appliedai-institute.de/en/participate/events/` (thin in static HTML).
- **ELLIS** `https://ellis.eu/events`, `https://tuebingen.ellis.eu/events`; Munich unit `https://www.ellismunich.ai/` (cookie wall, UNVERIFIED listings).
- **TUM** central events `https://www.tum.de/aktuelles/veranstaltungen` (noisy) and **MDSI** `https://www.mdsi.tum.de/mdsi/aktuelles/veranstaltungen/`. **AI-HUB@LMU** `https://www.lmu.de/ai-hub/en/news-events/all-events/` (empty on 20 Nov, scrape when it has listings).
- **TU Berlin** `https://www.tu.berlin/veranstaltungen` (noisy), **HPI Potsdam** `https://hpi.de/news-events/events/`, **KIT Karlsruhe** `https://www.kit.edu/kit/veranstaltungskalender.php` (noisy; `?ical=1` returns HTML).
- **Helmholtz AI** `https://www.helmholtz.ai/latest/events/`, **Fraunhofer** events portal `https://www.fraunhofer.de/de/veranstaltungen-messen.html` (noisy), **Fraunhofer IAIS** `https://www.iais.fraunhofer.de/de/presse.html`, **Fraunhofer IPA** `https://www.ipa.fraunhofer.de/de/veranstaltungen-messen.html` (thin index).
- **GI** `https://gi.de/aktuelles/veranstaltungen` (`https://gi.de/rss` returned HTML, not RSS), **GI Fachbereich KI** `https://fb-ki.gi.de/veranstaltungen`, **Plattform Lernende Systeme** `https://www.plattform-lernende-systeme.de/veranstaltungen.html` (stale, weekly or less).
- **Max Planck Society** `https://www.mpg.de/events` (noisy, HTML/JS). **Tübingen AI Center** `https://tuebingen.ai` (news only; `/events` is 404, use Cyber Valley and ELLIS Tübingen instead).

### B3. City hubs and startup scenes

- **Berlin:** none needed beyond the feeds. **Factory Berlin** has no calendar (`/events` is 404).
- **Munich:** **UnternehmerTUM** `https://www.unternehmertum.de/events/` (its `feed.xml` is the Insights blog, not events), **TUM.ai** `https://www.tum-ai.com/events` (use the Luma calendar instead).
- **Hamburg:** **nextMedia.Hamburg** `https://nextmedia-hamburg.de/en/events/`.
- **Frankfurt / Rhine-Main:** **TechQuartier** `https://techquartier.com/events` (Framer site, JS-heavy), **StartHub Hessen** `https://starthub-hessen.de/de/events/` (KI-Journey workshops).
- **Cologne / Düsseldorf:** **STARTPLATZ** `https://www.startplatz.de/events?tag=ai` ("AI Friday" series).
- **Stuttgart region:** **Startup Region Stuttgart** `https://www.startup-region-stuttgart.de/termine/`, **IT Region Stuttgart** `https://it.region-stuttgart.de/termine/` (try the WordPress REST API before scraping).
- **AI Tinkerers** chapters `https://berlin.aitinkerers.org/`, `https://munich.aitinkerers.org/`, `https://hamburg.aitinkerers.org/` (index page `https://kitueftler.org/`). Often also on Luma; scrape only if the Luma pull misses them.
- **Regional organisers seen once or twice** (UNVERIFIED, low value): programmier.bar, cccs.de, startupbw.de, digitalhub.ms (timed out from curl), sqlkonferenz.de, we-conect.com. Add only after a manual look.

### B4. Rotation plan (default)

- Daily: every feed fetcher in section A (roughly 100 to 150 HTTP requests including the Meetup groups, Luma pages and Eventbrite pages).
- Mon: B1. Tue: B2 (first half). Wed: B2 (second half). Thu: B3. Fri: B1 lead pages again. Sat/Sun: skip scraping, feeds only. (An optional weekly discovery agent comes later.)

---

## C. Checked and not worth fetching, or broken (DROPPED)

- `https://www.cyber-valley.org/en/events` (TLS certificate error), `https://tuebingen.ai/events` (404), `https://www.factoryberlin.com/events` (404), `https://hpi.de/veranstaltungen/` and `https://hpi.de/en/events/` (404), `https://www.helmholtz.ai/events/` (404), `https://www.mpg.de/en/events` (404), `https://www.iais.fraunhofer.de/de/veranstaltungen.html` (404), `https://luma.com/discover/cologne/ai` (404), `https://gi.de/rss` (HTML), guessed DeutschlandKI paths `/feed`, `/rss.xml`, `/ki-events/rss` (404), guessed aieventlist path `/berlin/events.ics` (404), `https://www.campus.co/berlin/events` (redirects to Google for Startups).
- **10times.com**: HTTP 403 and a login wall. UNVERIFIED, and no workaround should be attempted.
- **DFKI** `https://www.dfki.de/en/web/news-media/events` and **Max Planck IS** `https://is.mpg.de/events`: bot and JavaScript walls from a plain request. Skip unless an official feed appears; do not try to bypass the walls.
- Low value in the next 120 days: experte.de (next event May 2027), Bitkom (no AI titles), plattform-lernende-systeme (stale), confs.tech Germany (2 events, none AI by title).

---

## D. Coverage reality check (estimates from the competitive check)

- On a sample of 537 distinct German AI/data events between 20 Nov 2026 and 20 Mar 2027, the original source list captured about 59%. Adding AllAI.events, hackevents, Brainberg, Franke & Schwarz, conferenceindex, agentconfs and dev.events lifts that to about 98% of the sample. These are sample-relative figures; a rough capture-recapture estimate puts the true universe near 850 events (estimate, treat as a lower bound).
- About three quarters of the gap is on platforms already in scope (Meetup 61, Luma 22, Eventbrite 5 of 119 events with a non-AllAI link), because the early seed list reached too few Meetup groups and Luma calendars. This is why the self-expanding Meetup group rule (A1) and the place-level Luma pulls (A4) matter more than any single new aggregator.
- Weakest city: Stuttgart (aieventlist had zero). Frankfurt coverage is 33% of its sample, Berlin 55%. Expect to tune the city feeds, not the national ones.
