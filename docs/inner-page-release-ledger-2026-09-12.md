# The Choicer Voicer 内页发布台账（2026-09-12）

## 发布结论

- 内容提交：`0309b2cace30bc319d1a4825e37e8228537bd4a1`，已推送 `origin/main`。
- GitHub Pages 发布：`7bb9aa8f57fbf7088438b8f1070a1fdd3e92b0cd`，父版本 `7c7f486d15acf007a6f5df09ac82456290548688`。
- 生产域名：`https://thechoicervoicer.me`；5 个英文主页面与 5 个中文镜像均返回 `200`。
- 本地验证：Vitest 20/20；TypeScript、Vite 生产构建、sitemap XML、10 个 JSON-LD、metadata/canonical/唯一 H1、每页六项练习与 28 列 CSV 完整性通过。
- 本地浏览器回归：独占 `127.0.0.1:4474`，单 worker 完整回归 14 passed、2 skipped，无失败。
- 生产 QA：10 个新 URL 在桌面与 Pixel 7 视口共检查 20 次；HTTP、自 canonical、唯一 H1、Article/BreadcrumbList/FAQPage、横向溢出和首方资源均通过。
- 截图证据：`artifacts/playwright/production-20260912/` 保存 10 个生产路由的桌面与手机全页截图，共 20 张；测试产物不进入部署。
- 站内链接：10 页合计 47 个唯一生产站内目标，并发检查全部返回 `200`。
- GeFei：8 个候选均于今日实查 Web.Cafe；Ahrefs 为“默认跳过（用户未要求）”；可靠月量均为 `unavailable`，没有推算或伪造。
- 英文首页源可见正文 1798 词，继续满足既定 1200–1800 门禁。

## 上线页面与 Post-live GeFei 复核

| 槽位 | 关键词 | canonical | Web.Cafe KD | 线上实现与 SERP 意图核对 | 结论 |
|---:|---|---|---:|---|---|
| 1 | voice acting objective exercises | `https://thechoicervoicer.me/voice-acting-objective-exercises/` | 8.6 | 当前 SERP 有 Reddit 与低 DR 页面占位；生产页将目标落实为特定听众、可观察结果、阻碍、策略切换和听众反馈 | 匹配；与脚本分析页的文本标记任务分开 |
| 2 | voice acting stakes exercises | `https://thechoicervoicer.me/voice-acting-stakes-exercises/` | 22.9 | 当前结果缺少 voice-specific 量化流程；生产页用损失、截止点、不行动后果与升级阶梯建立压力 | 匹配；不以泛情绪强度或身份高低替代利害 |
| 3 | voice acting taking direction exercises | `https://thechoicervoicer.me/voice-acting-taking-direction-exercises/` | 16.8 | 当前结果多为泛练习；生产页把模糊导演用语转成一次可听、可比较、可复现的变化与双 take 判断 | 匹配；与 audition 和 self-critique 页面分工明确 |
| 4 | ADR voice acting exercises | `https://thechoicervoicer.me/adr-voice-acting-exercises/` | 15.6 | Reddit 与低 DR 页面表明专门训练缺口；生产页覆盖三声提示、入点、口型长度、连续性与 pickup 匹配 | 匹配；只用原创提示并明确授权素材边界 |
| 5 | e-learning narration exercises | `https://thechoicervoicer.me/e-learning-narration-exercises/` | 2.9 | 当前结果偏行业指南；生产页用教学分块、术语、列表逻辑、屏幕等待与理解复述测试回应练习意图 | 匹配；区别于有声书叙事与商业说服 |

三个替补未启用：`documentary narration exercises`、`video game voice acting exercises` 和 API 标记 brand 的 `voice acting sibilance exercises` 均保留在池中，仅在主页面失败时启用。原始证据保存在 `docs/keyword-research/web-cafe-kd-2026-09-12.json`。

## 五个页面的独立评分

| 槽位 | 关键词 | 意图 20 | 站内 20 | 技术 20 | UX 15 | 内链/Schema 15 | Analytics/信任 10 | 总分 | 未通过 | 当前状态 |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | voice acting objective exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 2 | voice acting stakes exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 3 | voice acting taking direction exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 4 | ADR voice acting exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 5 | e-learning narration exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |

## 20 项证据矩阵

| ID | 状态 | 证据 |
|---:|---|---|
| 01 | Pass | 5 个主词各自映射唯一 URL；与既有页面和关键词池去重；3 个替补保留但未启用。 |
| 02 | Pass | `web-cafe-kd-2026-09-12.json` 保存 8 个真实 Web.Cafe 结果；Ahrefs 默认跳过；月量 unavailable。 |
| 03 | Pass | 5 个生产首屏分别承诺目标、利害、导演反馈、ADR 同步与教学清晰度；生产截图与保存的 SERP 建议一致。 |
| 04 | Pass | 使用原创短句或用户有权使用的文本；不虚构工具、排名、职业或健康结果；ADR 页有素材授权边界，利害页有低风险停止规则。 |
| 05 | Pass | 5 个英文与 5 个中文页面均使用独立、意图明确的 Title；全站构建输入无重复。 |
| 06 | Pass | 10 个页面均有独立、具体且源 HTML 可读的 Description；全站构建输入无重复。 |
| 07 | Pass | 本地与生产均确认每页恰好一个 H1。 |
| 08 | Pass | 每页含源 HTML 可见的 H2/H3、六项训练、判定标准、边界、迁移与 FAQ。 |
| 09 | Pass | 10 个生产 URL 全部 `200` 且自 canonical。 |
| 10 | Pass | meta robots 为 `index,follow`；生产 robots、sitemap 与真实 `404` 行为保留。 |
| 11 | Pass | 生产 sitemap 含 10 个新 URL，`lastmod=2026-09-12`。 |
| 12 | Pass | canonical、en/zh-Hans/x-default、OG、JSON-LD 与尾斜杠一致；XML 与 JSON-LD 均可解析。 |
| 13 | Pass | 首屏提供具体训练结果和直接 routine 入口；没有伪造不属于产品的交互工具。 |
| 14 | Pass | Vitest 20/20、TypeScript、构建与 Playwright 14 passed/2 skipped；新增路由和既有核心游戏流程通过。 |
| 15 | Pass | 生产 20/20 浏览器 QA 无溢出或首方失败；20 张桌面/手机截图已保存，并抽查英文桌面与中文手机代表页。移动模拟中的两个第三方广告请求返回 403，与首方页面实现隔离。 |
| 16 | Pass | 英文与中文首页 `#game-guides` 各新增 5 个源 HTML 可见入口；英文首页仍为 1798 词。 |
| 17 | Pass | 新页链接首页、可玩页和已上线语义相关兄弟页；47 个唯一生产站内目标均返回 200。 |
| 18 | Pass | 可见面包屑与 BreadcrumbList 一致，Article 与 FAQPage 对应可见正文。 |
| 19 | Pass | 站点共用隐私安全 GA4 实现，Measurement ID 与同意机制由回归锁定；5/5 英文页面真实 `g/collect` 为 HTTP 204，Realtime 独立记录为 `needs-recheck`。 |
| 20 | Pass | Web.Cafe、代码、测试、生产发布、截图、评分、异常与外部排队状态均持久化，未把排队或超时写成成功。 |

## 外部提交状态

| 系统 | 状态 | 证据/下一步 |
|---|---|---|
| 今日精确 preflight | Queued / client timeout / not success | `thechoicervoicer-20260912-five-preflight-v1` 进入共享 FIFO 时位置 6、`attempts=0`；终端等待到自身上限后超时，broker 仍保留原幂等任务。队首其他项目的 GA4 恢复批次租约到期后被重新认领，本批尚无终态，不能以 queued 代替 ready。 |
| GSC sitemap / URL Inspection | Sitemap registered / needs recheck | 同一生产 sitemap 已由 2026-09-11 恢复批次明确提交；今日 sitemap 已含 10 个新 URL，但今日精确 URL Inspection 尚未执行，Google 发现/收录保持 `pending`。 |
| Bing sitemap / URL | Not required after IndexNow / sitemap registered | 同一 sitemap 已登记；本站不是 `.cc`，10 个新 URL 已获 IndexNow HTTP 200，因此不重复做手工 Bing URL Submission。 |
| IndexNow | Accepted | 线上 key HTTP 200 且正文精确匹配；英文 5 URL 与中文 5 镜像分两次精确提交，均返回 HTTP 200。 |
| GA4 transport | Collect verified | 5 个英文 canonical 在授权匿名分析后均发出匹配 `G-4SMXSDGLW2` 的真实 `g/collect`，5/5 返回 HTTP 204。 |
| GA4 Realtime | Needs recheck | 传输层已验证；共享 FIFO 尚未轮到今日精确控制台复核，不把排队状态写成 Realtime 成功。 |

## 修正与队列记录

1. 第一次 `gh-pages` 推送因 zsh 把变量后的冒号解释进变量名而生成无效 refspec；发布提交本身未变化，改用明确提交哈希后成功推送。
2. 生产移动模拟会请求站点既有第三方广告脚本，两个广告端点返回 403；首方页面、CSS、JS、canonical、Schema 与布局均通过，台账将其与首方失败分开记录。
3. 共享外部助手恢复后认领了队首 `koe-shindan` GA4 复查，但未返回结果且租约到期，随后自动安全回队并再次认领；没有删除、重排或复制任何其他项目的队列。
4. 为避免把队列阻塞写成提交成功，本批没有追加最终执行批次；IndexNow 与 GA4 transport 使用精确 URL 在终端各执行一次，GSC 精确检查和 GA4 Realtime 保持 `needs-recheck`。

下次数据复核日期：`2026-09-19`。
