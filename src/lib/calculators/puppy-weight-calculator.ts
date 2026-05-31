import Decimal from 'decimal.js';

export function calculatePuppyWeight(inputs: Record<string, unknown>) {
  const currentWeightKg = new Decimal(Number(inputs.currentWeightKg));
  const currentAgeWeeks = new Decimal(Number(inputs.currentAgeWeeks));
  const sizeCategory = String(inputs.sizeCategory || 'medium');

  if (currentWeightKg.lte(0)) throw new Error('Current weight must be positive');
  if (currentAgeWeeks.lte(0) || currentAgeWeeks.gt(52)) throw new Error('Age must be between 1 and 52 weeks');

  // Projected adult weight = (current weight / current age in weeks) × growth weeks to maturity
  const growthWeeks: Record<string, number> = { toy: 26, small: 26, medium: 36, large: 52, giant: 78 };
  const maturityWeeks = new Decimal(growthWeeks[sizeCategory] ?? 36);

  const weeklyGrowthRate = currentWeightKg.div(currentAgeWeeks);
  const projectedKg = weeklyGrowthRate.times(maturityWeeks);

  // Clamp to realistic bounds
  const clampedKg = Decimal.max(0.5, Decimal.min(projectedKg, 100));

  const projectedLbs = clampedKg.times(2.20462);
  const currentLbs = currentWeightKg.times(2.20462);
  const weeksToMaturity = Decimal.max(0, maturityWeeks.minus(currentAgeWeeks));

  return {
    projectedWeightKg: parseFloat(clampedKg.toFixed(1)),
    projectedWeightLbs: parseFloat(projectedLbs.toFixed(1)),
    currentWeightLbs: parseFloat(currentLbs.toFixed(1)),
    weeksToMaturity: parseFloat(weeksToMaturity.toFixed(0)),
    maturityWeeks: parseFloat(maturityWeeks.toFixed(0)),
  };
}
