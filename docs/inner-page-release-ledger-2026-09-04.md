# The Choicer Voicer 内页发布台账（2026-09-04）

## 发布结论

- 代码提交：`296a41c352903e06ac91dfe0fd2b13878a658a2c`。
- GitHub Pages 发布：`e79a209aaa67c335b1220624d13e2b91faa3d44c`，父版本 `9bec137b83236e5574448bf2889ff7fed3ef2298`。
- 生产域名：`https://thechoicervoicer.me`；5 个英文主页面与 5 个中文对应页均返回 `200`。
- 本地测试：Vitest 20/20；TypeScript、sitemap XML、JSON-LD、CSV 28 列完整性与生产构建通过；Playwright 全套 14 passed、2 skipped（按设备配置跳过重复完整音频流程）。
- 新页本地补充测试：10 个中英文新页面在桌面和手机配置下通过专项 Playwright。
- 生产 QA：10 个新 URL 在 1440×900 与 390×844 下共检查 20 次；HTTP、唯一 H1、自 canonical、图片、可见面包屑、无横向溢出与零控制台错误全部通过。
- GeFei：10 个候选均实查 Web.Cafe；Ahrefs 为“默认跳过（用户未要求）”；没有候选返回可靠月量，因此不推算量级。
- IndexNow：5 个英文主 canonical 与 5 个中文对应 canonical 一次提交，key 文件验证 `200`，提交 HTTP `200`。
- GA4：10 个生产页面的 `page_view` 均发往 `G-4SMXSDGLW2`，HTTP `204`；未取得正确属性的 Realtime/DebugView 账号侧可见证据。
- GSC/Bing：生产 sitemap 已包含新 URL。GSC 既有 sitemap 将异步重抓，但逐页 URL Inspection 未取得新回执；本站为非 `.cc`，Bing 采用 sitemap + IndexNow，手工 URL Submission 记为 `not-required-indexnow`。

## 五个页面的独立结果

| 槽位 | 关键词 | canonical | Web.Cafe KD | 意图 20 | 站内 20 | 技术 20 | UX 15 | 内链/Schema 15 | Analytics/信任 10 | 总分 | 未通过 | 当前状态 |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | voice acting practice scripts | `https://thechoicervoicer.me/voice-acting-practice-scripts/` | 8.7 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅账号侧证据） |
| 2 | emotional voice acting exercises | `https://thechoicervoicer.me/emotional-voice-acting-exercises/` | 7.9 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅账号侧证据） |
| 3 | voice acting improv exercises | `https://thechoicervoicer.me/voice-acting-improv-exercises/` | 1.4 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅账号侧证据） |
| 4 | voice acting audition exercises | `https://thechoicervoicer.me/voice-acting-audition-exercises/` | 4.7 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅账号侧证据） |
| 5 | vocal cooldown exercises | `https://thechoicervoicer.me/vocal-cooldown-exercises/` | 6.7 | 20 | 20 | 20 | 15 | 15 | 5 | 95 | 19 | 需复核（仅账号侧证据） |

严格口径下，今天 5 个英文 canonical 和 5 个中文对应页已经生产上线，但没有把 95/100 写成 100/100，也不计作“5 个最终成功 canonical”。五个替补词未启用：其中两个与脚本 canonical 重复，其余存在既有页面重叠、SERP 错位或混合意图；且替换内容页面无法消除全站共同的 GA4 账号侧证据阻塞。

## 20 项证据矩阵

| ID | 状态 | 证据 |
|---:|---|---|
| 01 | Pass | 5 个主词各自映射唯一 URL；脚本/独白/voice over scripts 合并到一个 canonical，品牌、online、free、app、game 等继续由既有页面承接。 |
| 02 | Pass | `web-cafe-kd-2026-09-04.json` 保存 10 个真实结果；Ahrefs 默认跳过；全部可靠月量为 unavailable，不推算量级。 |
| 03 | Pass | 五个生产首屏分别直接承诺原创短稿、情绪选择、声音即兴、两遍试音和六分钟收尾。 |
| 04 | Pass | 页面不虚构工具、选角或诊断；原创脚本标注用途，情绪和声音收尾页均有停止条件与一般信息边界。 |
| 05 | Pass | 5 个英文页面与 5 个中文页面均有唯一且意图明确的 Title。 |
| 06 | Pass | 10 个页面均有独立、具体、源 HTML 可读的 Description。 |
| 07 | Pass | 本地与生产检查均确认每页恰好一个 H1。 |
| 08 | Pass | 每页含源代码可见的 H2/H3、步骤或脚本、计时方法、复盘、限制与 FAQ。 |
| 09 | Pass | 10 个生产 URL 全部 `200` 且自 canonical。 |
| 10 | Pass | meta robots 为 `index,follow`；生产 robots 与 sitemap 均返回 `200`，随机缺失路径返回 `404`。 |
| 11 | Pass | 生产 sitemap 含 10 个新 URL，`lastmod=2026-09-04`。 |
| 12 | Pass | canonical、en/zh-Hans/x-default、OG、JSON-LD 与尾斜杠一致；sitemap XML 与 10 个 JSON-LD 均可解析。 |
| 13 | Pass | 首屏直接给出练习承诺、开始按钮和相关练习或可玩场景入口。 |
| 14 | Pass | Vitest 20/20、TypeScript、构建、完整音频流程、本地多人轮换和中英文流程通过。 |
| 15 | Pass | Playwright 全套 14 passed/2 skipped；新增双语页本地专项和生产 20 次 QA 无溢出、控制台或图片失败；Logo 为装饰图并使用空 alt。 |
| 16 | Pass | 英文和中文首页的 `#game-guides` 均新增 5 个源代码可见入口。 |
| 17 | Pass | 页面链接首页、可玩页与语义相关且已上线的兄弟页，没有链接替补页。 |
| 18 | Pass | 可见面包屑与 BreadcrumbList 一致，Article 和 FAQPage 对应可见正文。 |
| 19 | Blocked | 10 个 `page_view` 均以正确 Measurement ID 返回 `204` 且不含用户音频；Realtime/DebugView 尚无正确属性的账号侧可见证据。 |
| 20 | Pass | main、Pages 发布、测试、生产 QA、IndexNow、评分与外部阻塞均在本台账记录。 |

## 外部提交状态

| 系统 | 状态 | 证据/下一步 |
|---|---|---|
| GSC sitemap | Done / asynchronous | 正式 sitemap 在线并包含 10 个新 URL；等待平台自动重抓。 |
| GSC URL Inspection | Needs recheck | 正确属性为 `sc-domain:thechoicervoicer.me`；逐页请求未取得新回执。 |
| Bing sitemap / URL | Done via IndexNow | 正式 sitemap 在线；非 `.cc` 站采用 IndexNow，手工 URL Submission 记为 `not-required-indexnow`。 |
| IndexNow | Done | key 文件在线；10 个中英文 canonical 一次提交返回 HTTP `200`。 |
| GA4 transport | Done | 10/10 页面 `page_view` → `G-4SMXSDGLW2`，HTTP `204`。 |
| GA4 Realtime/DebugView | Needs recheck | 需要在正确属性中看到本次生产访问，才能把第 19 项由 Blocked 改为 Pass。 |

下次复核日期：`2026-09-11`。
