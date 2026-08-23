import { existsSync, readFileSync, statSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync, spawnSync } from "node:child_process";
import { resolve } from "node:path";

const secretFile = process.argv[2];
if (!secretFile) throw new Error("Usage: node scripts/generate-replicate-voices.mjs /absolute/path/to/token.rtf");

const tokenMatch = readFileSync(secretFile, "utf8").match(/r8_[A-Za-z0-9_-]{20,}/);
if (!tokenMatch) throw new Error("No Replicate API token was found in the supplied file.");
const token = tokenMatch[0];

const model = "qwen/qwen3-tts";
const outputDirectory = resolve("public/audio");
const jobs = [
  {
    id: "rocket-hello",
    voice: "An original bright young mission commander with an open, energetic cinematic voice, clear articulation, natural breath and an uplifting tone. Do not imitate any real person.",
    en: { text: "Hello! Can you hear me up there?", style: "Start with urgent warmth, then lift the final question with genuine wonder. Natural film dialogue, not an announcer." },
    zh: { text: "你好！上面能听见我吗？", style: "自然的普通话电影对白。开头急切而温暖，最后的疑问带着真诚的期待；不要播音腔。" },
  },
  {
    id: "robot-roll-call",
    voice: "An original calm and precise spacecraft navigation officer, androgynous adult voice, controlled confidence, crisp rhythm and subtle humanity. Do not imitate any real person.",
    en: { text: "Ready. Steady. Hold your course.", style: "Three deliberate command beats. Calm pressure, clipped rhythm and restrained cinematic intensity; no commercial voice-over tone." },
    zh: { text: "就位。稳定。保持航线。", style: "自然的普通话科幻电影对白。三个清晰的指令节拍，冷静、有压力但不过度夸张；不要播音腔。" },
  },
  {
    id: "villain-giggle",
    voice: "An original deep theatrical usurper with a textured mature voice, restrained menace and a slow bloom into triumph. Distinct fictional character; do not imitate any real actor.",
    en: { text: "At last... the throne is mine!", style: "Begin as a private whisper, hold a suspenseful pause, then release a dangerous but believable triumph. Cinematic acting, not a trailer voice." },
    zh: { text: "终于……王座属于我了！", style: "自然的普通话反派电影对白。先压低声音私语并保留悬念停顿，最后释放危险而可信的胜利感；不要预告片腔。" },
  },
  {
    id: "gentle-signoff",
    voice: "An original warm mature late-night host with an intimate, slightly weary voice, soft texture and reassuring presence. Do not imitate any real person.",
    en: { text: "Until tomorrow. Keep the lights burning.", style: "Speak closely and quietly as if to one listener after midnight. Warm, lived-in and understated, with a gentle falling cadence." },
    zh: { text: "明天再见。别让灯熄灭。", style: "自然的普通话深夜对白，像午夜后只对一位听众轻声说话。温暖、略带疲惫，结尾轻柔下落；不要播音腔。" },
  },
  {
    id: "hamlet-question",
    voice: "An original thoughtful young adult male stage character, clear but vulnerable, with a quiet baritone and natural breath. He is not based on any actor or real person.",
    en: { text: "To be, or not to be—that is the question.", style: "A private thought spoken aloud: restrained, conflicted and intimate. Pause naturally around the contrast; avoid a famous performance imitation." },
    zh: { text: "生存，还是毁灭——这是一个问题。", style: "自然的普通话戏剧独白，年轻男性在犹疑中低声思考；克制、真诚、有停顿，不模仿任何演员。" },
  },
  {
    id: "oz-home",
    voice: "An original hopeful young girl character, around ten years old, bright, sincere and emotionally grounded. Fictional voice only; do not imitate any performer or real child.",
    en: { text: "There is no place like home.", style: "Say it as a small, certain discovery after a long adventure: warm, relieved and completely natural, never sing-song." },
    zh: { text: "再也没有比家更好的地方了。", style: "自然的普通话儿童对白。像远行后终于明白家的珍贵，温暖、释然、笃定，不要卡通腔。" },
  },
  {
    id: "quixote-identity",
    voice: "An original elderly male wandering knight with a dry, weathered tenor, proud posture and lively conviction. Fictional character only; no actor imitation.",
    en: { text: "I know who I am.", style: "Deliver it with unshakeable, slightly eccentric dignity. A brief breath, then a proud final certainty; believable dialogue, not parody." },
    zh: { text: "我知道我是谁。", style: "自然的普通话老人对白，像一位固执而高贵的老骑士，语气笃定又略带奇想；不要搞笑模仿。" },
  },
  {
    id: "monte-cristo-hope",
    voice: "An original adult male survivor with a refined, low voice, measured authority and hard-won compassion. Distinct fictional speaker; no actor imitation.",
    en: { text: "Wait and hope.", style: "Two balanced beats, spoken after enduring years of hardship. Calm, grave and quietly encouraging; cinematic but never like a trailer." },
    zh: { text: "等待，并心怀希望。", style: "自然的普通话成年男性对白，像经历漫长磨难后给出的忠告。沉稳、克制、带着来之不易的希望。" },
  },
  {
    id: "dante-gate",
    voice: "An original ancient elderly female gatekeeper, resonant contralto, severe, timeless and commanding, with a stone-hall presence. Not based on any real person.",
    en: { text: "All hope abandon, you who enter here.", style: "A timeless warning carved into a gate. Slow, austere and inevitable, with clear diction and no monster effects." },
    zh: { text: "进入此地的人，放弃一切希望。", style: "自然的普通话年长女性警示，低沉、庄严、不可违逆，像石门上的古老铭文；不要怪物特效。" },
  },
  {
    id: "faust-moment",
    voice: "An original elderly male scholar with a gentle rasp, intellectual precision and sudden wonder. Fictional voice only; do not resemble any actor.",
    en: { text: "Stay, moment—you are so beautiful!", style: "Begin as an involuntary whisper of wonder, then open into heartfelt amazement. Old but alive, lyrical without singing." },
    zh: { text: "停一停吧，瞬间——你是如此美丽！", style: "自然的普通话老年男性独白，从惊叹的低语逐渐打开，带学者气质和真挚感动；不要朗诵腔。" },
  },
  {
    id: "anna-families",
    voice: "An original adult female literary narrator, warm mezzo voice, observant, poised and touched by melancholy. No resemblance to a real narrator or actor.",
    en: { text: "Happy families are all alike; every unhappy family is unhappy in its own way.", style: "An incisive opening observation. Calm, lucid and humane, with a subtle shadow on the second half; natural storytelling." },
    zh: { text: "幸福的家庭都是相似的；不幸的家庭各有各的不幸。", style: "自然的普通话成年女性叙述，清醒、平静而有人情味，后半句略带阴影；不要新闻播报腔。" },
  },
  {
    id: "three-kingdoms-oath",
    voice: "An original mature male warlord, controlled bass-baritone, sharp intelligence and dangerous self-belief. Fictional historical character; no actor imitation.",
    en: { text: "I would rather betray the world than let the world betray me.", style: "A chilling personal creed, spoken with calm conviction rather than shouting. Let the final words land like a verdict." },
    zh: { text: "宁教我负天下人，休教天下人负我。", style: "自然的普通话成熟男性古装对白，冷静、强势、毫不犹豫，结尾像判词落下；不模仿任何影视演员。" },
  },
  {
    id: "pillow-dawn",
    voice: "An original young adult female court diarist, light clear voice, attentive, graceful and quietly delighted by small details. No imitation of any real person.",
    en: { text: "In spring, the dawn.", style: "A tiny observation filled with fresh morning light. Delicate, unhurried and intimate, as if noting a private favorite." },
    zh: { text: "春天，最美是破晓时分。", style: "自然的普通话年轻女性低声叙述，轻盈、细腻、带着清晨初光的喜悦；不要古装配音腔。" },
  },
  {
    id: "gita-time",
    voice: "An original ageless elderly female cosmic guide, deep contralto, serene, immense and compassionate beneath the power. Fictional voice; no real-person imitation.",
    en: { text: "I am Time, grown vast, bringing worlds to an end.", style: "Immense certainty without yelling. Slow, spacious and solemn, allowing the scale of each phrase to unfold naturally." },
    zh: { text: "我是时间，浩瀚无边，令诸世界走向终结。", style: "自然的普通话年长女性庄严对白，宏大但不喊叫，缓慢、辽阔、平静，给每个短句留下空间。" },
  },
  {
    id: "pessoa-soul",
    voice: "An original elderly female Atlantic poet, soft smoky alto, reflective, resilient and quietly luminous. Fictional voice only; no real-person imitation.",
    en: { text: "Everything is worthwhile when the soul is not small.", style: "Speak as a hard-earned maxim beside the sea: reflective at first, then gently resolute. Natural and understated." },
    zh: { text: "只要灵魂不渺小，一切都值得。", style: "自然的普通话老年女性诗性对白，像在海边说出一条历经岁月的箴言；先沉思，后坚定，不要朗诵腔。" },
  },
  {
    id: "hong-gildong-father",
    voice: "An original teenage male outcast hero, around sixteen, clear youthful voice with restrained hurt, courage and rising defiance. No actor or real-person imitation.",
    en: { text: "Why can I not call my father Father, or my brother Brother?", style: "Begin with wounded disbelief, then let the second question rise into controlled defiance. Young, sincere and never melodramatic." },
    zh: { text: "为什么我不能称父亲为父亲，称兄长为兄长？", style: "自然的普通话少年男性对白，从受伤和不解开始，第二问逐渐转为克制的反抗；真诚，不要过度煽情。" },
  },
];

const dnsCache = new Map();
const resolveHost = (hostname) => {
  if (dnsCache.has(hostname)) return dnsCache.get(hostname);
  const answer = execFileSync("dig", ["+time=5", "+tries=1", "+short", hostname, "@1.1.1.1"], { encoding: "utf8" });
  const address = answer.split(/\s+/).find((value) => /^\d{1,3}(?:\.\d{1,3}){3}$/.test(value));
  if (!address) throw new Error(`Could not resolve ${hostname} through the fallback DNS resolver.`);
  dnsCache.set(hostname, address);
  return address;
};

const curl = (url, { method = "GET", body, authenticated = true, binary = false } = {}) => {
  const hostname = new URL(url).hostname;
  const args = [
    "--silent", "--show-error", "--location", "--fail-with-body",
    "--connect-timeout", "20", "--max-time", "180",
    "--resolve", `${hostname}:443:${resolveHost(hostname)}`,
  ];
  if (authenticated) args.push("--header", `Authorization: Bearer ${token}`);
  if (body !== undefined) {
    args.push("--header", "Content-Type: application/json", "--request", method, "--data-binary", "@-");
  }
  args.push(url);
  const result = spawnSync("curl", args, {
    input: body === undefined ? undefined : JSON.stringify(body),
    maxBuffer: 50 * 1024 * 1024,
    encoding: binary ? null : "utf8",
  });
  if (result.status !== 0) {
    const detail = Buffer.isBuffer(result.stderr) ? result.stderr.toString() : result.stderr;
    throw new Error(`Replicate transport failed: ${String(detail).slice(0, 500)}`);
  }
  return result.stdout;
};

const createPrediction = async (input) => {
  let prediction;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      prediction = JSON.parse(curl(`https://api.replicate.com/v1/models/${model}/predictions`, {
        method: "POST",
        body: { input },
      }));
      break;
    } catch (error) {
      const rateLimited = error instanceof Error && error.message.includes("429");
      if (!rateLimited || attempt === 4) throw error;
      const delaySeconds = attempt * 20;
      console.log(`rate limited: retrying in ${delaySeconds}s (${attempt}/4)`);
      await new Promise((resolveWait) => setTimeout(resolveWait, delaySeconds * 1000));
    }
  }
  if (!prediction) throw new Error("Replicate did not return a prediction.");
  while (["starting", "processing"].includes(prediction.status)) {
    await new Promise((resolveWait) => setTimeout(resolveWait, 1500));
    prediction = JSON.parse(curl(prediction.urls.get));
  }
  if (prediction.status !== "succeeded" || typeof prediction.output !== "string") {
    throw new Error(`Prediction ${prediction.id ?? "unknown"} ended with status ${prediction.status}: ${prediction.error ?? "no output"}`);
  }
  return prediction.output;
};

const downloadAndConvert = async (url, destination) => {
  const input = curl(url, { authenticated: false, binary: true });
  const converted = spawnSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error",
    "-i", "pipe:0",
    "-ac", "1",
    "-ar", "44100",
    "-c:a", "pcm_s16le",
    "-y", destination,
  ], { input, maxBuffer: 20 * 1024 * 1024 });
  if (converted.status !== 0) {
    throw new Error(`ffmpeg failed for ${destination}: ${converted.stderr?.toString().slice(0, 500)}`);
  }
};

await mkdir(outputDirectory, { recursive: true });
const manifest = { model, mode: "voice_design", generatedAt: new Date().toISOString(), files: [] };

for (const job of jobs) {
  for (const language of ["en", "zh"]) {
    const destination = resolve(outputDirectory, `qwen-${job.id}-${language}.wav`);
    if (existsSync(destination) && statSync(destination).size > 10_000) {
      console.log(`skip ${job.id}-${language}: output already exists`);
      manifest.files.push({ id: job.id, language, file: destination, skipped: true });
      continue;
    }
    console.log(`generate ${job.id}-${language}`);
    const outputUrl = await createPrediction({
      mode: "voice_design",
      text: job[language].text,
      language: "auto",
      voice_description: job.voice,
      style_instruction: job[language].style,
    });
    await downloadAndConvert(outputUrl, destination);
    manifest.files.push({ id: job.id, language, file: destination, skipped: false });
    console.log(`saved ${job.id}-${language}`);
  }
}

await writeFile(resolve("artifacts/replicate-voice-generation.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`complete: ${manifest.files.length} spoken assets generated without exposing the API token`);
