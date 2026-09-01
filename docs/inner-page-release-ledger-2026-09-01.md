# The Choicer Voicer 内页发布台账（2026-09-01）

## 发布结论

- 代码提交：`afe2d097318406e7ec4372462d81ec35dbb88f2d`。
- GitHub Pages 发布：`e25c8445d17e08a06f8034f7bc942ea6e9575780`，父版本 `576b74ddbca8b5aedd19ba499d7c1199ab3495aa`。
- 生产域名：`https://thechoicervoicer.me`；5 个英文主页面与 5 个中文对应页均返回 `200`。
- 本地测试：Vitest 20/20；TypeScript 通过；Playwright 最终状态 `passed`，16 个项目中 2 个按项目配置跳过重复的完整音频流程。
- 生产 QA：10 个新 URL 的 HTTP、唯一 H1、自 canonical、hreflang 通过；首页入口、sitemap、robots、真实 404、CSS MIME 通过；桌面与手机共 20 次新页面渲染检查通过。
- GeFei：复用已保存的 Web.Cafe 结果；Ahrefs 为“默认跳过（用户未要求）”。
- IndexNow：5 个英文主 canonical 一次提交，HTTP `200`。
- GA4：同意后 `G-4SMXSDGLW2` 的生产 `page_view` 请求返回 HTTP `204`；当前无法进入正确 GA4 属性的 Realtime/DebugView，因此第 19 项仍为 `Blocked`。
- GSC/Bing：共享收录助手被其他项目队列占用，且当前扩展固定权限未登记本站；未伪造提交结果，状态为 `Needs recheck`。

## 五个页面的独立结果

| 槽位 | 关键词 | canonical | Web.Cafe KD | 意图 20 | 站内 20 | 技术 20 | UX 15 | 内链/Schema 15 | Analytics/信任 10 | 总分 | 未通过 | 当前状态 |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | the choicer voicer mic not working | `https://thechoicervoicer.me/microphone-not-working/` | 25.1 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需修复（仅外部账号复核） |
| 2 | is the choicer voicer safe | `https://thechoicervoicer.me/is-it-safe/` | 33.6 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需修复（仅外部账号复核） |
| 3 | the choicer voicer alternative | `https://thechoicervoicer.me/alternatives/` | 29.7 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需修复（仅外部账号复核） |
| 4 | the choicer voicer gameplay | `https://thechoicervoicer.me/gameplay/` | 37.5 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需修复（仅外部账号复核） |
| 5 | choicer voicer multiplayer | `https://thechoicervoicer.me/multiplayer/` | 60.4 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需修复（仅外部账号复核） |

严格口径下，今天已有 5 个生产页面上线，但没有把 95/100 写成 100/100，也暂不计入“5 个最终成功 canonical”。三个替补页未启用，因为第 19 项是全站共同的外部账号证据阻塞，替换内容页面无法消除该阻塞。

## 20 项证据矩阵

| ID | 状态 | 证据 |
|---:|---|---|
| 01 | Pass | `docs/keyword-pool.csv` 的 5 个关键词各自映射唯一 URL；与首页及既有 5 页完成去重。 |
| 02 | Pass | `web-cafe-kd-2026-08-31.json` 与 `web-cafe-kd-2026-09-01.json`；Ahrefs 默认跳过。 |
| 03 | Pass | 生产首屏分别承诺排障、安全回答、选择矩阵、玩法解释和同室多人；人工截图与 SERP 建议一致。 |
| 04 | Pass | 页面只描述当前浏览器产品：本地录音、1–4 人、四场景、五位评委；多人页明确无远程房间。 |
| 05 | Pass | 5 个英文页面与 5 个中文页面均有唯一、意图明确的 Title。 |
| 06 | Pass | 10 个页面均有独立、具体且可在源 HTML 中读取的 Description。 |
| 07 | Pass | 本地与生产审计均确认每页恰好一个 H1。 |
| 08 | Pass | 每页含源代码可见的 H2/H3、步骤、表格或边界说明，无需客户端渲染正文。 |
| 09 | Pass | 10 个生产 URL 全部 `200` 且自 canonical。 |
| 10 | Pass | meta robots 为 `index,follow`，生产 `robots.txt` 返回 `200` 并允许抓取。 |
| 11 | Pass | 生产 sitemap 含 10 个 URL，`lastmod=2026-09-01`。 |
| 12 | Pass | 生产 canonical、en/zh-Hans/x-default、OG、JSON-LD、尾斜杠一致；10 份 JSON-LD 可解析。 |
| 13 | Pass | 各页面首屏直接给出答案与主 CTA；桌面/手机均可见。 |
| 14 | Pass | 源测试、构建、完整音频流程、本地多人轮换和真实 404 等代表测试均通过。 |
| 15 | Pass | 本地截图人工复核；生产 1440×900 与 390×844 共 20 次无溢出、遮挡、控制台或资产失败。Logo 为装饰图并使用空 alt。 |
| 16 | Pass | 英文和中文首页的 `#game-guides` 均提供 5 个源代码可见入口。 |
| 17 | Pass | 每页链接首页/可玩页与相关既有或新增兄弟页，没有链接不存在的替补页。 |
| 18 | Pass | 可见面包屑与 BreadcrumbList 一致；HowTo、FAQPage 或 Article 与页面内容对应。 |
| 19 | Blocked | 生产 `page_view` 传输为 HTTP `204`，未发现用户音频进入 Analytics；但正确属性的 Realtime/DebugView 尚无可用账号证据。 |
| 20 | Pass | main、Pages 发布版本、测试、生产 QA、IndexNow 与外部阻塞均在本台账记录。 |

## 外部提交状态

| 系统 | 状态 | 证据/下一步 |
|---|---|---|
| GSC sitemap | Needs recheck | 等共享收录助手队列恢复，并确认 `sc-domain:thechoicervoicer.me` 后提交一次 sitemap。 |
| GSC URL Inspection | Needs recheck | 对 5 个英文主 canonical 分别请求；索引结果继续记为异步状态。 |
| Bing sitemap / URL | Needs recheck | 等队列与本站 host 权限恢复后，提交 sitemap 与 5 个 URL。 |
| IndexNow | Done | key 文件在线；5 个主 canonical 返回 HTTP `200`。 |
| GA4 transport | Done | 同意后 `page_view` → `G-4SMXSDGLW2`，HTTP `204`。 |
| GA4 Realtime/DebugView | Needs recheck | 需要在正确属性中看到本次生产访问，才能把第 19 项由 Blocked 改为 Pass。 |

下次复核日期：`2026-09-02`。
