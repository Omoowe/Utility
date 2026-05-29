import Decimal from 'decimal.js';

export interface WallpaperInputs {
  roomLength: number;
  roomWidth: number;
  wallHeight: number;
  rollCoverage: number;
}

export interface WallpaperOutput {
  wallArea: number;
  rollsNeeded: number;
  squareFeetNeeded: number;
}

export function calculateWallpaper(inputs: WallpaperInputs): WallpaperOutput {
  const length = new Decimal(inputs.roomLength);
  const width = new Decimal(inputs.roomWidth);
  const height = new Decimal(inputs.wallHeight || 8);
  const coverage = new Decimal(inputs.rollCoverage || 56); // sq ft per roll standard

  if (length.lte(0) || width.lte(0)) throw new Error('Room dimensions must be positive');
  if (height.lte(0)) throw new Error('Wall height must be positive');
  if (coverage.lte(0)) throw new Error('Roll coverage must be positive');

  const perimeter = length.plus(width).times(2);
  const wallArea = perimeter.times(height);
  // Add 10% waste
  const squareFeetNeeded = wallArea.times(new Decimal('1.10'));
  const rollsNeeded = squareFeetNeeded.div(coverage).ceil();

  return {
    wallArea: parseFloat(wallArea.toFixed(2)),
    rollsNeeded: rollsNeeded.toNumber(),
    squareFeetNeeded: parseFloat(squareFeetNeeded.toFixed(2)),
  };
}
