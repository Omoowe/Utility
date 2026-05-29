import Decimal from 'decimal.js';

export interface FlooringInputs {
  roomLength: number;
  roomWidth: number;
  wasteFactor: number;
}

export interface FlooringOutput {
  roomArea: number;
  squareFeetNeeded: number;
  squareYardsNeeded: number;
}

export function calculateFlooring(inputs: FlooringInputs): FlooringOutput {
  const length = new Decimal(inputs.roomLength);
  const width = new Decimal(inputs.roomWidth);
  const waste = new Decimal(inputs.wasteFactor || 10).div(100).plus(1);

  if (length.lte(0) || width.lte(0)) throw new Error('Room dimensions must be positive');

  const roomArea = length.times(width);
  const squareFeetNeeded = roomArea.times(waste);
  const squareYardsNeeded = squareFeetNeeded.div(9);

  return {
    roomArea: parseFloat(roomArea.toFixed(2)),
    squareFeetNeeded: parseFloat(squareFeetNeeded.toFixed(2)),
    squareYardsNeeded: parseFloat(squareYardsNeeded.toFixed(2)),
  };
}
