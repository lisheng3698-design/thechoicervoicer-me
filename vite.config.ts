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
        microphoneNotWorking: resolve(projectRoot, "microphone-not-working/index.html"),
        isItSafe: resolve(projectRoot, "is-it-safe/index.html"),
        alternatives: resolve(projectRoot, "alternatives/index.html"),
        gameplay: resolve(projectRoot, "gameplay/index.html"),
        multiplayer: resolve(projectRoot, "multiplayer/index.html"),
        pitchMatchingExercises: resolve(projectRoot, "pitch-matching-exercises/index.html"),
        vocalTimingExercises: resolve(projectRoot, "vocal-timing-exercises/index.html"),
        voiceGamesForParties: resolve(projectRoot, "voice-games-for-parties/index.html"),
        voiceImitationExercises: resolve(projectRoot, "voice-imitation-exercises/index.html"),
        voiceActingWarmUps: resolve(projectRoot, "voice-acting-warm-ups/index.html"),
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
        zhMicrophoneNotWorking: resolve(projectRoot, "zh/microphone-not-working/index.html"),
        zhIsItSafe: resolve(projectRoot, "zh/is-it-safe/index.html"),
        zhAlternatives: resolve(projectRoot, "zh/alternatives/index.html"),
        zhGameplay: resolve(projectRoot, "zh/gameplay/index.html"),
        zhMultiplayer: resolve(projectRoot, "zh/multiplayer/index.html"),
        zhPitchMatchingExercises: resolve(projectRoot, "zh/pitch-matching-exercises/index.html"),
        zhVocalTimingExercises: resolve(projectRoot, "zh/vocal-timing-exercises/index.html"),
        zhVoiceGamesForParties: resolve(projectRoot, "zh/voice-games-for-parties/index.html"),
        zhVoiceImitationExercises: resolve(projectRoot, "zh/voice-imitation-exercises/index.html"),
        zhVoiceActingWarmUps: resolve(projectRoot, "zh/voice-acting-warm-ups/index.html"),
        zhAbout: resolve(projectRoot, "zh/about/index.html"),
        zhContact: resolve(projectRoot, "zh/contact/index.html"),
        zhPrivacy: resolve(projectRoot, "zh/privacy/index.html"),
        zhTerms: resolve(projectRoot, "zh/terms/index.html"),
        notFound: resolve(projectRoot, "404.html"),
      },
    },
  },
});
