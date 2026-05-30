import Decimal from 'decimal.js';

export function calculateBreakEven(inputs: Record<string, unknown>) {
  const fixed = new Decimal(Number(inputs.fixedCosts));
  const variable = new Decimal(Number(inputs.variableCostPerUnit));
  const price = new Decimal(Number(inputs.sellingPricePerUnit));

  if (fixed.lt(0)) throw new Error('Fixed costs cannot be negative');
  if (variable.lt(0)) throw new Error('Variable cost cannot be negative');
  if (price.lte(0)) throw new Error('Selling price must be positive');
  if (price.lte(variable)) throw new Error('Selling price must exceed variable cost per unit');

  const contributionMargin = price.minus(variable);
  const breakEvenUnits = fixed.div(contributionMargin);
  const breakEvenRevenue = breakEvenUnits.times(price);
  const contributionMarginRatio = contributionMargin.div(price).times(100);

  return {
    breakEvenUnits: parseFloat(breakEvenUnits.toFixed(0)),
    breakEvenRevenue: parseFloat(breakEvenRevenue.toFixed(2)),
    contributionMargin: parseFloat(contributionMargin.toFixed(2)),
    contributionMarginRatio: parseFloat(contributionMarginRatio.toFixed(1)),
  };
}
