# The Choicer Voicer 内页发布台账（2026-09-10）

## 发布结论

- 内容提交：`d7ca40d00ad83112339bd64daf79986dcd0d03a9`，已推送 `origin/main`。
- GitHub Pages 发布：`0ad5917a7e28d8db068440fe3e2b4b3490e7a504`，父版本 `46363304b7332c9e22a70a73c926d9e4efc96841`。
- 生产域名：`https://thechoicervoicer.me`；5 个英文主页面与 5 个中文对应页均返回 `200`。
- 本地验证：Vitest 20/20；TypeScript、Vite 生产构建、sitemap XML、10 个 JSON-LD、metadata/canonical/唯一 H1 与 28 列 CSV 完整性通过。
- 本地浏览器回归：独占 `127.0.0.1:4373` 后 Playwright 14 passed、2 skipped；新增中英文搜索意图路由的桌面/手机用例均通过。
- 生产 QA：10 个新 URL 在 1440×900 与 390×844 下共检查 20 次；HTTP、自 canonical、唯一 H1、schema、图片 alt、横向溢出和控制台错误全部通过。
- 截图证据：`artifacts/playwright/production-20260910/` 保存 10 个生产路由的桌面与手机全页截图，共 20 张；该测试产物目录按项目规则不进入部署。
- GeFei：8 个候选均于今日实查 Web.Cafe；Ahrefs 为“默认跳过（用户未要求）”；可靠月量均为 `unavailable`，没有推算或伪造。
- GSC：正式 sitemap 已提交；5/5 英文 canonical 的 URL Inspection 均返回 `URL is on Google`。
- IndexNow：英文 5 页由最终批次一次提交返回 HTTP `200`；中文 5 页另以一个精确列表一次提交返回 HTTP `200`。
- GA4：5/5 生产页面的真实 `g/collect` 请求命中 `G-4SMXSDGLW2` 并返回 `204`；只读 Realtime 复核在属性 `p551708268` 中匹配 5/5 页面标题与 URL。
- Bing：首次 Sitemap 与 URL Submission 页面字段加载超时；系统已建立 `thechoicervoicer-20260910-five-final-v1.retry-1` 幂等恢复批次。该批次到达 `notBefore` 后超过 5 分钟仍未被空闲 runner 领取，最终状态如实保留为 `needs-recheck / retry queued`；IndexNow HTTP 200 已提供即时发现路径。

## 上线页面与 Post-live GeFei 复核

| 槽位 | 关键词 | canonical | Web.Cafe KD | 线上实现与 SERP 意图核对 | 结论 |
|---:|---|---|---:|---|---|
| 1 | voice acting physicality exercises | `https://thechoicervoicer.me/voice-acting-physicality-exercises/` | 8.6 | 首屏和六项练习只处理姿态、重心、阻力、手势、听众距离与静止如何产生可听差异；符合弱结果中缺少受控 body-to-voice 对照流程的机会 | 匹配，无需改词或换页型 |
| 2 | voice acting visualization exercises | `https://thechoicervoicer.me/voice-acting-visualization-exercises/` | 0.1 | 首屏和练习使用空间、物体、感官事实、听众与可执行目标；没有退化成泛表演建议 | 匹配，无需改词或换页型 |
| 3 | voice acting comedy timing exercises | `https://thechoicervoicer.me/voice-acting-comedy-timing-exercises/` | 16.2 | 页面明确拆分 setup、pause、turn、punch 与 reaction，并通过 pause ladder 比较，不依赖“搞笑声音” | 匹配，补足当前泛喜剧/课程型结果的训练空缺 |
| 4 | voice acting character switching exercises | `https://thechoicervoicer.me/voice-acting-character-switching-exercises/` | 10.0 | 页面只训练两个已建立声音间的锚点、重置、对比矩阵和盲测，避免与角色创建页争夺意图 | 匹配，canonical 边界清楚 |
| 5 | audiobook narration exercises | `https://thechoicervoicer.me/audiobook-narration-exercises/` | 10.2 | 页面聚焦旁白视角、段落转折、人物差异、补录、回忆和隔日连续性，不复制有声书正文 | 匹配，提供 SERP 中欠缺的长篇连续性流程 |

三个替补未启用：`animation voice acting exercises` 的当前结果偏泛且 API 标记 brand；`voice acting relaxation exercises` 与现有热身/呼吸/冷却页重叠；`voice acting pacing exercises` 与 vocal timing、line delivery 页面重叠且 API 标记 brand。原始证据保存在 `docs/keyword-research/web-cafe-kd-2026-09-10.json`。

## 五个页面的独立评分

| 槽位 | 关键词 | 意图 20 | 站内 20 | 技术 20 | UX 15 | 内链/Schema 15 | Analytics/信任 10 | 总分 | 未通过 | 当前状态 |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | voice acting physicality exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 已上线；Bing 独立状态为 needs-recheck |
| 2 | voice acting visualization exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 已上线；Bing 独立状态为 needs-recheck |
| 3 | voice acting comedy timing exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 已上线；Bing 独立状态为 needs-recheck |
| 4 | voice acting character switching exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 已上线；Bing 独立状态为 needs-recheck |
| 5 | audiobook narration exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 已上线；Bing 独立状态为 needs-recheck |

## 20 项证据矩阵

| ID | 状态 | 证据 |
|---:|---|---|
| 01 | Pass | 5 个主词各自映射唯一 URL；与 35 个既有英文搜索意图页和关键词池去重，3 个替补未启用。 |
| 02 | Pass | `web-cafe-kd-2026-09-10.json` 保存 8 个真实 Web.Cafe 结果；Ahrefs 默认跳过；月量 unavailable。 |
| 03 | Pass | 5 个生产首屏分别承诺肢体可听转换、具体想象、喜剧节拍、双角色切换与长篇叙述；生产截图与保存的 SERP 建议一致。 |
| 04 | Pass | 练习使用原创短句或用户自备合法文本；不虚构工具、排名、职业或健康结果，并明确嗓音安全与内容边界。 |
| 05 | Pass | 5 个英文与 5 个中文页面均使用独立、意图明确的 Title，重复扫描通过。 |
| 06 | Pass | 10 个页面均有独立、具体且源 HTML 可读的 Description，重复扫描通过。 |
| 07 | Pass | 本地与生产均确认每页恰好一个 H1。 |
| 08 | Pass | 每页含源代码可见的 H2/H3、六步训练、判定标准、边界、迁移与 FAQ。 |
| 09 | Pass | 10 个生产 URL 全部 `200` 且自 canonical。 |
| 10 | Pass | meta robots 为 `index,follow`；生产 robots、sitemap 与真实 `404` 行为保留。 |
| 11 | Pass | 生产 sitemap 含 10 个新 URL，`lastmod=2026-09-10`。 |
| 12 | Pass | canonical、en/zh-Hans/x-default、OG、JSON-LD 与尾斜杠一致；XML 与 JSON-LD 均可解析。 |
| 13 | Pass | 首屏提供具体结果和直接训练入口；内容页没有伪造不属于产品的交互工具。 |
| 14 | Pass | Vitest 20/20、TypeScript、构建与 Playwright 14 passed/2 skipped；新增路由、边界与已有核心流程通过。 |
| 15 | Pass | 生产 20/20 浏览器 QA 无溢出、异常遮挡、资源或控制台失败；20 张桌面/手机截图和 rendered-HTML alt 审计已保存，并人工复核英文桌面与中文手机代表页。 |
| 16 | Pass | 英文与中文首页的 `#game-guides` 各新增 5 个源 HTML 可见入口。 |
| 17 | Pass | 新页链接首页、可玩页与语义相关的已上线兄弟页，没有链接替补页；生产抓取 36 个唯一站内目标，0 个失效链接。 |
| 18 | Pass | 可见面包屑与 BreadcrumbList 一致，Article 与 FAQPage 对应可见正文。 |
| 19 | Pass | 5/5 `g/collect` 匹配页面 URL 与 `G-4SMXSDGLW2`，HTTP `204`；正确 GA4 属性 Realtime 匹配 5/5 标题与 URL；没有发送录音、输入或用户内容。 |
| 20 | Pass | preflight 修正、内容提交、Pages 发布、测试、生产 QA、截图、IndexNow、GA4、评分与外部状态均在计划和本台账记录。 |

## 外部提交状态

| 系统 | 状态 | 证据/下一步 |
|---|---|---|
| GSC sitemap | Done | 最终批次返回 `GSC sitemap submitted`。 |
| GSC URL Inspection | Done / indexed | 5/5 英文 canonical 均返回 `URL is on Google`。 |
| Bing sitemap | Needs recheck / retry queued | 首次字段加载超时；幂等恢复批次已到时间但空闲 runner 尚未领取。 |
| Bing URL Submission | Needs recheck / retry queued | 5/5 首次字段加载超时；保留同一恢复批次，不重复创建任务；IndexNow 已 HTTP 200。 |
| IndexNow 英文 | Done | 最终批次提交 5 个 URL，HTTP `200`。 |
| IndexNow 中文 | Done | 精确提交 5 个中文 URL，HTTP `200`。 |
| GA4 transport | Done | 5/5 页面真实 `g/collect` → `G-4SMXSDGLW2`，HTTP `204`。 |
| GA4 Realtime | Done | `thechoicervoicer-20260910-five-ga4-realtime-v1` 返回 `completed`，5/5 标题与 URL 匹配正确属性。 |

## 修正历史

1. 昨日预检暴露生产首页原始 HTML 缺少登记的 Measurement ID；在中英文首页补充不触发追踪的声明型 metadata，保留默认拒绝和同意后动态加载。修复提交 `00e493d`，Pages 版本 `4636330`。
2. 新增首页入口后英文首页正文从 1800 增至 1829 词；压缩既有导航说明后降至 1798 词，没有放宽 1200–1800 的既定测试阈值。
3. Pages 首次推送发生一次 GitHub TLS 握手中断；复用同一构建树重试成功，没有改变页面产物。
4. 最终外部批次首次得到 GSC、IndexNow 与 GA4 transport 成功证据；Bing 字段加载超时进入系统恢复队列；GA4 用只读 Realtime 定向复核补齐第 19 项，没有重复产生 page_view。
5. Bing 恢复批次到达 `notBefore` 后超过 5 分钟仍未被空闲 runner 领取；没有另建重复任务，状态按 `needs-recheck / retry queued` 封账。

下次数据复核日期：`2026-09-17`。
