import Decimal from 'decimal.js';

export function calculateTip(inputs: Record<string, unknown>) {
  const billAmount = new Decimal(Number(inputs.billAmount));
  const tipPercent = new Decimal(Number(inputs.tipPercent || 18));
  const people = new Decimal(Math.max(1, Number(inputs.people || 1)));

  if (billAmount.lte(0)) throw new Error('Bill amount must be positive');
  if (tipPercent.lt(0)) throw new Error('Tip percentage cannot be negative');

  const tipAmount = billAmount.times(tipPercent.div(100));
  const totalAmount = billAmount.plus(tipAmount);
  const perPerson = totalAmount.div(people);
  const tipPerPerson = tipAmount.div(people);

  return {
    tipAmount: parseFloat(tipAmount.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    perPerson: parseFloat(perPerson.toFixed(2)),
    tipPerPerson: parseFloat(tipPerPerson.toFixed(2)),
    tipPercent: parseFloat(tipPercent.toFixed(1)),
  };
}
