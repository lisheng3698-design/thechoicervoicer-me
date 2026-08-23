import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./artifacts/playwright",
  reporter: "list",
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 8_000 },
  use: {
    baseURL: process.env.TEST_ORIGIN || "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "chromium-mobile", use: { ...devices["Pixel 7"] } },
  ],
});
