import { describe, it, expect } from 'vitest';
import { calculateBudget } from '../budget-calculator';

describe('calculateBudget', () => {
  it('calculates surplus correctly', () => {
    const result = calculateBudget({
      monthlyIncome: 5000,
      housing: 1500, transportation: 400, food: 600,
      utilities: 200, entertainment: 150, savings: 500, other: 100,
    });
    expect(result.totalExpenses).toBe(3450);
    expect(result.surplus).toBe(1550);
    expect(result.savingsRate).toBeCloseTo(10, 1);
    expect(result.housingPercent).toBe(30);
  });

  it('deficit case → negative surplus', () => {
    const result = calculateBudget({
      monthlyIncome: 2000,
      housing: 1200, transportation: 500, food: 500,
      utilities: 200, entertainment: 0, savings: 0, other: 0,
    });
    expect(result.surplus).toBeLessThan(0);
  });

  it('throws on non-positive income', () => {
    expect(() => calculateBudget({
      monthlyIncome: 0, housing: 0, transportation: 0, food: 0,
      utilities: 0, entertainment: 0, savings: 0, other: 0,
    })).toThrow();
  });
});
