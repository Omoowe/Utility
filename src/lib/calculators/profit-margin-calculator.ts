import Decimal from 'decimal.js';

export interface ProfitMarginInputs {
  revenue: number;
  cost: number;
}

export interface ProfitMarginOutput {
  grossProfit: number;
  grossMarginPercent: number;
  markupPercent: number;
  netProfitPerUnit: number;
}

export function calculateProfitMargin(inputs: ProfitMarginInputs): ProfitMarginOutput {
  const revenue = new Decimal(inputs.revenue);
  const cost = new Decimal(inputs.cost);

  if (revenue.lte(0)) throw new Error('Revenue must be positive');
  if (cost.lt(0)) throw new Error('Cost cannot be negative');
  if (cost.gte(revenue)) throw new Error('Cost must be less than revenue for a profit');

  const grossProfit = revenue.minus(cost);
  const grossMarginPercent = grossProfit.div(revenue).times(100);
  const markupPercent = grossProfit.div(cost).times(100);

  return {
    grossProfit: parseFloat(grossProfit.toFixed(2)),
    grossMarginPercent: parseFloat(grossMarginPercent.toFixed(2)),
    markupPercent: parseFloat(markupPercent.toFixed(2)),
    netProfitPerUnit: parseFloat(grossProfit.toFixed(2)),
  };
}
