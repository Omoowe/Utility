import Decimal from 'decimal.js';

export interface BmiInputs {
  weightKg: number;
  heightCm: number;
}

export interface BmiOutput {
  bmi: number;
  category: string;
  healthyWeightMin: number;
  healthyWeightMax: number;
}

export function calculateBmi(inputs: BmiInputs): BmiOutput {
  const weight = new Decimal(inputs.weightKg);
  const heightM = new Decimal(inputs.heightCm).div(100);

  if (weight.lte(0)) throw new Error('Weight must be positive');
  if (heightM.lte(0)) throw new Error('Height must be positive');

  const bmi = weight.div(heightM.pow(2));

  let category: string;
  const bmiNum = parseFloat(bmi.toFixed(1));
  if (bmiNum < 18.5) category = 'Underweight';
  else if (bmiNum < 25) category = 'Normal weight';
  else if (bmiNum < 30) category = 'Overweight';
  else category = 'Obese';

  const healthyWeightMin = new Decimal('18.5').times(heightM.pow(2));
  const healthyWeightMax = new Decimal('24.9').times(heightM.pow(2));

  return {
    bmi: bmiNum,
    category,
    healthyWeightMin: parseFloat(healthyWeightMin.toFixed(1)),
    healthyWeightMax: parseFloat(healthyWeightMax.toFixed(1)),
  };
}
