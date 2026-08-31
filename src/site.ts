import "./style.css";

type AnalyticsConsent = "granted" | "denied";

const DEFAULT_GA_MEASUREMENT_ID = "G-4SMXSDGLW2";
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID).trim();
const ANALYTICS_CONSENT_KEY = "the-choicer-voicer:analytics-consent";
const PRODUCTION_HOSTS = new Set(["thechoicervoicer.me", "www.thechoicervoicer.me"]);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const consent = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return consent === "granted" || consent === "denied" ? consent : null;
  } catch {
    return null;
  }
}

function writeAnalyticsConsent(consent: AnalyticsConsent) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  } catch {
    // Consent still applies to the current page when storage is unavailable.
  }
}

function updateAnalyticsConsent(consent: AnalyticsConsent) {
  writeAnalyticsConsent(consent);
  window.gtag?.("consent", "update", {
    analytics_storage: consent,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function renderAnalyticsConsent() {
  if (readAnalyticsConsent() || document.querySelector("[data-analytics-consent]")) return;

  const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");
  const privacyHref = isChinese ? "/zh/privacy/" : "/privacy/";
  const banner = document.createElement("aside");
  banner.className = "analytics-consent";
  banner.dataset.analyticsConsent = "";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", isChinese ? "分析数据设置" : "Analytics settings");
  banner.innerHTML = `
    <p>${
      isChinese
        ? `是否允许匿名使用数据帮助我们改进游戏？我们不会发送录音、玩家姓名或你输入的内容。<a href="${privacyHref}">隐私说明</a>`
        : `Allow anonymous usage data to help improve the game? We never send recordings, player names, or text you enter. <a href="${privacyHref}">Privacy details</a>`
    }</p>
    <div class="analytics-consent__actions">
      <button type="button" class="analytics-consent__button analytics-consent__button--secondary" data-analytics-choice="denied">${isChinese ? "拒绝匿名分析" : "Decline"}</button>
      <button type="button" class="analytics-consent__button" data-analytics-choice="granted">${isChinese ? "允许匿名分析" : "Allow analytics"}</button>
    </div>
  `;

  banner.querySelectorAll<HTMLButtonElement>("[data-analytics-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const consent = button.dataset.analyticsChoice === "granted" ? "granted" : "denied";
      updateAnalyticsConsent(consent);
      if (consent === "granted") {
        trackSiteEvent("analytics_consent_updated", { status: consent });
      }
      banner.remove();
    });
  });

  document.body.append(banner);
}

function initializeAnalytics() {
  if (!/^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID) || !PRODUCTION_HOSTS.has(window.location.hostname)) return;

  const consent = readAnalyticsConsent();
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (..._args: unknown[]) {
    window.dataLayer?.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: consent ?? "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  script.dataset.ga4MeasurementId = GA_MEASUREMENT_ID;
  document.head.append(script);

  renderAnalyticsConsent();
}

export function trackSiteEvent(name: string, detail: Record<string, unknown> = {}) {
  const payload = { event: name, ...detail };
  window.dispatchEvent(new CustomEvent("mimicmic:event", { detail: payload }));
  window.gtag?.("event", name, detail);
}

initializeAnalytics();

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
    const language = link.dataset.languageChoice ?? "en";
    try {
      window.localStorage.setItem("preferred-language", language);
    } catch {
      // Language switching still works through the link when storage is unavailable.
    }
    trackSiteEvent("language_switch", { language });
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-reset-analytics-consent]").forEach((button) => {
  button.addEventListener("click", () => {
    try {
      window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
    } catch {
      // Reloading still restores the in-page choice when storage is unavailable.
    }
    window.location.reload();
  });
});
