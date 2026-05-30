import Decimal from 'decimal.js';

export function calculateInvoice(inputs: Record<string, unknown>) {
  const subtotal = new Decimal(Number(inputs.subtotal));
  const taxRate = new Decimal(Number(inputs.taxRate));
  const discountPercent = new Decimal(Number(inputs.discountPercent || 0));

  if (subtotal.lt(0)) throw new Error('Subtotal cannot be negative');
  if (taxRate.lt(0)) throw new Error('Tax rate cannot be negative');
  if (discountPercent.lt(0)) throw new Error('Discount cannot be negative');

  const discountAmount = subtotal.times(discountPercent).div(100);
  const taxableAmount = subtotal.minus(discountAmount);
  const taxAmount = taxableAmount.times(taxRate).div(100);
  const total = taxableAmount.plus(taxAmount);

  return {
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    taxableAmount: parseFloat(taxableAmount.toFixed(2)),
    taxAmount: parseFloat(taxAmount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
}
