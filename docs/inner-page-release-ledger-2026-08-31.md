# 内页发布台账（2026-08-31）

## 发布身份

- 仓库：`/Users/a1-6/Documents/ChatGPT/The Choicer Voicer`
- 托管：GitHub Pages，生产分支 `gh-pages`
- Canonical host：`https://thechoicervoicer.me`
- 源码提交：`ed00899`（Build five keyword-focused inner pages）
- 生产部署：`4bba487`（Deploy five keyword-focused inner pages）
- 构建命令：`npx vite build --emptyOutDir false`
- 构建产物：`dist/`
- 发布日期：2026-08-31

## 最终候选页

| 槽位 | 关键词 | Canonical | 页面类型 | Web.Cafe KD | Ahrefs | 生产状态 |
|---:|---|---|---|---:|---|---|
| 1 | voice imitation game | https://thechoicervoicer.me/games/ | 可玩游戏 | 17.1 | 默认跳过（用户未要求） | 200 / self-canonical |
| 2 | the choicer voicer app | https://thechoicervoicer.me/app/ | 浏览器 App 说明 | 36.5 | 默认跳过（用户未要求） | 200 / self-canonical |
| 3 | how to play the choicer voicer | https://thechoicervoicer.me/how-to-play/ | HowTo 教程 | 17.1 | 默认跳过（用户未要求） | 200 / self-canonical |
| 4 | the choicer voicer mobile | https://thechoicervoicer.me/mobile/ | 手机兼容指南 | 23.8 | 默认跳过（用户未要求） | 200 / self-canonical |
| 5 | choicer voicer voice packs | https://thechoicervoicer.me/voice-packs/ | 场景内容卷指南 | 47.9 | 默认跳过（用户未要求） | 200 / self-canonical |

## 严格 100 分验收

五页共用同一套技术与发布证据，每页独立计分。前 18 项及第 20 项均通过；第 19 项的 GA4 请求与隐私载荷已通过，但账号后台 Realtime/DebugView 因 Chrome 标签页被另一个 Codex 浏览器会话占用而未能读取，因此严格计为 0 分。

| ID | 检查 | 状态 | 分值 | 证据 |
|---:|---|---|---:|---|
| 01 | 一意图一 canonical | Pass | 5 | 关键词池与 URL 映射；品牌/online/free 合并首页 |
| 02 | 哥飞 KD 路径 | Pass | 5 | Web.Cafe 8/8 成功；Ahrefs 合规豁免 |
| 03 | 首屏符合查询意图 | Pass | 5 | 生产渲染截图 `artifacts/seo-live/` |
| 04 | 声明与真实产品一致 | Pass | 5 | 明确浏览器版、无 APK、无在线联机、无第三方包上传 |
| 05 | 唯一 Title | Pass | 5 | 生产 HTML 五个不同 Title |
| 06 | 唯一 Description | Pass | 5 | 静态测试与生产源码 |
| 07 | 唯一 H1 | Pass | 5 | 五页生产 H1 均为 1 |
| 08 | H2/H3/FAQ/限制可抓取 | Pass | 5 | 原始 HTML 可见，不依赖客户端渲染 |
| 09 | 200 + self canonical | Pass | 5 | 五页生产 curl 200，canonical 与请求 URL 一致 |
| 10 | 可索引 | Pass | 5 | meta robots index/follow；robots 200 且 Allow `/` |
| 11 | Sitemap | Pass | 5 | sitemap 200，五页含真实 `lastmod=2026-08-31` |
| 12 | canonical/hreflang/OG/schema/斜杠一致 | Pass | 5 | 中英文 10 页生产浏览器审计；JSON-LD 可解析 |
| 13 | 首屏兑现承诺 | Pass | 5 | Games 直接可玩；四个指南首屏直接回答任务 |
| 14 | 三类代表测试 | Pass | 5 | 20 个静态测试；Playwright 14 passed / 2 configured skips；包含权限与多人边界 |
| 15 | 桌面/手机质量 | Pass | 5 | 20 个生产组合；0 溢出、0 控制台错误、0 坏图、0 schema 错误 |
| 16 | 父级入链 | Pass | 5 | 英文/中文首页均有源代码可见链接 |
| 17 | 相关内链 | Pass | 5 | 各页链接首页、Games 和相关指南，无未发布 URL |
| 18 | 面包屑与结构化数据 | Pass | 5 | BreadcrumbList + VideoGame/SoftwareApplication/HowTo/CollectionPage |
| 19 | GA4 Realtime/DebugView + 安全载荷 | Blocked | 0 | 生产 page_view 接口返回 204；参数审计无录音/玩家名/输入；Realtime 尚未在后台读取 |
| 20 | 部署、版本、生产 QA、修正历史 | Pass | 5 | 源码 `ed00899`；部署 `4bba487`；初版无失败项修正 |

### 分项

- Intent And GeFei Alignment：20/20
- On-Page SEO：20/20
- Technical Indexability：20/20
- Product And UX：15/15
- Internal Links And Schema：15/15
- Analytics And Trust：5/10
- 严格总分：95/100（五页相同）
- 当前状态：`需修复`；在 GA4 Realtime/DebugView 明确看到生产访问后可升为 `已上线 + 100/100`。

## 搜索提交状态

| 项目 | 状态 | 证据 / 说明 |
|---|---|---|
| GSC sitemap | Needs recheck | 目标属性存在历史数据；本轮 Chrome 后台被另一会话占用，未重复提交 |
| GSC URL Inspection | Needs recheck | 五个 URL 均符合 200/self-canonical/indexable 条件；尚未执行账号内请求 |
| Google index | Unknown | 提交与收录分开记录，不声称已收录 |
| Bing sitemap | Needs recheck | 目标站点存在历史数据；本轮账号后台未读取 |
| Bing URL Submission | Needs recheck | 尚未执行账号内提交 |
| Bing index | Unknown | 不声称已收录 |
| IndexNow | Done | 密钥文件内容匹配；5 个 canonical 提交返回 HTTP 200 |
| GA4 tag | Deployed | Measurement ID 已在共享脚本上线；生产 page_view 返回 HTTP 204 |
| GA4 data | Pending realtime data | Realtime/DebugView 后台待复查 |
| Privacy | Updated / unchanged | 现有政策明确 GA4 类别与录音不上传 |
| Consent | Consent review | 站点实现显式允许/拒绝与默认 denied；法规适用性需单独审查 |

## 复查

- 2026-09-01：完成 GA4 Realtime、GSC 五页 URL Inspection、Bing 五页 URL Submission，并复查 sitemap 后台状态。
- 2026-09-07：比较五页的 GSC 查询、展示、点击和平均排名，判断是否启用 `/gameplay/` 候补。
