import Decimal from 'decimal.js';

export interface ProteinIntakeInputs {
  weightKg: number;
  activityLevel: string;
  goal: string;
}

export interface ProteinIntakeOutput {
  minProteinG: number;
  maxProteinG: number;
  recommendedProteinG: number;
  gramsPerMeal: number;
}

const MULTIPLIERS: Record<string, { min: number; max: number; rec: number }> = {
  sedentary:   { min: 0.8,  max: 1.0,  rec: 0.8 },
  light:       { min: 1.0,  max: 1.4,  rec: 1.2 },
  moderate:    { min: 1.2,  max: 1.6,  rec: 1.4 },
  active:      { min: 1.4,  max: 1.8,  rec: 1.6 },
  veryActive:  { min: 1.6,  max: 2.2,  rec: 2.0 },
};

const GOAL_BONUS: Record<string, number> = {
  maintain: 0,
  lose:     0.1,
  gain:     0.3,
};

export function calculateProteinIntake(inputs: ProteinIntakeInputs): ProteinIntakeOutput {
  const weight = new Decimal(inputs.weightKg);
  if (weight.lte(0)) throw new Error('Weight must be positive');

  const mult = MULTIPLIERS[inputs.activityLevel] || MULTIPLIERS.moderate;
  const bonus = GOAL_BONUS[inputs.goal] || 0;

  const minProteinG = weight.times(mult.min);
  const maxProteinG = weight.times(mult.max + bonus);
  const recommendedProteinG = weight.times(mult.rec + bonus);
  const gramsPerMeal = recommendedProteinG.div(3);

  return {
    minProteinG: parseFloat(minProteinG.toFixed(0)),
    maxProteinG: parseFloat(maxProteinG.toFixed(0)),
    recommendedProteinG: parseFloat(recommendedProteinG.toFixed(0)),
    gramsPerMeal: parseFloat(gramsPerMeal.toFixed(0)),
  };
}
