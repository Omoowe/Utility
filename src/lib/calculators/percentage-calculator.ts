import Decimal from 'decimal.js';

export function calculatePercentage(inputs: Record<string, unknown>) {
  const percent = new Decimal(Number(inputs.percent));
  const value = new Decimal(Number(inputs.value));

  if (percent.lt(0)) throw new Error('Percentage cannot be negative');
  if (value.lte(0)) throw new Error('Value must be positive');

  const result = value.times(percent.div(100));
  const remaining = value.minus(result);
  const asDecimal = percent.div(100);

  return {
    result: parseFloat(result.toFixed(2)),
    remaining: parseFloat(remaining.toFixed(2)),
    asDecimal: parseFloat(asDecimal.toFixed(6)),
    percentOfResult: parseFloat(percent.toFixed(2)),
  };
}
