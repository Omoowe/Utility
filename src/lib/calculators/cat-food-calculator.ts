import Decimal from 'decimal.js';

// MER multipliers based on NRC/veterinary guidelines
const LIFE_STAGE_FACTORS: Record<string, number> = {
  'kitten':        2.5,
  'adult-indoor':  1.0,
  'adult-outdoor': 1.4,
  'pregnant':      1.6,
  'senior':        1.1,
  'obese-prone':   0.8,
};

export function calculateCatFood(inputs: Record<string, unknown>) {
  const weightKg = new Decimal(Number(inputs.weightKg));
  const lifeStage = String(inputs.lifeStage || 'adult-indoor');

  if (weightKg.lte(0)) throw new Error('Weight must be positive');

  // RER = 70 × weight(kg)^0.75
  const rer = new Decimal(70).times(weightKg.pow(new Decimal('0.75')));
  const factor = new Decimal(LIFE_STAGE_FACTORS[lifeStage] ?? 1.0);
  const dailyCalories = rer.times(factor);

  // Dry food ≈ 350 kcal/100g; wet food ≈ 90 kcal/100g
  const dryFoodGrams = dailyCalories.div(350).times(100);
  const wetFoodGrams = dailyCalories.div(90).times(100);

  return {
    dailyCalories: parseFloat(dailyCalories.toFixed(0)),
    dryFoodGrams: parseFloat(dryFoodGrams.toFixed(0)),
    wetFoodGrams: parseFloat(wetFoodGrams.toFixed(0)),
  };
}
