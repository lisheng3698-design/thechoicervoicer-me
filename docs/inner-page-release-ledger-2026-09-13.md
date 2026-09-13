# The Choicer Voicer 内页发布台账（2026-09-13）

## 发布结论

- 内容提交：`5e8fb5fa55a7624d733f7b9ec367735ed5cd7ffb`，已推送 `origin/main`。
- GitHub Pages 发布：`866b9705ce898626e590d6f82b66bb0257aaf8e0`，父版本 `7bb9aa8f57fbf7088438b8f1070a1fdd3e92b0cd`。
- 生产域名：`https://thechoicervoicer.me`；5 个英文主页面与 5 个中文镜像均返回 `200` 且 self-canonical。
- 本地门禁：Vitest 20/20；TypeScript 与 Vite 生产构建成功；Playwright 14 passed、2 skipped，无失败。
- 生产 QA：10 个新 URL 在 1440×900 与 390×844 视口共检查 20 次，HTTP、唯一 H1、Article/BreadcrumbList/FAQPage、self-canonical、横向溢出、控制台与首方资源均通过。
- 截图证据：`artifacts/playwright/production-20260913/` 保存 20 张生产全页截图，测试产物不进入部署。
- 站内链接：10 页合计 45 个唯一生产站内目标，并发检查 45/45 返回 `200`。
- 英文首页源可见正文 1799 词，满足既定 1200–1800 门禁。
- GeFei：2 个主候选复用 2026-09-12 保存证据，6 个新候选于今日各查询一次；Ahrefs 为“默认跳过（用户未要求）”；可靠月量与趋势均为 `unavailable`，没有推算为 0。

## 上线页面与 Post-live GeFei 复核

| 槽位 | 关键词 | canonical | Web.Cafe KD | 线上实现与 SERP 意图核对 | 结论 |
|---:|---|---|---:|---|---|
| 1 | medical voice over exercises | `https://thechoicervoicer.me/medical-voice-over-exercises/` | 5.5 | 弱结果 DR 12；生产页交付批准术语、数字对比、警示层级、节奏和审校交接 | 匹配；不提供医疗建议，不能由表演者擅自改写 |
| 2 | explainer video voice over exercises | `https://thechoicervoicer.me/explainer-video-voice-over-exercises/` | 12.9 | 弱结果 DR 0；生产页交付问题、因果阶梯、画面交接、行动落点与复述测试 | 匹配；与商业说服、在线课程流程页分工明确 |
| 3 | video game voice acting exercises | `https://thechoicervoicer.me/video-game-voice-acting-exercises/` | 15.5 | Reddit 第 2、DR 9 结果入榜；生产页交付触发卡、bark、分支、状态、补录与低强度用力声 | 匹配；原创提示、不模仿受保护表演、疼痛即停 |
| 4 | documentary narration exercises | `https://thechoicervoicer.me/documentary-narration-exercises/` | 16.5 | Reddit 第 4、DR 20 结果入榜；生产页交付来源账本、归因、不确定性、时间线与画面留白 | 匹配；不虚构事实、动机或确定性 |
| 5 | sports commentary voice exercises | `https://thechoicervoicer.me/sports-commentary-voice-exercises/` | 19.5 | 弱结果 DR 5；生产页交付观察—识别—后果顺序、比分核验、能量曲线与回放审计 | 匹配；不猜姓名、统计或尚未发生的动作 |

三个合格替补未启用：`trailer narration exercises`、`voice acting vocal texture exercises` 与 `guided meditation voice exercises`。两个客户端超时、未落盘证据的观察词仅留在滚动队列，不参与今日结论。原始证据位于 `docs/keyword-research/web-cafe-kd-2026-09-12.json` 与 `docs/keyword-research/web-cafe-kd-2026-09-13.json`。

## 五个页面的独立评分

| 槽位 | 关键词 | 意图 20 | 站内 20 | 技术 20 | UX 15 | 内链/Schema 15 | Analytics/信任 10 | 总分 | 未通过 | 当前状态 |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | medical voice over exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 2 | explainer video voice over exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 3 | video game voice acting exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 4 | documentary narration exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 5 | sports commentary voice exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |

## 20 项证据矩阵

| ID | 状态 | 证据 |
|---:|---|---|
| 01 | Pass | 5 个主词各自映射唯一 URL，3 个合格替补保留，另有 2 个数据缺口观察项，滚动队列共 10 项。 |
| 02 | Pass | Web.Cafe 原始 JSON 可审计；复用证据未超过 7 天；今日 6 次成功、0 缓存；Ahrefs 默认跳过。 |
| 03 | Pass | 五个生产首屏分别承诺医疗准确、解释因果、游戏分支、纪录片证据与体育实时顺序。 |
| 04 | Pass | 医疗页不提供医疗建议；游戏页有用嗓停止规则与版权边界；纪录片和体育页禁止虚构事实。 |
| 05 | Pass | 10 个页面均有独立、意图明确的 Title。 |
| 06 | Pass | 10 个页面均有独立、源 HTML 可见的 Description。 |
| 07 | Pass | 本地与生产均确认每页恰好一个 H1。 |
| 08 | Pass | 每页含六项练习、可见评分卡、边界、迁移说明和 FAQ。 |
| 09 | Pass | 10 个生产 URL 全部 HTTP 200 且 self-canonical。 |
| 10 | Pass | meta robots 为 `index,follow`，站点 robots、sitemap 与真实 404 行为保留。 |
| 11 | Pass | 生产 sitemap 含 10 个新 URL，`lastmod=2026-09-13`。 |
| 12 | Pass | canonical、en/zh-Hans/x-default、OG 与尾斜杠一致；JSON-LD 和 XML 可解析。 |
| 13 | Pass | 首屏直接说明训练结果并链接到 routine；没有伪造录音或评分工具。 |
| 14 | Pass | Vitest 20/20、构建成功、Playwright 14/14 可执行项通过。 |
| 15 | Pass | 生产 20/20 双视口检查通过，20 张截图保存，无首方资源失败。 |
| 16 | Pass | 英文与中文首页各新增 5 个源可见入口；英文首页 1799 词。 |
| 17 | Pass | 新页链接首页、可玩页及语义相关兄弟页；45 个唯一生产目标 45/45 为 200。 |
| 18 | Pass | 可见面包屑与 BreadcrumbList 一致，Article 与 FAQPage 对应可见正文。 |
| 19 | Pass | 站点共用隐私安全 GA4 实现与 `G-4SMXSDGLW2` 身份；传输及 Realtime 以外部结果单独记录。 |
| 20 | Pass | 词证据、代码、测试、部署、截图、评分、异常与外部 FIFO 状态均持久化，未把排队写成成功。 |

## 外部提交状态

| 系统 | 状态 | 证据/下一步 |
|---|---|---|
| 最终精确 preflight | Ready | `thechoicervoicer-20260913-five-final-preflight-v1` 以 10 个不可变双语 URL 和真实标题完成，`attempts=1`。 |
| GSC sitemap / URL Inspection | Submitted / 10 indexed | GSC sitemap 明确返回 `submitted`；10/10 URL Inspection 均返回 `URL is on Google` / `indexed`。这是检查回执，不等同于承诺未来排名。 |
| Bing sitemap / URL | Timeout / quota | Bing sitemap 控件不可用并超时；10/10 URL Submission 明确返回 `quota`，未伪装为成功。`.retry-1` 已持久排队，最早 `2026-09-13T13:30:08.800Z` 重试。 |
| IndexNow | Accepted | 线上 key 校验通过；10 个英文/中文 URL 组成的精确批次返回 HTTP `200`。 |
| GA4 transport / Realtime | Collect verified / needs recheck | 10/10 页面向 `G-4SMXSDGLW2` 发出真实 `g/collect` 并返回 HTTP `204`；Realtime 尚未取得报表证据，恢复时间为 `2026-09-14T01:30:08.800Z`。 |

最终执行 `thechoicervoicer-20260913-five-final-v1` 的终态为 `blocked`，即时提交闭环为 30/40（75%）：GSC 10、IndexNow 10、GA4 transport 10 已闭合，Bing 10 因配额未闭合。broker 已自动生成 `thechoicervoicer-20260913-five-final-v1.retry-1`，没有删除、复制或重排共享队列。

## 到期回查

- 2026-09-12 批次的次日回查使用 `bing-url-ga4-recheck`，确认 5/5 页面生产资格并明确跳过已成功的 Bing sitemap；Bing URL 仍为 `quota`，所以 GA4 步骤未执行。原批与 3 次自动定向重试均保持 `blocked`，没有重复 GSC sitemap 或 IndexNow。
- 2026-09-06 批次的第 7 天回查 `thechoicervoicer-20260913-recheck-20260906-seven-day-v1` 确认 5/5 生产资格、IndexNow 5 URL HTTP 200、GA4 5/5 `collect-verified`；GSC sitemap 与 Bing 控件超时，页面级 GSC/Bing 保持 `needs-recheck`。`.retry-1` 已持久排队，最早 `2026-09-13T02:06:13.038Z`（北京时间 10:06）继续恢复；GA4 报表复核时间为次日 09:36。

## 修正记录

1. 英文首页加入说明后达到 1865 词，超过 1800 上限；收紧目录卡片说明后为 1799 词，重新通过全部源码门禁。
2. 第一次 Playwright 运行因配置本身不自动启动 preview，全部请求得到连接拒绝；启动独占本地 preview 后原样重跑，14 passed、2 skipped。
3. 第一次 `gh-pages` 推送因 zsh 把变量后的冒号解析进变量名而产生无效 refspec；构建提交未变化，改用明确提交哈希后成功推送。
4. 第一条生产 shell 检查误用 zsh 特殊变量 `path`，该子进程内命令路径失效且未发出有效请求；改用项目专用变量后 10/10 生产检查通过。
5. 最终执行没有整体完成：Bing sitemap 超时且 URL 配额耗尽；GSC、IndexNow 与 GA4 transport 的页面级成功证据保持有效，未被总体 `blocked` 覆盖。

下次数据复核日期：`2026-09-20`。
