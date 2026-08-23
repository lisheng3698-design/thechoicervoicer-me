import { describe, expect, it } from "vitest";
import { scorePerformance, type PerformanceProfile } from "./scoring";

const reference: PerformanceProfile = {
  durationMs: 2400,
  energy: [0.08, 0.22, 0.46, 0.7, 0.62, 0.38, 0.14],
  pitchHz: [196, 210, 228, 247, 262, 277, 294],
};

describe("scorePerformance", () => {
  it("rewards a close repeat with a high, stable score", () => {
    const repeat = {
      durationMs: 2470,
      energy: [0.09, 0.2, 0.44, 0.67, 0.6, 0.36, 0.13],
      pitchHz: [198, 212, 230, 249, 265, 279, 296],
    };

    const result = scorePerformance(reference, repeat);

    expect(result.total).toBeGreaterThanOrEqual(88);
    expect(result.breakdown.duration).toBeGreaterThanOrEqual(90);
    expect(result.breakdown.energy).toBeGreaterThanOrEqual(90);
    expect(result.breakdown.pitch).toBeGreaterThanOrEqual(90);
  });

  it("judges the contour fairly across naturally different vocal registers", () => {
    const higherVoice = {
      durationMs: 2400,
      energy: reference.energy,
      pitchHz: reference.pitchHz.map((pitch) => pitch * 2),
    };

    const result = scorePerformance(reference, higherVoice);

    expect(result.total).toBeGreaterThanOrEqual(90);
    expect(result.breakdown.pitch).toBeGreaterThanOrEqual(80);
  });

  it("penalizes a short, flat performance with the wrong pitch movement", () => {
    const mismatch = {
      durationMs: 900,
      energy: [0.5, 0.5, 0.5],
      pitchHz: [294, 270, 245, 220, 196],
    };

    const result = scorePerformance(reference, mismatch);

    expect(result.total).toBeLessThan(50);
  });
});
