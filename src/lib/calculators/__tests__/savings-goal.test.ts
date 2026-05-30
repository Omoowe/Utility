import { describe, it, expect } from 'vitest';
import { calculateSavingsGoal } from '../savings-goal';

describe('calculateSavingsGoal', () => {
  it('no-interest case: contributions = target - current savings', () => {
    const result = calculateSavingsGoal({ targetAmount: 12000, currentSavings: 0, annualRate: 0, years: 1 });
    expect(result.monthlyContributionNeeded).toBeCloseTo(1000, 1);
    expect(result.interestEarned).toBe(0);
  });

  it('current savings exceed target → zero contribution needed', () => {
    const result = calculateSavingsGoal({ targetAmount: 5000, currentSavings: 6000, annualRate: 3, years: 2 });
    expect(result.monthlyContributionNeeded).toBe(0);
  });

  it('throws on non-positive target', () => {
    expect(() => calculateSavingsGoal({ targetAmount: 0, currentSavings: 0, annualRate: 3, years: 5 })).toThrow();
  });

  it('throws on negative current savings', () => {
    expect(() => calculateSavingsGoal({ targetAmount: 10000, currentSavings: -100, annualRate: 3, years: 5 })).toThrow();
  });
});
