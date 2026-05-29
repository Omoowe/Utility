import Decimal from 'decimal.js';

export interface CalorieInputs {
  weightKg: number;
  heightCm: number;
  age: number;
  gender: string;
  activityLevel: string;
}

export interface CalorieOutput {
  bmr: number;
  tdee: number;
  weightLoss: number;
  weightGain: number;
}

const ACTIVITY_FACTORS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export function calculateCalories(inputs: CalorieInputs): CalorieOutput {
  const weight = new Decimal(inputs.weightKg);
  const height = new Decimal(inputs.heightCm);
  const age = new Decimal(inputs.age);
  const activityFactor = new Decimal(ACTIVITY_FACTORS[inputs.activityLevel] || 1.55);

  if (weight.lte(0)) throw new Error('Weight must be positive');
  if (height.lte(0)) throw new Error('Height must be positive');
  if (age.lte(0)) throw new Error('Age must be positive');

  // Mifflin-St Jeor equation
  let bmr: Decimal;
  if (inputs.gender === 'female') {
    bmr = weight.times(10).plus(height.times(6.25)).minus(age.times(5)).minus(161);
  } else {
    bmr = weight.times(10).plus(height.times(6.25)).minus(age.times(5)).plus(5);
  }

  const tdee = bmr.times(activityFactor);
  const weightLoss = tdee.minus(500);
  const weightGain = tdee.plus(500);

  return {
    bmr: parseFloat(bmr.toFixed(0)),
    tdee: parseFloat(tdee.toFixed(0)),
    weightLoss: parseFloat(weightLoss.toFixed(0)),
    weightGain: parseFloat(weightGain.toFixed(0)),
  };
}
