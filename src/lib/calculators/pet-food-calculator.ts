import Decimal from 'decimal.js';

export interface PetFoodInputs {
  petWeightKg: number;
  activityLevel: string;
  foodCaloriesPer100g: number;
}

export interface PetFoodOutput {
  dailyCalories: number;
  dailyGrams: number;
  dailyCups: number;
}

const ACTIVITY_FACTORS: Record<string, number> = {
  low:      70,
  moderate: 85,
  active:   100,
  veryActive: 120,
};

export function calculatePetFood(inputs: PetFoodInputs): PetFoodOutput {
  const weight = new Decimal(inputs.petWeightKg);
  const activityFactor = new Decimal(ACTIVITY_FACTORS[inputs.activityLevel] || 85);
  const caloriesPer100g = new Decimal(inputs.foodCaloriesPer100g || 350);

  if (weight.lte(0)) throw new Error('Weight must be positive');
  if (caloriesPer100g.lte(0)) throw new Error('Calories per 100g must be positive');

  // RER = 70 * weight^0.75; then multiply by activity factor / 70 as ratio
  const rer = new Decimal(70).times(weight.pow(new Decimal('0.75')));
  const dailyCalories = rer.times(activityFactor).div(70);
  const dailyGrams = dailyCalories.div(caloriesPer100g).times(100);
  // 1 cup ≈ 113g dry kibble
  const dailyCups = dailyGrams.div(113);

  return {
    dailyCalories: parseFloat(dailyCalories.toFixed(0)),
    dailyGrams: parseFloat(dailyGrams.toFixed(0)),
    dailyCups: parseFloat(dailyCups.toFixed(2)),
  };
}
