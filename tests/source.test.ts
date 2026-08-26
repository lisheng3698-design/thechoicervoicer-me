import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const project = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(project, path), "utf8");
const englishPages = ["index.html", "games/index.html", "about/index.html", "contact/index.html", "privacy/index.html", "terms/index.html"];
const chinesePages = ["zh/index.html", "zh/games/index.html", "zh/about/index.html", "zh/contact/index.html", "zh/privacy/index.html", "zh/terms/index.html"];
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
    expect(sitemap).toContain("https://thechoicervoicer.me/games/");
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
    expect(read("privacy/index.html")).toContain("The site does not send microphone audio");
    expect(read("zh/privacy/index.html")).toContain("本站不会发送麦克风音频");
  });
});
