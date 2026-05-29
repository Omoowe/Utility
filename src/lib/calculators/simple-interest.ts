import Decimal from 'decimal.js';

export interface SimpleInterestInputs {
  principal: number;
  annualRate: number;
  years: number;
}

export interface SimpleInterestOutput {
  interestEarned: number;
  totalRepayment: number;
  effectiveRate: number;
}

export function calculateSimpleInterest(inputs: SimpleInterestInputs): SimpleInterestOutput {
  const P = new Decimal(inputs.principal);
  const r = new Decimal(inputs.annualRate).div(100);
  const t = new Decimal(inputs.years);

  if (P.lte(0)) throw new Error('Principal must be positive');
  if (r.lt(0)) throw new Error('Rate cannot be negative');
  if (t.lte(0)) throw new Error('Years must be positive');

  // I = P * r * t
  const interestEarned = P.times(r).times(t);
  const totalRepayment = P.plus(interestEarned);
  const effectiveRate = interestEarned.div(P).times(100);

  return {
    interestEarned: parseFloat(interestEarned.toFixed(2)),
    totalRepayment: parseFloat(totalRepayment.toFixed(2)),
    effectiveRate: parseFloat(effectiveRate.toFixed(2)),
  };
}
