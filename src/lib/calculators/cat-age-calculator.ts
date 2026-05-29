import Decimal from 'decimal.js';

export interface CatAgeInputs {
  humanYears: number;
}

export interface CatAgeOutput {
  catYears: number;
  lifeStage: string;
}

export function calculateCatAge(inputs: CatAgeInputs): CatAgeOutput {
  const years = new Decimal(inputs.humanYears);
  if (years.lte(0)) throw new Error('Age must be positive');

  let catYears: Decimal;
  if (years.lte(1)) {
    catYears = years.times(15);
  } else if (years.lte(2)) {
    catYears = new Decimal(15).plus(years.minus(1).times(9));
  } else {
    catYears = new Decimal(24).plus(years.minus(2).times(4));
  }

  const cy = parseFloat(catYears.toFixed(1));
  let lifeStage: string;
  if (cy < 6) lifeStage = 'Kitten';
  else if (cy < 24) lifeStage = 'Junior';
  else if (cy < 48) lifeStage = 'Adult';
  else if (cy < 72) lifeStage = 'Mature';
  else if (cy < 90) lifeStage = 'Senior';
  else lifeStage = 'Geriatric';

  return { catYears: cy, lifeStage };
}
