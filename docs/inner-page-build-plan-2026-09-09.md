# The Choicer Voicer 内页建设计划（2026-09-09）

## 今日选择规则

- 目标：建设 5 个英文主 canonical，并同步建设 5 个中文对应页；另保留 3 个已核验替补词。
- 去重：已与 `docs/keyword-pool.csv`、30 个既有英文搜索意图页和历史替补队列比对。冷读、潜台词、台词处理、声音耐力和口音研究分别解决不同任务。
- 数据：8 个候选均于今日实查 Web.Cafe；Ahrefs 记为“默认跳过（用户未要求）”。全部候选的可靠月搜索量均为 `unavailable`，不以站点流量或相对趋势推算月量。
- 内容边界：潜台词页解释未说出口的思想与关系压力；台词处理页只控制起音、重点、停顿、语速、句尾和距离；声音耐力页采用保守负荷与停止信号，不提供诊断或治疗；口音页要求多位真实说话者、窄目标与反刻板检查。
- 版权与真实性：练习使用原创短句或用户自行选择的合法文本；不复制 SERP 页面、商业脚本或口音档案音频；不承诺职业、排名或健康结果。

## 今日 5 页

| 槽位 | 主关键词 | Web.Cafe KD | 计划 URL | 页面承诺 | 当前状态 |
|---:|---|---:|---|---|---|
| 1 | voice acting cold reading exercises | 6.7（极易） | `/voice-acting-cold-reading-exercises/` | 45 秒扫稿、视线领先、不停下纠错与单变量重录 | 本地完成 |
| 2 | voice acting subtext exercises | 0（极易） | `/voice-acting-subtext-exercises/` | 把字面台词、内心句子、关系压力和转折变成可听证据 | 本地完成 |
| 3 | voice acting line delivery exercises | 13.0（极易） | `/voice-acting-line-delivery-exercises/` | 用同一句台词逐一控制六个可观察变量 | 本地完成 |
| 4 | voice acting vocal stamina exercises | 20.1（容易） | `/voice-acting-vocal-stamina-exercises/` | 用发声区块、安静休息、退出检查和负荷记录保守练习 | 本地完成 |
| 5 | voice acting accent exercises | 13.6（极易） | `/voice-acting-accent-exercises/` | 用真实说话者语料、特征图、短循环和反刻板检查学习 | 本地完成 |

## 替补队列

| 替补 | 关键词 | Web.Cafe KD | 计划 URL | 当前处理 |
|---:|---|---:|---|---|
| 1 | voice acting partner exercises | 0（极易） | `/voice-acting-partner-exercises/` | 与既有聆听、即兴和对话练习重叠，暂不单建 |
| 2 | voice acting focus exercises | 9.8（极易） | `/voice-acting-focus-exercises/` | 当前 SERP 更偏泛练习与热身，查询意图不足以独立承诺 |
| 3 | voice acting character consistency exercises | 23.6（容易） | `/voice-acting-character-consistency-exercises/` | 与既有 `/character-voice-exercises/` 同一角色复现意图，合并而非建重复页 |

## GeFei / Web.Cafe 摘要

| 关键词 | 盘面信号 | 质量引用域预算 | 决策 |
|---|---|---:|---|
| voice acting cold reading exercises | Reddit 第 1，DR 17 聚焦内页可进前列，精确练习存在内容空缺 | 5–10 | do |
| voice acting subtext exercises | 结果偏泛表演潜台词，没有精确的配音练习页 | 未返回 | do |
| voice acting line delivery exercises | 论坛第 1，结果混合戏剧教学与泛配音内容 | 10–20 | do |
| voice acting vocal stamina exercises | Reddit、Quora 占据前列，弱站内页可进入前十 | 15–35 | do（安全边界） |
| voice acting accent exercises | Reddit 第 1，DR 7 聚焦页可进入前列 | 10–20 | do（真实语料） |
| voice acting partner exercises | 结果偏泛排练、热身和双人活动 | 未返回 | replacement 1 |
| voice acting focus exercises | 结果偏 Practice Out Loud 与泛练习 | 5–15 | replacement 2 |
| voice acting character consistency exercises | 与既有角色声音页高度同义 | 20–40 | merge / replacement 3 |

原始结果：`docs/keyword-research/web-cafe-kd-2026-09-09.json`。

## 外部闭环预检

- 收录助手批次：`thechoicervoicer-20260909-five-preflight-v1`。
- 精确 canonical：上述 5 个英文 URL；不把中文镜像、替补词或全 sitemap 混入 GSC 优先队列。
- GA4：已从账号选择器确认 The Choicer Voicer 属性 `p551708268`，Web stream `15504292780`，Measurement ID `G-4SMXSDGLW2`。
- IndexNow：项目上下文已识别现有 key 文件。
- 当前状态：预检已排入共享队列，入队时位置 4；保留其他项目任务，不清队列、不启动第二个 runner。

## 发布前闭环

- 10 个页面均需通过唯一 H1、独立 Title/Description、自 canonical、en/zh-Hans/x-default、可见面包屑、Article/BreadcrumbList/FAQPage schema 与源 HTML 内容检查。
- 英文与中文首页提供 5 个源 HTML 可见入口；正式 sitemap 新增 10 个 `lastmod=2026-09-09` URL。
- Vitest、TypeScript、构建与桌面/手机 Playwright 通过后发布。
- 生产发布后逐 URL 验证 HTTP、canonical、H1、横向溢出和控制台；随后执行 GSC/Bing/IndexNow/GA4 闭环并记录严格 20 项评分。
