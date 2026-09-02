# The Choicer Voicer 内页发布台账（2026-09-02）

## 发布结论

- 代码提交：`73bb9f6572d02b98f006e36b0b3c7092269f6eb1`。
- GitHub Pages 发布：`701c2de1aa015ceca04eb30880328ab3ec7ae812`，父版本 `e25c8445d17e08a06f8034f7bc942ea6e9575780`。
- 生产域名：`https://thechoicervoicer.me`；5 个英文主页面与 5 个中文对应页均返回 `200`。
- 本地测试：Vitest 20/20；TypeScript 通过；Playwright 14 passed、2 skipped（按项目配置跳过重复完整音频流程）。
- 生产 QA：10 个新 URL 的 HTTP、唯一 H1、自 canonical、无横向溢出与控制台状态在 1440×900 和 390×844 下共检查 20 次，20/20 通过。
- 既有 `/games/` 在生产全路由测试中出现第三方广告网络 `403`，不属于今天新内页；专项测试已隔离该外部请求。
- GeFei：8 个候选均实查 Web.Cafe；Ahrefs 为“默认跳过（用户未要求）”。
- IndexNow：5 个英文主 canonical 与 5 个中文对应 canonical 一次提交，HTTP `200`。
- GA4：同意状态下 `G-4SMXSDGLW2` 的生产 `page_view` 请求返回 HTTP `204`；当前无法取得正确属性的 Realtime/DebugView 账号证据，因此第 19 项仍为 `Blocked`。
- GSC/Bing：共享收录助手仍有其他站点任务 `running`，且扩展固定权限未登记本站；未伪造提交结果，状态为 `Needs recheck`。

## 五个页面的独立结果

| 槽位 | 关键词 | canonical | Web.Cafe KD | 意图 20 | 站内 20 | 技术 20 | UX 15 | 内链/Schema 15 | Analytics/信任 10 | 总分 | 未通过 | 当前状态 |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | pitch matching exercises | `https://thechoicervoicer.me/pitch-matching-exercises/` | 0.5 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅外部账号证据） |
| 2 | vocal timing exercises | `https://thechoicervoicer.me/vocal-timing-exercises/` | 1.8 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅外部账号证据） |
| 3 | voice games for parties | `https://thechoicervoicer.me/voice-games-for-parties/` | 3.3 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅外部账号证据） |
| 4 | voice imitation exercises | `https://thechoicervoicer.me/voice-imitation-exercises/` | 9.6 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅外部账号证据） |
| 5 | voice acting warm up exercises | `https://thechoicervoicer.me/voice-acting-warm-ups/` | 13.6 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅外部账号证据） |

严格口径下，今天 5 个英文 canonical 和 5 个中文对应页已经生产上线，但没有把 95/100 写成 100/100，也不计作“5 个最终成功 canonical”。三个替补页未启用，因为第 19 项是全站共同的外部账号证据阻塞，替换内容页面无法消除该阻塞。

## 20 项证据矩阵

| ID | 状态 | 证据 |
|---:|---|---|
| 01 | Pass | `docs/keyword-pool.csv` 的 5 个关键词各自映射唯一 URL，并与首页及既有 10 个内页意图去重。 |
| 02 | Pass | `docs/keyword-research/web-cafe-kd-2026-09-02.json` 保存 8 个真实查询结果；Ahrefs 默认跳过。 |
| 03 | Pass | 生产首屏分别直接承诺音高训练、节奏训练、聚会玩法、递进模仿与八分钟热身。 |
| 04 | Pass | 页面不虚构工具、下载或远程联机；多人页明确 2–4 人同室共用设备，热身页保留安全边界。 |
| 05 | Pass | 5 个英文页面与 5 个中文页面均有唯一、意图明确的 Title。 |
| 06 | Pass | 10 个页面均有独立、具体且可在源 HTML 中读取的 Description。 |
| 07 | Pass | 本地与生产审计均确认每页恰好一个 H1。 |
| 08 | Pass | 每页含源代码可见的 H2/H3、步骤、练习表或边界说明，无需客户端渲染正文。 |
| 09 | Pass | 10 个生产 URL 全部 `200` 且自 canonical。 |
| 10 | Pass | meta robots 为 `index,follow`，生产 `robots.txt` 返回 `200` 并指向正式 sitemap。 |
| 11 | Pass | 生产 sitemap 含 10 个新 URL，`lastmod=2026-09-02`。 |
| 12 | Pass | canonical、en/zh-Hans/x-default、OG、JSON-LD 与尾斜杠一致；10 份 JSON-LD 可解析。 |
| 13 | Pass | 每页首屏直接给出答案与 `/games/` 主 CTA；桌面与手机均可见。 |
| 14 | Pass | 20 个源码测试、TypeScript、构建、完整音频流程、本地多人轮换与真实 404 等代表测试通过。 |
| 15 | Pass | 本地完整 Playwright 与生产新页面专项 QA 通过；生产 20 次无横向溢出、控制台或资产失败。Logo 为装饰图并使用空 alt。 |
| 16 | Pass | 英文和中文首页的 `#game-guides` 均新增 5 个源代码可见入口。 |
| 17 | Pass | 每页链接首页、可玩页与相关兄弟页，没有链接尚未启用的替补页。 |
| 18 | Pass | 可见面包屑与 BreadcrumbList 一致，Article 与 FAQPage 对应源代码可见内容。 |
| 19 | Blocked | 生产 `page_view` 传输为 HTTP `204`，未发现用户音频进入 Analytics；但正确属性的 Realtime/DebugView 暂无可用账号证据。 |
| 20 | Pass | main、Pages 发布版本、测试、生产 QA、IndexNow 与外部阻塞均在本台账记录。 |

## 外部提交状态

| 系统 | 状态 | 证据/下一步 |
|---|---|---|
| GSC sitemap | Needs recheck | 等共享收录助手空闲并确认 `sc-domain:thechoicervoicer.me` 后检查 sitemap 状态。 |
| GSC URL Inspection | Needs recheck | 对 5 个英文主 canonical 逐个请求；索引结果继续记为异步状态。 |
| Bing sitemap / URL | Needs recheck | 等队列与本站固定 host 权限恢复后，检查 sitemap 并提交 5 个英文主 canonical。 |
| IndexNow | Done | key 文件在线；10 个中英文 canonical 一次提交返回 HTTP `200`。 |
| GA4 transport | Done | 同意状态下 `page_view` → `G-4SMXSDGLW2`，HTTP `204`。 |
| GA4 Realtime/DebugView | Needs recheck | 需要在正确属性中看到本次生产访问，才能把第 19 项由 Blocked 改为 Pass。 |

下次复核日期：`2026-09-03`。
