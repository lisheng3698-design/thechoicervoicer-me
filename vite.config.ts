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
        about: resolve(projectRoot, "about/index.html"),
        contact: resolve(projectRoot, "contact/index.html"),
        privacy: resolve(projectRoot, "privacy/index.html"),
        terms: resolve(projectRoot, "terms/index.html"),
        zhHome: resolve(projectRoot, "zh/index.html"),
        zhGames: resolve(projectRoot, "zh/games/index.html"),
        zhAbout: resolve(projectRoot, "zh/about/index.html"),
        zhContact: resolve(projectRoot, "zh/contact/index.html"),
        zhPrivacy: resolve(projectRoot, "zh/privacy/index.html"),
        zhTerms: resolve(projectRoot, "zh/terms/index.html"),
        notFound: resolve(projectRoot, "404.html"),
      },
    },
  },
});
