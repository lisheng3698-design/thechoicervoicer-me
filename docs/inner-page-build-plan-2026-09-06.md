# The Choicer Voicer 内页建设计划（2026-09-06）

## 今日选择规则

- 目标：建设 5 个英文主 canonical，并同步提供 5 个中文对应页；保留 5 个已核验替补词。
- 去重：先与 `docs/keyword-pool.csv`、25 个既有英文搜索意图页和历史替补队列比对。品牌、online、free、app、game、download、scripts、warm-ups 与既有 exercises 变体继续由原 canonical 承接。
- 意图边界：脚本分析页负责标注节拍、目标和转折；商业配音页负责受众、收益点、时长和自然读法；麦克风技术页负责距离、角度、爆破音和一致性；自我复盘页负责录音评分和下一遍单变量修正；聆听页负责接收搭档线索和复述后再回应。
- 数据：10 个候选均于今日实查 Web.Cafe；Ahrefs 记为“默认跳过（用户未要求）”。全部候选的可靠搜索量均为 `unavailable`，不把流量、站点访问或相对趋势推算成月量。
- 安全与真实性：不复制受版权限制的商业稿件，不承诺职业结果，不把一般录音技巧写成设备或健康保证；所有练习均可离线完成，不上传用户音频。

## 今日 5 页

| 槽位 | 主关键词 | Web.Cafe KD | 计划 URL | 页面承诺 | 当前状态 |
|---:|---|---:|---|---|---|
| 1 | voice acting script analysis | 21.4（容易） | `/voice-acting-script-analysis/` | 用五步标注法找出听众、目标、节拍、关键词和转折 | 制作中 |
| 2 | commercial voice acting exercises | 3.2（极易） | `/commercial-voice-acting-exercises/` | 用原创商业短稿练受众、收益点、时长和自然表达 | 制作中 |
| 3 | voice acting microphone technique | 1.1（极易） | `/voice-acting-microphone-technique/` | 用距离、角度、音量和爆破音测试建立稳定收音位置 | 制作中 |
| 4 | voice acting self critique | 8.0（极易） | `/voice-acting-self-critique/` | 用五项量表复盘录音，并在下一遍只改一个变量 | 制作中 |
| 5 | voice acting listening exercises | 1.4（极易） | `/voice-acting-listening-exercises/` | 用复述、关键词回声和线索响应训练主动聆听 | 制作中 |

## 替补队列

| 替补 | 关键词 | Web.Cafe KD | 计划 URL | 当前处理 |
|---:|---|---:|---|---|
| 1 | voice acting narration exercises | 16.1（极易） | `/voice-acting-narration-exercises/` | SERP 同时混入热身、发音和泛练习；待进一步收紧旁白意图 |
| 2 | voice acting storytelling exercises | 6.1（极易） | `/voice-acting-storytelling-exercises/` | 与旁白、情绪和调制页面存在局部重叠，暂不单建 |
| 3 | voice acting dialogue exercises | 15.2（极易） | `/voice-acting-dialogue-exercises/` | SERP 主要是脚本库，与既有练习脚本 canonical 高度接近 |
| 4 | voice acting scene study | 10.9（极易） | `/voice-acting-scene-study/` | 当前 SERP 偏课程与泛表演场景课，和脚本分析意图不够分离 |
| 5 | voice over microphone technique | 6.1（极易） | `/voice-over-microphone-technique/` | 与选中的 voice acting microphone technique 为同一意图，合并 |

## GeFei / Web.Cafe 摘要

| 关键词 | 盘面信号 | 质量引用域预算 | 决策 |
|---|---|---:|---|
| voice acting script analysis | Top 7 均为内页，DR 26 与 DR 29 的聚焦内容可进入前列 | 15–35 | do |
| commercial voice acting exercises | SERP 多为泛练习、脚本库和论坛，精确内容稀缺 | 5 | do |
| voice acting microphone technique | Reddit 第 3，DR 24 聚焦内页进入前二 | 5 | do |
| voice acting self critique | Reddit 占据前列，结果混合批评、试音和泛课程 | 5–10 | do |
| voice acting listening exercises | Reddit 第 4，DR 16 弱站第 3，没有精确专页经营 | 5 | do |
| voice acting narration exercises | 结果意图分散到热身、发音和泛练习 | 10–25 | replacement 1 |
| voice acting storytelling exercises | 结果混合故事表达、调制和旁白 | 5–10 | replacement 2 |
| voice acting dialogue exercises | 结果以脚本与固定文本为主 | 10–25 | merge / replacement 3 |
| voice acting scene study | SERP 偏课程与泛表演 scene study | 5–15 | replacement 4 |
| voice over microphone technique | 与选中麦克风技术词为同义意图 | 5–10 | merge / replacement 5 |

原始结果：`docs/keyword-research/web-cafe-kd-2026-09-06.json`。

## 发布前闭环

- 10 个页面均需通过唯一 H1、Title、Description、自 canonical、双语 hreflang、可见面包屑、Article/BreadcrumbList/FAQPage schema 与站内链接检查。
- 英文与中文首页需为 5 个新意图提供源 HTML 可见入口；正式 sitemap 需新增 10 个 `lastmod=2026-09-06` URL。
- 本地 Vitest、TypeScript、构建、桌面/手机 Playwright 通过后才可发布。
- 发布后逐 URL 检查 HTTP、canonical、H1、图片、横向溢出与控制台，并提交 IndexNow、记录 GA4 transport 与账号侧证据状态。
