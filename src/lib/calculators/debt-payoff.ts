import Decimal from 'decimal.js';

export interface DebtPayoffInputs {
  balance: number;
  annualRate: number;
  monthlyPayment: number;
}

export interface DebtPayoffOutput {
  monthsToPayoff: number;
  totalPaid: number;
  totalInterest: number;
}

export function calculateDebtPayoff(inputs: DebtPayoffInputs): DebtPayoffOutput {
  const balance = new Decimal(inputs.balance);
  const monthlyRate = new Decimal(inputs.annualRate).div(100).div(12);
  const payment = new Decimal(inputs.monthlyPayment);

  if (balance.lte(0)) throw new Error('Balance must be positive');
  if (payment.lte(0)) throw new Error('Monthly payment must be positive');
  if (inputs.annualRate < 0) throw new Error('Rate cannot be negative');

  // Check payment covers at least interest
  if (monthlyRate.gt(0) && payment.lte(balance.times(monthlyRate))) {
    throw new Error('Monthly payment must exceed monthly interest charge');
  }

  let remaining = balance;
  let months = 0;
  const maxMonths = 600;

  while (remaining.gt(new Decimal('0.01')) && months < maxMonths) {
    const interest = remaining.times(monthlyRate);
    remaining = remaining.plus(interest).minus(payment);
    if (remaining.lt(0)) remaining = new Decimal(0);
    months++;
  }

  const totalPaid = payment.times(months);
  const totalInterest = totalPaid.minus(balance);

  return {
    monthsToPayoff: months,
    totalPaid: parseFloat(totalPaid.toFixed(2)),
    totalInterest: parseFloat(totalInterest.gt(0) ? totalInterest.toFixed(2) : '0.00'),
  };
}
