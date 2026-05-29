import Decimal from 'decimal.js';

export interface DogAgeInputs {
  humanYears: number;
}

export interface DogAgeOutput {
  dogYears: number;
  lifeStage: string;
}

export function calculateDogAge(inputs: DogAgeInputs): DogAgeOutput {
  const years = new Decimal(inputs.humanYears);
  if (years.lte(0)) throw new Error('Age must be positive');

  let dogYears: Decimal;
  if (years.lte(2)) {
    dogYears = years.times(new Decimal('10.5'));
  } else {
    dogYears = new Decimal(21).plus(years.minus(2).times(4));
  }

  const dy = parseFloat(dogYears.toFixed(1));
  let lifeStage: string;
  if (dy < 1) lifeStage = 'Newborn';
  else if (dy < 12) lifeStage = 'Puppy';
  else if (dy < 36) lifeStage = 'Junior';
  else if (dy < 84) lifeStage = 'Adult';
  else if (dy < 120) lifeStage = 'Mature';
  else lifeStage = 'Senior';

  return { dogYears: dy, lifeStage };
}
