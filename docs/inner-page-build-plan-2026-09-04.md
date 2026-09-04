# The Choicer Voicer 内页建设计划（2026-09-04）

## 今日选择规则

- 目标：建设 5 个英文主 canonical，并同步提供 5 个中文对应页；保留 5 个已核验替补词。
- 去重：先与 `docs/keyword-pool.csv`、25 个既有英文搜索意图页和历史替补队列比对。品牌、online、free、app、game、download 等变体继续由既有 canonical 承接。
- 意图边界：脚本页提供原创短稿；情绪页训练行动、关系和转折；即兴页训练响应新信息；试音页训练限时准备与两遍选择；收尾页负责声音工作后的低强度恢复。
- 数据：10 个候选均于今日实查 Web.Cafe；Ahrefs 记为“默认跳过（用户未要求）”。全部候选的可靠搜索量均为 `unavailable`，不把流量、站点访问或相对趋势推算成月量。
- 安全与真实性：不借用受版权限制的影视台词，不承诺选角结果，不虚构录音上传或远程服务；声音收尾与情绪页面都提供清楚停止条件和一般信息边界。

## 今日 5 页

| 槽位 | 主关键词 | Web.Cafe KD | 计划 URL | 页面承诺 | 当前状态 |
|---:|---|---:|---|---|---|
| 1 | voice acting practice scripts | 8.7（极易） | `/voice-acting-practice-scripts/` | 8 段原创短稿、目标时长与三遍录音复盘 | 已上线 |
| 2 | emotional voice acting exercises | 7.9（极易） | `/emotional-voice-acting-exercises/` | 用行动、关系、强度和转折训练情绪表达 | 已上线 |
| 3 | voice acting improv exercises | 1.4（极易） | `/voice-acting-improv-exercises/` | 7 个适合单人或双人的声音即兴提示 | 已上线 |
| 4 | voice acting audition exercises | 4.7（极易） | `/voice-acting-audition-exercises/` | 限时审稿、冷读、两遍选择与五项复盘 | 已上线 |
| 5 | vocal cooldown exercises | 6.7（极易） | `/vocal-cooldown-exercises/` | 配音后温和回到日常说话声的六分钟流程 | 已上线 |

## 替补队列

| 替补 | 关键词 | Web.Cafe KD | 计划 URL | 当前处理 |
|---:|---|---:|---|---|
| 1 | voice acting monologues for practice | 3.6（极易） | `/voice-acting-monologues-for-practice/` | 与练习脚本 canonical 同属固定文本需求，合并而不另建页 |
| 2 | voice acting practice routine | 7.8（极易） | `/voice-acting-practice-routine/` | 泛练习流程与既有热身页和多篇练习页重叠 |
| 3 | vocal resonance exercises | 9.2（极易） | `/vocal-resonance-exercises/` | 当前 SERP 主要为歌唱内容，且与声音投射局部重叠 |
| 4 | voice acting recording practice | 9.6（极易） | `/voice-acting-recording-practice/` | 查询意图过宽，可能同时指脚本、录音技术或表演复盘 |
| 5 | voice over practice scripts | 28.3（容易） | `/voice-over-practice-scripts/` | 与今日练习脚本主 canonical 为同一固定文本意图且竞争更高 |

## GeFei / Web.Cafe 摘要

| 关键词 | 盘面信号 | 质量引用域预算 | 决策 |
|---|---|---:|---|
| voice acting practice scripts | Reddit 第 2；DR 16 弱站第 1；全部为内页 | 5–15 | do |
| emotional voice acting exercises | Reddit 第 3；DR 10 弱站第 2；全部为内页 | 5–10 | do |
| voice acting improv exercises | Reddit 第 1；SERP 没有专门首页经营 | 5 | do |
| voice acting audition exercises | Reddit 第 2；DR 26 内页可进入前列 | 5 | do |
| vocal cooldown exercises | DR 6 与 DR 13 弱站内页进入前三 | 5–10 | do |
| voice acting monologues for practice | Reddit 第 1；与 scripts 结果集高度接近 | 5 | merge / replacement 1 |
| voice acting practice routine | Reddit 第 2；与 warm-up / exercises 主题重叠 | 5–10 | replacement 2 |
| vocal resonance exercises | 前列以唱歌与通用声音内容为主 | 5–15 | replacement 3 |
| voice acting recording practice | 结果混合脚本、录音和泛练习 | 5–15 | replacement 4 |
| voice over practice scripts | 与选中 scripts 结果集重复，KD 更高 | 25–50 | merge / replacement 5 |

原始结果：`docs/keyword-research/web-cafe-kd-2026-09-04.json`。

## 发布前闭环

- 10 个页面均需通过唯一 H1、Title、Description、自 canonical、双语 hreflang、可见面包屑、Article/BreadcrumbList/FAQPage schema 与站内链接检查。
- 英文与中文首页需为 5 个新意图提供源 HTML 可见入口；正式 sitemap 需新增 10 个 `lastmod=2026-09-04` URL。
- 本地 Vitest、TypeScript、构建、桌面/手机 Playwright 通过后才可发布。
- 发布后逐 URL 检查 HTTP、canonical、H1、图片、横向溢出与控制台，并提交 IndexNow、记录 GA4 transport 与账号侧证据状态。

## 发布结果

- 主分支内容提交：`296a41c`。
- GitHub Pages 发布：`e79a209`。
- 5 个英文 canonical 与 5 个中文对应页全部返回 `200`；生产桌面/手机专项 QA 20/20 通过。
- IndexNow 对 10 个 URL 一次提交，HTTP `200`。
- 10 个生产页面的 GA4 `page_view` 均发送到 `G-4SMXSDGLW2` 并返回 HTTP `204`。
- 严格评分均为 95/100；唯一缺项是 GA4 Realtime/DebugView 的正确账号侧可见证据，第 19 项保留 `Blocked`。
