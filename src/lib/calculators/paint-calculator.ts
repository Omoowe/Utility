import Decimal from 'decimal.js';

export interface PaintInputs {
  roomLength: number;
  roomWidth: number;
  ceilingHeight: number;
  numberOfCoats: number;
  coveragePerGallon: number;
}

export interface PaintOutput {
  gallonsNeeded: number;
  wallArea: number;
  totalAreaToPaint: number;
}

export function calculatePaint(inputs: PaintInputs): PaintOutput {
  const length = new Decimal(inputs.roomLength);
  const width = new Decimal(inputs.roomWidth);
  const height = new Decimal(inputs.ceilingHeight || 8);
  const coats = new Decimal(inputs.numberOfCoats || 2);
  const coverage = new Decimal(inputs.coveragePerGallon || 400);

  if (length.lte(0) || width.lte(0)) throw new Error('Room dimensions must be positive');
  if (height.lte(0)) throw new Error('Ceiling height must be positive');
  if (coverage.lte(0)) throw new Error('Coverage must be positive');

  // Perimeter × height for wall area
  const perimeter = length.plus(width).times(2);
  const wallArea = perimeter.times(height);
  const totalAreaToPaint = wallArea.times(coats);
  const gallonsNeeded = totalAreaToPaint.div(coverage).ceil();

  return {
    gallonsNeeded: gallonsNeeded.toNumber(),
    wallArea: parseFloat(wallArea.toFixed(2)),
    totalAreaToPaint: parseFloat(totalAreaToPaint.toFixed(2)),
  };
}
