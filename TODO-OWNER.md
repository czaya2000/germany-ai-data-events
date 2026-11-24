# Owner to-do

Things only the owner can decide or supply. The public pages carry no owner placeholders any more; what is left is listed here.

## GitHub settings (not done by the build)

1. **Secret `CLAUDE_CODE_OAUTH_TOKEN`**: run `claude setup-token` locally and add the output as a repository secret (Settings > Secrets and variables > Actions). The token lasts one year; set a reminder to renew it. (Used from phase 4 on.)
2. **Pages**: on a free GitHub account, Pages is only available for **public** repositories, so make the repository public first (a private repository needs a paid plan: GitHub Pro or higher; check GitHub Docs, "GitHub Pages"). Then Settings > Pages > Source = **GitHub Actions**.
3. **Actions permissions**: Settings > Actions > General > Workflow permissions = **Read and write**. Private repositories also have a monthly Actions minutes quota on Free plans.

### Order for the first run

1. Add secret `CLAUDE_CODE_OAUTH_TOKEN` (step 1), set Workflow permissions (step 3).
2. Make the repo public if on GitHub Free, then Settings > Pages > Source = GitHub Actions (step 2).
3. You push `main` (the operator pushes; nothing here pushes). Run `deploy.yml` once via Actions > Deploy > Run workflow, then `daily-refresh.yml` via Run workflow (first with `skip_claude` ticked if you want a dry check).
4. The workflows only run once they are on GitHub's default branch.

### Workflow notes

- `daily-refresh.yml`: runs at 04:37 UTC daily. It runs prepare, then the Claude step (Haiku, max 8 turns, Read/Write only, only when there are new candidates), then apply, archive and validate, commits only `src/data/**` and `data/cache/**`, builds and deploys in its own `deploy` job. Inputs: `skip_claude`, `deploy_only`. If the Claude step fails, candidates stay deferred and the unchanged site still deploys (look for a `::warning::`).
- `deploy.yml`: code pushes (not `src/data/**`) and manual runs. No double deploy: the daily commit uses `GITHUB_TOKEN`, which never triggers other workflows, and `deploy.yml` also ignores data paths.
- Private-repo plan note: Pages on a private repository needs GitHub Pro or higher. On Free, make the repo public (the data and code become public) or upgrade. Private repos on Free also have a monthly Actions minutes quota; a daily run should take only a few minutes (about 100 minutes a month).
- The token renews yearly: `claude setup-token` again, then update the secret. If the plan's policy for headless use changes, the Claude step will fail with a warning and the site keeps deploying unchanged data.

## Domain and go-live

4. **Domain `germandataevents.com`** is set as `DEFAULT_SITE_URL` and in `public/CNAME`. The Pages custom domain is attached via the API. DNS at the registrar is still the owner's step: apex A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; apex AAAA records `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`; and a `www` CNAME to `czaya2000.github.io`. Remove the current GoDaddy/parking A records and the `www` CNAME that points at the apex. Enable HTTPS in Pages once the certificate is issued.5. **Go-live happened (20 November 2026): `INDEXABLE` is `true`** in `config/country.mjs`. `robots.txt` allows crawling and lists `https://germandataevents.com/sitemap-index.xml`; the site-wide noindex meta is gone. Confirmation/thanks pages and thin hubs keep their own noindex. The daily refresh only inherits the config constant (no separate env var), so it rebuilds the site as indexable.
6. Still open, owner steps: submit `sitemap-index.xml` in Google Search Console and Bing Webmaster Tools (UI step; Search Console is **not** verified yet, `GOOGLE_SITE_VERIFICATION` is empty). IndexNow stays off until you create a key file `public/<key>.txt` and set `INDEXNOW_KEY` (the script skips while the key is empty).

## Values in `config/country.mjs`

7. `CONTACT_EMAIL` is set to hallo@germandataevents.com (done; forwarding verified). It is also used in the fetcher User-Agent.
8. `FORM_ENDPOINT` is `https://formsubmit.co/hallo@germandataevents.com` (done, same mailbox as `CONTACT_EMAIL`). **After deploy:** submit each form once to trigger FormSubmit's one-time activation email to that address and confirm it; until then FormSubmit holds submissions. Then send a test message from the contact form and the submit form.
11. The six hub cities can be changed in `config/country.mjs`. The product name "German Data Events" (`SITE_NAME`) is final.

## Legal pages

12. Done on 2026-11-20 (owner-approved): legal pages are launch-ready in German and English, with no placeholders or draft banners: owner name Marcin Czajkowski, contact email, § 36 VSBG statement, Haftungsausschluss (Haftung für Inhalte/Links, DDG era), copyright and CC BY 4.0 data licence for `/data/` and `events.json`, privacy policy sections for GitHub Pages, Umami (Vercel, Supabase), Buttondown and FormSubmit, last-updated date 20 November 2026, Art. 77 supervisory-authority wording (no seat or authority named), no DPO line (none appointed). No postal address, by informed owner decision. **Remaining caveats (not legal advice; have the texts reviewed):** (a) FormSubmit has published no hosting location, DPA or EU transfer mechanism (its privacy PDF is from 2019), so the policy says so; consider replacing FormSubmit or relying on the direct email address; (b) the DPF listings of GitHub and Vercel and Buttondown's DPA/SCC wording were taken from the providers' pages as researched, the DPF registry pages could not be read automatically, so check them once; (c) Umami retention: no fixed period is stated, and the instance's `SALT_ROTATION` is not in the repo (the text says monthly default); the Supabase region is deliberately not named; (d) Buttondown open/click tracking: the text says none is used (Buttondown default is off); check Settings once, the API key cannot read it; (e) no signed DPAs are in the repo, so the text only points to the providers' own DPAs.
13. Fonts are self-hosted (`public/fonts/`, Archivo, SIL Open Font License) so no visitor IP goes to a font CDN. Confirm this with your own legal advice.

## Design assets

14. `public/og-image.png` is a blank placeholder (no text). `favicon.*` and `apple-touch-icon.png` were copied from the reference edition. Replace all with German-edition artwork before go-live.

## Later (not part of phase 1)

15. Weekly discovery agent, Playwright scrape sources.

## Languages

13. **Buttondown** (newsletter `german-data-events`, wired in code): the signup form posts to `https://buttondown.com/api/emails/embed-subscribe/german-data-events` with exactly one language tag (`lang-de` or `lang-en`, a Deutsch/English radio defaulting to the page language) plus optional `city-<slug>` / `format-<slug>` tags. Every Sunday evening `daily-refresh.yml` (with Monday's daily run as a fallback) runs `scripts/build-digest.mjs`, which creates **two drafts** (German: subscribers without `lang-en`; English: subscribers with `lang-en`). It never sends anything. Still to do in Buttondown:
    - Add the repository secret `BUTTONDOWN_API_KEY` (until then the weekly digest step skips itself).
    - Sender name / from address, and the newsletter's public details.
    - Turn on **double opt-in** (confirmation email) and review the confirmation and welcome emails (German and English text; the confirmation email is one text for everyone).
    - Redirect URLs (the API key has no Settings scope, so set them by hand under Settings, or later with `node scripts/buttondown-redirects.mjs --apply` using a key that has it). Buttondown has one address per setting, so they point at the German pages:
      - after the form is submitted: `https://germandataevents.com/subscribe/thanks/` (English page: `/en/subscribe/thanks/`)
      - after the confirmation link: `https://germandataevents.com/subscribe/confirmed/` (English page: `/en/subscribe/confirmed/`)
    - Custom CSS (the API key has no Settings scope, so do this by hand): open `buttondown/web.css` in this repo, copy the whole file, and paste it into Buttondown **Settings → Web → Custom CSS** (replace what is there), then save. It already contains this newsletter's tag ids for `city-berlin`, `format-meetup`, `lang-de`, `lang-en`. Each new `city-*` / `format-*` tag needs one new `.field-group:has([data-tag-id="..."])` line (copy ids from `GET /v1/tags`; instructions are in the file). Also give each tag a public description (the preferences page shows it instead of the tag name) and keep Buttondown's email **accent colour black** (Settings → Appearance), otherwise it adds a second coloured header above the digest's own masthead (same as the Swiss newsletter).
    - Drafts are created Sunday evening; on Monday morning: open the two drafts in the dashboard, check the preview (also with a test subscriber that has `lang-en`), and send them yourself. The first drafts may be over Gmail's ~102 KB clip limit while most events are new (the script prints a warning).
    - The `filters` payload (`tags` contains / not_contains the `lang-en` tag id, from `GET /v1/tags`) follows the 2026-04-01 API as specified, but was never run against the live API from here. Check the audience on the first draft.
14. **Legal pages**: Impressum (with disclaimer) and privacy exist in German (`/impressum/`, `/datenschutz/`) and English (`/en/legal-notice/`, `/en/privacy/`), text in `src/views/ImpressumPage.astro` and `DatenschutzPage.astro`. Name, email, § 36 VSBG, supervisory-authority wording and the legal bases are final; see item 12 for the remaining caveats. Update the privacy policy whenever a service is added, removed or materially changed. Not legal advice.
15. **German wording**: the German UI text (`src/i18n/de.ts`) uses the formal "Sie" only where a sentence addresses the reader. Have a native speaker read it once before go-live.
