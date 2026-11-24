# German Data Events: operating notes

German edition of the Swiss site swissdataevents.ch. Full spec: `CLAUDE-BRIEF.md`. Source registry: `SOURCES.de.md`. The Swiss app lives in `../swiss-ref` and is **read-only reference**: never write there.

## Layout

- Astro app at the repo root (`astro` pinned to `^6.4.8`: newer majors broke the Swiss build; do not upgrade).
- `config/country.mjs`: all country-specific values (names, `SITE_URL`/base, `INDEXABLE`, timezone, cities, copy, owner placeholders). Plain `.mjs`, imported by Astro, scripts and the pipeline.
- `src/data/events.json`, `archive.json`, `meta.json`: the event data (schema in `src/content.config.ts`; do not add fields).
- `src/lib/events.ts` re-exports config values and has `withBase(path)`; every internal `href`/`src` must still go through `withBase` / `localePath` (the site is at https://germandataevents.com, so the base path is empty): `localePath(path, locale)` for pages, `withBase` for language-neutral files. Absolute URLs are `${SITE_URL}/path` (`${SITE_URL}/en/path` for English). See "Languages" below.
- `scripts/`: `validate-events.mjs`, `archive-past.mjs`, `test-ics.mjs`, `test-agent-files.mjs`, `build-digest.mjs`, `buttondown-redirects.mjs`, `indexnow.mjs`.
- Pipeline: `pipeline:prepare` (code) -> Claude step reads work/TASK.md, writes enrichment.json (`pipeline:enrich-local` locally) -> `pipeline:apply` (code verifies everything in `pipeline/lib/verify.mjs`). Workflow arrives in phase 4.

## Commands

`npm run build`, `npm run validate`, `npm run test:ics`, `npm run test:agent`, `npm run test:i18n` (run after build); `npm test` for the offline tests. Empty `events.json` is valid and shows an honest "no events listed yet" state.

## End-to-end tests (Playwright)

- `npm run test:e2e` (first time: `npx playwright install chromium`). ~230 tests, under a minute, desktop 1280 px and mobile 390 px, German and English. Not part of the daily workflow. Output in `test-results/` and `dist-e2e/` (both ignored).
- It never reads live data: `e2e/serve.mjs` builds the site from `e2e/fixtures/events.json` (regenerate with `node e2e/fixtures/make-fixture.mjs`) into `dist-e2e/`, then serves it with `astro preview` (`E2E_SKIP_BUILD=1` reuses the last build). Test-only environment variables, read at build time and unset in production: `E2E_EVENTS` (events file), `E2E_OUT` (output folder), `SITE_TODAY` (YYYY-MM-DD, freezes `today()` in `src/i18n/format.ts`).
- Date freezing: the fixture build is frozen at Wed 2026-11-18 (`SITE_TODAY`); in the browser every test sets "now" with `page.clock.install({ time })` (`NOW` in `e2e/helpers.ts`). The browser zone is America/Los_Angeles on purpose, so tests prove the site follows Europe/Berlin. Date-dependent logic is tested against fixture events only.
- Event end rule (`src/lib/schedule.mjs`, shared by the build, the digest and the listing script): an event is over when its end instant in Europe/Berlin is before now: end time on the last day if the time is a range ("10:00–12:00"), else 23:59:59 of the last day. `getUpcomingEvents`, `isEnded` (event page note) and `selectEvents` (digest, `now` option) use it; the listing script repeats it with the visitor's Berlin clock (`data-end` on every row). Running events (begun, not over) sit in a "Heute/Today" group, a multi-day one that began earlier shows today's date plus "läuft bis / until <end day>". Card meta line = city + time only. Test freeze: `SITE_NOW` (ISO instant) or `SITE_TODAY` (date, 00:00).
- Site rule behind the tests: "this week" runs from today to Sunday, "this month" to the month's last day, both in Europe/Berlin; events that ended before today are never listed, also on a page built on an earlier day (the client script in `src/components/Listing.astro` handles it).
- Findings and decisions of the QA pass: `QA-REPORT.md`.

## Rules

- No Node script calls the Anthropic API or reads `CLAUDE_CODE_OAUTH_TOKEN`; no secrets in the repo.
- Owner-only values are `[[TODO: ...]]` placeholders listed in `TODO-OWNER.md`.
- Go-live happened (20 November 2026): `INDEXABLE` in `config/country.mjs` is `true` (robots.txt allows all and lists the sitemap, no site-wide noindex, sitemap emitted). Do not set it back to `false` unless the owner asks. Search Console sitemap submission is an owner step in the UI (not verified; `GOOGLE_SITE_VERIFICATION` empty). IndexNow stays off until `INDEXNOW_KEY` is set.
- LF line endings (`.gitattributes`). Commit locally to `main`; never push; the operator pushes.
- Grep gate for Swiss leftovers: see `CLAUDE-BRIEF.md` section 8, item 5. Deliberate exceptions: the `swiss-ref` mentions in this file and the brief.

## Languages (German first, English under /en/)

- Astro i18n routing: locales `['de','en']`, `defaultLocale: 'de'`, `prefixDefaultLocale: false`. German is at the root (`/`), English under `/en/`. Language-neutral files stay single: `/events.json`, `/llms.txt`, `/llms-full.txt`, `/robots.txt`, the hub `.md` files (English, English hub slugs). Per language: ICS feeds (`/calendar/` German text, `/en/calendar/` English text, same UIDs) and RSS (`/rss.xml`, `/en/rss.xml`).
- Page bodies live once in `src/views/*.astro` and take a `locale` prop. `src/pages/**` are thin wrappers (German at the root, the same file under `src/pages/en/`). Never copy logic into a wrapper: a new page = one view + two wrappers.
- Strings: `src/i18n/en.ts` defines the shape, `src/i18n/de.ts` is typed `Messages` (a missing key is a type error). Use `t(locale)`; strings with variables are functions. Do not hard-code UI copy in views or components. Stored values (event titles, organisers, venues, topics) are shown as stored; `displayCity`, `formatLabel` and `localizeCost` (src/i18n) translate the stored English city, format and cost values at render time. Stored data never changes.
- Paths: `src/i18n/paths.mjs`. `localePath(path, locale)` returns an href with base and language prefix; pass a site path in the target language's own slugs (`hubPath(hub, locale)` for hubs). `switchLocalePath(currentPath, locale)` returns the same page in the other language (format hubs map `/konferenzen/` <-> `/en/conferences/`, `/webinare/` <-> `/en/webinars/`; city hubs and event ids are identical); the base is stripped and re-added, so it works with and without one. `hub.slug` stays the English key, `hub.slugDe` is the German URL.
- Legal pages exist in both languages: `/impressum/` <-> `/en/legal-notice/`, `/datenschutz/` <-> `/en/privacy/` (hreflang pairs; the old root `/privacy/` redirects to `/datenschutz/`). Views `src/views/ImpressumPage.astro` (Impressum + Haftungsausschluss) and `DatenschutzPage.astro`, frame `src/components/LegalShell.astro`, slugs in `src/i18n/paths.mjs` (`legalPath`). The footer links them on every page in the page's language. They carry no placeholders or draft banners any more (tests fail if `TODO` or a draft banner appears on a public page); invent no legal or owner facts. GitHub Pages serves only the root `404.html`, so the German 404 carries an English block that moves up for `/en/` paths. Owner name (Marcin Czajkowski), `CONTACT_EMAIL` (hallo@germandataevents.com), the § 36 VSBG statement, the date (20 November 2026) and the Art. 77 supervisory-authority wording are final; the processor sections, disclaimer and CC BY 4.0 data licence are final (remaining caveats such as FormSubmit's thin documentation are in `TODO-OWNER.md`, item 12). `FORM_ENDPOINT` is `https://formsubmit.co/` plus `CONTACT_EMAIL`. No postal address, by owner decision.
- Switch: "DE | EN" in `SiteNav`, plain links, `aria-current` on the active one, no redirect, no detection, no cookie (a tiny script only copies `?query` and `#hash` onto the link when it is clicked).
- SEO: `<html lang>`, hreflang `de`/`en`/`x-default` (to de) on every page with a counterpart, canonical per language, `og:locale` `de_DE`/`en_DE` plus `og:locale:alternate`, `inLanguage` in JSON-LD, sitemap alternates through our own `serialize` in `astro.config.mjs` (only emitted when `INDEXABLE`). `INDEXABLE=false` would put noindex on both languages; page-level noindex (thanks pages, thin hubs) stays either way.
- Formatting: `src/i18n/format.ts` (`de-DE` / `en-GB`). Blurbs via `blurbFor(event, locale)`; when only the English text exists it is rendered with its own `lang="en"`.
- The newsletter form (plain POST to Buttondown `german-data-events`) has a Deutsch/English radio that submits exactly one `tag`, `lang-de` or `lang-en` (default: the page language), next to the optional city and format tags. The weekly digest (drafts built Sunday evening for the Monday send; Monday run is a fallback) (`scripts/build-digest.mjs`, `scripts/lib/digest.mjs`) makes two Buttondown drafts only (German: not `lang-en`; English: `lang-en`); never send, never set a status other than draft. The calendar dialog and webcal links use the feed of the page language.
- Product name `SITE_NAME` is final: "German Data Events", English in both languages.
- Brand assets (`public/favicon.*`, `apple-touch-icon.png`, `og-image.png`, 1200x630) are generated by `scripts/make-brand-assets.mjs`. `CONTACT_EMAIL` in `config/country.mjs` is the only contact-email constant; legal pages read it.
- Tests: `npm test` (includes `pipeline/test/i18n.test.mjs`: paths, switch, key parity, cost and date localisation) and `npm run test:i18n` after `npm run build` (scans `dist/`: lang, hreflang pairs, switch targets, phrase leaks, noindex, base paths).
