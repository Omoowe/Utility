export function calculateHeartRateZones(inputs: Record<string, unknown>) {
  const age = Number(inputs.age);
  const restingHR = Number(inputs.restingHR || 60);

  if (age < 1 || age > 120) throw new Error('Age must be between 1 and 120');
  if (restingHR < 30 || restingHR > 120) throw new Error('Resting HR must be between 30 and 120 bpm');

  // Fox formula: max HR = 220 − age
  const maxHR = 220 - age;
  const hrr = maxHR - restingHR; // Heart Rate Reserve (Karvonen)

  const karvonen = (pct: number) => Math.round(restingHR + hrr * pct);
  const pct = (p: number) => Math.round(maxHR * p);

  return {
    maxHR,
    zone1: `${pct(0.50)}–${pct(0.60)} bpm`,
    zone2: `${pct(0.60)}–${pct(0.70)} bpm`,
    zone3: `${pct(0.70)}–${pct(0.80)} bpm`,
    zone4: `${pct(0.80)}–${pct(0.90)} bpm`,
    zone5: `${pct(0.90)}–${maxHR} bpm`,
    // Karvonen (target HR) for moderate aerobic (60–70% HRR)
    karvonenTarget: `${karvonen(0.60)}–${karvonen(0.70)} bpm`,
  };
}
