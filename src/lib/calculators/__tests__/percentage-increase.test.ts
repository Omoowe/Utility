import { describe, it, expect } from 'vitest';
import { calculatePercentageIncrease } from '../percentage-increase';

describe('calculatePercentageIncrease', () => {
  it('50 → 75 = 50% increase', () => {
    const result = calculatePercentageIncrease({ oldValue: 50, newValue: 75 });
    expect(result.percentageChange).toBe(50);
    expect(result.absoluteChange).toBe(25);
    expect(result.finalValue).toBe(75);
  });

  it('handles negative change (decrease)', () => {
    const result = calculatePercentageIncrease({ oldValue: 100, newValue: 80 });
    expect(result.percentageChange).toBe(-20);
    expect(result.absoluteChange).toBe(-20);
  });

  it('throws on zero old value', () => {
    expect(() => calculatePercentageIncrease({ oldValue: 0, newValue: 50 })).toThrow();
  });
});
