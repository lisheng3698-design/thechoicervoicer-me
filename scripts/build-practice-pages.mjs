import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const date = process.argv[2] || "2026-10-02";
const publishDate = process.argv[3] || date;
const pages = JSON.parse(readFileSync(resolve(root, `docs/content/practice-pages-${date}.json`), "utf8"));
const origin = "https://thechoicervoicer.me";
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const name = (keyword) => keyword.replace(/\b\w/g, (c) => c.toUpperCase()).replace("Ivr", "IVR");

for (const page of pages) {
  for (const chinese of [false, true]) {
    const prefix = chinese ? "/zh/" : "/";
    const route = `${prefix}${page.slug}/`;
    const canonical = origin + route;
    const title = chinese ? page.zh : name(page.keyword);
    const drills = chinese ? page.zhdrills : page.drills;
    const intro = chinese ? page.zhintro : page.intro;
    const review = chinese ? page.zhreview : page.review;
    const limit = chinese ? page.zhlimit : page.limit;
    const description = chinese ? `${page.zh}：六项原创练习、示例文本、回听标准与进度自查。${page.zhintro}` : `${page.unit === "step" ? "Follow six practical steps for" : "Practice six"} ${page.keyword} with an original example, review criteria, clear limits, and a local progress checklist.`;
    const questions = [
      [chinese ? `${page.zh}怎样算完成？` : `How should I review ${page.keyword}?`, review],
      [chinese ? `这套${page.zh}有哪些边界？` : `What are the limits of ${page.keyword}?`, limit],
    ];
    const graph = { "@context": "https://schema.org", "@graph": [
      { "@type": "Article", headline: title, description, inLanguage: chinese ? "zh-Hans" : "en", mainEntityOfPage: canonical, datePublished: publishDate, dateModified: publishDate },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "The Choicer Voicer", item: origin + prefix },
        { "@type": "ListItem", position: 2, name: title, item: canonical },
      ] },
      { "@type": "FAQPage", mainEntity: questions.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ] };
    const related = page.related.map((slug) => {
      const sibling = pages.find((entry) => entry.slug === slug);
      const existingHeading = !sibling && chinese
        ? readFileSync(resolve(root, `zh/${slug}/index.html`), "utf8").match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, "")
        : null;
      return `<a href="${prefix}${slug}/">${escape(chinese ? sibling?.zh || existingHeading || ({'commercial-voice-acting-exercises':'商业配音练习','voice-acting-stakes-exercises':'角色风险练习','podcast-voice-exercises':'播客声音练习','breath-control-exercises-for-voice-acting':'配音呼吸练习','documentary-narration-exercises':'纪录片旁白练习','explainer-video-voice-over-exercises':'说明视频旁白练习','announcer-voice-exercises':'播音声音练习','character-voice-exercises':'角色声音练习','voice-acting-physicality-exercises':'配音身体动作练习','audiobook-narration-exercises':'有声书旁白练习','voice-acting-improv-exercises':'配音即兴练习','voice-acting-script-analysis':'配音文本分析','voice-acting-microphone-technique':'配音麦克风技巧','voice-acting-mouth-noise-exercises':'配音口腔杂音练习','adr-voice-acting-exercises':'ADR 配音练习','voice-projection-exercises':'声音投射练习','voice-acting-listening-exercises':'配音倾听练习','voice-acting-reaction-exercises':'配音反应练习'}[slug]) : name(slug.replaceAll('-', ' ')))}</a>`;
    }).join(chinese ? "、" : " and ");
    const html = `<!doctype html>
<html lang="${chinese ? "zh-CN" : "en"}">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escape(title)}${chinese ? ' — 六项原创练习与回听标准' : ' — 6 Practical Drills'}</title>
<meta name="description" content="${escape(description)}" />
<meta name="robots" content="index,follow,max-image-preview:large" />
<link rel="canonical" href="${canonical}" />
<link rel="alternate" hreflang="en" href="${origin}/${page.slug}/" /><link rel="alternate" hreflang="zh-Hans" href="${origin}/zh/${page.slug}/" /><link rel="alternate" hreflang="x-default" href="${origin}/${page.slug}/" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<meta property="og:type" content="article" /><meta property="og:title" content="${escape(title)}" /><meta property="og:description" content="${escape(description)}" /><meta property="og:url" content="${canonical}" />
<script type="application/ld+json">${JSON.stringify(graph).replaceAll('<', '\\u003c')}</script>
</head>
<body class="practice-page">
<a class="skip-link" href="#main-content">${chinese ? '跳到练习内容' : 'Skip to practice'}</a>
<header class="site-header"><div class="header-inner"><a class="brand" href="${prefix}" aria-label="${chinese ? 'The Choicer Voicer 首页' : 'The Choicer Voicer home'}"><img src="/logo-mark.svg" alt="" width="42" height="42" /><span class="brand__lockup"><span class="brand__name"><span class="brand__article">The</span> Choicer <span class="brand__accent">Voicer</span></span><small>${chinese ? '浏览器语音游戏' : 'Browser voice game'}</small></span></a><nav class="main-nav" aria-label="${chinese ? '主导航' : 'Main navigation'}"><a href="${prefix}">${chinese ? '游戏指南' : 'Game guide'}</a><a href="${route}" aria-current="page">${chinese ? '练习' : 'Practice'}</a><a class="nav-play" href="${prefix}games/">${chinese ? '开始游戏' : 'Play'}</a><a class="language-switch" href="${chinese ? '/' : '/zh/'}${page.slug}/" lang="${chinese ? 'en' : 'zh-CN'}" hreflang="${chinese ? 'en' : 'zh-Hans'}" data-language-choice="${chinese ? 'en' : 'zh'}">${chinese ? 'English' : '中文'}</a></nav></div></header>
<main id="main-content">
<nav class="breadcrumb container" aria-label="${chinese ? '面包屑导航' : 'Breadcrumb'}"><a href="${prefix}">The Choicer Voicer</a><span aria-hidden="true">/</span><span>${escape(title)}</span></nav>
<section class="page-hero container"><p class="eyebrow">${chinese ? '六项练习 · 原创示例 · 自主回听' : '6 drills · Original prompts · Playback review'}</p><h1>${escape(title)}</h1><p class="page-hero__lead">${escape(intro)}</p><div class="hero__actions"><a class="button button--primary button--large" href="#routine">${chinese ? '开始六项练习' : 'Start the six-drill routine'}</a><a class="button button--quiet" href="#practice-example">${chinese ? '查看原创示例' : 'Read the original example'}</a></div></section>
<section class="section section--cyan" id="routine"><div class="container"><div class="section-heading"><div><p class="eyebrow">${chinese ? '受控练习' : 'Controlled practice'}</p><h2>${chinese ? '按顺序完成，逐项记录。' : 'Work through the routine one drill at a time.'}</h2></div><p>${chinese ? '每次只改变一个变量，回听后再勾选。进度在当前设备上保存，中英文切换会保留；只记录勾选状态，不收集录音。' : 'Change one variable, listen back, then mark the drill. Progress stays on this device and carries across the language switch. The checklist stores completion flags, never recordings.'}</p></div><form data-practice-routine><div class="step-grid">${drills.map(([heading, body], i) => `<article class="step-card"><div class="step-card__number">${i + 1}</div><h3>${escape(heading)}</h3><p>${escape(body)}</p><label class="practice-check"><input type="checkbox" data-practice-check /> ${chinese ? `已完成第 ${i+1} 项：` : `Completed drill ${i+1}: `}${escape(heading)}</label></article>`).join('')}</div><div class="practice-progress"><output role="status" aria-live="polite" data-practice-status>${chinese ? '已完成 0 / 6 项练习。这是自查记录，不是音频评分。' : '0 of 6 drills completed. Self-review, not an audio score.'}</output><button type="button" class="button button--quiet" data-practice-reset>${chinese ? '重置练习' : 'Reset routine'}</button></div></form></div></section>
<section class="section container" id="practice-example"><div class="content-layout"><article class="article-copy"><p class="eyebrow">${chinese ? '原创练习卡' : 'Original practice card'}</p><h2>${chinese ? '用一份固定示例做对照。' : 'Use one fixed example for a fair comparison.'}</h2><p>${escape(chinese ? page.zhsample : page.sample)}</p><h3>${chinese ? '怎样安排第一轮？' : 'How should the first pass work?'}</h3><p>${chinese ? '先读示例与边界，保留基准录音，再完成上方六项。用自己控制的录音设备录两次，把改变的位置写在个人笔记里。回听先检查信息是否完整，再判断表达选择。若有不适，立即停止；不需要上传任何音频。' : 'Read the example and limits before starting, keep a baseline, and work through the six drills above. Make two takes with a recording device you control and note the specific change privately. On playback, check that information remains intact before judging expressive choices. Stop if uncomfortable; no audio upload is needed.'}</p></article><aside class="side-note" aria-label="${chinese ? '回听标准' : 'Playback checks'}"><p class="eyebrow">${chinese ? '可判定结果' : 'Observable result'}</p><h3>${chinese ? '用结果检查练习。' : 'Judge the result on playback.'}</h3><p>${escape(review)}</p><p>${chinese ? '勾选只代表你完成了步骤，不能证明声音、技巧或专业能力达标。' : 'A checked box records that you completed a step. It does not certify voice quality, skill, or professional readiness.'}</p></aside></div></section>
<section class="section section--ink"><div class="container"><div class="section-heading"><div><p class="eyebrow">${chinese ? '边界与失败情形' : 'Limits and failure cases'}</p><h2>${chinese ? '遇到这些情况，先修正再继续。' : 'Repair a failed comparison before continuing.'}</h2></div><p>${escape(limit)}</p></div><div class="card-grid"><article class="info-card"><h3>${chinese ? '一次改变太多' : 'Too many simultaneous changes'}</h3><p>${chinese ? '如果同时改变文字、音量、位置与节奏，就无法知道哪一项有效。回到示例基准，仅保留本项指定的变化。' : 'Changing words, level, position, and pace together makes the comparison inconclusive. Return to the example baseline and retain only the variable specified by the current drill.'}</p></article><article class="info-card"><h3>${chinese ? '用印象代替核验' : 'Impressions instead of evidence'}</h3><p>${chinese ? '更好听不等于符合任务。先应用上方专属回听标准，必要时让未读示例的人复述信息，再决定是否保留。' : 'A more attractive sound does not establish that the task worked. Apply the page-specific playback checks, and ask a listener unfamiliar with the example to recount the information before keeping a take.'}</p></article><article class="info-card"><h3>${chinese ? '为了完成而用力' : 'Effort used to force completion'}</h3><p>${chinese ? '完成记录不是耐力比赛。不适时停止，缩短练习并恢复舒适说话；不能用疼痛或过度发声来换取勾选。' : 'The completion record is not an endurance contest. Stop at discomfort, shorten the session, and return to comfortable speech; pain or excessive vocal effort is never a condition for checking a box.'}</p></article></div></div></section>
<section class="section container"><div class="section-heading"><div><p class="eyebrow">${chinese ? '继续练习' : 'Continue training'}</p><h2>${chinese ? '根据下一步任务选择练习。' : 'Choose the next exercise by the task you need.'}</h2></div><p>${chinese ? '可以继续练习' : 'Continue with '}${related}${chinese ? '，或返回' : ', or return to the '}<a href="${prefix}">${chinese ? '声音模仿游戏首页' : 'voice imitation game'}</a>${chinese ? '。游戏的参考音频与评分针对模仿任务，不会自动评价这份原创练习稿。' : '. The game uses its own reference clips and imitation scoring; it does not automatically assess this original practice script.'}</p></div><div class="faq-grid">${questions.map(([q,a]) => `<article class="faq-card"><h3>${escape(q)}</h3><p>${escape(a)}</p></article>`).join('')}</div></section>
</main>
<footer class="site-footer"><div class="footer-inner"><div><strong>The Choicer Voicer</strong><p>${chinese ? '原创声音练习，保留明确回听与使用边界。' : 'Original voice practice with clear review boundaries.'}</p><p class="affiliation-note">${chinese ? '本站浏览器游戏为独立实现，不声称获得任何第三方的隶属关系、赞助或背书。' : 'Independent browser implementation. No third-party affiliation, sponsorship, or endorsement is claimed.'}</p></div><nav aria-label="${chinese ? '页脚导航' : 'Footer navigation'}"><a href="${prefix}about/">${chinese ? '关于' : 'About'}</a><a href="${prefix}contact/">${chinese ? '联系' : 'Contact'}</a><a href="${prefix}privacy/">${chinese ? '隐私' : 'Privacy'}</a><a href="${prefix}terms/">${chinese ? '条款' : 'Terms'}</a></nav></div></footer>
<script type="module" src="/src/practice.ts"></script>
</body></html>
`;
    const directory = resolve(root, route.slice(1));
    mkdirSync(directory, { recursive: true });
    let output = html;
    if (page.unit === "step") {
      output = output.replaceAll("drill", "step").replaceAll("Drill", "Step")
        .replace('data-practice-routine>', 'data-practice-routine data-practice-unit="step">')
        .replaceAll("6 steps · Original prompts · Playback review", "6 steps · Original example · Review criteria")
        .replaceAll("六项练习 · 原创示例 · 自主回听", "六项步骤 · 原创示例 · 自主核对")
        .replaceAll("开始六项练习", "开始六项步骤")
        .replaceAll("已完成 0 / 6 项练习", "已完成 0 / 6 项步骤")
        .replaceAll("重置练习", "重置步骤")
        .replaceAll("六项原创练习与回听标准", "六项实用步骤与自查标准")
        .replaceAll("六项原创练习、示例文本、回听标准与进度自查", "六项实用步骤、原创示例、自查标准与进度记录")
        .replaceAll("Judge the result on playback.", "Check the result against the criteria.")
        .replaceAll("用结果检查练习。", "按标准核对实际结果。")
        .replaceAll("Read the example and limits before starting, keep a baseline, and work through the six steps above. Make two takes with a recording device you control and note the specific change privately. On playback, check that information remains intact before judging expressive choices. Stop if uncomfortable; no audio upload is needed.", "Read the original example and limits, then work through the six steps using your own notes and any equipment required by the task. Keep a baseline or current version and check the stated result before marking a step complete. The checklist records your progress locally; it does not inspect files, judge audio, or perform the task for you.")
        .replaceAll("先读示例与边界，保留基准录音，再完成上方六项。用自己控制的录音设备录两次，把改变的位置写在个人笔记里。回听先检查信息是否完整，再判断表达选择。若有不适，立即停止；不需要上传任何音频。", "先读原创示例与使用边界，再用自己的笔记和任务所需设备完成六项步骤。保留基准或当前版本，核对专属结果后再勾选。清单仅在本地记录进度，不检测文件、评价音频或自动代做任务。");
    }
    if (page.unit === "step") {
      output = output.replace('<div class="faq-grid">', `<p><a href="${prefix}voice-work-guides/">${chinese ? "查看全部配音工作指南" : "Explore all voice work guides"}</a></p><div class="faq-grid">`);
    }
    if (page.extra) {
      const extra = chinese ? page.extra.zh : page.extra.en;
      output = output.replace('<section class="section section--ink">', `<section class="section container"><h2>${escape(extra.heading)}</h2><p>${escape(extra.body)}</p><pre><code>${escape(extra.example)}</code></pre><p><a href="${page.extra.source}">${chinese ? "参考：StudioBinder 的 V.O. 格式说明" : "Reference: StudioBinder on V.O. formatting"}</a></p></section><section class="section section--ink">`);
    }
    writeFileSync(resolve(directory, "index.html"), output);
  }
}
console.log(`Generated ${pages.length} English practice guides and ${pages.length} complete Chinese mirrors.`);
