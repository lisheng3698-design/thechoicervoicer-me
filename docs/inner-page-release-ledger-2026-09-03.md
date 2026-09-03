# The Choicer Voicer 内页发布台账（2026-09-03）

## 发布结论

- 代码提交：`224bfcd3057fe5053e224632356785c8c864692d`。
- GitHub Pages 发布：`9bec137b83236e5574448bf2889ff7fed3ef2298`，父版本 `701c2de1aa015ceca04eb30880328ab3ec7ae812`。
- 生产域名：`https://thechoicervoicer.me`；5 个英文主页面与 5 个中文对应页均返回 `200`。
- 本地测试：Vitest 20/20；TypeScript 与 sitemap XML 通过；Playwright 14 passed、2 skipped（按设备配置跳过重复完整音频流程）。
- 生产 QA：10 个新 URL 在 1440×900 与 390×844 下共检查 20 次，HTTP、唯一 H1、自 canonical、图片加载、无横向溢出与控制台状态全部通过。
- 全路由生产测试仍能看到既有 `/games/` 的第三方广告请求 `403`；今天 10 个新页面不加载该广告脚本，专项结果 20/20 通过。
- GeFei：8 个候选均实查 Web.Cafe；Ahrefs 为“默认跳过（用户未要求）”；唯一低量词已补 Google Trends + GPTs 校准。
- IndexNow：5 个英文主 canonical 与 5 个中文对应 canonical 一次提交，HTTP `200`。
- GA4：10 个生产页面的 `page_view` 均发往 `G-4SMXSDGLW2`，HTTP `204`；未取得正确属性的 Realtime/DebugView 账号侧可见证据。
- GSC/Bing：生产 sitemap 已包含新 URL。GSC 既有 sitemap 将自动重抓但逐页 URL Inspection 未取得新回执；本站为非 `.cc`，Bing 采用 sitemap + IndexNow 路径，手工 URL Submission 记为 `not-required-indexnow`。

## 五个页面的独立结果

| 槽位 | 关键词 | canonical | Web.Cafe KD | 意图 20 | 站内 20 | 技术 20 | UX 15 | 内链/Schema 15 | Analytics/信任 10 | 总分 | 未通过 | 当前状态 |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | voice projection exercises | `https://thechoicervoicer.me/voice-projection-exercises/` | 1.2 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅账号侧证据） |
| 2 | voice modulation exercises | `https://thechoicervoicer.me/voice-modulation-exercises/` | 10.3 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅账号侧证据） |
| 3 | articulation exercises for voice acting | `https://thechoicervoicer.me/articulation-exercises-for-voice-acting/` | 11.4 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅账号侧证据） |
| 4 | character voice exercises | `https://thechoicervoicer.me/character-voice-exercises/` | 11.7 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅账号侧证据） |
| 5 | breath control exercises for voice acting | `https://thechoicervoicer.me/breath-control-exercises-for-voice-acting/` | 24.0 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅账号侧证据） |

严格口径下，今天 5 个英文 canonical 和 5 个中文对应页已经生产上线，但没有把 95/100 写成 100/100，也不计作“5 个最终成功 canonical”。三个替补页未启用，因为第 19 项是全站共同的 GA4 账号侧证据阻塞，替换内容页面无法消除该阻塞。

## 20 项证据矩阵

| ID | 状态 | 证据 |
|---:|---|---|
| 01 | Pass | 5 个主词各自映射唯一 URL；截图中的品牌、game、app、free、online 变体继续归并到既有 canonical。 |
| 02 | Pass | `web-cafe-kd-2026-09-03.json` 保存 8 个真实结果；Ahrefs 默认跳过；低量词完成 Trends 校准。 |
| 03 | Pass | 五个生产首屏分别直接承诺传远、调节、清晰咬字、角色一致性与意群换气。 |
| 04 | Pass | 页面不虚构工具或诊断；投射和呼吸页均有停止条件与一般信息边界。 |
| 05 | Pass | 5 个英文页面与 5 个中文页面均有唯一且意图明确的 Title。 |
| 06 | Pass | 10 个页面均有独立、具体、源 HTML 可读的 Description。 |
| 07 | Pass | 本地与生产检查均确认每页恰好一个 H1。 |
| 08 | Pass | 每页含源代码可见的 H2/H3、步骤、计时表、复盘方法、限制与 FAQ。 |
| 09 | Pass | 10 个生产 URL 全部 `200` 且自 canonical。 |
| 10 | Pass | meta robots 为 `index,follow`；生产 robots 与 sitemap 均可访问。 |
| 11 | Pass | 生产 sitemap 含 10 个新 URL，`lastmod=2026-09-03`。 |
| 12 | Pass | canonical、en/zh-Hans/x-default、OG、JSON-LD 与尾斜杠一致，sitemap XML 可解析。 |
| 13 | Pass | 首屏直接给出练习承诺、开始按钮和可玩场景入口。 |
| 14 | Pass | Vitest 20/20、TypeScript、构建、完整音频流程、本地多人轮换和中英文流程通过。 |
| 15 | Pass | 本地完整 Playwright 与生产专项 QA 通过；生产 20 次无溢出、控制台或图片失败。Logo 为装饰图并使用空 alt。 |
| 16 | Pass | 英文和中文首页的 `#game-guides` 均新增 5 个源代码可见入口。 |
| 17 | Pass | 页面链接首页、可玩页与语义相关且已上线的兄弟页，没有链接替补页。 |
| 18 | Pass | 可见面包屑与 BreadcrumbList 一致，Article 和 FAQPage 对应可见正文。 |
| 19 | Blocked | 10 个 `page_view` 均以正确 Measurement ID 返回 `204` 且不含用户音频；Realtime/DebugView 尚无正确属性的账号侧可见证据。 |
| 20 | Pass | main、Pages 发布、测试、生产 QA、IndexNow、评分与外部阻塞均在本台账记录。 |

## 外部提交状态

| 系统 | 状态 | 证据/下一步 |
|---|---|---|
| GSC sitemap | Done / asynchronous | 已提交的正式 sitemap 现已包含新 URL；等待平台自动重抓。 |
| GSC URL Inspection | Needs recheck | 正确属性为 `sc-domain:thechoicervoicer.me`；逐页请求未取得新回执。 |
| Bing sitemap / URL | Done via IndexNow | 正式 sitemap 在线；非 `.cc` 站采用 IndexNow，手工 URL Submission 记为 `not-required-indexnow`。 |
| IndexNow | Done | key 文件在线；10 个中英文 canonical 一次提交返回 HTTP `200`。 |
| GA4 transport | Done | 10/10 页面 `page_view` → `G-4SMXSDGLW2`，HTTP `204`。 |
| GA4 Realtime/DebugView | Needs recheck | 需要在正确属性中看到本次生产访问，才能把第 19 项由 Blocked 改为 Pass。 |

下次复核日期：`2026-09-10`。
