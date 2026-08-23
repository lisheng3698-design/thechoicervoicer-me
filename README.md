# The Choicer Voicer

A playable browser voice-imitation party game and bilingual English/Chinese guide for `thechoicervoicer.me`.

Players hear a rights-cleared character performance, imitate its rhythm and pitch movement through their microphone, replay their take, and receive scores plus one-word reviews from five computer judges. The game code, interface, scoring model, logo, and included voice library are produced for this project.

## Language routes

- English: `/`, `/games/`, `/about/`, `/contact/`, `/privacy/`, `/terms/`
- 简体中文: `/zh/`, `/zh/games/`, `/zh/about/`, `/zh/contact/`, `/zh/privacy/`, `/zh/terms/`

Every route has a matching language switch and reciprocal `hreflang` metadata. The Chinese game localizes setup, microphone checks, cue prompts, recording, scoring, judges, errors, and the leaderboard—not only the surrounding guide copy.

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm test
npm run build
npm run test:e2e
```

The E2E suite uses a synthetic local microphone stream in Chromium so the full permission-to-score path can run without uploading audio. Physical microphone and Safari device checks remain manual release checks.

## Production deployment

The release process builds and tests the project before publishing the generated `dist` directory from the dedicated `gh-pages` branch:

```bash
npm run build
```

The canonical production host is `https://thechoicervoicer.me`. Deployment verification covers the apex domain, HTTPS, `/games/`, `/robots.txt`, `/sitemap.xml`, and the custom 404 page.

## Privacy model

- Microphone access starts only after a user click.
- Web Audio analysis and scoring happen in the browser.
- MediaRecorder output is exposed only as a temporary blob URL in the current tab.
- There is no upload endpoint, account, analytics provider, or ad script in this launch build.

## Bilingual scene library

`public/packs/starter-sparks.json` defines 16 playable cues and draws four at random for each show. The library contains four original demo scenes plus 12 short public-domain classics from 12 countries, with separate English and Chinese Qwen3-TTS Voice Design performances. See `ASSET-NOTICE.md` for provenance and exclusions.
