export function rootMeanSquare(samples: Float32Array) {
  if (!samples.length) return 0;
  let sum = 0;
  for (const sample of samples) sum += sample * sample;
  return Math.sqrt(sum / samples.length);
}

export function detectPitch(samples: Float32Array, sampleRate: number) {
  const rms = rootMeanSquare(samples);
  if (rms < 0.012) return 0;

  const minimumLag = Math.floor(sampleRate / 600);
  const maximumLag = Math.min(Math.floor(sampleRate / 70), samples.length - 1);
  let bestLag = 0;
  let bestCorrelation = 0;

  for (let lag = minimumLag; lag <= maximumLag; lag += 1) {
    let correlation = 0;
    let normalizer = 0;
    for (let index = 0; index < samples.length - lag; index += 2) {
      correlation += samples[index] * samples[index + lag];
      normalizer += samples[index] * samples[index] + samples[index + lag] * samples[index + lag];
    }
    const normalized = normalizer ? (2 * correlation) / normalizer : 0;
    if (normalized > bestCorrelation) {
      bestCorrelation = normalized;
      bestLag = lag;
    }
  }

  return bestCorrelation > 0.45 && bestLag ? sampleRate / bestLag : 0;
}
