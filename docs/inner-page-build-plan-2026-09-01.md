# The Choicer Voicer 内页建设计划（2026-09-01）

## 今日选择规则

- 目标：5 个最终成功 canonical，并保留 3 个替补。
- 去重：排除首页、`/games/`、`/app/`、`/how-to-play/`、`/mobile/`、`/voice-packs/` 已承接的品牌、free、online、browser-app、基础教程与内容包意图。
- 数据：复用 2026-08-31 已保存的 multiplayer/gameplay Web.Cafe 结果；只查询 6 个新意图。截图数字继续标为“截图指标”，不冒充已验证月搜索量。
- KD：采用 Web.Cafe；Ahrefs 为“默认跳过（用户未要求）”。
- 产品边界：本站只提供浏览器版本、同设备 1–4 人、本地麦克风处理和原创/已授权内容；不暗示远程联机、原生下载或第三方背书。

## 今日 5 页

| 槽位 | 主关键词 | Web.Cafe KD | 计划 URL | 页面承诺 | 初始状态 |
|---:|---|---:|---|---|---|
| 1 | the choicer voicer mic not working | 25.1（easy） | `/microphone-not-working/` | 浏览器权限、输入设备、静音/回声和评分异常的可执行排障树 | 制作中 |
| 2 | is the choicer voicer safe | 33.6（easy） | `/is-it-safe/` | 仅针对 thechoicervoicer.me 的麦克风、录音、Analytics、广告和第三方链接安全说明 | 制作中 |
| 3 | the choicer voicer alternative | 29.7（easy） | `/alternatives/` | 免费浏览器版本与不同语音练习方式的透明选择矩阵 | 制作中 |
| 4 | the choicer voicer gameplay | 37.5（easy） | `/gameplay/` | 四场景循环、计时灯、回放、五位评委和排行榜的机制/策略页 | 制作中 |
| 5 | choicer voicer multiplayer | 60.4（hard） | `/multiplayer/` | 2–4 人同设备轮换、共享提示和本地排行榜；明确不是远程房间 | 制作中 |

## 替补队列

| 替补 | 关键词 | Web.Cafe KD | 计划 URL | 当前处理 |
|---:|---|---:|---|---|
| 1 | where to play the choicer voicer | 31.5（easy） | `/where-to-play/` | 与首页和 `/app/` 接近；主批任一页因产品边界失败时再启用 |
| 2 | the choicer voicer demo | 36.7（easy） | `/demo/` | 与可玩首页和 `/games/` 接近；暂不制造重复试玩页 |
| 3 | the choicer voicer browser | 44.8（medium） | `/browser/` | 与 `/app/`、`/mobile/` 重叠；仅在出现独立浏览器兼容意图时启用 |

## GeFei 记录摘要

| 关键词 | 词类 | 盘面信号 | 质量外链预算 | 页面决策 |
|---|---|---|---:|---|
| the choicer voicer mic not working | generic | Reddit/社区结果靠前，弱站专门页已进前十，适合完整排障页 | 20–45 | do |
| is the choicer voicer safe | generic | Reddit 排第 1，存在信任信息缺口；必须限定为本站安全说明 | 30–65 | do |
| the choicer voicer alternative | generic | Reddit 结果靠前，当前第 1 是低权重内页；适合透明比较页 | 25–55 | do |
| the choicer voicer gameplay | generic | 论坛结果靠前，昨天已保存结果 | 35–75 | do |
| choicer voicer multiplayer | generic | 竞争较高但已有弱内容页机会；必须明确仅同设备多人 | 90–200 | do，产品边界严格 |
| where to play the choicer voicer | generic | 导航意图明确但与现有页面高度重叠 | 25–60 | defer |
| the choicer voicer demo | generic | 已有多个专门结果，且本站首页本身可玩 | 35–75 | defer |
| the choicer voicer browser | generic | 多个专门页面正面竞争，与 app/mobile 重叠 | 50–100 | defer |

原始结果：`docs/keyword-research/web-cafe-kd-2026-08-31.json`、`docs/keyword-research/web-cafe-kd-2026-09-01.json`。

## 外部闭环预检

- 共享 broker 当前存在其他项目 `queued / attempts=0`，本项目不抢占、不清队列、不启动第二个 runner。
- 收录助手 2.0 的固定 `host_permissions` 尚未登记 `https://thechoicervoicer.me/*`；在该外部能力恢复前，不把 GSC/Bing/GA4 账号内状态写成成功。
- 网站构建、部署、生产 QA 与 IndexNow 可独立继续；最终台账分别记录 Done、Processing、Needs recheck 与 Pending user/account step。
