import { trackSiteEvent } from "./site";

const form = document.querySelector<HTMLFormElement>("[data-practice-routine]");
if (form) {
  const checks = Array.from(form.querySelectorAll<HTMLInputElement>("[data-practice-check]"));
  const status = form.querySelector<HTMLOutputElement>("[data-practice-status]");
  const chinese = document.documentElement.lang.startsWith("zh");
  const steps = form.dataset.practiceUnit === "step";
  const unit = steps ? "steps" : "drills";
  const zhUnit = steps ? "步骤" : "练习";
  const routine = window.location.pathname.replace(/^\/zh\//, "/");
  const storageKey = `the-choicer-voicer:practice:${routine}`;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(saved)) checks.forEach((check, i) => { check.checked = saved[i] === true; });
  } catch { /* Practice works when storage is unavailable or an old value is invalid. */ }

  function update() {
    const completed = checks.filter((check) => check.checked).length;
    if (status) status.textContent = chinese
      ? completed === checks.length
        ? `已完成 ${completed} / ${checks.length} 项${zhUnit}。${steps ? "请使用下方标准核对结果。" : "请使用下方回听标准检查录音。"}`
        : `已完成 ${completed} / ${checks.length} 项${zhUnit}。这是自查记录，不是音频评分。`
      : completed === checks.length
        ? `${completed} of ${checks.length} ${unit} completed. ${steps ? "Use the review criteria below to check the result." : "Use the playback checks below to review your take."}`
        : `${completed} of ${checks.length} ${unit} completed. Self-review, not an audio score.`;
    try { localStorage.setItem(storageKey, JSON.stringify(checks.map((check) => check.checked))); }
    catch { /* Keep the current in-page progress usable without persistence. */ }
    return completed;
  }
  form.addEventListener("change", () => {
    trackSiteEvent("practice_progress", { routine, completed_drills: update() });
  });
  form.querySelector<HTMLButtonElement>("[data-practice-reset]")?.addEventListener("click", () => {
    checks.forEach((check) => { check.checked = false; });
    update();
  });
  update();
}
