import { describe, it, expect } from 'vitest';
import { calculateVat } from '../vat-calculator';

describe('calculateVat', () => {
  it('adds VAT to ex-VAT price', () => {
    const result = calculateVat({ price: 100, vatRate: 20, priceIncludesVat: 0 });
    expect(result.netPrice).toBe(100);
    expect(result.vatAmount).toBe(20);
    expect(result.grossPrice).toBe(120);
  });

  it('strips VAT from gross price', () => {
    const result = calculateVat({ price: 120, vatRate: 20, priceIncludesVat: 1 });
    expect(result.grossPrice).toBe(120);
    expect(result.netPrice).toBeCloseTo(100, 1);
    expect(result.vatAmount).toBeCloseTo(20, 1);
  });

  it('throws on non-positive price', () => {
    expect(() => calculateVat({ price: 0, vatRate: 20, priceIncludesVat: 0 })).toThrow();
  });

  it('throws on negative VAT rate', () => {
    expect(() => calculateVat({ price: 100, vatRate: -5, priceIncludesVat: 0 })).toThrow();
  });
});
