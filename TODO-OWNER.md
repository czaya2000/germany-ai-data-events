# Owner to-do

Things only the owner can decide or supply. Everything here is a `[[TODO: ...]]` placeholder in the code until done. Grep for them: `rg "\[\[TODO"`.

## GitHub settings (not done by the build)

1. **Secret `CLAUDE_CODE_OAUTH_TOKEN`**: run `claude setup-token` locally and add the output as a repository secret (Settings > Secrets and variables > Actions). The token lasts one year; set a reminder to renew it. (Used from phase 4 on.)
2. **Pages**: on a free GitHub account, Pages is only available for **public** repositories, so make the repository public first (a private repository needs a paid plan: GitHub Pro or higher; check GitHub Docs, "GitHub Pages"). Then Settings > Pages > Source = **GitHub Actions**.
3. **Actions permissions**: Settings > Actions > General > Workflow permissions = **Read and write**. Private repositories also have a monthly Actions minutes quota on Free plans.

## Domain and go-live

4. Choose and register a domain later. Until then the site is served at `https://czaya2000.github.io/germany-ai-data-events/`. To switch:
   - set `SITE_URL` to the bare domain (env var in the workflows, or `DEFAULT_SITE_URL` in `config/country.mjs`); the base path is derived from it and becomes empty;
   - add `public/CNAME` with the domain, configure DNS, enable HTTPS in Pages settings;
   - flip `INDEXABLE` to `true` in `config/country.mjs` (removes `noindex`, opens `robots.txt`, emits the sitemap, enables the IndexNow ping).
5. While `INDEXABLE = false` every page has `<meta name="robots" content="noindex, nofollow">` and `robots.txt` says `Disallow: /`. Note that on a `github.io` project site crawlers only read the robots.txt at the host root, which this repository does not control, so the meta tag is the effective switch.
6. After go-live: register with Google Search Console (paste the verification value into `GOOGLE_SITE_VERIFICATION`) and Bing Webmaster Tools; create an IndexNow key file `public/<key>.txt` and set `INDEXNOW_KEY`.

## Values in `config/country.mjs`

7. `CONTACT_EMAIL`: contact email. Also used in the fetcher User-Agent (the repository URL is used until it is set).
8. `FORM_ENDPOINT`: FormSubmit target address for the contact and submit forms (`https://formsubmit.co/<address>`).
9. `BUTTONDOWN_USERNAME`: Buttondown newsletter name and username; API key as repository secret `BUTTONDOWN_API_KEY`. `buttondown/web.css` carries tag ids from the reference newsletter; replace them with the ids of the new newsletter's `city-<slug>` and `format-<slug>` tags. The signup form posts to `buttondown.com/api/emails/embed-subscribe/<username>` and will not work until the username is set.
10. Optional: `UMAMI_WEBSITE_ID`, `CLOUDFLARE_BEACON_TOKEN` (analytics; empty means no tracking script is rendered), `LINKEDIN_URL`, `INSTAGRAM_URL` (empty means the link is hidden).
11. The working name "German AI & Data Events" (`SITE_NAME`) and the six hub cities can be changed in `config/country.mjs`.

## Legal pages

12. `/impressum` and `/privacy` are **skeletons** with `[[TODO: owner to supply ...]]` placeholders: provider identity, address, contact, register/VAT data if any, and the processors actually used (host, Buttondown, FormSubmit, analytics tool). Nothing was invented. **This is not legal advice; have the final texts reviewed.**
13. Fonts are self-hosted (`public/fonts/`, Archivo, SIL Open Font License) so no visitor IP goes to a font CDN. Confirm this with your own legal advice.

## Design assets

14. `public/og-image.png` is a blank placeholder (no text). `favicon.*` and `apple-touch-icon.png` were copied from the reference edition. Replace all with German-edition artwork before go-live.

## Later (not part of phase 1)

15. Monday Buttondown digest draft step in the daily workflow (a commented stub is added in phase 4).
16. Weekly discovery agent, Playwright scrape sources, newsletter tag setup.
