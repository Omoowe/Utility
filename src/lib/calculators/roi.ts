import Decimal from 'decimal.js';

export interface ROIInputs {
  initialInvestment: number;
  gain: number;
  years: number;
}

export interface ROIOutput {
  roiPercent: number;
  annualizedRoiPercent: number;
  finalValue: number;
}

/**
 * Calculate Return on Investment (ROI) and annualized ROI
 * ROI = (Gain / Initial) * 100
 * Annualized ROI = ROI / years
 *
 * Test case: $10,000 initial, $2,000 gain, 2 years
 * Expected: 20% ROI, 10% annualized, $12,000 final
 */
export function calculateROI(inputs: ROIInputs): ROIOutput {
  const initial = new Decimal(inputs.initialInvestment);
  const gain = new Decimal(inputs.gain);
  const years = new Decimal(inputs.years);

  // Validate inputs
  if (initial.lte(0)) throw new Error('Initial investment must be positive');
  if (gain.lt(0)) throw new Error('Gain cannot be negative');
  if (years.lte(0)) throw new Error('Years must be positive');

  // Calculate ROI percentage
  const roiPercent = gain.div(initial).times(100);

  // Calculate annualized ROI
  const annualizedRoiPercent = roiPercent.div(years);

  // Calculate final value
  const finalValue = initial.plus(gain);

  return {
    roiPercent: parseFloat(roiPercent.toFixed(2)),
    annualizedRoiPercent: parseFloat(annualizedRoiPercent.toFixed(2)),
    finalValue: parseFloat(finalValue.toFixed(2)),
  };
}
