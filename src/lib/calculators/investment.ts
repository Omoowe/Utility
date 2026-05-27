import Decimal from 'decimal.js';

export interface InvestmentInputs {
  principal: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
}

export interface InvestmentOutput {
  finalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
}

/**
 * Calculate investment growth with monthly contributions
 * Formula: A = P(1+r/n)^(nt) + PMT × [((1+r/n)^(nt) - 1) / (r/n)]
 * where:
 *   P = principal (initial investment)
 *   PMT = monthly contribution
 *   r = annualRate/100
 *   n = 12 (compounded monthly)
 *   t = years
 *
 * Test case: $10,000 principal, $500/month, 7%/year, 5 years
 * Expected: ~$46,000 final, $40,000 contributions, ~$6,000 interest
 */
export function calculateInvestment(inputs: InvestmentInputs): InvestmentOutput {
  const principal = new Decimal(inputs.principal);
  const monthlyContribution = new Decimal(inputs.monthlyContribution);
  const annualRate = new Decimal(inputs.annualRate);
  const years = new Decimal(inputs.years);

  // Validate inputs
  if (principal.lt(0)) throw new Error('Principal must be non-negative');
  if (monthlyContribution.lt(0)) {
    throw new Error('Monthly contribution must be non-negative');
  }
  if (annualRate.lt(0)) throw new Error('Rate cannot be negative');
  if (years.lte(0)) throw new Error('Years must be positive');

  const r = annualRate.div(100); // Convert to decimal
  const n = new Decimal(12); // Monthly compounding
  const t = years;
  const rOverN = r.div(n); // Monthly rate

  // Handle 0% interest case
  if (rOverN.eq(0)) {
    const totalContributions = principal.plus(
      monthlyContribution.times(n).times(t)
    );
    return {
      finalAmount: parseFloat(totalContributions.toFixed(2)),
      totalContributions: parseFloat(totalContributions.toFixed(2)),
      totalInterestEarned: 0,
    };
  }

  // Part 1: Future value of initial principal
  // A1 = P(1+r/n)^(nt)
  const exponent = n.times(t);
  const fvPrincipal = principal.times(
    new Decimal(1).plus(rOverN).pow(exponent)
  );

  // Part 2: Future value of annuity (monthly contributions)
  // A2 = PMT × [((1+r/n)^(nt) - 1) / (r/n)]
  const compoundFactor = new Decimal(1).plus(rOverN).pow(exponent);
  const fvAnnuity = monthlyContribution
    .times(compoundFactor.minus(1))
    .div(rOverN);

  // Total future value
  const finalAmount = fvPrincipal.plus(fvAnnuity);

  // Total contributions
  const totalMonthlyContributions = monthlyContribution.times(n).times(t);
  const totalContributions = principal.plus(totalMonthlyContributions);

  // Interest earned
  const totalInterestEarned = finalAmount.minus(totalContributions);

  return {
    finalAmount: parseFloat(finalAmount.toFixed(2)),
    totalContributions: parseFloat(totalContributions.toFixed(2)),
    totalInterestEarned: parseFloat(totalInterestEarned.toFixed(2)),
  };
}
