import { describe, it, expect } from 'vitest';
import { calculatePercentageDecrease } from '../percentage-decrease';

describe('calculatePercentageDecrease', () => {
  it('100 → 75 = 25% decrease', () => {
    const result = calculatePercentageDecrease({ oldValue: 100, newValue: 75 });
    expect(result.percentageDecrease).toBe(25);
    expect(result.absoluteDecrease).toBe(25);
    expect(result.finalValue).toBe(75);
  });

  it('handles increase (negative decrease)', () => {
    const result = calculatePercentageDecrease({ oldValue: 80, newValue: 100 });
    expect(result.percentageDecrease).toBe(-25);
  });

  it('throws on zero old value', () => {
    expect(() => calculatePercentageDecrease({ oldValue: 0, newValue: 50 })).toThrow();
  });
});
