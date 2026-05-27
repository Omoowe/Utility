import Decimal from 'decimal.js';
import { TAX_BRACKETS_2024, FINANCIAL_LIMITS } from '../constants';
import { calculateFederalTax } from '../utils/math';

export type PayFrequency = 'annual' | 'monthly' | 'biweekly' | 'weekly';

export interface PaycheckInputs {
  annualSalary: number;
  payFrequency: PayFrequency;
}

export interface PaycheckOutput {
  grossPerPeriod: number;
  federalTaxPerPeriod: number;
  ficaTaxPerPeriod: number;
  stateTaxPerPeriod: number;
  netPerPeriod: number;
}

const FREQUENCY_DIVISOR: Record<PayFrequency, number> = {
  annual: 1,
  monthly: 12,
  biweekly: 26,
  weekly: 52,
};

const FICA_RATE = 0.0765; // Social Security (6.2%) + Medicare (1.45%)
const STATE_TAX_RATE = 0.05; // Simplified average state tax

/**
 * Calculate paycheck deductions based on 2024 tax brackets
 * Uses single filer standard deduction and brackets
 *
 * Test case: $50,000/year annual
 * Expected: $4,167 gross/month, ~$980 federal/month, $318 FICA, $208 state → ~$2,661 net
 */
export function calculatePaycheck(inputs: PaycheckInputs): PaycheckOutput {
  const annualSalary = new Decimal(inputs.annualSalary);

  // Validate inputs
  if (annualSalary.lt(0)) throw new Error('Salary must be non-negative');
  if (annualSalary.gt(FINANCIAL_LIMITS.MAX_SALARY)) {
    throw new Error(`Salary exceeds maximum of $${FINANCIAL_LIMITS.MAX_SALARY}`);
  }

  // Frequency divisor
  const divisor = FREQUENCY_DIVISOR[inputs.payFrequency];
  const grossPerPeriod = annualSalary.div(divisor);

  // FICA is calculated on gross pay (no deductions)
  const ficaTaxPerPeriod = grossPerPeriod.times(FICA_RATE);

  // Federal income tax (simplified single filer)
  // 1. Apply standard deduction
  const standardDeduction = new Decimal(
    TAX_BRACKETS_2024.standard_deduction_2024.single
  );
  const taxableIncome = Decimal.max(annualSalary.minus(standardDeduction), 0);

  // 2. Calculate annual federal tax based on brackets
  const annualFederalTax = calculateFederalTax(
    taxableIncome,
    TAX_BRACKETS_2024.federal.single
  );

  // 3. Convert to per-period
  const federalTaxPerPeriod = annualFederalTax.div(divisor);

  // State tax (simplified, no deductions)
  const stateTaxPerPeriod = grossPerPeriod.times(STATE_TAX_RATE);

  // Calculate net pay
  const netPerPeriod = grossPerPeriod
    .minus(federalTaxPerPeriod)
    .minus(ficaTaxPerPeriod)
    .minus(stateTaxPerPeriod);

  return {
    grossPerPeriod: parseFloat(grossPerPeriod.toFixed(2)),
    federalTaxPerPeriod: parseFloat(federalTaxPerPeriod.toFixed(2)),
    ficaTaxPerPeriod: parseFloat(ficaTaxPerPeriod.toFixed(2)),
    stateTaxPerPeriod: parseFloat(stateTaxPerPeriod.toFixed(2)),
    netPerPeriod: parseFloat(netPerPeriod.toFixed(2)),
  };
}
