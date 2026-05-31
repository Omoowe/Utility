import Decimal from 'decimal.js';

export function calculateIdealWeight(inputs: Record<string, unknown>) {
  const heightCm = new Decimal(Number(inputs.heightCm));
  const sex = String(inputs.sex || 'male');

  if (heightCm.lt(100) || heightCm.gt(250)) throw new Error('Height must be between 100 cm and 250 cm');

  const heightInches = heightCm.div(2.54);
  const overFiveFeet = heightInches.minus(60); // inches over 5 feet

  // Devine formula (1974)
  const devine = sex === 'male'
    ? new Decimal(50).plus(overFiveFeet.times(2.3))
    : new Decimal(45.5).plus(overFiveFeet.times(2.3));

  // Hamwi formula (1964)
  const hamwi = sex === 'male'
    ? new Decimal(48).plus(overFiveFeet.times(2.7))
    : new Decimal(45.4).plus(overFiveFeet.times(2.2));

  // Broca index (modified)
  const broca = sex === 'male'
    ? heightCm.minus(100).times(0.9)
    : heightCm.minus(100).times(0.85);

  const average = devine.plus(hamwi).plus(broca).div(3);
  const averageLbs = average.times(2.20462);

  return {
    idealWeightKg: parseFloat(average.toFixed(1)),
    idealWeightLbs: parseFloat(averageLbs.toFixed(1)),
    lowerRangeKg: parseFloat(average.times(0.95).toFixed(1)),
    upperRangeKg: parseFloat(average.times(1.05).toFixed(1)),
    devineKg: parseFloat(devine.toFixed(1)),
    hamwiKg: parseFloat(hamwi.toFixed(1)),
  };
}
