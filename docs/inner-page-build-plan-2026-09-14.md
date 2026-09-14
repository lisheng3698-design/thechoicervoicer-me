# The Choicer Voicer 内页建设计划（2026-09-14）

## 门禁与到期复查

- 无人值守 capability preflight `thechoicervoicer-20260914-capability-preflight-v1` 对站点身份 `sc-domain:thechoicervoicer.me`、GA4 property `551708268`、stream `15504292780`、measurement `G-4SMXSDGLW2` 和 10 个不可变生产 URL 返回 `ready`。
- 2026-09-13 批次的次日恢复已运行：GSC 10 个 URL 保留 indexed 证据，IndexNow 与 GA4 collect 成功证据未重复；Bing 仍为 quota，GA4 Realtime 仍需复查。系统已创建定向恢复批次，不重复手工提交。
- 2026-09-07 没有发布批次，因此今日没有对应的 7 日页面批次。

## 今日五个主页面

| 槽位 | 关键词 | Web.Cafe KD | canonical | 独立页面承诺 | 初始状态 |
|---:|---|---:|---|---|---|
| 1 | corporate narration exercises | 0（极易） | `/corporate-narration-exercises/` | 用批准信息、受众、层级、数字核验、行动落点和审校交接训练可信企业旁白 | 制作中 |
| 2 | announcer voice exercises | 17.8（极易） | `/announcer-voice-exercises/` | 用识别、开场、强调、短时限、纠错和重置训练简洁播报 | 制作中 |
| 3 | podcast voice exercises | 21.1（容易） | `/podcast-voice-exercises/` | 用思想组、拾音距离、自然重读、接话、补录和回听训练持续对话表达 | 制作中 |
| 4 | voice acting mouth noise exercises | 25.2（容易） | `/voice-acting-mouth-noise-exercises/` | 通过 A/B 录音定位嘴音、距离、角度、节奏和编辑边界；不做医疗诊断 | 制作中 |
| 5 | radio drama voice acting exercises | 28.7（容易） | `/radio-drama-voice-acting-exercises/` | 用纯音频空间、转身、轮次、道具、连续性和群戏提示训练可听场景 | 制作中 |

## 合格替补与观察池

| 顺位 | 关键词 | KD | 状态 | 理由 |
|---:|---|---:|---|---|
| 1 | trailer narration exercises | 21.5 | replacement | 只用原创材料训练节奏、转折和揭示，不复刻受保护预告片 |
| 2 | voice acting vocal texture exercises | 28.1 | replacement | 只用舒适变量建立质感，禁止强迫沙哑或疼痛 |
| 3 | guided meditation voice exercises | 32.3 | replacement | 只训练录音可懂度和提示节奏，不承诺健康效果 |
| 4 | voice acting diction exercises | 17.2 | observation | 与现有 articulation canonical 互抢，未证明独立意图 |
| 5 | animation voice acting exercises | 18.7 | observation | API 标记 brand，且与 character/video-game 页面边界不足 |

## GeFei / Web.Cafe 证据

- 今日 7 个规范化关键词各查询一次：7 成功、0 失败，其中 4 个命中 7 日缓存、3 个实时抓取。原始结果保存于 `docs/keyword-research/web-cafe-kd-2026-09-14.json`。
- 三个替补复用 `docs/keyword-research/web-cafe-kd-2026-09-13.json`；没有为重新展示重复调用。
- Ahrefs：默认跳过（用户未要求）。可靠月搜索量与趋势均 unavailable，不解释为 0。
- 主页面均属于普通内页建设任务；以 Web.Cafe 当前盘面中的论坛占位、弱 DR 结果、内页主导 SERP 和产品可交付性共同决定，而不是只按 KD 排序。

## 实现与发布门禁

- 每个英文 canonical 同步完整简体中文镜像，保持唯一 Title/Description、单 H1、自引用 canonical、双语 hreflang、index/follow、源 HTML 可见专属正文、六项原创练习、可判定标准、FAQ、Article/Breadcrumb/FAQ Schema、首页/父页与真实 sibling 内链。
- 更新 Vite 多页输入、双语首页、sitemap truthful lastmod、source tests 与 E2E 路由矩阵。
- 发布前通过 Vitest、TypeScript/Vite build、JSON-LD/XML、链接、桌面和移动 QA；上线后逐页复用保存的 GeFei 证据并执行 20 项独立评分，只有 100/100 才计入今日五页。
