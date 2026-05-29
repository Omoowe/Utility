import Decimal from 'decimal.js';
import { calculateMonthlyPayment } from '../utils/math';

export interface MortgageOverpaymentInputs {
  principal: number;
  annualRate: number;
  years: number;
  extraMonthlyPayment: number;
}

export interface MortgageOverpaymentOutput {
  standardMonthlyPayment: number;
  newMonthlyPayment: number;
  monthsSaved: number;
  interestSaved: number;
  originalTotalInterest: number;
  newTotalInterest: number;
}

export function calculateMortgageOverpayment(inputs: MortgageOverpaymentInputs): MortgageOverpaymentOutput {
  const principal = new Decimal(inputs.principal);
  const annualRate = new Decimal(inputs.annualRate);
  const years = new Decimal(inputs.years);
  const extra = new Decimal(inputs.extraMonthlyPayment || 0);

  if (principal.lte(0)) throw new Error('Principal must be positive');
  if (annualRate.lt(0)) throw new Error('Rate cannot be negative');
  if (years.lte(0)) throw new Error('Years must be positive');
  if (extra.lt(0)) throw new Error('Extra payment cannot be negative');

  const monthlyRate = annualRate.div(100).div(12);
  const standardPayment = calculateMonthlyPayment(principal, annualRate, years);
  const newPayment = standardPayment.plus(extra);
  const originalMonths = years.times(12).toNumber();

  // Simulate payoff with extra payment
  let balance = principal;
  let months = 0;
  while (balance.gt(new Decimal('0.01')) && months < originalMonths * 2) {
    const interest = monthlyRate.gt(0) ? balance.times(monthlyRate) : new Decimal(0);
    balance = balance.plus(interest).minus(newPayment);
    if (balance.lt(0)) balance = new Decimal(0);
    months++;
  }

  const newTotalPaid = newPayment.times(months);
  const originalTotalPaid = standardPayment.times(originalMonths);
  const originalTotalInterest = originalTotalPaid.minus(principal);
  const newTotalInterest = newTotalPaid.minus(principal);
  const interestSaved = originalTotalInterest.minus(newTotalInterest);
  const monthsSaved = originalMonths - months;

  return {
    standardMonthlyPayment: parseFloat(standardPayment.toFixed(2)),
    newMonthlyPayment: parseFloat(newPayment.toFixed(2)),
    monthsSaved: Math.max(0, monthsSaved),
    interestSaved: parseFloat(interestSaved.gt(0) ? interestSaved.toFixed(2) : '0.00'),
    originalTotalInterest: parseFloat(originalTotalInterest.toFixed(2)),
    newTotalInterest: parseFloat(newTotalInterest.gt(0) ? newTotalInterest.toFixed(2) : '0.00'),
  };
}
