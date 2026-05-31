import Decimal from 'decimal.js';

export function calculateAdRevenue(inputs: Record<string, unknown>) {
  const monthlyPageviews = new Decimal(Number(inputs.monthlyPageviews));
  const cpm = new Decimal(Number(inputs.cpm || 3));
  const adSlotsPerPage = new Decimal(Math.max(1, Number(inputs.adSlotsPerPage || 3)));

  if (monthlyPageviews.lte(0)) throw new Error('Monthly pageviews must be positive');
  if (cpm.lt(0)) throw new Error('CPM cannot be negative');

  const monthlyImpressions = monthlyPageviews.times(adSlotsPerPage);
  const monthlyRevenue = monthlyImpressions.div(1000).times(cpm);
  const annualRevenue = monthlyRevenue.times(12);
  const dailyRevenue = monthlyRevenue.div(30);
  const rpmPageviews = monthlyPageviews.gt(0) ? monthlyRevenue.div(monthlyPageviews).times(1000) : new Decimal(0);

  return {
    monthlyRevenue: parseFloat(monthlyRevenue.toFixed(2)),
    annualRevenue: parseFloat(annualRevenue.toFixed(2)),
    dailyRevenue: parseFloat(dailyRevenue.toFixed(2)),
    monthlyImpressions: parseFloat(monthlyImpressions.toFixed(0)),
    rpmPageviews: parseFloat(rpmPageviews.toFixed(2)),
  };
}
