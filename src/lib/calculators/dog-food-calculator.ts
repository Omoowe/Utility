import Decimal from 'decimal.js';

// MER multipliers based on AAFCO/veterinary guidelines
const LIFE_STAGE_FACTORS: Record<string, number> = {
  'puppy':    2.0,   // 4–12 months
  'adult':    1.6,   // neutered adult
  'active':   2.0,   // active / working adult
  'senior':   1.4,   // 7+ years
  'pregnant': 3.0,   // pregnant dog
};

export function calculateDogFood(inputs: Record<string, unknown>) {
  const weightKg = new Decimal(Number(inputs.weightKg));
  const lifeStage = String(inputs.lifeStage || 'adult');
  const foodCalsPer100g = new Decimal(Number(inputs.foodCalsPer100g || 350));

  if (weightKg.lte(0)) throw new Error('Weight must be positive');
  if (foodCalsPer100g.lte(0)) throw new Error('Food calorie density must be positive');

  // RER = 70 × weight(kg)^0.75
  const rer = new Decimal(70).times(weightKg.pow(new Decimal('0.75')));
  const factor = new Decimal(LIFE_STAGE_FACTORS[lifeStage] ?? 1.6);
  const dailyCalories = rer.times(factor);
  const dailyGrams = dailyCalories.div(foodCalsPer100g).times(100);
  // 1 cup dry kibble ≈ 113 g
  const dailyCups = dailyGrams.div(113);

  return {
    dailyCalories: parseFloat(dailyCalories.toFixed(0)),
    dailyGrams: parseFloat(dailyGrams.toFixed(0)),
    dailyCups: parseFloat(dailyCups.toFixed(2)),
    rerCalories: parseFloat(rer.toFixed(0)),
  };
}
