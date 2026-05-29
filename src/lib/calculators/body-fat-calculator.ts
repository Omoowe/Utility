import Decimal from 'decimal.js';

export interface BodyFatInputs {
  gender: string;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm: number;
}

export interface BodyFatOutput {
  bodyFatPercent: number;
  category: string;
  fatMassKg: number;
  leanMassKg: number;
}

export function calculateBodyFat(inputs: BodyFatInputs): BodyFatOutput {
  const height = new Decimal(inputs.heightCm);
  const neck = new Decimal(inputs.neckCm);
  const waist = new Decimal(inputs.waistCm);

  if (height.lte(0)) throw new Error('Height must be positive');
  if (neck.lte(0)) throw new Error('Neck measurement must be positive');
  if (waist.lte(0)) throw new Error('Waist measurement must be positive');

  // US Navy method (cm)
  let bodyFatPercent: Decimal;
  if (inputs.gender === 'female') {
    const hip = new Decimal(inputs.hipCm || 0);
    if (hip.lte(0)) throw new Error('Hip measurement required for female calculation');
    // BF% = 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
    const logWaistHipNeck = Decimal.log10(waist.plus(hip).minus(neck));
    const logHeight = Decimal.log10(height);
    bodyFatPercent = new Decimal('163.205').times(logWaistHipNeck)
      .minus(new Decimal('97.684').times(logHeight))
      .minus(new Decimal('78.387'));
  } else {
    // BF% = 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
    const logWaistNeck = Decimal.log10(waist.minus(neck));
    const logHeight = Decimal.log10(height);
    bodyFatPercent = new Decimal('86.010').times(logWaistNeck)
      .minus(new Decimal('70.041').times(logHeight))
      .plus(new Decimal('36.76'));
  }

  const bfNum = parseFloat(bodyFatPercent.toFixed(1));
  let category: string;
  if (inputs.gender === 'female') {
    if (bfNum < 14) category = 'Essential fat';
    else if (bfNum < 21) category = 'Athletic';
    else if (bfNum < 25) category = 'Fitness';
    else if (bfNum < 32) category = 'Average';
    else category = 'Obese';
  } else {
    if (bfNum < 6) category = 'Essential fat';
    else if (bfNum < 14) category = 'Athletic';
    else if (bfNum < 18) category = 'Fitness';
    else if (bfNum < 25) category = 'Average';
    else category = 'Obese';
  }

  // Estimate body weight from height (rough) — not accurate without weight input
  // We return percentages only; mass requires weight
  return {
    bodyFatPercent: bfNum,
    category,
    fatMassKg: 0,
    leanMassKg: 0,
  };
}
