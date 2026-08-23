export interface PerformanceProfile {
  durationMs: number;
  energy: number[];
  pitchHz: number[];
}

export interface PerformanceScore {
  total: number;
  breakdown: {
    duration: number;
    energy: number;
    pitch: number;
  };
}

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

const mean = (values: number[]) =>
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;

const resample = (values: number[], length: number) => {
  if (length <= 0 || values.length === 0) return [];
  if (values.length === 1) return Array.from({ length }, () => values[0]);

  return Array.from({ length }, (_, index) => {
    const position = (index * (values.length - 1)) / Math.max(1, length - 1);
    const left = Math.floor(position);
    const right = Math.min(values.length - 1, Math.ceil(position));
    const mix = position - left;
    return values[left] * (1 - mix) + values[right] * mix;
  });
};

const curveSimilarity = (reference: number[], attempt: number[]) => {
  if (!reference.length || !attempt.length) return 0;
  const size = Math.min(32, Math.max(reference.length, attempt.length));
  const a = resample(reference, size);
  const b = resample(attempt, size);
  const scale = Math.max(0.08, ...a, ...b);
  const error = mean(a.map((value, index) => Math.abs(value - b[index]) / scale));
  return clamp(100 * (1 - error * 1.35));
};

const pitchSimilarity = (reference: number[], attempt: number[]) => {
  const aVoiced = reference.filter((value) => value > 40);
  const bVoiced = attempt.filter((value) => value > 40);
  if (!aVoiced.length || !bVoiced.length) return 0;

  const size = Math.min(32, Math.max(aVoiced.length, bVoiced.length));
  const a = resample(aVoiced, size).map((value) => Math.log2(value));
  const b = resample(bVoiced, size).map((value) => Math.log2(value));
  const aCenter = mean(a);
  const bCenter = mean(b);
  const contourError = mean(
    a.map((value, index) => Math.abs(value - aCenter - (b[index] - bCenter))),
  );
  const registerError = Math.abs(aCenter - bCenter);
  return clamp(100 - contourError * 210 - registerError * 15);
};

export function scorePerformance(
  reference: PerformanceProfile,
  attempt: PerformanceProfile,
): PerformanceScore {
  const referenceDuration = Math.max(1, reference.durationMs);
  const durationError = Math.abs(attempt.durationMs - referenceDuration) / referenceDuration;
  const duration = clamp(100 - durationError * 135);
  const energy = curveSimilarity(reference.energy, attempt.energy);
  const pitch = pitchSimilarity(reference.pitchHz, attempt.pitchHz);
  const total = clamp(duration * 0.25 + energy * 0.35 + pitch * 0.4);

  return {
    total: Math.round(total),
    breakdown: {
      duration: Math.round(duration),
      energy: Math.round(energy),
      pitch: Math.round(pitch),
    },
  };
}
