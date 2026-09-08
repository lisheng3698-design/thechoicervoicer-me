# The Choicer Voicer 内页发布台账（2026-09-09）

## 发布结论

- 内容提交：`b0395a2c7d9229595ff76543929b9f8f6a1df4f3`，已推送 `origin/main`。
- GitHub Pages 发布：`dbf38a60045db439272b10782a0eba81c9b5508b`，父版本 `c9d013764af301ac46c913fa55fc0a612dae54d3`。
- 生产域名：`https://thechoicervoicer.me`；5 个英文主页面与 5 个中文对应页均返回 `200`。
- 本地验证：Vitest 20/20；TypeScript、生产构建、sitemap XML、10 个 JSON-LD 与 28 列 CSV 完整性通过。
- 浏览器回归：独占 `127.0.0.1:4273` 后 Playwright 14 passed、2 skipped（设备配置跳过重复的完整音频流程）。首次默认端口运行被同时执行的 Gesture Synth 预览污染，未计为产品失败。
- 生产 QA：10 个新 URL 在 1440×900 与 390×844 下共检查 20 次；HTTP、自 canonical、唯一 H1、图片、横向溢出和控制台错误全部通过。
- GeFei：8 个候选均实查 Web.Cafe；Ahrefs 为“默认跳过（用户未要求）”；所有可靠月量均为 `unavailable`，未做推算。
- IndexNow：live key 精确匹配；10 个中英文 canonical 一次提交返回 HTTP `200`。
- GA4：10/10 生产页面 `page_view` 与固定 `guide_validation` 事件均发往 `G-4SMXSDGLW2` 并返回 `204`。账号选择器确认正确属性 `p551708268`，Realtime 可见 1 个活跃用户；本批次页面标题/事件尚未出现在账号侧明细。
- GSC/Bing：生产 sitemap 已包含 10 个新 URL。收录助手预检已排队，但共享 runner 未领取；Bing 即时发现采用 IndexNow，未重复手工 URL Submission。

## 五个页面的独立结果

| 槽位 | 关键词 | canonical | Web.Cafe KD | 意图 20 | 站内 20 | 技术 20 | UX 15 | 内链/Schema 15 | Analytics/信任 10 | 总分 | 未通过 | 当前状态 |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | voice acting cold reading exercises | `https://thechoicervoicer.me/voice-acting-cold-reading-exercises/` | 6.7 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（GA4 明细） |
| 2 | voice acting subtext exercises | `https://thechoicervoicer.me/voice-acting-subtext-exercises/` | 0 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（GA4 明细） |
| 3 | voice acting line delivery exercises | `https://thechoicervoicer.me/voice-acting-line-delivery-exercises/` | 13.0 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（GA4 明细） |
| 4 | voice acting vocal stamina exercises | `https://thechoicervoicer.me/voice-acting-vocal-stamina-exercises/` | 20.1 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（GA4 明细） |
| 5 | voice acting accent exercises | `https://thechoicervoicer.me/voice-acting-accent-exercises/` | 13.6 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（GA4 明细） |

严格口径下，5 个英文 canonical 和 5 个中文对应页均已生产上线，但没有把 95/100 写成 100/100，也不计作“5 个最终成功 canonical”。三个替补词未启用：搭档练习与既有聆听/即兴意图重叠，专注练习的 SERP 意图过泛，角色一致性与既有角色声音 canonical 合并。替换页面不能消除全站共同的 GA4 账号侧明细阻塞。

## 20 项证据矩阵

| ID | 状态 | 证据 |
|---:|---|---|
| 01 | Pass | 5 个主词各自映射唯一 URL；角色一致性合并到既有 canonical，搭档与专注保留为替补。 |
| 02 | Pass | `web-cafe-kd-2026-09-09.json` 保存 8 个真实 Web.Cafe 结果；Ahrefs 默认跳过；月量 unavailable。 |
| 03 | Pass | 五个首屏分别直接承诺冷读、潜台词、台词变量、保守耐力与真实语料口音训练。 |
| 04 | Pass | 不虚构工具、排名、职业或健康结果；声音耐力明确停止信号和临床边界；口音页不复制档案媒体。 |
| 05 | Pass | 5 个英文与 5 个中文页面均使用独立、意图明确的 Title。 |
| 06 | Pass | 10 个页面均有独立、具体且源 HTML 可读的 Description。 |
| 07 | Pass | 本地与生产均确认每页恰好一个 H1。 |
| 08 | Pass | 每页含源代码可见的 H2/H3、六步训练、判定标准、边界、迁移与 FAQ。 |
| 09 | Pass | 10 个生产 URL 全部 `200` 且自 canonical。 |
| 10 | Pass | meta robots 为 `index,follow`；生产 robots、sitemap 与 404 行为保留。 |
| 11 | Pass | 生产 sitemap 含 10 个新 URL，`lastmod=2026-09-09`。 |
| 12 | Pass | canonical、en/zh-Hans/x-default、OG、JSON-LD 与尾斜杠一致；XML 与 JSON-LD 均可解析。 |
| 13 | Pass | 首屏提供具体结果、训练入口和相关已上线页面；内容页无需伪造交互工具。 |
| 14 | Pass | Vitest 20/20、TypeScript、构建、游戏音频流程、本地多人轮换与中英文流程通过。 |
| 15 | Pass | 独占端口 Playwright 14 passed/2 skipped；生产 20/20 QA 无溢出、图片或控制台失败。 |
| 16 | Pass | 英文与中文首页的 `#game-guides` 各新增 5 个源 HTML 可见入口。 |
| 17 | Pass | 新页链接首页、可玩页与语义相关的已上线兄弟页，没有链接替补页。 |
| 18 | Pass | 可见面包屑与 BreadcrumbList 一致，Article 与 FAQPage 对应可见正文。 |
| 19 | Blocked | 10/10 `page_view` 与固定 `guide_validation` 均 HTTP `204`；正确 GA4 属性 Realtime 有活跃用户，但本批次标题/事件未在账号侧明细出现。 |
| 20 | Pass | main、Pages 发布、测试、生产 QA、IndexNow、GA4、评分与外部阻塞均在本台账记录。 |

## 外部提交状态

| 系统 | 状态 | 证据/下一步 |
|---|---|---|
| GSC sitemap | Done / asynchronous | 正式 sitemap 在线且包含 10 个新 URL；既有 GSC sitemap 等待异步重抓。 |
| GSC URL Inspection | Queued / needs recheck | `thechoicervoicer-20260909-five-preflight-v1` 已入队；共享 runner 未领取，`attempts=0`。 |
| Bing sitemap / URL | Done via IndexNow | 正式 sitemap 在线；未重复手工提交相同 URL。 |
| IndexNow | Done | key 文件精确匹配；10 个中英文 canonical 一次提交返回 HTTP `200`。 |
| GA4 transport | Done | 10/10 页面 `page_view` 与固定验证事件 → `G-4SMXSDGLW2`，HTTP `204`。 |
| GA4 property | Existing / verified | 账号选择器显示 The Choicer Voicer，属性路由 `p551708268`，Realtime 可见活跃用户。 |
| GA4 Realtime detail | Needs recheck | 页面标题与 `guide_validation` 尚未出现在账号侧 Realtime 明细，不能将第 19 项记为 Pass。 |

下次复核日期：`2026-09-16`。
