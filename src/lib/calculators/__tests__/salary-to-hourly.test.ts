import { describe, it, expect } from 'vitest';
import { calculateSalaryToHourly } from '../salary-to-hourly';

describe('calculateSalaryToHourly', () => {
  it('$52,000 / 2080 hours = $25/hr', () => {
    const result = calculateSalaryToHourly({ annualSalary: 52000, hoursPerWeek: 40, weeksPerYear: 52 });
    expect(result.hourlyRate).toBe(25);
    expect(result.monthlyRate).toBeCloseTo(4333.33, 1);
    expect(result.weeklyRate).toBe(1000);
  });

  it('throws on non-positive salary', () => {
    expect(() => calculateSalaryToHourly({ annualSalary: 0, hoursPerWeek: 40, weeksPerYear: 52 })).toThrow();
  });

  it('throws on zero hours per week', () => {
    expect(() => calculateSalaryToHourly({ annualSalary: 50000, hoursPerWeek: 0, weeksPerYear: 52 })).toThrow();
  });
});
