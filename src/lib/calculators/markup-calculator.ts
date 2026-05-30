import Decimal from 'decimal.js';

export function calculateMarkup(inputs: Record<string, unknown>) {
  const cost = new Decimal(Number(inputs.costPrice));
  const markup = new Decimal(Number(inputs.markupPercent));

  if (cost.lte(0)) throw new Error('Cost must be positive');
  if (markup.lt(0)) throw new Error('Markup cannot be negative');

  const sellingPrice = cost.times(markup.div(100).plus(1));
  const grossProfit = sellingPrice.minus(cost);
  const grossMargin = grossProfit.div(sellingPrice).times(100);

  return {
    sellingPrice: parseFloat(sellingPrice.toFixed(2)),
    grossProfit: parseFloat(grossProfit.toFixed(2)),
    grossMarginPercent: parseFloat(grossMargin.toFixed(2)),
  };
}
