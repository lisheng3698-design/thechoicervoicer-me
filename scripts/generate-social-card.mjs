import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const project = resolve(import.meta.dirname, "..");
const logo = await readFile(resolve(project, "public/logo-mark.svg"), "utf8");
const logoUrl = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

await page.setContent(`<!doctype html>
<html><head><meta charset="utf-8"><style>
*{box-sizing:border-box}html,body{width:1200px;height:630px;margin:0;overflow:hidden}body{position:relative;color:#20272b;background:repeating-linear-gradient(0deg,#f7f8f5 0 54px,#e2e5e3 54px 74px);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.frame{position:absolute;inset:30px;border:5px solid #273136;border-radius:28px;overflow:hidden;background:linear-gradient(115deg,rgba(255,255,255,.86),rgba(217,241,243,.8));box-shadow:12px 14px 0 rgba(39,49,54,.18)}.rings{position:absolute;width:540px;height:540px;right:-90px;top:-100px;border:10px solid rgba(88,200,209,.24);border-radius:50%;box-shadow:inset 0 0 0 48px transparent}.rings:before,.rings:after{content:"";position:absolute;border:8px solid rgba(88,200,209,.2);border-radius:50%}.rings:before{inset:82px}.rings:after{inset:172px}.top{position:absolute;left:70px;right:70px;top:62px;display:flex;align-items:center;justify-content:space-between}.logo{width:175px;height:94px;object-fit:contain}.badge{padding:12px 18px;border:3px solid #273136;border-radius:999px;background:#78d4dd;box-shadow:4px 5px 0 rgba(39,49,54,.2);font-size:16px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.copy{position:absolute;left:78px;top:180px;width:790px}.kicker{margin:0 0 18px;color:#267f8b;font-size:20px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.title{margin:0;font-size:92px;font-weight:950;line-height:.86;letter-spacing:-.075em}.title span{color:#267f8b}.sub{margin:34px 0 0;font-size:27px;font-weight:760;letter-spacing:-.02em}.pills{display:flex;gap:12px;margin-top:32px}.pill{padding:10px 16px;border:2px solid #273136;border-radius:999px;background:rgba(255,255,255,.72);font-size:15px;font-weight:850}.mic{position:absolute;right:120px;bottom:62px;width:138px;height:205px;border:9px solid #273136;border-bottom-width:34px;border-radius:70px 70px 38px 38px;background:repeating-linear-gradient(90deg,#78d4dd 0 13px,#20272b 13px 22px);transform:rotate(6deg);box-shadow:9px 10px 0 rgba(39,49,54,.18)}
</style></head><body><div class="frame"><div class="rings"></div><div class="top"><img class="logo" src="${logoUrl}" alt=""><div class="badge">Play in your browser</div></div><div class="copy"><p class="kicker">Browser voice game</p><h1 class="title">THE CHOICER<br><span>VOICER</span></h1><p class="sub">Listen · Perform · Face five judges</p><div class="pills"><span class="pill">Solo or 1–4 local players</span><span class="pill">Private microphone processing</span></div></div><div class="mic"></div></div></body></html>`);

await page.screenshot({ path: resolve(project, "public/og-the-choicer-voicer.png"), type: "png" });
await browser.close();
