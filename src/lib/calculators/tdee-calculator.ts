import Decimal from 'decimal.js';

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary:     1.2,
  light:         1.375,
  moderate:      1.55,
  active:        1.725,
  'very-active': 1.9,
};

export function calculateTdee(inputs: Record<string, unknown>) {
  const weightKg = new Decimal(Number(inputs.weightKg));
  const heightCm = new Decimal(Number(inputs.heightCm));
  const age = new Decimal(Number(inputs.age));
  const sex = String(inputs.sex || 'male');
  const activityLevel = String(inputs.activityLevel || 'moderate');
  const goal = String(inputs.goal || 'maintain');

  if (weightKg.lte(0) || weightKg.gt(500)) throw new Error('Weight must be between 1 and 500 kg');
  if (heightCm.lte(0) || heightCm.gt(300)) throw new Error('Height must be between 1 and 300 cm');
  if (age.lte(0) || age.gt(120)) throw new Error('Age must be between 1 and 120');

  // Mifflin-St Jeor BMR formula
  let bmr: Decimal;
  if (sex === 'male') {
    bmr = new Decimal(10).times(weightKg)
      .plus(new Decimal(6.25).times(heightCm))
      .minus(new Decimal(5).times(age))
      .plus(5);
  } else {
    bmr = new Decimal(10).times(weightKg)
      .plus(new Decimal(6.25).times(heightCm))
      .minus(new Decimal(5).times(age))
      .minus(161);
  }

  const multiplier = new Decimal(ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.55);
  const tdee = bmr.times(multiplier);

  const weightLossCalories = tdee.minus(500);
  const aggressiveWeightLoss = tdee.minus(1000);
  const weightGainCalories = tdee.plus(300);

  let targetCalories: Decimal;
  if (goal === 'lose') targetCalories = weightLossCalories;
  else if (goal === 'gain') targetCalories = weightGainCalories;
  else targetCalories = tdee;

  // Macro split (40% carbs, 30% protein, 30% fat) for target calories
  const proteinG = targetCalories.times(0.30).div(4);
  const carbsG = targetCalories.times(0.40).div(4);
  const fatG = targetCalories.times(0.30).div(9);

  return {
    bmr: parseFloat(bmr.toFixed(0)),
    tdee: parseFloat(tdee.toFixed(0)),
    targetCalories: parseFloat(targetCalories.toFixed(0)),
    weightLossCalories: parseFloat(weightLossCalories.toFixed(0)),
    aggressiveWeightLoss: parseFloat(aggressiveWeightLoss.toFixed(0)),
    weightGainCalories: parseFloat(weightGainCalories.toFixed(0)),
    proteinG: parseFloat(proteinG.toFixed(0)),
    carbsG: parseFloat(carbsG.toFixed(0)),
    fatG: parseFloat(fatG.toFixed(0)),
  };
}
