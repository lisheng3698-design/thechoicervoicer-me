import { mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const outputDirectory = resolve("public/audio");

const performances = [
  { file: "rocket-hello-en.wav", voice: "Samantha", rate: "180", text: "Hello! Can you hear me up there?" },
  { file: "rocket-hello-zh.wav", voice: "Tingting", rate: "175", text: "你好！上面能听见我吗？" },
  { file: "robot-roll-call-en.wav", voice: "Daniel", rate: "155", text: "Ready. Steady. Hold your course." },
  { file: "robot-roll-call-zh.wav", voice: "Tingting", rate: "150", text: "就位。稳定。保持航线。" },
  { file: "villain-giggle-en.wav", voice: "Fred", rate: "125", text: "At last... the throne is mine!" },
  { file: "villain-giggle-zh.wav", voice: "Meijia", rate: "130", text: "终于……王座属于我了！" },
  { file: "gentle-signoff-en.wav", voice: "Daniel", rate: "135", text: "Until tomorrow. Keep the lights burning." },
  { file: "gentle-signoff-zh.wav", voice: "Tingting", rate: "140", text: "明天再见。别让灯熄灭。" },
];

if (process.platform !== "darwin") {
  throw new Error("Spoken demo generation currently requires the macOS `say` command. The generated WAV files are committed as static assets for deployment.");
}

await mkdir(outputDirectory, { recursive: true });

for (const performance of performances) {
  execFileSync("/usr/bin/say", [
    "-v", performance.voice,
    "-r", performance.rate,
    "-o", resolve(outputDirectory, performance.file),
    "--file-format=WAVE",
    "--data-format=LEI16@44100",
    performance.text,
  ]);
}

console.log(`Generated ${performances.length} spoken dialogue WAV files in ${outputDirectory}`);
