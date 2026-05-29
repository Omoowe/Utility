import Decimal from 'decimal.js';

export interface RoomSizeInputs {
  length: number;
  width: number;
}

export interface RoomSizeOutput {
  squareFeet: number;
  squareMeters: number;
  squareYards: number;
  perimeter: number;
}

export function calculateRoomSize(inputs: RoomSizeInputs): RoomSizeOutput {
  const length = new Decimal(inputs.length);
  const width = new Decimal(inputs.width);

  if (length.lte(0) || width.lte(0)) throw new Error('Room dimensions must be positive');

  const squareFeet = length.times(width);
  const squareMeters = squareFeet.times(new Decimal('0.092903'));
  const squareYards = squareFeet.div(9);
  const perimeter = length.plus(width).times(2);

  return {
    squareFeet: parseFloat(squareFeet.toFixed(2)),
    squareMeters: parseFloat(squareMeters.toFixed(2)),
    squareYards: parseFloat(squareYards.toFixed(2)),
    perimeter: parseFloat(perimeter.toFixed(2)),
  };
}
