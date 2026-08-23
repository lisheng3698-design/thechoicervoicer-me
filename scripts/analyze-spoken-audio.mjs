import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const files = process.argv.slice(2);
if (!files.length) throw new Error("Pass one or more PCM WAV paths to analyze.");

const rootMeanSquare = (samples) => {
  let sum = 0;
  for (const sample of samples) sum += sample * sample;
  return samples.length ? Math.sqrt(sum / samples.length) : 0;
};

const detectPitch = (samples, sampleRate) => {
  if (rootMeanSquare(samples) < 0.012) return 0;
  const minimumLag = Math.floor(sampleRate / 600);
  const maximumLag = Math.min(Math.floor(sampleRate / 70), samples.length - 1);
  let bestLag = 0;
  let bestCorrelation = 0;
  for (let lag = minimumLag; lag <= maximumLag; lag += 1) {
    let correlation = 0;
    let normalizer = 0;
    for (let index = 0; index < samples.length - lag; index += 2) {
      correlation += samples[index] * samples[index + lag];
      normalizer += samples[index] ** 2 + samples[index + lag] ** 2;
    }
    const normalized = normalizer ? (2 * correlation) / normalizer : 0;
    if (normalized > bestCorrelation) {
      bestCorrelation = normalized;
      bestLag = lag;
    }
  }
  return bestCorrelation > 0.45 && bestLag ? sampleRate / bestLag : 0;
};

const resample = (values, length = 12) => Array.from({ length }, (_, index) => {
  const position = index * Math.max(0, values.length - 1) / Math.max(1, length - 1);
  const left = Math.floor(position);
  const right = Math.min(values.length - 1, Math.ceil(position));
  const mix = position - left;
  return Number((values[left] * (1 - mix) + values[right] * mix).toFixed(4));
});

const resampleNearest = (values, length = 12) => Array.from({ length }, (_, index) => {
  const position = index * Math.max(0, values.length - 1) / Math.max(1, length - 1);
  return values[Math.round(position)];
});

const readPcmWav = (path) => {
  const buffer = readFileSync(path);
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WAVE") {
    throw new Error(`${path} is not a RIFF/WAVE file.`);
  }
  let offset = 12;
  let sampleRate = 0;
  let channels = 0;
  let bitsPerSample = 0;
  let dataStart = 0;
  let dataSize = 0;
  while (offset + 8 <= buffer.length) {
    const id = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (id === "fmt ") {
      channels = buffer.readUInt16LE(start + 2);
      sampleRate = buffer.readUInt32LE(start + 4);
      bitsPerSample = buffer.readUInt16LE(start + 14);
    }
    if (id === "data") {
      dataStart = start;
      dataSize = size;
      break;
    }
    offset = start + size + (size % 2);
  }
  if (!dataStart || bitsPerSample !== 16 || channels !== 1) {
    throw new Error(`${path} must be mono 16-bit PCM WAV.`);
  }
  const sampleCount = dataSize / 2;
  const samples = new Float32Array(sampleCount);
  for (let index = 0; index < sampleCount; index += 1) {
    samples[index] = buffer.readInt16LE(dataStart + index * 2) / 32768;
  }
  return { sampleRate, samples };
};

for (const file of files) {
  const { sampleRate, samples } = readPcmWav(resolve(file));
  const windowSize = 2048;
  const step = Math.round(sampleRate * 0.08);
  const energy = [];
  const pitchHz = [];
  for (let offset = 0; offset + windowSize <= samples.length; offset += step) {
    const window = samples.subarray(offset, offset + windowSize);
    energy.push(Number(rootMeanSquare(window).toFixed(4)));
    pitchHz.push(Math.round(detectPitch(window, sampleRate)));
  }
  console.log(JSON.stringify({
    file,
    durationMs: Math.round(samples.length / sampleRate * 1000),
    energy: resample(energy),
    pitchHz: resampleNearest(pitchHz),
  }));
}
