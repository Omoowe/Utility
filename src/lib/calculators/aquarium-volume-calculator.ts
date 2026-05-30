import Decimal from 'decimal.js';

export function calculateAquariumVolume(inputs: Record<string, unknown>) {
  const length = new Decimal(Number(inputs.length));
  const width = new Decimal(Number(inputs.width));
  const height = new Decimal(Number(inputs.height));
  const unit = String(inputs.unit || 'cm');

  if (length.lte(0) || width.lte(0) || height.lte(0))
    throw new Error('All dimensions must be positive');

  let volumeLiters: Decimal;

  if (unit === 'cm') {
    volumeLiters = length.times(width).times(height).div(1000);
  } else {
    // inches: 1 in³ = 0.0163871 L
    volumeLiters = length.times(width).times(height).times(new Decimal('0.0163871'));
  }

  const volumeUSGallons = volumeLiters.times(new Decimal('0.264172'));
  const volumeUKGallons = volumeLiters.times(new Decimal('0.219969'));
  // 1-inch-per-gallon stocking rule (rough guide)
  const recommendedFishInches = volumeUSGallons.times(1);

  return {
    volumeLiters: parseFloat(volumeLiters.toFixed(1)),
    volumeUSGallons: parseFloat(volumeUSGallons.toFixed(1)),
    volumeUKGallons: parseFloat(volumeUKGallons.toFixed(1)),
    recommendedFishInches: parseFloat(recommendedFishInches.toFixed(0)),
  };
}
