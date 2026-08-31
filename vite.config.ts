import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(projectRoot, "index.html"),
        games: resolve(projectRoot, "games/index.html"),
        app: resolve(projectRoot, "app/index.html"),
        howToPlay: resolve(projectRoot, "how-to-play/index.html"),
        mobile: resolve(projectRoot, "mobile/index.html"),
        voicePacks: resolve(projectRoot, "voice-packs/index.html"),
        about: resolve(projectRoot, "about/index.html"),
        contact: resolve(projectRoot, "contact/index.html"),
        privacy: resolve(projectRoot, "privacy/index.html"),
        terms: resolve(projectRoot, "terms/index.html"),
        zhHome: resolve(projectRoot, "zh/index.html"),
        zhGames: resolve(projectRoot, "zh/games/index.html"),
        zhApp: resolve(projectRoot, "zh/app/index.html"),
        zhHowToPlay: resolve(projectRoot, "zh/how-to-play/index.html"),
        zhMobile: resolve(projectRoot, "zh/mobile/index.html"),
        zhVoicePacks: resolve(projectRoot, "zh/voice-packs/index.html"),
        zhAbout: resolve(projectRoot, "zh/about/index.html"),
        zhContact: resolve(projectRoot, "zh/contact/index.html"),
        zhPrivacy: resolve(projectRoot, "zh/privacy/index.html"),
        zhTerms: resolve(projectRoot, "zh/terms/index.html"),
        notFound: resolve(projectRoot, "404.html"),
      },
    },
  },
});
