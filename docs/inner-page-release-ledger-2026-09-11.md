# The Choicer Voicer 内页发布台账（2026-09-11）

## 发布结论

- 内容提交：`3e11fd42f3c0a4ced3eeb7590b7c666772a1b3d5`，已推送 `origin/main`。
- GitHub Pages 发布：`7c7f486d15acf007a6f5df09ac82456290548688`，父版本 `0ad5917a7e28d8db068440fe3e2b4b3490e7a504`。
- 生产域名：`https://thechoicervoicer.me`；5 个英文主页面与 5 个中文对应页均返回 `200`。
- 本地验证：Vitest 20/20；TypeScript、Vite 生产构建、sitemap XML、10 个 JSON-LD、metadata/canonical/唯一 H1、每页六项练习与 28 列 CSV 完整性通过。
- 本地浏览器回归：独占 `127.0.0.1:4473`，最终单 worker 完整回归 14 passed、2 skipped。
- 生产 QA：10 个新 URL 在 1440×900 与 390×844 下共检查 20 次；HTTP、自 canonical、唯一 H1、Article/BreadcrumbList/FAQPage、图片 alt、横向溢出和控制台错误全部通过。
- 截图证据：`artifacts/playwright/production-20260911/` 保存 10 个生产路由的桌面与手机全页截图，共 20 张；该测试产物不进入部署。
- 站内链接：10 页合计 38 个唯一生产站内目标；并发检查唯一一次 `/privacy/` TLS EOF 后，对同一 URL 有界重试返回 `200`，无页面级坏链。
- GeFei：8 个候选均于今日实查 Web.Cafe；Ahrefs 为“默认跳过（用户未要求）”；可靠月量均为 `unavailable`，没有推算或伪造。
- 英文首页源可见正文 1798 词，继续满足既定 1200–1800 门禁。

## 上线页面与 Post-live GeFei 复核

| 槽位 | 关键词 | canonical | Web.Cafe KD | 线上实现与 SERP 意图核对 | 结论 |
|---:|---|---|---:|---|---|
| 1 | voice acting status exercises | `https://thechoicervoicer.me/voice-acting-status-exercises/` | 9.4 | 当前 SERP 由 improv / acting 内容和论坛占位；生产页将任务转成可测的许可、时间占有、打断恢复与句内地位转折，并明确不以音量或身份定义高低 | 匹配，补足 voice-specific 训练流程 |
| 2 | voice acting memory exercises | `https://thechoicervoicer.me/voice-acting-memory-exercises/` | 14.2 | 当前 SERP 混合泛声音练习与 sense memory；生产页只处理事件复述、提示词、补录和隔日连续性，并强制准确文字回到授权来源核验 | 匹配，页面边界已收窄 |
| 3 | voice acting character relationship exercises | `https://thechoicervoicer.me/voice-acting-character-relationship-exercises/` | 13.0 | 当前结果混合泛角色练习、论坛与 readings；生产页用共同历史、距离、共享秘密、信任转折与伙伴行为建立独立关系任务 | 匹配，不与角色声线创建页争夺意图 |
| 4 | voice acting reaction exercises | `https://thechoicervoicer.me/voice-acting-reaction-exercises/` | 17.9 | 当前结果多为泛练习；生产页严格按 expectation → cue event → response latency → consequence 组织，并排除自动 gasp / sigh | 匹配，不与聆听页重复；聆听页负责提取信息，本页负责信息造成的变化 |
| 5 | voice acting effort sounds exercises | `https://thechoicervoicer.me/voice-acting-effort-sounds-exercises/` | 24.2（API 标记 brand） | 当前结果虽由平台页密集占位，但真实任务集中于 efforts / exertions；生产页用抬举、转向、轻落地、冲击提示和三事件序列回应，并把强度限制、停止信号和临床边界放在源 HTML | 匹配，保留安全优先的差异化页面型 |

三个替补未启用：`voice acting lip sync exercises` 的 SERP 偏动画口型制作；`voice acting vocal agility exercises` 偏歌唱且与已有页面重叠；`voice acting breath phrasing exercises` 与 `/breath-control-exercises-for-voice-acting/` 重叠。原始证据保存在 `docs/keyword-research/web-cafe-kd-2026-09-11.json`。

## 五个页面的独立评分

| 槽位 | 关键词 | 意图 20 | 站内 20 | 技术 20 | UX 15 | 内链/Schema 15 | Analytics/信任 10 | 总分 | 未通过 | 当前状态 |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | voice acting status exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态已分栏落盘 |
| 2 | voice acting memory exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态已分栏落盘 |
| 3 | voice acting character relationship exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态已分栏落盘 |
| 4 | voice acting reaction exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态已分栏落盘 |
| 5 | voice acting effort sounds exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态已分栏落盘 |

## 20 项证据矩阵

| ID | 状态 | 证据 |
|---:|---|---|
| 01 | Pass | 5 个主词各自映射唯一 URL；与既有页面和关键词池去重；3 个替补因错位或重叠未启用。 |
| 02 | Pass | `web-cafe-kd-2026-09-11.json` 保存 8 个真实 Web.Cafe 结果；Ahrefs 默认跳过；月量 unavailable。 |
| 03 | Pass | 5 个生产首屏分别承诺地位、记忆、关系、反应与低强度用力声；生产截图与保存的 SERP 建议一致。 |
| 04 | Pass | 使用原创短句或用户有权使用的文本；不虚构工具、排名、职业或健康结果；用力声页有明确停止规则。 |
| 05 | Pass | 5 个英文与 5 个中文页面均使用独立、意图明确的 Title；10/10 唯一。 |
| 06 | Pass | 10 个页面均有独立、具体且源 HTML 可读的 Description；10/10 唯一。 |
| 07 | Pass | 本地与生产均确认每页恰好一个 H1。 |
| 08 | Pass | 每页含源 HTML 可见的 H2/H3、六项训练、判定标准、边界、迁移与 FAQ。 |
| 09 | Pass | 10 个生产 URL 全部 `200` 且自 canonical。 |
| 10 | Pass | meta robots 为 `index,follow`；生产 robots、sitemap 与真实 `404` 行为保留。 |
| 11 | Pass | 生产 sitemap 含 10 个新 URL，`lastmod=2026-09-11`。 |
| 12 | Pass | canonical、en/zh-Hans/x-default、OG、JSON-LD 与尾斜杠一致；XML 与 JSON-LD 均可解析。 |
| 13 | Pass | 首屏提供具体训练结果和直接 routine 入口；没有伪造不属于产品的交互工具。 |
| 14 | Pass | Vitest 20/20、TypeScript、构建与 Playwright 14 passed/2 skipped；新增路由和已有核心游戏流程通过。 |
| 15 | Pass | 生产 20/20 浏览器 QA 无溢出、异常遮挡、资源或控制台失败；20 张桌面/手机截图已保存，并抽查英文桌面与中文手机代表页。 |
| 16 | Pass | 英文与中文首页 `#game-guides` 各新增 5 个源 HTML 可见入口；英文首页仍为 1798 词。 |
| 17 | Pass | 新页链接首页、可玩页和已上线语义相关兄弟页；38 个唯一生产站内目标最终均返回 200。 |
| 18 | Pass | 可见面包屑与 BreadcrumbList 一致，Article 与 FAQPage 对应可见正文。 |
| 19 | Pass | 站点共用隐私安全 GA4 实现，Measurement ID 与同意机制由回归锁定；本批精确 `g/collect` 为 5/5 HTTP 204，Realtime 控制台复查超时并独立记录为 `needs-recheck`。 |
| 20 | Pass | Web.Cafe、代码、测试、生产发布、截图、评分、异常重试与外部排队状态均已持久化，未把排队或超时写成成功。 |

## 外部提交状态

| 系统 | 状态 | 证据/下一步 |
|---|---|---|
| 昨日 Bing 恢复 | Needs recheck / retry-2 running | 原 `retry-1` 今日被同一 runner 认领，仍因 Bing URL field unavailable 阻塞；成功的 GSC / IndexNow / GA4 未重复；系统生成的 `retry-2` 于 `2026-09-11 08:43:11 CST` 被认领。 |
| 今日精确 preflight | Ready | `thechoicervoicer-20260911-five-preflight-v1`：精确 canonical 5/5，sitemap match，key live，GSC/Bing/GA4 authenticated，proxy healthy，GA4 identity 正确。 |
| GSC sitemap | Needs recheck / retry-1 queued | `thechoicervoicer-20260911-five-final-v1` 在等待控制台确认时超时；生产 sitemap 已含 10 个新 URL，未把 timeout 记为 accepted。 |
| GSC URL Inspection | Needs recheck / retry-1 queued | 本次 Sitemap 门禁未确认，未伪造逐 URL indexed/requested 结果。 |
| Bing sitemap | Needs recheck / retry-1 queued | 控制台 sitemap field unavailable；未把 timeout 记为 accepted。 |
| Bing URL Submission | Needs recheck / retry-1 queued | 控制台 URL field unavailable；因 Bing sitemap 尚无本批成功回执，暂不写 `not-required-indexnow`。 |
| IndexNow | Accepted | 生产 key HTTP 200 且正文精确匹配；英文 5 URL 由最终批次提交 HTTP 200，中文 5 镜像精确提交 HTTP 200。 |
| GA4 transport | Collect verified | 正确 Measurement ID `G-4SMXSDGLW2`，5/5 页面真实 `g/collect` 均为 HTTP 204。 |
| GA4 Realtime | Needs recheck / retry queued | 定向复查跳过已有 10/10 初始化与 page_view 证据，未重复浏览；控制台临时标签关闭导致 `No tab with id`，没有把超时写成可见成功。 |

## 修正历史

1. 新增首页入口后通过压缩前五张既有导航卡说明，将英文首页保持为 1798 词；没有放宽 1200–1800 测试阈值。
2. Playwright 首轮中，一个既有桌面音频流程偶发等待超时，移动端同流程通过；单独重跑桌面通过，随后单 worker 全量通过，确认不是页面代码回归。
3. 新增 10 个路由后移动端全量导览超过原 30 秒预算；保留全部断言，只将该大循环用例预算调为 60 秒，定向与完整重跑均通过。
4. 38 个生产站内目标并发检查时 `/privacy/` 出现一次代理 TLS EOF；只对该 URL 有界重试后返回 200，未修改页面或扩大重试范围。
5. 昨日共享 runner 的 `attempts=0` 问题已在原幂等链恢复；没有复制队列、终止 broker 或重复已成功的外部动作。

下次数据复核日期：`2026-09-18`。
