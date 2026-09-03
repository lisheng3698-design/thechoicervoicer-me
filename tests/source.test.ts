import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const project = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(project, path), "utf8");
const englishPages = [
  "index.html",
  "games/index.html",
  "app/index.html",
  "how-to-play/index.html",
  "mobile/index.html",
  "voice-packs/index.html",
  "microphone-not-working/index.html",
  "is-it-safe/index.html",
  "alternatives/index.html",
  "gameplay/index.html",
  "multiplayer/index.html",
  "pitch-matching-exercises/index.html",
  "vocal-timing-exercises/index.html",
  "voice-games-for-parties/index.html",
  "voice-imitation-exercises/index.html",
  "voice-acting-warm-ups/index.html",
  "voice-projection-exercises/index.html",
  "voice-modulation-exercises/index.html",
  "articulation-exercises-for-voice-acting/index.html",
  "character-voice-exercises/index.html",
  "breath-control-exercises-for-voice-acting/index.html",
  "about/index.html",
  "contact/index.html",
  "privacy/index.html",
  "terms/index.html",
];
const chinesePages = [
  "zh/index.html",
  "zh/games/index.html",
  "zh/app/index.html",
  "zh/how-to-play/index.html",
  "zh/mobile/index.html",
  "zh/voice-packs/index.html",
  "zh/microphone-not-working/index.html",
  "zh/is-it-safe/index.html",
  "zh/alternatives/index.html",
  "zh/gameplay/index.html",
  "zh/multiplayer/index.html",
  "zh/pitch-matching-exercises/index.html",
  "zh/vocal-timing-exercises/index.html",
  "zh/voice-games-for-parties/index.html",
  "zh/voice-imitation-exercises/index.html",
  "zh/voice-acting-warm-ups/index.html",
  "zh/voice-projection-exercises/index.html",
  "zh/voice-modulation-exercises/index.html",
  "zh/articulation-exercises-for-voice-acting/index.html",
  "zh/character-voice-exercises/index.html",
  "zh/breath-control-exercises-for-voice-acting/index.html",
  "zh/about/index.html",
  "zh/contact/index.html",
  "zh/privacy/index.html",
  "zh/terms/index.html",
];
const pages = [...englishPages, ...chinesePages];

describe("static launch source", () => {
  it("ships crawlable metadata, product-first branding, and a discreet relationship note on every indexable page", () => {
    for (const path of pages) {
      const html = read(path);
      expect(html.match(/<h1[\s>]/g), `${path} should have one H1`).toHaveLength(1);
      expect(html, `${path} should have a title`).toMatch(/<title>[^<]{10,}<\/title>/);
      expect(html, `${path} should have a description`).toMatch(/<meta name="description" content="[^"]{40,}"/);
      expect(html, `${path} should have a production canonical`).toMatch(/<link rel="canonical" href="https:\/\/thechoicervoicer\.me\//);
      const relationshipNote = path.startsWith("zh/")
        ? "本站浏览器游戏为独立实现，不声称获得任何第三方的隶属关系、赞助或背书。"
        : "Independent browser implementation. No third-party affiliation, sponsorship, or endorsement is claimed.";
      expect(html, `${path} should keep the relationship note in the footer`).toContain(relationshipNote);
      expect(html, `${path} should keep the relationship note visually subordinate`).toContain('class="affiliation-note"');
      expect(html, `${path} should not show a top disclaimer banner`).not.toContain('class="fan-notice"');
      expect(html, `${path} should not label the product unofficial`).not.toMatch(/Unofficial|非官方/);
      expect(html, `${path} should not surface official-version wording`).not.toMatch(/\bofficial\b|官方/i);
      expect(html, `${path} should not link to a third-party purchase page`).not.toMatch(/itch\.io/i);
      expect(html, `${path} should not link to a third-party guide site`).not.toMatch(/neocities\.org/i);
      expect(html, `${path} should use product branding in the logo`).toContain(path.startsWith("zh/") ? "<small>浏览器语音游戏</small>" : "<small>Browser voice game</small>");
      expect(html, `${path} should declare its document language`).toContain(path.startsWith("zh/") ? '<html lang="zh-CN">' : '<html lang="en">');
      expect(html, `${path} should not use obsolete meta keywords`).not.toContain("name=\"keywords\"");
    }
  });

  it("keeps the playable page native and source-visible", () => {
    const html = read("games/index.html");
    const home = read("index.html");
    expect(html).toContain("data-voice-show-game");
    expect(home).toContain("data-voice-show-game");
    expect(html).toContain("How to play");
    expect(html).toContain('"@type": "VideoGame"');
    expect(html).toContain('"@type": "FAQPage"');
    expect(html).not.toMatch(/<iframe/i);
    expect(html).not.toContain("thechoicervoicergames.com");
    expect(html).not.toContain("gga.dev");
  });

  it("preloads the voice pack on every playable page", () => {
    for (const path of ["index.html", "games/index.html", "zh/index.html", "zh/games/index.html"]) {
      expect(read(path), `${path} should start the voice-pack request before game initialization`).toContain(
        '<link rel="preload" href="/packs/starter-sparks.json" as="fetch" crossorigin="anonymous" />',
      );
    }
  });

  it("keeps both homepages compact and puts the playable game directly after the intro", () => {
    for (const path of ["index.html", "zh/index.html"]) {
      const html = read(path);
      expect(html, `${path} should use the compact homepage intro`).toContain('class="home-intro home-intro--compact container"');
      expect(html, `${path} should remove the redundant hero CTA`).not.toContain('class="hero__actions"');
      expect(html.indexOf('class="home-intro home-intro--compact container"')).toBeLessThan(html.indexOf('class="game-shell game-shell--home"'));
    }
  });

  it("ships complete homepage social metadata and substantial source-visible English copy", () => {
    const html = read("index.html");
    const chinese = read("zh/index.html");
    expect(html).toContain("<title>The Choicer Voicer — Play the Voice Imitation Game Online</title>");
    expect(html).toContain('content="Play The Choicer Voicer online in your browser.');
    expect(html).toContain("<h1>The Choicer Voicer Online</h1>");
    expect(chinese).toContain("<h1>The Choicer Voicer 在线玩</h1>");
    for (const page of [html, chinese]) {
      expect(page).toContain('property="og:image" content="https://thechoicervoicer.me/the-choicer-voicer-google-search-preview.png"');
      expect(page).toContain('name="twitter:card" content="summary_large_image"');
      expect(page).toContain('name="twitter:image" content="https://thechoicervoicer.me/the-choicer-voicer-google-search-preview.png"');
      expect(page).toContain('"primaryImageOfPage": "https://thechoicervoicer.me/the-choicer-voicer-google-search-preview.png"');
      expect(page).toContain('<img src="/the-choicer-voicer-google-search-preview.png"');
    }
    const visibleEnglish = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z0-9#]+;/gi, " ")
      .replace(/[^\p{L}\p{N}’'–-]+/gu, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    expect(visibleEnglish.length).toBeGreaterThanOrEqual(1200);
    expect(visibleEnglish.length).toBeLessThanOrEqual(1800);
    expect(existsSync(resolve(project, "public/the-choicer-voicer-google-search-preview.png"))).toBe(true);
  });

  it("ships the interwoven-wave logo across every product header", () => {
    const logo = read("public/logo-mark.svg");
    const favicon = read("public/favicon.svg");
    expect(logo.match(/<path /g)).toHaveLength(2);
    expect(logo).toContain('viewBox="-12 -6 216 120"');
    expect(logo).not.toContain("<circle");
    expect(logo).not.toContain("<rect");
    expect(logo).toContain("#273136");
    expect(logo).toContain("#58C8D1");
    expect(logo).not.toContain("#E06169");
    expect(favicon.match(/<path /g)).toHaveLength(2);
    expect(favicon).toContain('viewBox="-12 -6 216 120"');
    expect(favicon).toContain("#273136");
    expect(favicon).toContain("#58C8D1");
    for (const path of pages) {
      const html = read(path);
      expect(html, `${path} should use the product logo mark`).toContain('src="/logo-mark.svg"');
      expect(html, `${path} should use the designed wordmark`).toContain('class="brand__name"');
    }
  });

  it("keeps removed third-party publisher references out of site content and research notes", () => {
    const removedPublisher = ["Yeah", "Maybe"].join("").toLowerCase();
    const contentFiles = [
      ...pages,
      "404.html",
      "src/game.ts",
      "docs/research/BEHAVIORS.md",
      "docs/research/OFFICIAL_FEATURE_PARITY.md",
      "docs/research/LICENSING-DEPLOYMENT-ASSESSMENT.md",
    ];
    for (const path of contentFiles) {
      expect(read(path).toLowerCase(), `${path} should not contain the removed publisher reference`).not.toContain(removedPublisher);
    }
  });

  it("publishes only rights-labelled dialogue demos declared by the local pack", () => {
    const pack = JSON.parse(read("public/packs/starter-sparks.json")) as {
      assetNotice: string;
      roundsPerShow: number;
      cues: Array<{
        quote: string;
        quoteZh: string;
        sourceTitle: string;
        sourceTitleZh: string;
        character: string;
        characterZh: string;
        scene: string;
        sceneZh: string;
        rights: string;
        rightsZh: string;
        sourceUrl: string;
        country: string;
        countryZh: string;
        voiceGender: "male" | "female" | "androgynous";
        voiceAge: "child" | "teen" | "young-adult" | "adult" | "elder";
        mediaKind: string;
        generator: string;
        audioUrl: string;
        audioUrlZh: string;
        durationMs: number;
        durationMsZh: number;
        reference: { durationMs: number };
        referenceZh: { durationMs: number };
      }>;
    };
    expect(pack.assetNotice).toContain("no commercial movie dialogue");
    expect(pack.roundsPerShow).toBe(4);
    expect(pack.cues.length).toBeGreaterThanOrEqual(16);
    expect(new Set(pack.cues.map((cue) => cue.country)).size).toBeGreaterThanOrEqual(12);
    expect(new Set(pack.cues.map((cue) => cue.voiceGender))).toEqual(new Set(["male", "female", "androgynous"]));
    expect(new Set(pack.cues.map((cue) => cue.voiceAge))).toEqual(new Set(["child", "teen", "young-adult", "adult", "elder"]));
    expect(pack.cues.filter((cue) => cue.voiceGender === "male").length).toBeGreaterThanOrEqual(6);
    expect(pack.cues.filter((cue) => cue.voiceGender === "female").length).toBeGreaterThanOrEqual(6);
    for (const cue of pack.cues) {
      expect(cue.quote.length).toBeGreaterThan(2);
      expect(cue.quoteZh.length).toBeGreaterThan(1);
      expect(cue.sourceTitle).toBeTruthy();
      expect(cue.sourceTitleZh).toBeTruthy();
      expect(cue.character).toBeTruthy();
      expect(cue.characterZh).toBeTruthy();
      expect(cue.scene).toBeTruthy();
      expect(cue.sceneZh).toBeTruthy();
      expect(cue.rights).toContain("cleared");
      expect(cue.rightsZh).toContain("使用权");
      expect(cue.sourceUrl).toMatch(/^https:\/\//);
      expect(cue.country).toBeTruthy();
      expect(cue.countryZh).toBeTruthy();
      expect(cue.mediaKind).toBe("spoken-dialogue");
      expect(cue.generator).toBe("qwen/qwen3-tts:voice_design");
      expect(cue.reference.durationMs).toBeGreaterThan(1000);
      expect(cue.referenceZh.durationMs).toBeGreaterThan(1000);
      expect(cue.durationMs).toBe(cue.reference.durationMs);
      expect(cue.durationMsZh).toBe(cue.referenceZh.durationMs);
      expect(existsSync(resolve(project, "public", cue.audioUrl.slice(1)))).toBe(true);
      expect(existsSync(resolve(project, "public", cue.audioUrlZh.slice(1)))).toBe(true);
      expect(cue.audioUrl).toMatch(/-en\.wav$/);
      expect(cue.audioUrlZh).toMatch(/-zh\.wav$/);
      expect(cue.audioUrl).toContain("/audio/qwen-");
      expect(cue.audioUrlZh).toContain("/audio/qwen-");
    }
  });

  it("uses the production origin in robots and sitemap", () => {
    const robots = read("public/robots.txt");
    const sitemap = read("public/sitemap.xml");
    expect(robots).toContain("https://thechoicervoicer.me/sitemap.xml");
    for (const route of ["games", "app", "how-to-play", "mobile", "voice-packs", "microphone-not-working", "is-it-safe", "alternatives", "gameplay", "multiplayer", "pitch-matching-exercises", "vocal-timing-exercises", "voice-games-for-parties", "voice-imitation-exercises", "voice-acting-warm-ups", "voice-projection-exercises", "voice-modulation-exercises", "articulation-exercises-for-voice-acting", "character-voice-exercises", "breath-control-exercises-for-voice-acting"]) {
      expect(sitemap).toContain(`https://thechoicervoicer.me/${route}/`);
      expect(sitemap).toContain(`https://thechoicervoicer.me/zh/${route}/`);
    }
    expect(sitemap).toContain("https://thechoicervoicer.me/zh/");
    expect(sitemap).toContain("https://thechoicervoicer.me/zh/games/");
    expect(sitemap).toContain('hreflang="zh-Hans"');
    expect(sitemap).not.toContain("localhost");
    expect(existsSync(resolve(project, "404.html"))).toBe(true);
    expect(existsSync(resolve(project, "public/_redirects"))).toBe(false);
  });

  it("publishes the IndexNow verification key at the site root", () => {
    const key = "3816ac92e1a10a2b765a5d23261a36fa";
    expect(read(`public/${key}.txt`).trim()).toBe(key);
  });

  it("keeps the GitHub Pages custom domain in every deployment", () => {
    expect(read("public/CNAME").trim()).toBe("thechoicervoicer.me");
  });

  it("connects English and Chinese equivalents with visible switches and hreflang", () => {
    const pairs = [
      ["index.html", "zh/index.html", "/zh/", "/"],
      ["games/index.html", "zh/games/index.html", "/zh/games/", "/games/"],
      ["app/index.html", "zh/app/index.html", "/zh/app/", "/app/"],
      ["how-to-play/index.html", "zh/how-to-play/index.html", "/zh/how-to-play/", "/how-to-play/"],
      ["mobile/index.html", "zh/mobile/index.html", "/zh/mobile/", "/mobile/"],
      ["voice-packs/index.html", "zh/voice-packs/index.html", "/zh/voice-packs/", "/voice-packs/"],
      ["microphone-not-working/index.html", "zh/microphone-not-working/index.html", "/zh/microphone-not-working/", "/microphone-not-working/"],
      ["is-it-safe/index.html", "zh/is-it-safe/index.html", "/zh/is-it-safe/", "/is-it-safe/"],
      ["alternatives/index.html", "zh/alternatives/index.html", "/zh/alternatives/", "/alternatives/"],
      ["gameplay/index.html", "zh/gameplay/index.html", "/zh/gameplay/", "/gameplay/"],
      ["multiplayer/index.html", "zh/multiplayer/index.html", "/zh/multiplayer/", "/multiplayer/"],
      ["pitch-matching-exercises/index.html", "zh/pitch-matching-exercises/index.html", "/zh/pitch-matching-exercises/", "/pitch-matching-exercises/"],
      ["vocal-timing-exercises/index.html", "zh/vocal-timing-exercises/index.html", "/zh/vocal-timing-exercises/", "/vocal-timing-exercises/"],
      ["voice-games-for-parties/index.html", "zh/voice-games-for-parties/index.html", "/zh/voice-games-for-parties/", "/voice-games-for-parties/"],
      ["voice-imitation-exercises/index.html", "zh/voice-imitation-exercises/index.html", "/zh/voice-imitation-exercises/", "/voice-imitation-exercises/"],
      ["voice-acting-warm-ups/index.html", "zh/voice-acting-warm-ups/index.html", "/zh/voice-acting-warm-ups/", "/voice-acting-warm-ups/"],
      ["voice-projection-exercises/index.html", "zh/voice-projection-exercises/index.html", "/zh/voice-projection-exercises/", "/voice-projection-exercises/"],
      ["voice-modulation-exercises/index.html", "zh/voice-modulation-exercises/index.html", "/zh/voice-modulation-exercises/", "/voice-modulation-exercises/"],
      ["articulation-exercises-for-voice-acting/index.html", "zh/articulation-exercises-for-voice-acting/index.html", "/zh/articulation-exercises-for-voice-acting/", "/articulation-exercises-for-voice-acting/"],
      ["character-voice-exercises/index.html", "zh/character-voice-exercises/index.html", "/zh/character-voice-exercises/", "/character-voice-exercises/"],
      ["breath-control-exercises-for-voice-acting/index.html", "zh/breath-control-exercises-for-voice-acting/index.html", "/zh/breath-control-exercises-for-voice-acting/", "/breath-control-exercises-for-voice-acting/"],
      ["about/index.html", "zh/about/index.html", "/zh/about/", "/about/"],
      ["contact/index.html", "zh/contact/index.html", "/zh/contact/", "/contact/"],
      ["privacy/index.html", "zh/privacy/index.html", "/zh/privacy/", "/privacy/"],
      ["terms/index.html", "zh/terms/index.html", "/zh/terms/", "/terms/"],
    ];
    for (const [englishPath, chinesePath, chineseHref, englishHref] of pairs) {
      const english = read(englishPath);
      const chinese = read(chinesePath);
      expect(english).toContain(`href="${chineseHref}"`);
      expect(english).toContain('hreflang="zh-Hans"');
      expect(chinese).toContain(`href="${englishHref}"`);
      expect(chinese).toContain('hreflang="en"');
    }
  });

  it("exposes stable privacy-safe game events and reduced-motion CSS", () => {
    const game = read("src/game.ts");
    const site = read("src/site.ts");
    const css = read("src/style.css");
    for (const eventName of ["game_started", "microphone_granted", "cue_played", "recording_started", "round_scored", "game_completed", "fullscreen_toggled"]) {
      expect(game).toContain(`\"${eventName}\"`);
    }
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(game).toContain("Five computer judges");
    expect(game).toContain("absolute 6/5");
    expect(site).toContain('const DEFAULT_GA_MEASUREMENT_ID = "G-4SMXSDGLW2"');
    expect(site).toContain('analytics_storage: consent ?? "denied"');
    expect(site).toContain('ad_personalization: "denied"');
    expect(site).toContain('trackSiteEvent("language_switch"');
    expect(site).toContain('window.gtag?.("event", name, detail)');
    expect(site).toContain("window.dataLayer?.push(arguments)");
    expect(site).toContain("PRODUCTION_HOSTS.has(window.location.hostname)");
    expect(css).toContain(".analytics-consent");
    expect(read("privacy/index.html")).toContain("does not intentionally provide microphone audio");
    expect(read("zh/privacy/index.html")).toContain("不会主动向 Analytics 或广告集成提供麦克风音频");
  });

  it("configures all Adsterra placements for production without loading them during local development", () => {
    const ads = read("src/ads.ts");
    const site = read("src/site.ts");
    const headers = read("public/_headers");
    const readme = read("README.md");
    for (const token of [
      "d72f3fddaee2f6ce6a982ca1c467c4db.js",
      "1f9d17503219073c8503247d8589db43/invoke.js",
      "container-1f9d17503219073c8503247d8589db43",
      "daf294790afe605ba6ae1c824cadfca5/invoke.js",
      "2d87868027239001262173826fa2197e.js",
      "b997538ytg?key=7f5e5731ca40999902193ee46eedbf61",
    ]) {
      expect(ads).toContain(token);
    }
    expect(ads).toContain('PRODUCTION_HOSTS.has(window.location.hostname)');
    expect(ads).toContain('rel="sponsored nofollow noopener"');
    expect(ads).toContain('height: 600');
    expect(ads).toContain('width: 160');
    expect(ads).toContain('new Set(["/", "/games/", "/zh/", "/zh/games/"])');
    expect(site).toContain('import { initializeAds } from "./ads"');
    expect(site).toContain("initializeAds();");
    expect(headers).toContain("https://incompatibletorchvulture.com");
    expect(headers).toContain("frame-src https:");
    expect(readme).toContain("Adsterra advertising scripts load only on the production domain");
    expect(read("privacy/index.html")).toContain("third-party advertising supplied by Adsterra");
    expect(read("zh/privacy/index.html")).toContain("由 Adsterra 提供并明确标注的第三方广告");
  });

  it("publishes twenty distinct search-intent pages with source-visible navigation", () => {
    const targets = [
      ["games/index.html", "https://thechoicervoicer.me/games/", "Voice Imitation Game", "/src/game.ts"],
      ["app/index.html", "https://thechoicervoicer.me/app/", "The Choicer Voicer App", "/src/site.ts"],
      ["how-to-play/index.html", "https://thechoicervoicer.me/how-to-play/", "How to Play The Choicer Voicer", "/src/site.ts"],
      ["mobile/index.html", "https://thechoicervoicer.me/mobile/", "Play The Choicer Voicer on Mobile", "/src/site.ts"],
      ["voice-packs/index.html", "https://thechoicervoicer.me/voice-packs/", "Choicer Voicer Voice Packs", "/src/site.ts"],
      ["microphone-not-working/index.html", "https://thechoicervoicer.me/microphone-not-working/", "The Choicer Voicer Mic Not Working", "/src/site.ts"],
      ["is-it-safe/index.html", "https://thechoicervoicer.me/is-it-safe/", "Is The Choicer Voicer Safe?", "/src/site.ts"],
      ["alternatives/index.html", "https://thechoicervoicer.me/alternatives/", "The Choicer Voicer Alternative", "/src/site.ts"],
      ["gameplay/index.html", "https://thechoicervoicer.me/gameplay/", "The Choicer Voicer Gameplay", "/src/site.ts"],
      ["multiplayer/index.html", "https://thechoicervoicer.me/multiplayer/", "Choicer Voicer Multiplayer", "/src/site.ts"],
      ["pitch-matching-exercises/index.html", "https://thechoicervoicer.me/pitch-matching-exercises/", "Pitch Matching Exercises", "/src/site.ts"],
      ["vocal-timing-exercises/index.html", "https://thechoicervoicer.me/vocal-timing-exercises/", "Vocal Timing Exercises", "/src/site.ts"],
      ["voice-games-for-parties/index.html", "https://thechoicervoicer.me/voice-games-for-parties/", "Voice Games for Parties", "/src/site.ts"],
      ["voice-imitation-exercises/index.html", "https://thechoicervoicer.me/voice-imitation-exercises/", "Voice Imitation Exercises", "/src/site.ts"],
      ["voice-acting-warm-ups/index.html", "https://thechoicervoicer.me/voice-acting-warm-ups/", "Voice Acting Warm Up Exercises", "/src/site.ts"],
      ["voice-projection-exercises/index.html", "https://thechoicervoicer.me/voice-projection-exercises/", "Voice Projection Exercises", "/src/site.ts"],
      ["voice-modulation-exercises/index.html", "https://thechoicervoicer.me/voice-modulation-exercises/", "Voice Modulation Exercises", "/src/site.ts"],
      ["articulation-exercises-for-voice-acting/index.html", "https://thechoicervoicer.me/articulation-exercises-for-voice-acting/", "Articulation Exercises for Voice Acting", "/src/site.ts"],
      ["character-voice-exercises/index.html", "https://thechoicervoicer.me/character-voice-exercises/", "Character Voice Exercises", "/src/site.ts"],
      ["breath-control-exercises-for-voice-acting/index.html", "https://thechoicervoicer.me/breath-control-exercises-for-voice-acting/", "Breath Control Exercises for Voice Acting", "/src/site.ts"],
    ];
    const home = read("index.html");
    for (const [path, canonical, titleLead, script] of targets) {
      const html = read(path);
      expect(html, `${path} should own a unique canonical`).toContain(`<link rel="canonical" href="${canonical}" />`);
      expect(html, `${path} should use its query intent in the title`).toContain(`<title>${titleLead}`);
      expect(html, `${path} should expose breadcrumbs`).toContain('class="breadcrumb container"');
      expect(html, `${path} should expose breadcrumb schema`).toMatch(/"@type"\s*:\s*"BreadcrumbList"/);
      expect(html, `${path} should use the expected entry script`).toContain(`<script type="module" src="${script}"></script>`);
      expect(home, `homepage should link to ${canonical}`).toContain(`href="${new URL(canonical).pathname}"`);
    }
  });

  it("keeps the voice-pack guide aligned with the shipped 16-scene manifest", () => {
    const html = read("voice-packs/index.html");
    const chinese = read("zh/voice-packs/index.html");
    const tableRows = (source: string) => source.match(/<tbody>[\s\S]*?<\/tbody>/)?.[0].match(/<tr>/g)?.length ?? 0;
    expect(tableRows(html)).toBe(16);
    expect(tableRows(chinese)).toBe(16);
    expect(html).toContain('"numberOfItems": 16');
    expect(chinese).toContain('"numberOfItems":16');
  });

  it("does not present nonexistent native downloads as available", () => {
    for (const path of ["app/index.html", "mobile/index.html", "zh/app/index.html", "zh/mobile/index.html"]) {
      const html = read(path);
      expect(html, `${path} should not link to an APK or app store`).not.toMatch(/href="[^"]*(?:\.apk|play\.google|apps\.apple|store\.steampowered)/i);
    }
  });
});
