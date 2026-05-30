import { describe, it, expect } from 'vitest';
import { calculateCompoundInterest } from '../compound-interest';

describe('calculateCompoundInterest', () => {
  it('$10k @ 5% monthly compounding for 10 years ≈ $16,470', () => {
    const result = calculateCompoundInterest({ principal: 10000, annualRate: 5, years: 10, compoundingFrequency: 12 });
    expect(result.finalAmount).toBeCloseTo(16470, 0);
    expect(result.totalInterestEarned).toBeCloseTo(6470, 0);
    expect(result.totalContributions).toBe(10000);
  });

  it('annual compounding yields less than monthly', () => {
    const monthly = calculateCompoundInterest({ principal: 10000, annualRate: 5, years: 10, compoundingFrequency: 12 });
    const annual = calculateCompoundInterest({ principal: 10000, annualRate: 5, years: 10, compoundingFrequency: 1 });
    expect(monthly.finalAmount).toBeGreaterThan(annual.finalAmount);
  });

  it('throws on non-positive principal', () => {
    expect(() => calculateCompoundInterest({ principal: 0, annualRate: 5, years: 10, compoundingFrequency: 12 })).toThrow();
  });

  it('throws on non-positive compounding frequency', () => {
    expect(() => calculateCompoundInterest({ principal: 1000, annualRate: 5, years: 10, compoundingFrequency: 0 })).toThrow();
  });
});
