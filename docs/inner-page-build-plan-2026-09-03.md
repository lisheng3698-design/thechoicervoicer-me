# The Choicer Voicer 内页建设计划（2026-09-03）

## 今日选择规则

- 目标：5 个英文主 canonical，并同步建设 5 个中文对应页；保留 3 个替补。
- 去重：截图中的品牌、game、app、free、online 和拼写变体已由首页、`/games/`、`/app/` 等既有页面承接，不再新建重复 canonical。
- 意图边界：声音投射解决“把清楚台词送到远处”；声音调节解决“可控改变音高、语速、停顿、能量和重音”；咬字解决“文字可懂度”；角色声音解决“建立可重复声音配方”；呼吸控制解决“意群与换气规划”。
- 数据：8 个候选全部实查 Web.Cafe；Ahrefs 记为“默认跳过（用户未要求）”。未返回搜索量时保留 `unavailable`，不推算。
- 低量校准：`voice projection exercises` 的 Web.Cafe 月量为 130；Google Trends 美国过去 12 个月与 GPTs 同图比较时曲线低于可见尺度，因此作为高度相关的小众词建设，不把相对趋势写成额外搜索量。
- 页面形态：练习与决策内容全部源代码可见，不声称提供不存在的诊断、远程联机或服务。

## 今日 5 页

| 槽位 | 主关键词 | Web.Cafe KD | 计划 URL | 页面承诺 | 初始状态 |
|---:|---|---:|---|---|---|
| 1 | voice projection exercises | 1.2（极易） | `/voice-projection-exercises/` | 六步房间距离练习，强调清晰传远而非喊叫 | 已上线 |
| 2 | voice modulation exercises | 10.3（极易） | `/voice-modulation-exercises/` | 一次只改变音高、语速、停顿、能量或重音 | 已上线 |
| 3 | articulation exercises for voice acting | 11.4（极易） | `/articulation-exercises-for-voice-acting/` | 从音素、词尾和组合进入自然场景台词 | 已上线 |
| 4 | character voice exercises | 11.7（极易） | `/character-voice-exercises/` | 用三项可观察变量建立可重复角色声音配方 | 已上线 |
| 5 | breath control exercises for voice acting | 24.0（容易） | `/breath-control-exercises-for-voice-acting/` | 不强迫憋气的意群、气流和恢复换气流程 | 已上线 |

## 替补队列

| 替补 | 关键词 | Web.Cafe KD | 计划 URL | 当前处理 |
|---:|---|---:|---|---|
| 1 | vocal energy exercises | 8.4（极易） | `/vocal-energy-exercises/` | 与声音投射及既有热身页局部重叠；主页面无法分化时再启用 |
| 2 | voice acting exercises for beginners | 15.1（极易） | `/voice-acting-exercises-for-beginners/` | 泛入门合集意图，与现有多篇练习页形成主题重叠 |
| 3 | diction exercises for voice acting | 27.2（容易） | `/diction-exercises-for-voice-acting/` | 与今日咬字 canonical 高度接近，不单独建设 |

## GeFei 记录摘要

| 关键词 | 词类 | SERP / 盘面信号 | 质量外链预算 | 页面决策 |
|---|---|---|---:|---|
| voice projection exercises | generic | Reddit 第 2；弱站第 1；月量 130 | 5 | do / low-volume calibrated |
| voice modulation exercises | generic | Reddit 第 2；DR 7 弱站内页可进前十 | 5–15 | do |
| articulation exercises for voice acting | generic | Reddit 第 1；DR 0 弱站占位 | 10–20 | do |
| character voice exercises | generic | Reddit 第 3；全部为内页且无专门主力词 | 10–20 | do |
| breath control exercises for voice acting | generic | Reddit 第 3；DR 0 弱站内页可进前十 | 20–40 | do |
| vocal energy exercises | generic | 弱站可进入前十，但与投射/热身主题相近 | 5–15 | replacement 1 |
| voice acting exercises for beginners | generic | Reddit 第 1；泛合集意图与本站练习集重叠 | 10–25 | replacement 2 |
| diction exercises for voice acting | generic | Reddit 第 3；与 articulation 同属清晰表达 | 20–50 | replacement 3 |

原始结果：`docs/keyword-research/web-cafe-kd-2026-09-03.json`。

## 外部闭环预检

- 收录助手已新增 The Choicer Voicer 注册项目与固定站点权限；助手测试 82/82、并发专项 5/5 通过。
- 共享 broker 预检时为空闲；不清理、不抢占其他项目队列。
- GA4 Measurement ID 已由仓库核实为 `G-4SMXSDGLW2`；属性与数据流编号只采用控制台可见证据，不推测。

## 发布结果

- 主分支内容提交：`224bfcd`。
- GitHub Pages 发布：`9bec137`。
- 5 个英文 canonical 与 5 个中文对应页全部返回 `200`；生产桌面/手机专项 QA 20/20 通过。
- IndexNow 对 10 个 URL 一次提交，HTTP `200`。
- 10 个生产页面的 GA4 `page_view` 均发送到 `G-4SMXSDGLW2` 并返回 HTTP `204`。
- 严格评分均为 95/100；唯一缺项是 GA4 Realtime/DebugView 的账号侧可见证据，第 19 项保留 `Blocked`。
