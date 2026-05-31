import Decimal from 'decimal.js';

export function calculateConversionRate(inputs: Record<string, unknown>) {
  const visitors = new Decimal(Number(inputs.visitors));
  const conversions = new Decimal(Number(inputs.conversions));
  const revenuePerConversion = new Decimal(Number(inputs.revenuePerConversion || 0));

  if (visitors.lte(0)) throw new Error('Visitors must be greater than 0');
  if (conversions.lt(0)) throw new Error('Conversions cannot be negative');
  if (conversions.gt(visitors)) throw new Error('Conversions cannot exceed visitors');

  const conversionRate = conversions.div(visitors).times(100);
  const totalRevenue = conversions.times(revenuePerConversion);
  const revenuePerVisitor = visitors.gt(0) ? totalRevenue.div(visitors) : new Decimal(0);

  let qualityLabel = 'Below Average';
  const rate = conversionRate.toNumber();
  if (rate >= 5) qualityLabel = 'Excellent';
  else if (rate >= 3) qualityLabel = 'Good';
  else if (rate >= 1) qualityLabel = 'Average';

  return {
    conversionRate: parseFloat(conversionRate.toFixed(2)),
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    revenuePerVisitor: parseFloat(revenuePerVisitor.toFixed(2)),
    qualityLabel,
  };
}
