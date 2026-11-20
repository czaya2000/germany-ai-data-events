# German AI & Data Events: operating notes

German edition of the Swiss site swissdataevents.ch. Full spec: `CLAUDE-BRIEF.md`. Source registry: `SOURCES.de.md`. The Swiss app lives in `../swiss-ref` and is **read-only reference**: never write there.

## Layout

- Astro app at the repo root (`astro` pinned to `^6.4.8`: newer majors broke the Swiss build; do not upgrade).
- `config/country.mjs`: all country-specific values (names, `SITE_URL`/base, `INDEXABLE`, timezone, cities, copy, owner placeholders). Plain `.mjs`, imported by Astro, scripts and the pipeline.
- `src/data/events.json`, `archive.json`, `meta.json`: the event data (schema in `src/content.config.ts`; do not add fields).
- `src/lib/events.ts` re-exports config values and has `withBase(path)`; every internal `href`/`src` must carry the base (the site is served under `/germany-ai-data-events` until a custom domain exists): `localePath(path, locale)` for pages, `withBase` for language-neutral files. Absolute URLs are `${SITE_URL}/path` (`${SITE_URL}/en/path` for English). See "Languages" below.
- `scripts/`: `validate-events.mjs`, `archive-past.mjs`, `test-ics.mjs`, `test-agent-files.mjs`, `build-digest.mjs`, `buttondown-redirects.mjs`, `indexnow.mjs`.
- Pipeline: `pipeline:prepare` (code) -> Claude step reads work/TASK.md, writes enrichment.json (`pipeline:enrich-local` locally) -> `pipeline:apply` (code verifies everything in `pipeline/lib/verify.mjs`). Workflow arrives in phase 4.

## Commands

`npm run build`, `npm run validate`, `npm run test:ics`, `npm run test:agent`, `npm run test:i18n` (run after build); `npm test` for the offline tests. Empty `events.json` is valid and shows an honest "no events listed yet" state.

## Rules

- No Node script calls the Anthropic API or reads `CLAUDE_CODE_OAUTH_TOKEN`; no secrets in the repo.
- Owner-only values are `[[TODO: ...]]` placeholders listed in `TODO-OWNER.md`.
- `INDEXABLE` in `config/country.mjs` stays `false` until go-live (noindex, `Disallow: /`, no sitemap, no IndexNow).
- LF line endings (`.gitattributes`). Commit locally to `main`; never push; the operator pushes.
- Grep gate for Swiss leftovers: see `CLAUDE-BRIEF.md` section 8, item 5. Deliberate exceptions: the `swiss-ref` mentions in this file and the brief.

## Languages (German first, English under /en/)

- Astro i18n routing: locales `['de','en']`, `defaultLocale: 'de'`, `prefixDefaultLocale: false`. German is at the root (`/germany-ai-data-events/`), English under `/en/`. Language-neutral files stay single: `/events.json`, `/llms.txt`, `/llms-full.txt`, `/robots.txt`, the hub `.md` files (English, English hub slugs). Per language: ICS feeds (`/calendar/` German text, `/en/calendar/` English text, same UIDs) and RSS (`/rss.xml`, `/en/rss.xml`).
- Page bodies live once in `src/views/*.astro` and take a `locale` prop. `src/pages/**` are thin wrappers (German at the root, the same file under `src/pages/en/`). Never copy logic into a wrapper: a new page = one view + two wrappers.
- Strings: `src/i18n/en.ts` defines the shape, `src/i18n/de.ts` is typed `Messages` (a missing key is a type error). Use `t(locale)`; strings with variables are functions. Do not hard-code UI copy in views or components. Stored values (event titles, organisers, venues, topics) are shown as stored; `displayCity`, `formatLabel` and `localizeCost` (src/i18n) translate the stored English city, format and cost values at render time. Stored data never changes.
- Paths: `src/i18n/paths.mjs`. `localePath(path, locale)` returns an href with base and language prefix; pass a site path in the target language's own slugs (`hubPath(hub, locale)` for hubs). `switchLocalePath(currentPath, locale)` returns the same page in the other language (format hubs map `/konferenzen/` <-> `/en/conferences/`, `/webinare/` <-> `/en/webinars/`; city hubs and event ids are identical); the base is stripped and re-added, so it works with and without one. `hub.slug` stays the English key, `hub.slugDe` is the German URL.
- German-only pages: `/impressum/` and `/datenschutz/` (the old `/privacy/` redirects). English pages link to them with "(in German)"; their switch link goes to the other language's home and they have no hreflang. Keep their `[[TODO]]` placeholders; invent no legal content.
- Switch: "DE | EN" in `SiteNav`, plain links, `aria-current` on the active one, no redirect, no detection, no cookie (a tiny script only copies `?query` and `#hash` onto the link when it is clicked).
- SEO: `<html lang>`, hreflang `de`/`en`/`x-default` (to de) on every page with a counterpart, canonical per language, `og:locale` `de_DE`/`en_DE` plus `og:locale:alternate`, `inLanguage` in JSON-LD, sitemap alternates through our own `serialize` in `astro.config.mjs` (only emitted when `INDEXABLE`). `INDEXABLE=false` keeps noindex in both languages.
- Formatting: `src/i18n/format.ts` (`de-DE` / `en-GB`). Blurbs via `blurbFor(event, locale)`; when only the English text exists it is rendered with its own `lang="en"`.
- The newsletter form posts a hidden `tag` `lang-de` or `lang-en` next to the city and format tags. The calendar dialog and webcal links use the feed of the page language.
- Product name `SITE_NAME` stays English in both languages for now (`[[TODO: Produktname]]` in TODO-OWNER.md).
- Tests: `npm test` (includes `pipeline/test/i18n.test.mjs`: paths, switch, key parity, cost and date localisation) and `npm run test:i18n` after `npm run build` (scans `dist/`: lang, hreflang pairs, switch targets, phrase leaks, noindex, base paths).
