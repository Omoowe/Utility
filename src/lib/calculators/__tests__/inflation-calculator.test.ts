import { describe, it, expect } from 'vitest';
import { calculateInflation } from '../inflation-calculator';

describe('calculateInflation', () => {
  it('$1,000 @ 3% for 10 years ≈ $1,343.92', () => {
    const result = calculateInflation({ presentValue: 1000, inflationRate: 3, years: 10 });
    expect(result.futureValue).toBeCloseTo(1343.92, 0);
    expect(result.purchasingPowerLost).toBeCloseTo(343.92, 0);
    expect(result.purchasingPowerLostPercent).toBeCloseTo(34.39, 0);
  });

  it('0% inflation leaves value unchanged', () => {
    const result = calculateInflation({ presentValue: 1000, inflationRate: 0, years: 5 });
    expect(result.futureValue).toBe(1000);
    expect(result.purchasingPowerLost).toBe(0);
  });

  it('throws on non-positive present value', () => {
    expect(() => calculateInflation({ presentValue: 0, inflationRate: 3, years: 10 })).toThrow();
  });

  it('throws on non-positive years', () => {
    expect(() => calculateInflation({ presentValue: 1000, inflationRate: 3, years: 0 })).toThrow();
  });
});
