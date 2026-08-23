import "./style.css";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackSiteEvent(name: string, detail: Record<string, unknown> = {}) {
  const payload = { event: name, ...detail };
  window.dispatchEvent(new CustomEvent("mimicmic:event", { detail: payload }));
  window.dataLayer?.push(payload);
}

document.querySelectorAll<HTMLElement>("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll<HTMLAnchorElement>("[data-track-link]").forEach((link) => {
  link.addEventListener("click", () => {
    trackSiteEvent("guide_link_clicked", { destination: link.dataset.trackLink });
  });
});

document.querySelectorAll<HTMLAnchorElement>("[data-language-choice]").forEach((link) => {
  link.addEventListener("click", () => {
    try {
      window.localStorage.setItem("preferred-language", link.dataset.languageChoice ?? "en");
    } catch {
      // Language switching still works through the link when storage is unavailable.
    }
  });
});
