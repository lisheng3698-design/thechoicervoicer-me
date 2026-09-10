# The Choicer Voicer 内页建设计划（2026-09-10）

## 今日选择规则

- 目标：建设 5 个英文主 canonical，并同步建设 5 个中文对应页；另保留 3 个已核验替补词。
- 去重：已与 `docs/keyword-pool.csv`、35 个既有英文搜索意图页和历史替补队列比对。肢体性、可视化、喜剧节奏、角色切换与有声书叙述分别解决不同训练任务。
- 数据：8 个候选均于今日实查 Web.Cafe；Ahrefs 记为“默认跳过（用户未要求）”。可靠月搜索量均为 `unavailable`，不以站点流量或相对趋势推算月量。
- 内容边界：肢体性页只处理动作如何改变可听表现；可视化页只训练空间、物体与感官事实；喜剧节奏页只处理铺垫、停顿、转折与反应；角色切换页只训练两个已建立声音之间的可重复切换；有声书页只训练旁白视角、人物区分、长段落回忆与章节连续性。
- 版权与真实性：练习使用原创短句或用户自行选择的合法文本；不复制 SERP 页面、商业脚本或有声书正文；不承诺职业或排名结果。

## 今日 5 页

| 槽位 | 主关键词 | Web.Cafe KD | 计划 URL | 页面承诺 | 当前状态 |
|---:|---|---:|---|---|---|
| 1 | voice acting physicality exercises | 8.6（极易） | `/voice-acting-physicality-exercises/` | 用姿态、重心、手势与距离变化生成可听差异，再去除多余动作 | 本地完成 |
| 2 | voice acting visualization exercises | 0.1（极易） | `/voice-acting-visualization-exercises/` | 用空间、物体、感官事实与目标听众建立具体想象 | 本地完成 |
| 3 | voice acting comedy timing exercises | 16.2（极易） | `/voice-acting-comedy-timing-exercises/` | 分离铺垫、停顿、转折、笑点与反应，不把“搞笑声音”当技巧 | 本地完成 |
| 4 | voice acting character switching exercises | 10.0（极易） | `/voice-acting-character-switching-exercises/` | 用锚点、重置句、对比矩阵与盲测稳定切换两个角色 | 本地完成 |
| 5 | audiobook narration exercises | 10.2（极易） | `/audiobook-narration-exercises/` | 分离旁白与人物、追踪段落转折并维持章节连续性 | 本地完成 |

## 替补队列

| 替补 | 关键词 | Web.Cafe KD | 计划 URL | 当前处理 |
|---:|---|---:|---|---|
| 1 | animation voice acting exercises | 18.7（极易，API 标记 brand） | `/animation-voice-acting-exercises/` | 当前结果偏泛配音练习，精确动画任务证据不足，暂不单建 |
| 2 | voice acting relaxation exercises | 15.0（极易） | `/voice-acting-relaxation-exercises/` | 与既有热身、呼吸和冷却页重叠，暂不制造相近 canonical |
| 3 | voice acting pacing exercises | 26.9（容易，API 标记 brand） | `/voice-acting-pacing-exercises/` | 与既有 vocal timing 和 line delivery 页高度重叠，暂缓 |

## GeFei / Web.Cafe 摘要

| 关键词 | 盘面信号 | 质量引用域预算 | 决策 |
|---|---|---:|---|
| voice acting physicality exercises | Reddit 第 1，DR 12 与 DR 26 的弱站内页已进入前列 | 5–15 | do |
| voice acting visualization exercises | DR 7 页面第 1，DR 0 聚焦页进入前十，存在精确内容空缺 | 5 | do |
| voice acting comedy timing exercises | 结果以通用喜剧表演、论坛和课程为主，缺少配音训练流程 | 10–25 | do |
| voice acting character switching exercises | 结果混合角色创建与泛练习，缺少可测的双角色切换流程 | 5–15 | do |
| audiobook narration exercises | 当前结果偏热身、脚本库和入门建议，缺少章节连续性练习 | 5–15 | do |
| animation voice acting exercises | API 标记 brand，结果仍以泛配音练习为主 | 15–30 | replacement 1 |
| voice acting relaxation exercises | 与呼吸、热身、冷却意图混合 | 10–25 | replacement 2 |
| voice acting pacing exercises | API 标记 brand，且与既有时间/台词处理意图重叠 | 20–45 | replacement 3 |

原始结果：`docs/keyword-research/web-cafe-kd-2026-09-10.json`。8 个规范化关键词全部成功；首次批量请求在返回任何结果前超时，代理重试后 1 个缓存命中、7 个新结果。Ahrefs、SEM、SIM、Google Trends 均未调用。

## 外部闭环预检

- 昨日批次 `thechoicervoicer-20260909-five-preflight-v1` 后续被 runner 领取并终止为 `failed`，原因为生产首页原始 HTML 缺少登记的 GA4 Measurement ID。
- 已在中英文首页加入不触发追踪的声明型 `G-4SMXSDGLW2` 标记；动态加载、默认拒绝与用户同意机制保持不变。修复提交 `00e493d`，Pages 发布 `4636330`。
- 今日预检 `thechoicervoicer-20260910-five-preflight-v1` 已对上述 5 个英文 canonical 返回 `ready`。
- GSC `sc-domain:thechoicervoicer.me`、Bing 站点、GA4 属性 `p551708268` / stream `15504292780` / Measurement ID `G-4SMXSDGLW2` 均为 authenticated；代理 healthy；IndexNow key live。
- 预检时新页面尚未进入生产 sitemap，因此 `sitemapContainsCurrentSet=false` 符合发布前状态；最终执行前必须变为 true。

## 发布前闭环

- 10 个页面均需通过唯一 H1、独立 Title/Description、自 canonical、en/zh-Hans/x-default、可见面包屑、Article/BreadcrumbList/FAQPage schema 与源 HTML 内容检查。
- 英文与中文首页提供 5 个源 HTML 可见入口；正式 sitemap 新增 10 个 `lastmod=2026-09-10` URL。
- 本地 QA 已完成：Vitest 20/20；TypeScript 与 Vite 构建通过；Playwright 桌面/手机回归 14 通过、2 跳过；10 个新页面的 metadata、canonical、schema 与唯一 H1 检查全部通过；英文首页正文 1798 词，仍在 1200–1800 的既定范围内。
- 首轮唯一回归为英文首页正文从 1800 增至 1829 词；通过压缩既有导航说明降至 1798 词，未放宽质量阈值。
- 生产发布后逐 URL 验证 HTTP、canonical、H1、横向溢出和控制台；随后执行 GSC/Bing/IndexNow/GA4 闭环并记录严格 20 项评分。
