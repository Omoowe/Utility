import Decimal from 'decimal.js';

export interface PercentageIncreaseInputs {
  oldValue: number;
  newValue: number;
}

export interface PercentageIncreaseOutput {
  percentageChange: number;
  absoluteChange: number;
  finalValue: number;
}

export function calculatePercentageIncrease(inputs: PercentageIncreaseInputs): PercentageIncreaseOutput {
  const oldVal = new Decimal(inputs.oldValue);
  const newVal = new Decimal(inputs.newValue);

  if (oldVal.eq(0)) throw new Error('Old value cannot be zero');

  const absoluteChange = newVal.minus(oldVal);
  const percentageChange = absoluteChange.div(oldVal).times(100);

  return {
    percentageChange: parseFloat(percentageChange.toFixed(2)),
    absoluteChange: parseFloat(absoluteChange.toFixed(2)),
    finalValue: parseFloat(newVal.toFixed(2)),
  };
}
