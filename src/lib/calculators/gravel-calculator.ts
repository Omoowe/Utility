import Decimal from 'decimal.js';

export interface GravelInputs {
  length: number;
  width: number;
  depth: number;
}

export interface GravelOutput {
  cubicYards: number;
  tons: number;
  cubicFeet: number;
}

export function calculateGravel(inputs: GravelInputs): GravelOutput {
  const length = new Decimal(inputs.length);
  const width = new Decimal(inputs.width);
  const depthFt = new Decimal(inputs.depth).div(12); // inches to feet

  if (length.lte(0) || width.lte(0) || depthFt.lte(0)) throw new Error('All dimensions must be positive');

  const cubicFeet = length.times(width).times(depthFt);
  const cubicYards = cubicFeet.div(27);
  // Gravel density ~1.4 tons/cubic yard
  const tons = cubicYards.times(new Decimal('1.4'));

  return {
    cubicYards: parseFloat(cubicYards.toFixed(2)),
    tons: parseFloat(tons.toFixed(2)),
    cubicFeet: parseFloat(cubicFeet.toFixed(2)),
  };
}
