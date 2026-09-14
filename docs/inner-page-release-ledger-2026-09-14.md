# The Choicer Voicer 内页发布台账（2026-09-14）

## 发布结论

- 内容提交：`178cf890c0d9d26c3e40dbf85b8f299d5d2509f0`，已推送 `origin/main`。
- GitHub Pages 发布：`ef2e0fee0a393d63292c769cec0390472c09b34d`，父版本 `866b9705ce898626e590d6f82b66bb0257aaf8e0`。
- 生产域名：`https://thechoicervoicer.me`；5 个英文主页面与 5 个完整中文镜像全部返回 `200` 且 self-canonical。
- 本地门禁：Vitest 20/20；TypeScript 与 Vite 生产构建成功；Playwright 14 passed、2 skipped，无失败。
- 生产 QA：10 个新 URL 在 1440×900 与 390×844 视口共检查 20 次；HTTP、唯一 H1、Article/BreadcrumbList/FAQPage、self-canonical、横向溢出、控制台与首方资源均通过。
- 截图证据：`artifacts/playwright/production-20260914/` 保存 20 张生产全页截图，测试产物不进入部署。
- 站内链接：10 页合计 38 个唯一生产站内目标，38/38 返回 `200`。
- 英文首页源可见正文 1800 词，满足既定 1200–1800 门禁。
- GeFei：7 个新候选各查询一次，其中 4 个命中有效缓存、3 个为新查询；另复用 3 个 2026-09-13 合格替补证据。Ahrefs 默认跳过（用户未要求）；可靠月量和趋势均为 `unavailable`，没有推算为 0。

## 上线页面与 Post-live GeFei 复核

| 槽位 | 关键词 | canonical | Web.Cafe KD | 线上实现与 SERP 意图核对 | 结论 |
|---:|---|---|---:|---|---|
| 1 | corporate narration exercises | `https://thechoicervoicer.me/corporate-narration-exercises/` | 0 | Top 1 DR 21、Top 5 DR 4，Reddit 位于第 6；生产页交付受众、批准事实、层级、数字、行动与审校交接 | 匹配；不把表演润色变成未经批准的商业主张 |
| 2 | announcer voice exercises | `https://thechoicervoicer.me/announcer-voice-exercises/` | 17.8 | Top 2 DR 1，Reddit 位于第 5；生产页交付对象识别、单重音、时限、名称核验、纠错与能量重置 | 匹配；与泛声音投射页分工明确，不靠喊叫 |
| 3 | podcast voice exercises | `https://thechoicervoicer.me/podcast-voice-exercises/` | 21.1 | Reddit 位于第 3、专门结果 DR 8 位于第 7；生产页交付意群、拾音距离、自然重音、搭档交接、补录与回听记录 | 匹配；重点是持续对话表达，不是泛热身 |
| 4 | voice acting mouth noise exercises | `https://thechoicervoicer.me/voice-acting-mouth-noise-exercises/` | 25.2 | Reddit 位于第 1；生产页用基准录音、距离、角度、节奏、房间对照与有限剪辑定位杂音 | 匹配；仅为录音工艺，不提供医疗诊断或治疗建议 |
| 5 | radio drama voice acting exercises | `https://thechoicervoicer.me/radio-drama-voice-acting-exercises/` | 28.7 | Reddit 位于第 4、DR 26 结果位于第 9；生产页交付可听空间、转向、提示时机、道具声、连续性与群戏焦点 | 匹配；仅使用原创或已授权练习素材 |

三个合格替补未启用：`trailer narration exercises`、`voice acting vocal texture exercises`、`guided meditation voice exercises`。`voice acting diction exercises` 因与现有 articulation canonical 重叠留在观察池；`animation voice acting exercises` 因平台型 SERP 和现有角色/游戏页重叠留在观察池。原始证据位于 `docs/keyword-research/web-cafe-kd-2026-09-14.json` 与 `docs/keyword-research/web-cafe-kd-2026-09-13.json`。

## 五个页面的独立评分

| 槽位 | 关键词 | 意图 20 | 站内 20 | 技术 20 | UX 15 | 内链/Schema 15 | Analytics/信任 10 | 总分 | 未通过 | 当前状态 |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | corporate narration exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 2 | announcer voice exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 3 | podcast voice exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 4 | voice acting mouth noise exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |
| 5 | radio drama voice acting exercises | 20 | 20 | 20 | 15 | 15 | 10 | 100 | 无 | 生产已验证；外部状态独立记录 |

## 20 项证据矩阵

| ID | 状态 | 证据 |
|---:|---|---|
| 01 | Pass | 5 个主词各自映射唯一 URL，3 个合格替补与 2 个观察项组成 10 项滚动队列。 |
| 02 | Pass | Web.Cafe 原始 JSON 可审计；复用证据不超过 7 天；今日 7/7 查询成功，Ahrefs 默认跳过。 |
| 03 | Pass | 五个生产首屏分别承诺企业审批、播报计时、播客对话、嘴音定位与广播剧空间结果。 |
| 04 | Pass | 企业页保护批准事实；嘴音页不做医疗诊断；广播剧页限制原创或授权素材；各页均有安全边界。 |
| 05 | Pass | 10 个页面均有独立、意图明确的 Title。 |
| 06 | Pass | 10 个页面均有独立、源 HTML 可见且长度达标的 Description。 |
| 07 | Pass | 本地与生产均确认每页恰好一个 H1。 |
| 08 | Pass | 每页含六项练习、原创练习卡、明确通过标准、边界、迁移说明与 FAQ。 |
| 09 | Pass | 10 个生产 URL 全部 HTTP 200 且 self-canonical。 |
| 10 | Pass | meta robots 为 `index,follow`，站点 robots、sitemap 与真实 404 行为保留。 |
| 11 | Pass | 生产 sitemap 含 10 个新 URL，`lastmod=2026-09-14`。 |
| 12 | Pass | canonical、en/zh-Hans/x-default、OG 与尾斜杠一致；JSON-LD 和 XML 可解析。 |
| 13 | Pass | 首屏直接说明训练结果并链接 routine；没有伪造录音、评分或第三方能力。 |
| 14 | Pass | Vitest 20/20、构建成功、Playwright 14/14 可执行项通过。 |
| 15 | Pass | 生产 20/20 双视口检查通过并保存 20 张截图，无首方资源失败、控制台错误或横向溢出。 |
| 16 | Pass | 英文与中文首页各新增 5 个源可见入口；英文首页保持 1800 词。 |
| 17 | Pass | 新页链接首页、可玩页及语义相关兄弟页；38 个唯一生产站内目标 38/38 为 200。 |
| 18 | Pass | 可见面包屑与 BreadcrumbList 一致，Article 与 FAQPage 对应可见正文。 |
| 19 | Pass | 站点共用隐私安全 GA4 实现与 `G-4SMXSDGLW2` 身份；10/10 页面真实 `g/collect` 返回 HTTP 204。 |
| 20 | Pass | 词证据、代码、测试、部署、截图、评分、异常与外部 FIFO 状态均持久化，未把排队或超时写成成功。 |

## 外部提交状态

| 系统 | 状态 | 证据/下一步 |
|---|---|---|
| 恢复后能力 preflight | Ready | `thechoicervoicer-20260914-capability-preflight-v1` 以站点真实 GSC/GA4 身份和前批 10 URL 于北京时间 09:16 返回 ready。 |
| 今日最终精确 preflight | Ready | `thechoicervoicer-20260914-five-final-preflight-v1` 以 10 个不可变双语 URL 返回 ready，`attempts=1`，指纹 `562ccd2e…75497`。 |
| GSC sitemap / URL Inspection | Submitted / 10 indexed | GSC sitemap 明确返回 `submitted`；10/10 URL Inspection 均返回 `URL is on Google` / `indexed`。这是 URL Inspection 回执，不承诺未来排名。 |
| Bing sitemap / URL | Timeout / needs-recheck | Bing sitemap 与 URL Submission 控件均不可用并超时；没有把超时写成成功。定向恢复批次最早北京时间 10:15 自动重试。 |
| IndexNow | Accepted | 线上 key 校验通过；10 个英文/中文 URL 组成的精确批次返回 HTTP `200`。 |
| GA4 transport / Realtime | Collect verified / needs-recheck | 10/10 页面向 `G-4SMXSDGLW2` 发出真实 `g/collect` 并返回 HTTP `204`；Realtime 报表复核时间为 2026-09-15 09:45（北京时间）。 |

最终执行 `thechoicervoicer-20260914-five-final-v1` 的终态为 `blocked`，即时提交闭环为 30/40（75%）：GSC 10、IndexNow 10、GA4 transport 10 已闭合，Bing 10 未闭合。broker 已自动生成 `thechoicervoicer-20260914-five-final-v1.retry-1`，没有删除、复制或重排共享队列。

## 到期回查

- 2026-09-13 批次的次日定向重试保留 GSC 10/10 indexed、IndexNow accepted 与 GA4 collect-verified 证据；Bing 仍受配额/控件限制，GA4 Realtime 保持 needs-recheck。已完成动作未被重复执行。
- 2026-09-07 没有发布五页批次，因此今日没有对应的第 7 天回查。

## 修正记录

1. 本轮开始时 Chrome 扩展未启用，首次恢复检查按真实状态停止；用户恢复后，同一能力预检明确返回 ready，后续才继续外部动作。
2. 首轮源码测试发现新页缺统一独立关系声明，且英文首页为 1818 词；补齐 10 个页脚声明并压缩目录冗余后，首页为 1800 词并重新通过全部门禁。
3. 初次生产探测发生在 GitHub Pages 尚未完成部署时，10 个新 URL 暂时为 404；20 秒后同一版本生效，随后生产 QA 10/10 为 200。
4. 最终执行未整体完成：Bing sitemap 与 URL 控件超时；GSC、IndexNow 与 GA4 transport 的页面级成功证据保持有效，未被整体 `blocked` 覆盖。

下次数据复核日期：`2026-09-21`。
