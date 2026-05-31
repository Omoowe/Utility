import Decimal from 'decimal.js';

export function calculateEngagementRate(inputs: Record<string, unknown>) {
  const followers = new Decimal(Number(inputs.followers));
  const likes = new Decimal(Number(inputs.likes || 0));
  const comments = new Decimal(Number(inputs.comments || 0));
  const shares = new Decimal(Number(inputs.shares || 0));
  const reach = new Decimal(Number(inputs.reach || 0));

  if (followers.lte(0)) throw new Error('Followers must be greater than 0');

  const totalEngagements = likes.plus(comments).plus(shares);
  const engagementRateByFollowers = totalEngagements.div(followers).times(100);
  const engagementRateByReach = reach.gt(0) ? totalEngagements.div(reach).times(100) : new Decimal(0);

  let qualityLabel = 'Low';
  const rate = engagementRateByFollowers.toNumber();
  if (rate >= 6) qualityLabel = 'Excellent';
  else if (rate >= 3) qualityLabel = 'Good';
  else if (rate >= 1) qualityLabel = 'Average';

  return {
    engagementRateByFollowers: parseFloat(engagementRateByFollowers.toFixed(2)),
    engagementRateByReach: parseFloat(engagementRateByReach.toFixed(2)),
    totalEngagements: parseFloat(totalEngagements.toFixed(0)),
    qualityLabel,
  };
}
