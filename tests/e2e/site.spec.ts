import { expect, test } from "@playwright/test";

const installSyntheticMicrophone = async (page: import("@playwright/test").Page) => {
  await page.addInitScript(() => {
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices) return;
    mediaDevices.getUserMedia = async () => {
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const destination = context.createMediaStreamDestination();
      oscillator.type = "sine";
      oscillator.frequency.value = 230;
      gain.gain.value = 0.12;
      oscillator.connect(gain).connect(destination);
      oscillator.start();
      await context.resume();
      return destination.stream;
    };
  });
};

test("homepage is crawlable, navigable, and free of horizontal overflow", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("The Choicer Voicer");
  await expect(page.locator(".brand small")).toHaveText("Browser voice game");
  await expect(page.locator(".fan-notice")).toHaveCount(0);
  await expect(page.locator('a[href*="itch.io"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: /desktop game|official/i })).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://thechoicervoicer.me/");
  await expect(page.getByRole("link", { name: "Enter the studio" })).toBeVisible();
  await expect(page.locator("[data-voice-show-game]")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose your show." })).toBeVisible();
  await expect(page.getByRole("button", { name: /Solo.*1 player/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Group.*2–4 players/i })).toBeVisible();
  const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  expect(noOverflow).toBe(true);
  expect(errors).toEqual([]);

  await page.screenshot({ path: testInfo.outputPath("homepage.png"), fullPage: true });
});

test("a player can grant a synthetic mic, hear a cue, record, replay, and score", async ({ page }, testInfo) => {
  await installSyntheticMicrophone(page);
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");

  await page.getByRole("button", { name: /Solo.*1 player/i }).click();
  await page.getByRole("button", { name: "Continue to microphone check" }).click();
  await page.getByRole("button", { name: "Start microphone check" }).click();
  await expect(page.getByRole("heading", { name: "Talk, hum, or laugh." })).toBeVisible();
  await page.getByRole("button", { name: "Mic sounds good — play" }).click();
  await expect(page.locator(".cue-quote")).toBeVisible();
  await expect(page.locator(".cue-attribution a")).toHaveAttribute("href", /^https:\/\//);
  await expect(page.getByText("Work country", { exact: true })).toBeVisible();
  await expect(page.getByText("Original voice", { exact: true })).toBeVisible();
  await expect(page.locator(".cue-rights")).toContainText("AI-designed spoken performance");
  await page.locator("[data-game-panel]").screenshot({ path: testInfo.outputPath("scene-card.png") });

  const record = page.getByRole("button", { name: "Record my line" });
  await page.getByRole("button", { name: "Play original performance" }).click();
  await expect(record).toBeEnabled();
  await record.click();

  await expect(page.locator("[data-timing-light]")).toHaveCount(4);

  await expect(page.getByRole("heading", { name: "Hear your take before judging." })).toBeVisible({ timeout: 15_000 });
  await expect(page.locator(".take-compare__card--reference audio")).toHaveAttribute("src", /-en\.wav$/);
  await expect(page.getByText("Original performance", { exact: true })).toBeVisible();
  await expect(page.getByText("Your take", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Reveal my score" })).toBeVisible();
  await page.getByRole("button", { name: "Reveal my score" }).click();
  await expect(page.locator('[aria-label^="Judge score "]')).toBeVisible();
  await expect(page.getByLabel("Five computer judges")).toBeVisible();
  await expect(page.getByText("Beat", { exact: true })).toBeVisible();
  await expect(page.getByText("Wildcard", { exact: true })).toBeVisible();
  await expect(page.locator(".panel-word")).toContainText("Panel in one word");
  const judgeWords = await page.locator(".judge-card em").allTextContents();
  expect(judgeWords).toHaveLength(5);
  expect(judgeWords.every((word) => /^\S+$/.test(word.trim()))).toBe(true);
  await expect(page.getByText(/\d+ timing/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Retry this line" })).toBeVisible();
  const scoreOutput = page.locator("[data-score-number]");
  await expect(scoreOutput).toHaveText((await scoreOutput.getAttribute("data-score-target")) ?? "0");
  const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  expect(noOverflow).toBe(true);
  expect(errors).toEqual([]);

  await page.screenshot({ path: testInfo.outputPath("game-score.png"), fullPage: true });
  await page.getByRole("button", { name: "Retry this line" }).click();
  await expect(page.getByRole("button", { name: "Record my line" })).toBeDisabled();
});

test("a solo player can finish all four performances and reach the final board", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "The complete four-performance show is covered once on desktop.");
  test.setTimeout(90_000);
  await installSyntheticMicrophone(page);
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");

  await page.getByRole("button", { name: /Solo.*1 player/i }).click();
  await page.getByRole("button", { name: "Continue to microphone check" }).click();
  await page.getByRole("button", { name: "Start microphone check" }).click();
  await page.getByRole("button", { name: "Mic sounds good — play" }).click();

  for (let round = 0; round < 4; round += 1) {
    await page.getByRole("button", { name: "Play original performance" }).click();
    await page.getByRole("button", { name: "Record my line" }).click();
    await expect(page.getByRole("heading", { name: "Hear your take before judging." })).toBeVisible({ timeout: 15_000 });
    await page.getByRole("button", { name: "Reveal my score" }).click();
    await expect(page.getByLabel("Five computer judges")).toBeVisible();
    await page.locator("[data-next-round]").click();
  }

  await expect(page.getByText("4 performances scored")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Show complete. The panel survived." })).toBeVisible();
  await expect(page.locator(".leaderboard li")).toHaveCount(1);
  expect(errors).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("final-board.png"), fullPage: true });
});

test("local multiplayer rotates the same cue to the next named player", async ({ page }) => {
  await installSyntheticMicrophone(page);
  await page.goto("/");

  await page.getByRole("button", { name: /Group.*2–4 players/i }).click();
  await expect(page.getByRole("heading", { name: "Set the stage." })).toBeVisible();
  await expect(page.getByLabel("Local players")).toHaveValue("2");
  await page.getByLabel("Local players").selectOption("2");
  await page.getByLabel("Player 1 name").fill("Alex");
  await page.getByLabel("Player 2 name").fill("Sam");
  await page.getByRole("button", { name: "Continue to microphone check" }).click();
  await page.getByRole("button", { name: "Start microphone check" }).click();
  await page.getByRole("button", { name: "Mic sounds good — play" }).click();

  await expect(page.getByText("Alex, take the mic")).toBeVisible();
  await page.getByRole("button", { name: "Play original performance" }).click();
  await page.getByRole("button", { name: "Record my line" }).click();
  await expect(page.getByRole("heading", { name: "Hear your take before judging." })).toBeVisible({ timeout: 15_000 });
  await page.getByRole("button", { name: "Reveal my score" }).click();
  await page.getByRole("button", { name: "Pass to Sam" }).click();

  await expect(page.getByText("Sam, take the mic")).toBeVisible();
  await expect(page.getByText("Round 1 of 4 · Sam")).toBeVisible();
});

test("Chinese homepage and game setup stay fully localized", async ({ page }, testInfo) => {
  await page.goto("/zh/");

  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("在线体验语音模仿游戏");
  await expect(page.locator(".brand small")).toHaveText("浏览器语音游戏");
  await expect(page.locator('a[href*="itch.io"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: /桌面游戏|官方/ })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "English" })).toHaveAttribute("href", "/");
  await expect(page.getByRole("heading", { name: "选择游玩方式。" })).toBeVisible();
  await expect(page.getByRole("button", { name: /单人.*1 名玩家/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /多人.*2–4 名玩家/ })).toBeVisible();
  await page.getByRole("button", { name: /单人.*1 名玩家/ }).click();
  await expect(page.getByLabel("本地玩家")).toHaveValue("1");
  await expect(page.getByRole("button", { name: "继续进行麦克风检测" })).toBeVisible();
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://thechoicervoicer.me/");
  const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  expect(noOverflow).toBe(true);

  await page.screenshot({ path: testInfo.outputPath("homepage-zh.png"), fullPage: true });
});

test("Chinese microphone-to-judge flow uses Chinese controls", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One full localized audio-flow run is sufficient.");
  await installSyntheticMicrophone(page);
  await page.goto("/zh/");

  await page.getByRole("button", { name: /单人.*1 名玩家/ }).click();
  await page.getByRole("button", { name: "继续进行麦克风检测" }).click();
  await page.getByRole("button", { name: "● 开始麦克风检测" }).click();
  await expect(page.getByRole("heading", { name: "说话、哼唱或笑一声。" })).toBeVisible();
  await page.getByRole("button", { name: "麦克风正常 — 开始游戏" }).click();
  await expect(page.getByText("玩家 1，请拿起麦克风")).toBeVisible();
  await expect(page.locator(".cue-quote")).toBeVisible();
  await expect(page.locator(".cue-attribution a")).toHaveAttribute("href", /^https:\/\//);
  await expect(page.getByText("作品国家", { exact: true })).toBeVisible();
  await expect(page.getByText("原创音色", { exact: true })).toBeVisible();
  await expect(page.locator(".cue-rights")).toContainText("原创 AI 设计语音表演");
  await page.getByRole("button", { name: "▶ 播放原声片段" }).click();
  await page.getByRole("button", { name: "录制我的台词" }).click();
  await expect(page.getByRole("heading", { name: "先听听自己的录音，再交给评委。" })).toBeVisible({ timeout: 15_000 });
  await expect(page.locator(".take-compare__card--reference audio")).toHaveAttribute("src", /-zh\.wav$/);
  await page.getByRole("button", { name: "公布评分" }).click();
  await expect(page.getByLabel("五位电脑评委")).toBeVisible();
  await expect(page.locator('[aria-label^="评委评分"]')).toBeVisible();
  await expect(page.getByText("节拍", { exact: true })).toBeVisible();
  await expect(page.locator(".panel-word")).toContainText("评委一词总评");
  const judgeWords = await page.locator(".judge-card em").allTextContents();
  expect(judgeWords).toHaveLength(5);
  expect(judgeWords.every((word) => /^\S+$/.test(word.trim()))).toBe(true);
  await expect(page.getByRole("button", { name: "重试本句" })).toBeVisible();

  await page.screenshot({ path: testInfo.outputPath("game-score-zh.png"), fullPage: true });
});
