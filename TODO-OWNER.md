# Owner to-do

Things only the owner can decide or supply. Everything here is a `[[TODO: ...]]` placeholder in the code until done. Grep for them: `rg "\[\[TODO"`.

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

4. **Domain `germandataevents.com`** is set as `DEFAULT_SITE_URL` and in `public/CNAME`. The Pages custom domain is attached via the API. DNS at the registrar is still the owner's step: apex A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; apex AAAA records `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`; and a `www` CNAME to `czaya2000.github.io`. Remove the current GoDaddy/parking A records and the `www` CNAME that points at the apex. Enable HTTPS in Pages once the certificate is issued. Do **not** flip `INDEXABLE` until the owner says go-live.
5. While `INDEXABLE = false` every page has `<meta name="robots" content="noindex, nofollow">` and `robots.txt` says `Disallow: /`. After the custom domain is live, that robots.txt is the one crawlers will read at the host root.
6. After go-live: register with Google Search Console (paste the verification value into `GOOGLE_SITE_VERIFICATION`) and Bing Webmaster Tools; create an IndexNow key file `public/<key>.txt` and set `INDEXNOW_KEY`.

## Values in `config/country.mjs`

7. `CONTACT_EMAIL`: contact email. Also used in the fetcher User-Agent (the repository URL is used until it is set).
8. `FORM_ENDPOINT`: FormSubmit target address for the contact and submit forms (`https://formsubmit.co/<address>`).
9. `BUTTONDOWN_USERNAME`: Buttondown newsletter name and username; API key as repository secret `BUTTONDOWN_API_KEY`. `buttondown/web.css` carries tag ids from the reference newsletter; replace them with the ids of the new newsletter's `city-<slug>` and `format-<slug>` tags. The signup form posts to `buttondown.com/api/emails/embed-subscribe/<username>` and will not work until the username is set.
10. **Analytics (same pattern as the Swiss site, currently off):** in Umami Cloud (https://cloud.umami.is) create a website whose domain is `germandataevents.com`, then send the website ID (a UUID) so it can be put in `UMAMI_WEBSITE_ID` in `config/country.mjs`. Optionally also add Cloudflare Web Analytics for the same domain and send the beacon token for `CLOUDFLARE_BEACON_TOKEN`. Empty values render no tracking script. Opening a page with `?notrack` stops counting that browser (`?track` turns it back on). Once a tracker is on, update the Datenschutz placeholder to name the processors actually used. Do not invent an ID. `LINKEDIN_URL` and `INSTAGRAM_URL` stay optional (empty hides the link).
11. The working name "German AI & Data Events" (`SITE_NAME`) and the six hub cities can be changed in `config/country.mjs`.

## Legal pages

12. `/impressum` and `/privacy` are **skeletons** with `[[TODO: owner to supply ...]]` placeholders: provider identity, address, contact, register/VAT data if any, and the processors actually used (host, Buttondown, FormSubmit, analytics tool). Nothing was invented. **This is not legal advice; have the final texts reviewed.**
13. Fonts are self-hosted (`public/fonts/`, Archivo, SIL Open Font License) so no visitor IP goes to a font CDN. Confirm this with your own legal advice.

## Design assets

14. `public/og-image.png` is a blank placeholder (no text). `favicon.*` and `apple-touch-icon.png` were copied from the reference edition. Replace all with German-edition artwork before go-live.

## Later (not part of phase 1)

15. Monday Buttondown digest draft step: a commented stub is in `.github/workflows/daily-refresh.yml`. Enable it after creating the newsletter and adding secret `BUTTONDOWN_API_KEY`.
16. Weekly discovery agent, Playwright scrape sources, newsletter tag setup.

## Languages

12. **[[TODO: Produktname]]**: the product name "German AI & Data Events" (`SITE_NAME`) is shown in English in both languages for now. Decide whether the German site gets a German name; change it in `config/country.mjs`.
13. **Buttondown**: the signup form now also sends a tag `lang-de` or `lang-en` (the language of the page the reader signed up on). Buttondown creates unknown tags itself. The digest (`scripts/build-digest.mjs`) does not use them yet: it is still English and links to the German event pages; a German digest is a separate step.
14. **Legal pages**: `/impressum/` and `/datenschutz/` are German skeletons (the old `/privacy/` redirects to `/datenschutz/`). The `[[TODO]]` values are unchanged and still yours to supply; English pages link to them with "(in German)".
15. **German wording**: the German UI text (`src/i18n/de.ts`) uses the formal "Sie" only where a sentence addresses the reader. Have a native speaker read it once before go-live.
