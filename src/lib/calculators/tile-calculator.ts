import Decimal from 'decimal.js';

export interface TileInputs {
  roomLength: number;
  roomWidth: number;
  tileLength: number;
  tileWidth: number;
  wasteFactor: number;
}

export interface TileOutput {
  tilesNeeded: number;
  roomArea: number;
  tileArea: number;
  squareFeetNeeded: number;
}

export function calculateTiles(inputs: TileInputs): TileOutput {
  const roomLength = new Decimal(inputs.roomLength);
  const roomWidth = new Decimal(inputs.roomWidth);
  const tileLength = new Decimal(inputs.tileLength).div(12);
  const tileWidth = new Decimal(inputs.tileWidth).div(12);
  const wasteFactor = new Decimal(inputs.wasteFactor || 10).div(100).plus(1);

  if (roomLength.lte(0) || roomWidth.lte(0)) throw new Error('Room dimensions must be positive');
  if (tileLength.lte(0) || tileWidth.lte(0)) throw new Error('Tile dimensions must be positive');

  const roomArea = roomLength.times(roomWidth);
  const tileArea = tileLength.times(tileWidth);
  const squareFeetNeeded = roomArea.times(wasteFactor);
  const tilesNeeded = squareFeetNeeded.div(tileArea).ceil();

  return {
    tilesNeeded: tilesNeeded.toNumber(),
    roomArea: parseFloat(roomArea.toFixed(2)),
    tileArea: parseFloat(tileArea.toFixed(4)),
    squareFeetNeeded: parseFloat(squareFeetNeeded.toFixed(2)),
  };
}
