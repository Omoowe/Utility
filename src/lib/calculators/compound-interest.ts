import Decimal from 'decimal.js';

export interface CompoundInterestInputs {
  principal: number;
  annualRate: number;
  years: number;
  compoundingFrequency: number;
}

export interface CompoundInterestOutput {
  finalAmount: number;
  totalInterestEarned: number;
  totalContributions: number;
}

/**
 * Compound interest: A = P(1 + r/n)^(nt)
 * Test: $10,000 @ 5% compounded monthly for 10 years → ~$16,470.09
 */
export function calculateCompoundInterest(inputs: CompoundInterestInputs): CompoundInterestOutput {
  const P = new Decimal(inputs.principal);
  const r = new Decimal(inputs.annualRate).div(100);
  const n = new Decimal(inputs.compoundingFrequency);
  const t = new Decimal(inputs.years);

  if (P.lte(0)) throw new Error('Principal must be positive');
  if (r.lt(0)) throw new Error('Rate cannot be negative');
  if (t.lte(0)) throw new Error('Years must be positive');
  if (n.lte(0)) throw new Error('Compounding frequency must be positive');

  // A = P(1 + r/n)^(nt)
  const rOverN = r.div(n);
  const exponent = n.times(t);
  const finalAmount = P.times(new Decimal(1).plus(rOverN).pow(exponent));
  const totalInterestEarned = finalAmount.minus(P);

  return {
    finalAmount: parseFloat(finalAmount.toFixed(2)),
    totalInterestEarned: parseFloat(totalInterestEarned.toFixed(2)),
    totalContributions: parseFloat(P.toFixed(2)),
  };
}
