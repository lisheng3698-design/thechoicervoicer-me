# Launch checklist

Updated: 2026-08-23

## Today’s acceptance line

- [x] Core game flow works in desktop Chromium with a synthetic microphone: permission, soundcheck, cue playback, recording, local replay, scoring.
- [x] Core game flow works at a mobile Chromium viewport with no horizontal overflow.
- [ ] Physical microphone test on desktop Chrome.
- [ ] Physical iPhone Safari test. This cannot be inferred from mobile Chromium emulation.
- [x] Homepage and `/games/` ship meaningful content in raw HTML.
- [x] Independent fan disclaimer is visible in header/banner and footer.
- [x] Original game name, UI, code, Canvas artwork, and synthetic cue audio are separate from the official game.
- [x] `robots.txt`, `sitemap.xml`, canonical tags, VideoGame schema, and visible-matching FAQPage schema are built.
- [x] About, Contact, Privacy, Terms, and a dedicated `404.html` exist.
- [ ] Cloudflare Pages production deployment and custom-domain binding. Blocked until Cloudflare authentication is renewed.
- [ ] Live HTTPS/status/canonical/404 verification after deployment.
- [ ] GSC domain-property verification, sitemap submission, and URL Inspection requests after the domain is live.

## Search and measurement states

- Production origin: `https://thechoicervoicer.me`
- Primary page intent: independent fan guide
- Core action page: `https://thechoicervoicer.me/games/`
- GSC property: pending
- GA4 property/tag: not configured; no tracking is active
- Stable local event hooks: `game_started`, `microphone_granted`, `cue_played`, `recording_started`, `round_scored`, `game_completed`, `fullscreen_toggled`
- Contact inbox: pending domain mail; do not enable ads or submissions until a working contact route is published

## Site-cluster registration card

- Name: The Choicer Voicer Unofficial Fan Guide & Browser Challenge
- URL: `https://thechoicervoicer.me/`
- Type: game + guide
- Niche: browser voice party game / independent game guide
- Language: English
- Status: code complete; production pending
- Launch date: pending successful live deployment
- GSC property: pending
- siteClusterReady: no — production, GSC, real-device mic, and contact inbox remain open
