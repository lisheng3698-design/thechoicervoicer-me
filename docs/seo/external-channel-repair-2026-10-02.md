# 今日内页外部渠道修复

磁盘清理后文件写入恢复。今日 15 个英文主题和 15 个中文页面已发布，生产代码不需改动或重部署。IndexNow 30 URL HTTP 200 回执已保留，没有再次提交。

## 真实诊断

- 原 GA4 任务使用 `a1p551708268` 账号/属性路由，后台检查最终离开该属性，0/30 匹配。本站 2026-09-10 的成功回执明确记录正确路由为 `https://analytics.google.com/analytics/web/#/a400013765p551708268/realtime/overview`。该历史地址是恢复线索，本次成功仍需新的后台证据。
- 新的 GA4 配置使用 `https://analytics.google.com/analytics/web/#/a400013765p551708268/reports/intelligenthome`，property `551708268`、stream `15504292780`、measurement `G-4SMXSDGLW2`。
- 实时概览的“网页标题和屏幕名称”卡片按页显示。原探针只能检查一个快照，不能把 30 个最终页面的多页结果合并。
- GSC 原批次及两次恢复仅检查到 `https://thechoicervoicer.me/trailer-narration-exercises/`，均未进入精确 URL 检查路由，未发出 Request indexing。不能把 3 次批次执行记为 30 URL 已检查。
- GSC sitemap 未取得明确提交回执；Bing sitemap 未找到输入框。上述结果不等于配额耗尽、账号未授权或已收录。

## 已保存的助手修复

助手路径：`/Users/a1-6/Documents/收录助手1.0`。

1. `extension/ga4-observability.js` 新增只移动标题卡片的分页操作，拒绝其他 property 和其他报告卡片。对本站公开的 Allow analytics / 允许匿名分析控件做精确 origin/path 限定的恢复。
2. `extension/service-worker.js` 按最终精确 URL 累积分页证据；遇到属性失配立即停止。生成新的本站验证访问时检查正确 Measurement ID 的 collect，并记录每 URL transport 结果。消除旧日志中未经证明的“已有 10/10”表述。
3. `extension/page-automation.js` 补齐 GSC 精确输入框的 Enter keypress，仍要求进入 inspection 路由、显示目标 canonical、获得实际结果后才能接受。
4. `tests/ga4-observability.test.mjs` 与 `tests/gsc-url-binding.test.mjs` 更新。34 项针对性测试通过，三个 JavaScript 文件语法检查通过；原始输出 `artifacts/helper-targeted-tests-20261002.tap`。

助手源码哈希和平台终态见 `docs/seo/external-checks-2026-10-02.json`。保存修复和测试通过不证明运行中的 Chrome 扩展已加载新源码，也不证明后台验证成功。

## 后续执行

新幂等任务 `thechoicervoicer-20261002-15-ga4-route-repair-v2` 已排入共享 FIFO，canonical 集为今天精确 30 个 URL，mode 为 `ga4-recheck`，仅处理 GA4。原 retry 队列保留，未终止、重排、清空或复用其他站点上下文。

Chrome 控制连接超时，备用窗口操作无法稳定定位到 sheng。已请求用户在共享助手空闲时，对 sheng 的“收录助手2.0”重新加载一次，不中断正在执行的批次。加载更新后读取该任务的独立终态，只在正确属性中真实匹配相应页面后更新评分第 19 项；GA4 失败不改写 GSC、Bing 或 IndexNow 的状态。

每个 GSC 实际结果继续追加到 inspection ledger，并逐 URL 更新 complete status 和 backlog。正确 GA4 路由、transport HTTP 204、预检 ready、任务 queued/running 均不是最终后台回执。
