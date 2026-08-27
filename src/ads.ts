const ADSTERRA_ORIGIN = "https://incompatibletorchvulture.com";
const POPUNDER_SCRIPT = `${ADSTERRA_ORIGIN}/d7/2f/3f/d72f3fddaee2f6ce6a982ca1c467c4db.js`;
const NATIVE_BANNER_SCRIPT = `${ADSTERRA_ORIGIN}/1f9d17503219073c8503247d8589db43/invoke.js`;
const NATIVE_BANNER_CONTAINER_ID = "container-1f9d17503219073c8503247d8589db43";
const VERTICAL_BANNER_SCRIPT = `${ADSTERRA_ORIGIN}/daf294790afe605ba6ae1c824cadfca5/invoke.js`;
const SOCIAL_BAR_SCRIPT = `${ADSTERRA_ORIGIN}/2d/87/86/2d87868027239001262173826fa2197e.js`;
const SMART_LINK = `${ADSTERRA_ORIGIN}/b997538ytg?key=7f5e5731ca40999902193ee46eedbf61`;

const PRODUCTION_HOSTS = new Set(["thechoicervoicer.me", "www.thechoicervoicer.me"]);
const DISPLAY_AD_PATHS = new Set(["/", "/games/", "/zh/", "/zh/games/"]);

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: "iframe";
      height: number;
      width: number;
      params: Record<string, string>;
    };
  }
}

function appendAdScript(parent: HTMLElement | HTMLHeadElement, src: string, slot: string, async = false) {
  if (document.querySelector(`script[data-adsterra-slot="${slot}"]`)) return;

  const script = document.createElement("script");
  script.src = src;
  script.async = async;
  script.dataset.adsterraSlot = slot;
  parent.append(script);
}

function normalizePath(pathname: string) {
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function mountDisplayAds() {
  if (document.querySelector("[data-adsterra-display-ads]")) return;

  const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");
  const section = document.createElement("section");
  section.className = "ad-showcase";
  section.dataset.adsterraDisplayAds = "";
  section.setAttribute("aria-label", isChinese ? "赞助广告" : "Sponsored advertising");
  section.innerHTML = `
    <div class="ad-showcase__inner">
      <div class="ad-showcase__heading">
        <div>
          <p class="eyebrow">${isChinese ? "赞助内容" : "Sponsored"}</p>
          <h2>${isChinese ? "合作广告" : "Partner offers"}</h2>
        </div>
        <p>${isChinese ? "广告收入用于支持本站的免费语音游戏与内容维护。" : "Advertising helps keep the browser game and its guides free to use."}</p>
      </div>
      <div class="ad-showcase__grid">
        <div class="ad-showcase__native" data-adsterra-native>
          <p class="ad-showcase__label">${isChinese ? "原生广告" : "Native advertisement"}</p>
          <div id="${NATIVE_BANNER_CONTAINER_ID}"></div>
        </div>
        <div class="ad-showcase__rail">
          <p class="ad-showcase__label">${isChinese ? "广告" : "Advertisement"}</p>
          <div class="ad-showcase__rail-slot" data-adsterra-vertical></div>
        </div>
      </div>
      <div class="ad-showcase__smart-link">
        <p>${isChinese ? "以下链接将打开第三方广告页面。" : "The following link opens a third-party advertising page."}</p>
        <a href="${SMART_LINK}" target="_blank" rel="sponsored nofollow noopener" data-adsterra-smart-link>
          ${isChinese ? "查看赞助优惠 ↗" : "View sponsor offer ↗"}
        </a>
      </div>
    </div>
  `;

  const footer = document.querySelector(".site-footer");
  if (footer) {
    footer.before(section);
  } else {
    document.body.append(section);
  }

  const nativeContainer = section.querySelector<HTMLElement>("[data-adsterra-native]");
  if (nativeContainer) {
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.dataset.adsterraSlot = "native-banner";
    script.src = NATIVE_BANNER_SCRIPT;
    nativeContainer.insertBefore(script, nativeContainer.querySelector(`#${NATIVE_BANNER_CONTAINER_ID}`));
  }

  const verticalContainer = section.querySelector<HTMLElement>("[data-adsterra-vertical]");
  if (verticalContainer) {
    window.atOptions = {
      key: "daf294790afe605ba6ae1c824cadfca5",
      format: "iframe",
      height: 600,
      width: 160,
      params: {},
    };
    appendAdScript(verticalContainer, VERTICAL_BANNER_SCRIPT, "vertical-banner");
  }
}

export function initializeAds() {
  if (!PRODUCTION_HOSTS.has(window.location.hostname)) return;

  appendAdScript(document.head, POPUNDER_SCRIPT, "popunder");

  if (DISPLAY_AD_PATHS.has(normalizePath(window.location.pathname))) {
    mountDisplayAds();
  }

  appendAdScript(document.body, SOCIAL_BAR_SCRIPT, "social-bar");
}

