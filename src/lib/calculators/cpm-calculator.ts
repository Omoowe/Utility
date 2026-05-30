import Decimal from 'decimal.js';

export function calculateCpm(inputs: Record<string, unknown>) {
  const impressions = new Decimal(Number(inputs.impressions));
  const totalCost = new Decimal(Number(inputs.totalCost));
  const clicks = new Decimal(Number(inputs.clicks || 0));

  if (impressions.lte(0)) throw new Error('Impressions must be positive');
  if (totalCost.lte(0)) throw new Error('Total cost must be positive');

  const cpm = totalCost.div(impressions).times(1000);
  const cpc = clicks.gt(0) ? totalCost.div(clicks) : null;
  const ctr = clicks.gt(0) ? clicks.div(impressions).times(100) : null;
  const impressionsPerDollar = impressions.div(totalCost);

  return {
    cpm: parseFloat(cpm.toFixed(4)),
    cpc: cpc !== null ? parseFloat(cpc.toFixed(4)) : 0,
    ctrPercent: ctr !== null ? parseFloat(ctr.toFixed(4)) : 0,
    impressionsPerDollar: parseFloat(impressionsPerDollar.toFixed(0)),
  };
}
