import Decimal from 'decimal.js';
import { calculateMonthlyPayment, calculatePayoffMonths } from '../utils/math';

export interface LoanInputs {
  principal: number;
  annualRate: number;
  years: number;
  extraPaymentPerMonth?: number;
}

export interface LoanOutput {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  payoffMonths: number;
}

/**
 * Calculate loan payment with optional extra monthly payments
 * Uses standard amortization formula, then recalculates payoff if extra payments provided
 *
 * Test case (no extra): $50,000 @ 5% @ 5 years
 * Expected: ~$943.56/month, ~$56,599 total, ~$6,599 interest
 */
export function calculateLoan(inputs: LoanInputs): LoanOutput {
  const principal = new Decimal(inputs.principal);
  const annualRate = new Decimal(inputs.annualRate);
  const years = new Decimal(inputs.years);
  const extraPayment = new Decimal(inputs.extraPaymentPerMonth ?? 0);

  // Validate inputs
  if (principal.lte(0)) throw new Error('Principal must be positive');
  if (annualRate.lt(0)) throw new Error('Rate cannot be negative');
  if (years.lte(0)) throw new Error('Years must be positive');
  if (extraPayment.lt(0)) throw new Error('Extra payment cannot be negative');

  // Calculate monthly payment (standard amortization)
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);

  // Calculate payoff months with extra payments
  const payoffMonths = calculatePayoffMonths(
    monthlyPayment,
    extraPayment,
    principal,
    annualRate
  );

  // If extra payments provided, recalculate total paid and interest
  let totalPaid: Decimal;
  let totalInterest: Decimal;

  if (extraPayment.gt(0)) {
    // Recalculate with actual payoff months
    const totalPaymentAmount = monthlyPayment.plus(extraPayment);
    totalPaid = totalPaymentAmount.times(payoffMonths);
    totalInterest = totalPaid.minus(principal);
  } else {
    // Standard calculation
    const numberOfPayments = years.times(12);
    totalPaid = monthlyPayment.times(numberOfPayments);
    totalInterest = totalPaid.minus(principal);
  }

  return {
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalPaid: parseFloat(totalPaid.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    payoffMonths,
  };
}
