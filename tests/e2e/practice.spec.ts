import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

const batchDate = process.env.PRACTICE_BATCH_DATE || "2026-10-02";
const pages: { slug: string; keyword: string; zh: string; unit?: string }[] = JSON.parse(readFileSync(new URL(`../../docs/content/practice-pages-${batchDate}.json`, import.meta.url), "utf8"));
for (const guide of pages) {
  for (const chinese of [false, true]) {
    const route = `${chinese ? "/zh/" : "/"}${guide.slug}/`;
    test(`${route} delivers a usable, crawlable practice routine`, async ({ page }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("response", (response) => {
        if (response.url().startsWith(new URL(testInfo.project.use.baseURL as string || process.env.TEST_ORIGIN || "http://127.0.0.1:4173").origin) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
      });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://thechoicervoicer.me${route}`);
      await expect(page.locator(".step-card h3")).toHaveCount(6);
      const steps = guide.unit === "step";
      await page.getByRole("link", { name: chinese ? (steps ? "开始六项步骤" : "开始六项练习") : (steps ? "Start the six-step routine" : "Start the six-drill routine"), exact: true }).click();
      expect(new URL(page.url()).hash).toBe("#routine");
      const checks = page.locator("[data-practice-check]");
      await checks.first().check();
      await expect(page.getByRole("status")).toContainText(chinese ? "已完成 1 / 6" : "1 of 6");
      await page.getByRole("button", { name: chinese ? (steps ? "重置步骤" : "重置练习") : "Reset routine", exact: true }).click();
      await expect(checks.first()).not.toBeChecked();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      expect(await page.locator('img').evaluateAll((images) => images.every((image) => image.hasAttribute('alt')))).toBe(true);
      expect(errors).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath(`${guide.slug}-${chinese ? "zh" : "en"}.png`), fullPage: true });
    });
  }
}

test("partial practice progress survives reload and a locale switch", async ({ page }) => {
  await page.goto("/ivr-voice-over-exercises/");
  await page.locator("[data-practice-check]").first().check();
  await page.reload();
  await expect(page.locator("[data-practice-check]").first()).toBeChecked();
  await page.getByRole("link", { name: "中文", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("已完成 1 / 6");
  await page.getByRole("button", { name: "重置练习", exact: true }).click();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("0 of 6");
});

test("a routine still works when local storage is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error("Storage unavailable"); };
    Storage.prototype.setItem = () => { throw new Error("Storage unavailable"); };
  });
  await page.goto("/voice-acting-sibilance-exercises/");
  await page.locator("[data-practice-check]").first().check();
  await expect(page.getByRole("status")).toContainText("1 of 6");
  await page.getByRole("button", { name: "Reset routine", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("0 of 6");
});

test("a practice routine tracks completed drills and resets without judging audio", async ({ page }) => {
  await page.goto("/trailer-narration-exercises/");
  await expect(page.getByRole("status")).toHaveText("0 of 6 drills completed. Self-review, not an audio score.");
  const checks = page.locator("[data-practice-check]");
  for (const check of await checks.all()) await check.check();
  await expect(page.getByRole("status")).toHaveText("6 of 6 drills completed. Use the playback checks below to review your take.");
  await page.getByRole("button", { name: "Reset routine" }).click();
  await expect(page.getByRole("status")).toHaveText("0 of 6 drills completed. Self-review, not an audio score.");
  await expect(checks.first()).not.toBeChecked();
  await page.getByRole("link", { name: "中文", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("已完成 0 / 6 项练习。这是自查记录，不是音频评分。");
  await expect(page.locator("[data-practice-check]")).toHaveCount(6);
});
