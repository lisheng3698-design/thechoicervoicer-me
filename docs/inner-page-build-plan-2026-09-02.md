# The Choicer Voicer 内页建设计划（2026-09-02）

## 今日选择规则

- 目标：5 个英文主 canonical，并同步建设 5 个中文对应页；保留 3 个替补。
- 去重：排除首页与既有 `/games/`、`/app/`、`/how-to-play/`、`/mobile/`、`/voice-packs/`、`/microphone-not-working/`、`/is-it-safe/`、`/alternatives/`、`/gameplay/`、`/multiplayer/` 已承接意图。
- 风险隔离：继续排除下载、破解、第三方角色、虚假远程联机、未实现 mod/pack 编辑器与未完成的语言本地化页面。
- 数据：8 个新候选均实查 Web.Cafe；Ahrefs 为“默认跳过（用户未要求）”。Web.Cafe 未返回搜索量时保留 `unavailable`，不推算。
- 页面形态：今天新增的是练习、热身与聚会决策页；不把内容页写成不存在的互动工具。

## 今日 5 页

| 槽位 | 主关键词 | Web.Cafe KD | 计划 URL | 页面承诺 | 初始状态 |
|---:|---|---:|---|---|
| 1 | pitch matching exercises | 0.5（very easy） | `/pitch-matching-exercises/` | 不要求绝对音准的音高方向、滑音和短句轮廓练习 | 制作中 |
| 2 | vocal timing exercises | 1.8（very easy） | `/vocal-timing-exercises/` | 起音、停顿、时长、节拍与回放的口语节奏练习 | 制作中 |
| 3 | voice games for parties | 3.3（very easy） | `/voice-games-for-parties/` | 适合 2–4 人同室游玩的语音游戏清单与本站 Group 模式说明 | 制作中 |
| 4 | voice imitation exercises | 9.6（very easy） | `/voice-imitation-exercises/` | 从节奏、能量、音高到角色变化的七项递进练习 | 制作中 |
| 5 | voice acting warm up exercises | 13.6（very easy） | `/voice-acting-warm-ups/` | 约八分钟的呼吸、咬字、共鸣和舒适音域热身 | 制作中 |

## 替补队列

| 替补 | 关键词 | Web.Cafe KD | 计划 URL | 当前处理 |
|---:|---|---:|---|---|
| 1 | how to imitate voices | 26.5（easy） | `/how-to-imitate-voices/` | 与 voice imitation exercises 接近；主页面无法分化时再启用 |
| 2 | microphone games | 34.7（easy） | `/microphone-games/` | 泛游戏清单意图较宽，需避免与 `/games/` 重复 |
| 3 | voice acting games | 23.6（easy） | `/voice-acting-games/` | Web.Cafe volume 280；需完成低量 Google Trends + GPTs 校准后再升级 |

## GeFei 记录摘要

| 关键词 | 词类 | 盘面信号 | 质量外链预算 | 页面决策 |
|---|---|---|---:|---|
| pitch matching exercises | generic | Reddit 在第 3；弱站第 1，存在专门练习页机会 | 5 | do |
| vocal timing exercises | generic | Reddit 在第 2；弱内页与非专门结果占位 | 5 | do |
| voice games for parties | generic | 论坛与脆弱体验结果并存，弱站内页可进前十 | 5 | do |
| voice imitation exercises | generic | Reddit 第 1；DR 8 专门内页可进入前十 | 5–15 | do |
| voice acting warm up exercises | generic | Reddit 第 1；弱站且低体验专门页可替代 | 10–20 | do |
| how to imitate voices | generic | Reddit 第 1；与今日练习页存在语义重叠 | 20–45 | replacement 1 |
| microphone games | generic | 存在正面专门页竞争，意图过宽 | 30–70 | replacement 2 |
| voice acting games | generic | Web.Cafe volume 280，已有 4 个专门结果 | 20–40 | replacement 3 / demand gap |

原始结果：`docs/keyword-research/web-cafe-kd-2026-09-02.json`。

## 外部闭环预检

- 共享 broker 当前有其他项目 `running` 与 `queued`；本项目不抢占、不清队列、不启动第二个 runner。
- 收录助手固定 `host_permissions` 仍未登记 `https://thechoicervoicer.me/*`，且此时重载扩展会干扰正在运行的其他项目，因此不修改共享扩展状态。
- 网站构建、部署、生产 QA 与 IndexNow 可独立继续；GSC、Bing 与 GA4 Realtime 只记录实际回执。
