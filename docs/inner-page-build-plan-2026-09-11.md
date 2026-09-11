# The Choicer Voicer 内页建设计划（2026-09-11）

## 今日选择规则

- 目标：建设 5 个英文主 canonical，并同步建设 5 个中文对应页；另保留 3 个实查替补词。
- 去重：已与 `docs/keyword-pool.csv`、现有英文搜索意图页及历史替补比对。地位页只处理关系中的许可与权力移动；记忆页只处理意义、提示词、补录与连续性回忆；角色关系页只处理共同历史和具体对手；反应页只处理收到提示后的思想变化与后果；用力声页只处理低强度非语言动作声及停止规则。
- 数据：8 个候选均于今日实查 Web.Cafe；Ahrefs 记为“默认跳过（用户未要求）”。可靠月搜索量均为 `unavailable`，不把域名流量或相对趋势改写成月搜索量。
- 内容边界：所有练习使用原创短句或用户有权使用的文本；不复制 SERP 页面、商业脚本或受保护台词；不承诺职业、健康或排名结果。

## 今日 5 页

| 槽位 | 主关键词 | Web.Cafe KD | 计划 URL | 页面承诺 | 当前状态 |
|---:|---|---:|---|---|---|
| 1 | voice acting status exercises | 9.4（极易） | `/voice-acting-status-exercises/` | 用许可、时间占有、打断与转折让关系权力可听见，不把高低地位等同音量或身份 | 本地候选版通过 |
| 2 | voice acting memory exercises | 14.2（极易） | `/voice-acting-memory-exercises/` | 训练事件、提示词、选择、补录与隔日连续性，并强制对照来源核验文字 | 本地候选版通过 |
| 3 | voice acting character relationship exercises | 13.0（极易） | `/voice-acting-character-relationship-exercises/` | 用共同历史、距离、共享秘密、信任与伙伴行为建立具体连接 | 本地候选版通过 |
| 4 | voice acting reaction exercises | 17.9（极易） | `/voice-acting-reaction-exercises/` | 分离预期、事件、处理延迟和后果，避免自动叹气或倒吸气 | 本地候选版通过 |
| 5 | voice acting effort sounds exercises | 24.2（容易，API 标记 brand） | `/voice-acting-effort-sounds-exercises/` | 在低强度和明确停止规则下训练抬举、转向、落地、轻冲击提示与恢复 | 本地候选版通过 |

## 替补队列

| 替补 | 关键词 | Web.Cafe KD | 计划 URL | 当前处理 |
|---:|---|---:|---|---|
| 1 | voice acting lip sync exercises | 22.1（容易） | `/voice-acting-lip-sync-exercises/` | SERP 前列主要解决动画口型制作而非配音训练，搜索意图错位，暂不单建 |
| 2 | voice acting vocal agility exercises | 20.8（容易） | `/voice-acting-vocal-agility-exercises/` | SERP 明显偏歌唱音阶，且与热身、调节和角色切换页重叠，暂缓 |
| 3 | voice acting breath phrasing exercises | 31.3（容易） | `/voice-acting-breath-phrasing-exercises/` | SERP 与站内呼吸控制页意图重合，不制造第二个近义 canonical |

## GeFei / Web.Cafe 摘要

| 关键词 | 盘面信号 | 质量引用域预算 | 决策 |
|---|---|---:|---|
| voice acting status exercises | Reddit 第 1，DR 22 的弱站内页进入前列，缺少配音化的可测流程 | 5–15 | do |
| voice acting memory exercises | 结果混合泛声音练习与演员 sense memory，DR 0 页面已进入前十 | 10–25 | do，限定为台词意义与连续性回忆 |
| voice acting character relationship exercises | 结果混合泛角色练习、论坛与 practice readings，缺少具体关系卡流程 | 10–20 | do |
| voice acting reaction exercises | 结果多为泛练习和论坛，DR 12 页面已进入前十 | 15–30 | do，限定 cue → change → consequence |
| voice acting effort sounds exercises | SERP 平台结果密集，API 标记 brand；仍能识别真实 efforts / exertion 任务 | 20–40 | do，采用保守强度与安全边界 |
| voice acting lip sync exercises | 前列为动画口型教程，页面型与本站配音训练不一致 | 15–35 | replacement 1 |
| voice acting vocal agility exercises | 前列为歌唱训练和泛声音练习 | 15–35 | replacement 2 |
| voice acting breath phrasing exercises | Voices / Backstage 呼吸内容占前列，与现有呼吸 canonical 重叠 | 25–60 | replacement 3 |

原始结果：`docs/keyword-research/web-cafe-kd-2026-09-11.json`。8 个规范化关键词全部成功，均为新鲜 SERP 结果；可靠 volume 与 trend 均 unavailable。Ahrefs、SEM、SIM、Google Trends 均未调用。

## 外部闭环诊断

- 先核对昨日幂等恢复批次 `thechoicervoicer-20260910-five-final-v1.retry-1`：截至今日早晨仍为 `queued / attempts=0`；同一 FIFO 中另有两个到期任务也未认领。
- broker `/health` 正常，保留原始队列、命令与结果；Chrome 在运行；安装的收录助手 2.0.2 已启用，manifest 含 `thechoicervoicer.me` 必需 host permission 与 alarms 权限。
- 现象指向扩展 service worker / persistent runner 未唤醒，不是页面、项目身份或 broker 数据缺陷。没有杀 broker、没有重复入队、没有重复成功的 GSC / IndexNow / GA4 动作。
- 浏览器安全策略拒绝只读打开扩展管理页，未使用 extension URL、CDP 或其他绕行。今天的最终外部闭环只有在原队列恢复并通过新的精确 preflight 后才能记为完成；否则按 adapter blocker 如实封账。

## 本地候选版门禁

- 10 个页面均有唯一 H1、独立 Title/Description、自 canonical、en/zh-Hans/x-default、可见面包屑、Article/BreadcrumbList/FAQPage schema，以及源 HTML 中的六项练习、判定标准、边界、迁移与 FAQ。
- 英文与中文首页各新增 5 个源 HTML 可见入口；sitemap 新增 10 个 `lastmod=2026-09-11` URL。
- Vitest 20/20；TypeScript 与 Vite 构建通过；10 个新页面的 JSON-LD 与 sitemap XML 解析通过；英文首页正文 1798 词，仍在既定 1200–1800 范围内。
- Playwright 首轮为 12 passed、2 failed、2 skipped：一个既有桌面音频流程等待参考音频时偶发超时；新增路由后移动端全量导览超过原 30 秒预算。保持断言不变，把全量导览预算调整为 60 秒；两个失败用例定向重跑通过，随后单 worker 完整回归 14 passed、2 skipped。

## 发布后要求

- 首轮生产候选版逐 URL 验证后，再用已保存的 Web.Cafe 意图、页型、KD 与内容角度做 post-live GeFei 复核。
- 五页分别跑 20 项评分，低于 100/100 就自动修正、重测、重发；只有生产 URL 返回 200、得分 100、外部状态分栏落盘后才计入今日最终五页。
