import Decimal from 'decimal.js';

export interface ConcreteInputs {
  length: number;
  width: number;
  depth: number;
}

export interface ConcreteOutput {
  cubicYards: number;
  cubicFeet: number;
  bags60lb: number;
  bags80lb: number;
}

export function calculateConcrete(inputs: ConcreteInputs): ConcreteOutput {
  const length = new Decimal(inputs.length);
  const width = new Decimal(inputs.width);
  const depth = new Decimal(inputs.depth).div(12); // inches to feet

  if (length.lte(0) || width.lte(0) || depth.lte(0)) throw new Error('All dimensions must be positive');

  const cubicFeet = length.times(width).times(depth);
  const cubicYards = cubicFeet.div(27);
  // 60lb bag covers ~0.45 cu ft; 80lb ~0.60 cu ft
  const bags60lb = cubicFeet.div(new Decimal('0.45')).ceil();
  const bags80lb = cubicFeet.div(new Decimal('0.60')).ceil();

  return {
    cubicYards: parseFloat(cubicYards.toFixed(2)),
    cubicFeet: parseFloat(cubicFeet.toFixed(2)),
    bags60lb: bags60lb.toNumber(),
    bags80lb: bags80lb.toNumber(),
  };
}
