import Decimal from 'decimal.js';

export interface MulchInputs {
  area: number;
  depth: number;
}

export interface MulchOutput {
  cubicYards: number;
  cubicFeet: number;
  bags2CuFt: number;
}

export function calculateMulch(inputs: MulchInputs): MulchOutput {
  const area = new Decimal(inputs.area);
  const depthFt = new Decimal(inputs.depth).div(12); // inches to feet

  if (area.lte(0)) throw new Error('Area must be positive');
  if (depthFt.lte(0)) throw new Error('Depth must be positive');

  const cubicFeet = area.times(depthFt);
  const cubicYards = cubicFeet.div(27);
  const bags2CuFt = cubicFeet.div(2).ceil();

  return {
    cubicYards: parseFloat(cubicYards.toFixed(2)),
    cubicFeet: parseFloat(cubicFeet.toFixed(2)),
    bags2CuFt: bags2CuFt.toNumber(),
  };
}
