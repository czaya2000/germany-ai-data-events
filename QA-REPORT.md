# QA report

Run: 2026-11-20. Method: fixture build + Playwright (Chromium, desktop 1280 px and mobile 390 px, both languages, browser zone America/Los_Angeles on purpose). All findings below were reproduced by a failing e2e test first (`e2e/*.spec.ts`), then fixed in the site code.

## Bugs

### 1. "This week" / "Diese Woche" is the next 7 days, not the calendar week (Berlin and every other page)
- Steps: open `/berlin/?when=week` (or `/en/berlin/`) on Wed 18 Nov and pick the week filter.
- Expected: events of Mon 16 to Sun 22 Nov (Europe/Berlin), including today and events that started earlier.
- Actual: window was today..today+6 (18 to 24 Nov), so "Berlin Next Monday" (23 Nov) and a multi-day event ending 24 Nov showed under "This week". The count in the footer matched the wrong list, so it looked consistent while being wrong. On the live data (Fri 20 Nov) the window ran to Thursday 26 Nov.
- Fix: `src/components/Listing.astro` filter script uses Monday..Sunday.

### 2. Week and month filters used the visitor's time zone, not Europe/Berlin
- Steps: browser in America/Los_Angeles, clock Mon 23 Nov 00:30 Berlin (Sun 15:30 local), `?when=week`; likewise Tue 1 Dec 00:30 Berlin with `?when=month`.
- Expected: new week / new month already started in Berlin.
- Actual: the previous week or month was used until the visitor's own midnight (up to 9 h late in the US, 1 h in the UK). Same for "today" in the ended-event test.
- Fix: "today" comes from `Intl.DateTimeFormat` with `Europe/Berlin`; date arithmetic is done in UTC on `YYYY-MM-DD` strings (no DST shifts).

### 3. Ended events stay in the list on a page built earlier
- Steps: the site is rebuilt once a day; open a page after midnight Berlin (clock Mon 23 Nov on a page built Wed 18 Nov).
- Expected: events whose last day is before today are not listed.
- Actual: they stayed visible with filter "All" (only the week and month filters compared dates) and counted in "n Events".
- Fix: every filter state now requires `endDate >= today` (Berlin).

### 4. Week headings stale on a page built earlier
- Steps: as in 3. Running events (a series started weeks ago) are grouped under the week of the build.
- Expected: under the heading of the current week, which is highlighted.
- Actual: they stayed under the old week heading (a week that is over), and the "current" highlight stayed on the old week.
- Fix: the script marks the current heading from the visitor's clock and moves running events under the current week heading (creating it, localised, when needed). Only runs when the page's build date is not today.

### 5. Build-time `today()` used the UTC date
- Expected: Berlin date. Actual: `new Date().toISOString()` (UTC) in `src/i18n/format.ts`, so a build between 00:00 and 02:00 Berlin time would treat yesterday as today (event pages marked ended, "new" dots, hubs).
- Fix: `today()` uses Europe/Berlin (`isoDateIn`). `SITE_TODAY` freezes it for the e2e build only. Unit test in `pipeline/test/i18n.test.mjs`.

### 6. Hash lost when a filter changes
- Steps: open `/?when=week#subscribe`, pick "This month".
- Expected: `#subscribe` stays (and so survives a language switch afterwards). Actual: `history.replaceState` dropped it.
- Fix: the hash is re-appended.

### 7. Time-range buttons had invalid ARIA
- `role="tablist"` with plain buttons carrying `aria-selected`: no `role="tab"`, no panels. Screen readers got no valid state.
- Fix: `role="group"` with `aria-pressed` on each button (initial state `false`, set by the script).

### 8. Calendar dialog picks the first format when several are filtered
- Steps: `/berlin/?format=Meetup&format=Workshop`, open "Kalender abonnieren".
- Expected: no format pre-selected (a feed follows one format). Actual: "Meetup" was pre-selected and the count (3) did not match the 5 events listed.
- Fix: pre-select a format only when exactly one is in the URL (as already done for cities).

### 9. Submit form accepts an end date before the start date
- Steps: start 2026-12-10, end 2026-12-08, submit.
- Expected: validation error. Actual: accepted and sent.
- Fix: `end.min` follows the start date; message in both languages (`submit.invalid.endBeforeStart`).

### 10. Contact form validation messages in the browser's language
- Steps: German page, browser UI in English, submit empty. Actual: the browser's wording (the submit form already used page-language messages). Fix: same script on the contact page, reusing `submit.invalid`.

## Checked, no problem found
- 52 built pages (fixture build), both languages, both viewports: no console errors, no horizontal overflow, no broken internal links, no German/English UI leaks, every internal link on its own language root.
- Hub headline count equals the visible and counted events (Berlin, Munich, Hamburg, Online); empty hub (Cologne) shows the empty text.
- Language switch keeps query and hash; format hubs map `/konferenzen/` <-> `/en/conferences/`; Impressum/Datenschutz go to the other home, no hreflang, "(in German)" on English pages.
- Calendar dialog: open/close, Esc, focus returns to the opener, no focus on the page behind, feed links in the page language, apple/google/outlook links, copy button and clipboard, disabled state for empty combinations.
- Subscribe dialog: email validated first, hub city pre-ticked, `lang-de`/`lang-en` tag, posts the ticked tags (stubbed, nothing is sent).
- 404 returns 404 in German; English 404 page loads.

## Decisions
- "This week" = from today to the coming Sunday (not Monday of the current week), because events that ended earlier this week are never shown on this site. Today and events already running are included.
- "This month" = from today to the last day of the month in Berlin.
- The time-range buttons are toggle buttons (`aria-pressed`), not tabs: nothing is a tab panel.
- Running events on a stale page are re-grouped on the client instead of changing the build to hourly; the daily build stays as is.
- Test hooks exist only for tests: `SITE_TODAY`, `E2E_EVENTS`, `E2E_OUT` (environment variables read at build time; unset in production), and Playwright's `page.clock` in the browser.

## Left unfixed / notes
- Astro's "collection archive does not exist or is empty" warning is expected while `archive.json` is empty.
- Opening a language-switch link in a new tab (middle click) loses the query: the script copies it only on a normal click. The plain link still lands on the right page.
- The live data id `vibe-kode-2026-munich-2026` has city Berlin (data issue from the pipeline, not touched).
