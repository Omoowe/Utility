const TO_GRAMS: Record<string, number> = {
  milligram: 0.001,
  gram: 1,
  kilogram: 1000,
  ounce: 28.3495,
  pound: 453.592,
  stone: 6350.29,
  'metric-ton': 1_000_000,
};

export function calculateWeightConverter(inputs: Record<string, unknown>) {
  const value = Number(inputs.value);
  const fromUnit = String(inputs.fromUnit ?? 'kilogram');

  if (isNaN(value) || value < 0) throw new Error('Enter a valid non-negative weight');

  const grams = value * (TO_GRAMS[fromUnit] ?? 1);

  return {
    milligrams: parseFloat((grams / TO_GRAMS.milligram).toFixed(2)),
    grams: parseFloat(grams.toFixed(4)),
    kilograms: parseFloat((grams / TO_GRAMS.kilogram).toFixed(6)),
    ounces: parseFloat((grams / TO_GRAMS.ounce).toFixed(4)),
    pounds: parseFloat((grams / TO_GRAMS.pound).toFixed(4)),
    stone: parseFloat((grams / TO_GRAMS.stone).toFixed(6)),
    metricTons: parseFloat((grams / TO_GRAMS['metric-ton']).toFixed(8)),
  };
}
