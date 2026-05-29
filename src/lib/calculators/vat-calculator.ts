import Decimal from 'decimal.js';

export interface VatInputs {
  price: number;
  vatRate: number;
  priceIncludesVat: number;
}

export interface VatOutput {
  netPrice: number;
  vatAmount: number;
  grossPrice: number;
}

export function calculateVat(inputs: VatInputs): VatOutput {
  const price = new Decimal(inputs.price);
  const vatRate = new Decimal(inputs.vatRate).div(100);
  const includesVat = inputs.priceIncludesVat === 1;

  if (price.lte(0)) throw new Error('Price must be positive');
  if (vatRate.lt(0)) throw new Error('VAT rate cannot be negative');

  let netPrice: Decimal;
  let vatAmount: Decimal;
  let grossPrice: Decimal;

  if (includesVat) {
    grossPrice = price;
    netPrice = price.div(new Decimal(1).plus(vatRate));
    vatAmount = grossPrice.minus(netPrice);
  } else {
    netPrice = price;
    vatAmount = price.times(vatRate);
    grossPrice = netPrice.plus(vatAmount);
  }

  return {
    netPrice: parseFloat(netPrice.toFixed(2)),
    vatAmount: parseFloat(vatAmount.toFixed(2)),
    grossPrice: parseFloat(grossPrice.toFixed(2)),
  };
}
