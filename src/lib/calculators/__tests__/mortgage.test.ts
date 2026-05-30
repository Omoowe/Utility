import { describe, it, expect } from 'vitest';
import { calculateMortgage } from '../mortgage';

describe('calculateMortgage', () => {
  it('returns correct payment for standard 30-year loan', () => {
    const result = calculateMortgage({ principal: 300000, annualRate: 6, years: 30 });
    expect(result.monthlyPayment).toBeCloseTo(1798.65, 0);
    expect(result.totalPaid).toBeGreaterThan(300000);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  it('returns zero interest for 0% rate', () => {
    const result = calculateMortgage({ principal: 120000, annualRate: 0, years: 10 });
    expect(result.monthlyPayment).toBeCloseTo(1000, 1);
    expect(result.totalInterest).toBeCloseTo(0, 0);
  });

  it('throws on non-positive principal', () => {
    expect(() => calculateMortgage({ principal: 0, annualRate: 5, years: 30 })).toThrow();
    expect(() => calculateMortgage({ principal: -1000, annualRate: 5, years: 30 })).toThrow();
  });

  it('throws on negative rate', () => {
    expect(() => calculateMortgage({ principal: 100000, annualRate: -1, years: 30 })).toThrow();
  });

  it('throws on non-positive years', () => {
    expect(() => calculateMortgage({ principal: 100000, annualRate: 5, years: 0 })).toThrow();
  });
});
