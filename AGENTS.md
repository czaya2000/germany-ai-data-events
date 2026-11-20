# German AI & Data Events: operating notes

German edition of the Swiss site swissdataevents.ch. Full spec: `CLAUDE-BRIEF.md`. Source registry: `SOURCES.de.md`. The Swiss app lives in `../swiss-ref` and is **read-only reference**: never write there.

## Layout

- Astro app at the repo root (`astro` pinned to `^6.4.8`: newer majors broke the Swiss build; do not upgrade).
- `config/country.mjs`: all country-specific values (names, `SITE_URL`/base, `INDEXABLE`, timezone, cities, copy, owner placeholders). Plain `.mjs`, imported by Astro, scripts and the pipeline.
- `src/data/events.json`, `archive.json`, `meta.json`: the event data (schema in `src/content.config.ts`; do not add fields).
- `src/lib/events.ts` re-exports config values and has `withBase(path)`; every internal `href`/`src` must use it (the site is served under `/germany-ai-data-events` until a custom domain exists). Absolute URLs are `${SITE_URL}/path`.
- `scripts/`: `validate-events.mjs`, `archive-past.mjs`, `test-ics.mjs`, `test-agent-files.mjs`, `build-digest.mjs`, `buttondown-redirects.mjs`, `indexnow.mjs`.
- Pipeline (`pipeline/`, `data/cache/`, `work/`) arrives in phases 2 to 4.

## Commands

`npm run build`, `npm run validate`, `npm run test:ics`, `npm run test:agent` (run after build). Empty `events.json` is valid and shows an honest "no events listed yet" state.

## Rules

- No Node script calls the Anthropic API or reads `CLAUDE_CODE_OAUTH_TOKEN`; no secrets in the repo.
- Owner-only values are `[[TODO: ...]]` placeholders listed in `TODO-OWNER.md`.
- `INDEXABLE` in `config/country.mjs` stays `false` until go-live (noindex, `Disallow: /`, no sitemap, no IndexNow).
- LF line endings (`.gitattributes`). Commit locally to `main`; never push; the operator pushes.
- Grep gate for Swiss leftovers: see `CLAUDE-BRIEF.md` section 8, item 5. Deliberate exceptions: the `swiss-ref` mentions in this file and the brief.
