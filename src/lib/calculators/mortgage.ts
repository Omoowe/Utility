import Decimal from 'decimal.js';
import { calculateMonthlyPayment } from '../utils/math';

export interface MortgageInputs {
  principal: number;
  annualRate: number;
  years: number;
}

export interface MortgageOutput {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
}

/**
 * Calculate mortgage payment using standard amortization formula
 * M = P[r(1+r)^n] / [(1+r)^n-1]
 * where r = annualRate/12/100, n = years*12
 *
 * Test case: $300,000 @ 6% @ 30 years
 * Expected: ~$1,799.43/month, ~$647,515 total, ~$347,515 interest
 */
export function calculateMortgage(inputs: MortgageInputs): MortgageOutput {
  const principal = new Decimal(inputs.principal);
  const annualRate = new Decimal(inputs.annualRate);
  const years = new Decimal(inputs.years);

  // Validate inputs
  if (principal.lte(0)) throw new Error('Principal must be positive');
  if (annualRate.lt(0)) throw new Error('Rate cannot be negative');
  if (years.lte(0)) throw new Error('Years must be positive');

  // Calculate monthly payment
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  const numberOfPayments = years.times(12);
  const totalPaid = monthlyPayment.times(numberOfPayments);
  const totalInterest = totalPaid.minus(principal);

  return {
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalPaid: parseFloat(totalPaid.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
  };
}
