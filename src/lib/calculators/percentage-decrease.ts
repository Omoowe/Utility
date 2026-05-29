import Decimal from 'decimal.js';

export interface PercentageDecreaseInputs {
  oldValue: number;
  newValue: number;
}

export interface PercentageDecreaseOutput {
  percentageDecrease: number;
  absoluteDecrease: number;
  finalValue: number;
}

export function calculatePercentageDecrease(inputs: PercentageDecreaseInputs): PercentageDecreaseOutput {
  const oldVal = new Decimal(inputs.oldValue);
  const newVal = new Decimal(inputs.newValue);

  if (oldVal.eq(0)) throw new Error('Old value cannot be zero');

  const absoluteDecrease = oldVal.minus(newVal);
  const percentageDecrease = absoluteDecrease.div(oldVal).times(100);

  return {
    percentageDecrease: parseFloat(percentageDecrease.toFixed(2)),
    absoluteDecrease: parseFloat(absoluteDecrease.toFixed(2)),
    finalValue: parseFloat(newVal.toFixed(2)),
  };
}
