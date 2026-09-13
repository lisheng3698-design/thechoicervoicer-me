# The Choicer Voicer 内页建设计划（2026-09-13）

## 今日目标与边界

- 锁定 5 个英文主 canonical，并同步建设 5 个完整中文镜像；另保留 3 个已实查、可直接启用的合格替补。
- `documentary narration exercises` 与 `video game voice acting exercises` 复用 2026-09-12 的 Web.Cafe 原始证据（未超过 7 天）；其余 6 个合格候选于 2026-09-13 各查询一次并保存原始结果。Ahrefs 统一记为“默认跳过（用户未要求）”。可靠月搜索量和趋势均为 `unavailable`，不把缺失值解释为 0。
- 第一组十词批量查询在客户端超时前未写出结果。为避免重复付费查询，不重跑该批次；其中 `podcast voice exercises` 与 `corporate narration exercises` 仅作为数据缺口观察项，不进入今日决策。
- 与既有 route、关键词池和页面主题去重：documentary 负责证据与归因；video game 负责分支提示、bark 和安全用力声；sports commentary 负责实时事件与准确性；explainer 负责把产品因果讲清；medical 负责受控术语、读法和审校，不提供医疗建议。
- 持久 broker 的今日幂等 capability preflight 已于 2026-09-13 达到 `ready`，确认 GSC、Bing、GA4 身份及代理可用，满足无人值守锁词门禁。

## 今日 5 个主页面

| 槽位 | 关键词 | Web.Cafe KD | canonical | 独立页面承诺 | 初始状态 |
|---:|---|---:|---|---|---|
| 1 | medical voice over exercises | 5.5（极易） | `/medical-voice-over-exercises/` | 用批准术语表、分块、数值双检、警示层级与审校交接训练准确表达；明确不替代临床判断 | 制作中 |
| 2 | explainer video voice over exercises | 12.9（极易） | `/explainer-video-voice-over-exercises/` | 把问题、机制、操作与结果压缩成可看懂的一条因果路径 | 制作中 |
| 3 | video game voice acting exercises | 15.5（极易） | `/video-game-voice-acting-exercises/` | 训练分支上下文、bark 变化、状态连续性与低强度动作声；禁止疼痛和模仿受保护表演 | 制作中 |
| 4 | documentary narration exercises | 16.5（极易） | `/documentary-narration-exercises/` | 训练事实层级、来源归因、不确定性、时间线与画面留白，不虚构事实 | 制作中 |
| 5 | sports commentary voice exercises | 19.5（极易） | `/sports-commentary-voice-exercises/` | 训练观察—识别—后果顺序、比分核验、重置和即时回放，不编造统计 | 制作中 |

## 合格替补队列

| 顺位 | 关键词 | Web.Cafe KD | canonical | 可交付边界 |
|---:|---|---:|---|---|
| 1 | trailer narration exercises | 21.5（容易，API 标记 brand） | `/trailer-narration-exercises/` | 只做原创训练材料的节奏、转折与信息揭示练习，不复刻受保护预告片或声音 |
| 2 | voice acting vocal texture exercises | 28.1（容易） | `/voice-acting-vocal-texture-exercises/` | 用共鸣位置、辅音、节奏和气流等舒适变量建立质感；禁止挤压、沙哑追求和疼痛 |
| 3 | guided meditation voice exercises | 32.3（容易） | `/guided-meditation-voice-exercises/` | 只训练录音可懂度、空间和提示节奏，不承诺治疗、睡眠或健康结果 |

## GeFei / Web.Cafe 决策摘要

| 关键词 | 当前 SERP 机会 | 质量引用域预算 | 结论 |
|---|---|---:|---|
| medical voice over exercises | KD 5.5；弱结果 DR 12，专门练习页缺口明显 | 5–10 | do；强制批准术语与内容所有者审校门禁 |
| explainer video voice over exercises | KD 12.9；弱结果 DR 0 | 10–20 | do；围绕视觉—旁白分工与因果可懂度 |
| video game voice acting exercises | Reddit 第 2，DR 9 结果进入前十 | 10–25 | do；媒介专用训练并加入明确用嗓安全边界 |
| documentary narration exercises | Reddit 第 4，DR 20 结果进入前十 | 10–25 | do；用来源账本、归因和不确定性建立差异 |
| sports commentary voice exercises | KD 19.5；弱结果 DR 5 | 15–30 | do；只评论可观察事件与已核验统计 |
| trailer narration exercises | KD 21.5；弱结果 DR 9；API 因导航混合标记 brand | 15–35 | replacement 1；只承诺原创练习页 |
| voice acting vocal texture exercises | Reddit 第 2，弱结果 DR 16 | 25–50 | replacement 2；需执行舒适变量与停止规则 |
| guided meditation voice exercises | KD 32.3；当前最弱盘面 DR 63 | 30–60 | replacement 3；竞争较高且需非医疗声明 |

原始证据：`docs/keyword-research/web-cafe-kd-2026-09-12.json` 与 `docs/keyword-research/web-cafe-kd-2026-09-13.json`。今日落盘批次 6 次成功、0 失败、0 缓存；前一未落盘批次只记为客户端超时，不据此作数值判断。

## 滚动队列与门禁

- 主词 5 个、合格替补 3 个、数据缺口观察项 2 个，共 10 项滚动队列。
- 页面必须具备唯一 Title、Description、H1、六项可执行练习、可见评分标准、FAQ、Article/Breadcrumb/FAQ schema、自指 canonical、双语 hreflang、首页和同主题内链。
- 修改英文/中文首页、Vite 多页输入、sitemap、source tests 与 E2E route matrix；先通过 Vitest、TypeScript/Vite build、JSON-LD/XML、桌面和手机浏览器检查，再发布。
- 上线后复用已保存 Web.Cafe 证据，逐页执行独立 20 项评分；每页必须达到 100/100 后才进入 GSC/Bing/IndexNow/GA4 最终闭环。
