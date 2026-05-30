import { describe, it, expect } from 'vitest';
import { calculateHourlyToSalary } from '../hourly-to-salary';

describe('calculateHourlyToSalary', () => {
  it('$25/hr × 2080 hours = $52,000/yr', () => {
    const result = calculateHourlyToSalary({ hourlyRate: 25, hoursPerWeek: 40, weeksPerYear: 52 });
    expect(result.annualSalary).toBe(52000);
    expect(result.weeklyRate).toBe(1000);
    expect(result.monthlyRate).toBeCloseTo(4333.33, 1);
  });

  it('daily rate = weekly / 5', () => {
    const result = calculateHourlyToSalary({ hourlyRate: 20, hoursPerWeek: 40, weeksPerYear: 52 });
    expect(result.dailyRate).toBeCloseTo(result.weeklyRate / 5, 2);
  });

  it('throws on non-positive hourly rate', () => {
    expect(() => calculateHourlyToSalary({ hourlyRate: 0, hoursPerWeek: 40, weeksPerYear: 52 })).toThrow();
  });
});
