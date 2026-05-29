import Decimal from 'decimal.js';

export interface SavingsGoalInputs {
  targetAmount: number;
  currentSavings: number;
  annualRate: number;
  years: number;
}

export interface SavingsGoalOutput {
  monthlyContributionNeeded: number;
  totalContributions: number;
  interestEarned: number;
}

/**
 * Savings goal: solve for PMT given FV, rate, periods
 * PMT = (FV - PV*(1+r)^n) * r / ((1+r)^n - 1)
 * where r = monthly rate, n = months
 */
export function calculateSavingsGoal(inputs: SavingsGoalInputs): SavingsGoalOutput {
  const FV = new Decimal(inputs.targetAmount);
  const PV = new Decimal(inputs.currentSavings);
  const annualRate = new Decimal(inputs.annualRate);
  const years = new Decimal(inputs.years);

  if (FV.lte(0)) throw new Error('Target amount must be positive');
  if (PV.lt(0)) throw new Error('Current savings cannot be negative');
  if (years.lte(0)) throw new Error('Years must be positive');
  if (annualRate.lt(0)) throw new Error('Rate cannot be negative');

  const n = years.times(12);
  const r = annualRate.div(100).div(12);

  let monthlyContributionNeeded: Decimal;

  if (r.eq(0)) {
    // No interest: PMT = (FV - PV) / n
    monthlyContributionNeeded = FV.minus(PV).div(n);
  } else {
    // FV of PV over n periods
    const growthFactor = new Decimal(1).plus(r).pow(n);
    const PVFuture = PV.times(growthFactor);
    const remaining = FV.minus(PVFuture);
    // PMT = remaining * r / ((1+r)^n - 1)
    monthlyContributionNeeded = remaining.times(r).div(growthFactor.minus(1));
  }

  if (monthlyContributionNeeded.lt(0)) {
    monthlyContributionNeeded = new Decimal(0);
  }

  const totalContributions = monthlyContributionNeeded.times(n).plus(PV);
  const interestEarned = FV.minus(totalContributions);

  return {
    monthlyContributionNeeded: parseFloat(monthlyContributionNeeded.toFixed(2)),
    totalContributions: parseFloat(totalContributions.toFixed(2)),
    interestEarned: parseFloat(interestEarned.gt(0) ? interestEarned.toFixed(2) : '0.00'),
  };
}
