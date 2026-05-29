import Decimal from 'decimal.js';

export interface WaterIntakeInputs {
  weightLbs: number;
  activityLevel: string;
}

export interface WaterIntakeOutput {
  dailyOunces: number;
  dailyCups: number;
  dailyLiters: number;
  dailyMilliliters: number;
}

const ACTIVITY_ADDITIONS: Record<string, number> = {
  sedentary: 0,
  light: 12,
  moderate: 24,
  active: 36,
  veryActive: 48,
};

export function calculateWaterIntake(inputs: WaterIntakeInputs): WaterIntakeOutput {
  const weight = new Decimal(inputs.weightLbs);
  const activityAdd = new Decimal(ACTIVITY_ADDITIONS[inputs.activityLevel] || 0);

  if (weight.lte(0)) throw new Error('Weight must be positive');

  // Base: weight(lbs) * 0.5 oz/day + activity addition
  const dailyOunces = weight.times(new Decimal('0.5')).plus(activityAdd);
  const dailyCups = dailyOunces.div(8);
  const dailyLiters = dailyOunces.times(new Decimal('0.0295735'));
  const dailyMilliliters = dailyLiters.times(1000);

  return {
    dailyOunces: parseFloat(dailyOunces.toFixed(1)),
    dailyCups: parseFloat(dailyCups.toFixed(1)),
    dailyLiters: parseFloat(dailyLiters.toFixed(2)),
    dailyMilliliters: parseFloat(dailyMilliliters.toFixed(0)),
  };
}
