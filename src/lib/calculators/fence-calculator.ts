import Decimal from 'decimal.js';

export interface FenceInputs {
  length: number;
  width: number;
  panelLength: number;
  numberOfGates: number;
}

export interface FenceOutput {
  perimeter: number;
  panelsNeeded: number;
  postsNeeded: number;
  totalFenceLength: number;
}

export function calculateFence(inputs: FenceInputs): FenceOutput {
  const length = new Decimal(inputs.length);
  const width = new Decimal(inputs.width);
  const panelLen = new Decimal(inputs.panelLength || 8);
  const gates = new Decimal(inputs.numberOfGates || 0);

  if (length.lte(0) || width.lte(0)) throw new Error('Yard dimensions must be positive');
  if (panelLen.lte(0)) throw new Error('Panel length must be positive');

  const perimeter = length.plus(width).times(2);
  // Subtract gate openings (standard 4ft each)
  const fenceLength = perimeter.minus(gates.times(4));
  const panelsNeeded = fenceLength.div(panelLen).ceil();
  // Posts = panels + 1 (one on each end)
  const postsNeeded = panelsNeeded.plus(1);

  return {
    perimeter: parseFloat(perimeter.toFixed(2)),
    panelsNeeded: panelsNeeded.toNumber(),
    postsNeeded: postsNeeded.toNumber(),
    totalFenceLength: parseFloat(fenceLength.gt(0) ? fenceLength.toFixed(2) : '0.00'),
  };
}
