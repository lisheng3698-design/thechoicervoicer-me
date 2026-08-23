# SEO launch audit

Audit date: 2026-08-24 (Asia/Shanghai)

## Page quality

- Lighthouse SEO: 100/100 for `/`, `/games/`, and `/zh/` against the production build served locally.
- The build publishes static HTML, canonical URLs, `hreflang`, structured data, `robots.txt`, and `sitemap.xml`.
- An IndexNow verification key is published at the site root. Submission must wait until the custom domain returns the deployed site over HTTPS.

## Keyword evidence

- Web.Cafe GeFei difficulty for `the choicer voicer` (United States, English): 41.1/100, medium.
- Web.Cafe classifies the query as generic and estimates a first-page link budget of roughly 40–90 referring domains. This is directional, not a guarantee.
- DataForSEO Google Ads database search volume (United States, English): 880 monthly searches, last updated 2026-07-11. The latest twelve monthly values range from 480 to 1,900.
- DataForSEO keyword difficulty returned 0. It is preserved as reported but is not treated as “no competition”; the live SERP and Web.Cafe score show meaningful competition.
- DataForSEO classified the intent as informational. The live Google SERP snapshot dated 2026-08-23 placed `yeahmaybe.itch.io`, `playvoicegames.com`, and `thechoicervoicergames.com` in the first three organic positions.

The earlier 56,500/month estimate is not supported by this exact-match United States dataset and must not be used for traffic or revenue forecasting without another independently verified source.

## Data usage

- Web.Cafe: one successful cached query; no duplicate query was made.
- DataForSEO: one keyword-overview request ($0.01212) and one live SERP request ($0.00200), both successful and uncached. Total API cost: $0.01412.
- Ahrefs: skipped because it was not requested.

## Deployment and indexing status

- GitHub repository and Pages build: deployed.
- GitHub Pages custom domain: configured as `thechoicervoicer.me`.
- Registrar DNS: pending replacement of the Spaceship parking records with the GitHub Pages apex and `www` records.
- HTTPS certificate, live Lighthouse verification, IndexNow submission, GSC verification, and Bing submission: blocked until DNS points at GitHub Pages.

