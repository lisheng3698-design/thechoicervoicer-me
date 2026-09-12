# The Choicer Voicer 内页建设计划（2026-09-12）

## 今日目标与边界

- 建设 5 个英文主 canonical，并同步建设 5 个中文镜像；保留 3 个已实查替补。
- 8 个规范化关键词均在 2026-09-12 通过 Web.Cafe 查询并保存原始结果；Ahrefs 记为“默认跳过（用户未要求）”。可靠月搜索量和趋势均为 `unavailable`，不推算为 0。
- 与关键词池、现有 route、页面 H2/H3 和历史替补去重。目标页训练“如何表演”，脚本分析页继续训练“如何标记文本”；利害页训练代价与后果，不复制情绪强度页；ADR 只使用原创提示，不引用受版权保护的影视对白。
- 当前持久 broker 健康、队列为空；昨日同站精确恢复批次已证明终端/API 触发、幂等账本、FIFO、GSC/Bing/IndexNow/GA4 身份隔离可用。今日精确 canonical preflight 将在候选生产 URL 与 live sitemap 可验证后执行。

## 今日 5 个主页面

| 槽位 | 关键词 | Web.Cafe KD | canonical | 独立页面承诺 | 初始状态 |
|---:|---|---:|---|---|---|
| 1 | voice acting objective exercises | 8.6（极易） | `/voice-acting-objective-exercises/` | 用目标、阻碍、策略和听众反馈训练可玩的行动；与脚本标记页分工 | 制作中 |
| 2 | voice acting stakes exercises | 22.9（容易） | `/voice-acting-stakes-exercises/` | 用失去什么、截止点、无行动后果和升级阶梯建立压力，不用泛化情绪替代利害 | 制作中 |
| 3 | voice acting taking direction exercises | 16.8（极易） | `/voice-acting-taking-direction-exercises/` | 把模糊导演用语翻译成一次可听、可比较、可复现的变化 | 制作中 |
| 4 | ADR voice acting exercises | 15.6（极易） | `/adr-voice-acting-exercises/` | 训练三声提示、入点、口型长度、场景连续性与 pickup 匹配 | 制作中 |
| 5 | e-learning narration exercises | 2.9（极易） | `/e-learning-narration-exercises/` | 训练教学分块、术语、列表逻辑、屏幕动作等待和无歧义纠错 | 制作中 |

## 替补队列

| 顺位 | 关键词 | Web.Cafe KD | canonical | 处理 |
|---:|---|---:|---|---|
| 1 | documentary narration exercises | 16.5（极易） | `/documentary-narration-exercises/` | 可交付的媒介专页；五个主页面失败时启用 |
| 2 | video game voice acting exercises | 15.5（极易） | `/video-game-voice-acting-exercises/` | 可交付的分支提示、bark 与上下文训练；用力声需沿用安全边界 |
| 3 | voice acting sibilance exercises | 20.7（容易，API 标记 brand） | `/voice-acting-sibilance-exercises/` | 平台型结果密集；仅在需要时按齿音诊断/录音控制技术页启用 |

## GeFei / Web.Cafe 决策摘要

| 关键词 | 当前 SERP 机会 | 质量引用域预算 | 结论 |
|---|---|---:|---|
| objective exercises | Reddit 第 2，DR 4 弱站第 3；Top 9 无专门页 | 5–15 | do；限定为可听行动与策略切换 |
| stakes exercises | Reddit 第 4，全部为内页，缺少 voice-specific 量化流程 | 20–40 | do；与 emotion/status 分界 |
| taking direction exercises | Reddit 第 2，DR 17 弱站进入前列，结果多为泛练习 | 15–25 | do；交付导演备注翻译卡 |
| ADR exercises | Reddit 第 3，DR 2 页面第 5，专门练习页缺口明显 | 10–25 | do；原创提示与同步门禁 |
| e-learning narration exercises | Reddit 第 8，DR 23 页面第 2；现有结果多为行业指南 | 5 | do；用教学理解测试代替泛旁白建议 |
| documentary narration exercises | Reddit 第 4，DR 20 结果进入前十 | 10–25 | replacement 1 |
| video game voice acting exercises | Reddit 第 2，DR 9 结果第 7；结果多为职业指南 | 10–25 | replacement 2 |
| sibilance exercises | 技术问题意图存在，但 Web.Cafe 因平台结果密集标记 brand | 15–35 | replacement 3 |

原始证据：`docs/keyword-research/web-cafe-kd-2026-09-12.json`。Web.Cafe 8 次成功、0 失败、0 缓存；Ahrefs、SEM、SIM、Google Trends 均未调用。

## 共享组件风险与门禁

- 10 个页面复用稳定的静态页面样式与 `src/site.ts`，但每页保留独立 Title、Description、H1、六项练习、FAQ、schema 和内部链接。
- 英文/中文首页、Vite 多页输入、sitemap、source tests、E2E route matrix 同步更新，防止共享漏链或构建遗漏。
- 候选版需通过 Vitest、TypeScript/Vite build、HTML/JSON-LD/XML 解析、标题/描述去重、每页六项练习、首页字数、桌面/手机浏览器检查和生产 200/self-canonical 门禁。
- 首次生产发布后复用今日 Web.Cafe 证据做 post-live GeFei 复核；五页分别跑 20 项评分，低于 100/100 时自动修正、重测、重发。
