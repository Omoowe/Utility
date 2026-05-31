import Decimal from 'decimal.js';

function getLetterGrade(pct: number): string {
  if (pct >= 97) return 'A+';
  if (pct >= 93) return 'A';
  if (pct >= 90) return 'A-';
  if (pct >= 87) return 'B+';
  if (pct >= 83) return 'B';
  if (pct >= 80) return 'B-';
  if (pct >= 77) return 'C+';
  if (pct >= 73) return 'C';
  if (pct >= 70) return 'C-';
  if (pct >= 67) return 'D+';
  if (pct >= 63) return 'D';
  if (pct >= 60) return 'D-';
  return 'F';
}

export function calculateGrade(inputs: Record<string, unknown>) {
  const scored = new Decimal(Number(inputs.scored));
  const possible = new Decimal(Number(inputs.possible));
  const weight = new Decimal(Number(inputs.weight || 100));

  if (possible.lte(0)) throw new Error('Total points must be greater than 0');
  if (scored.lt(0)) throw new Error('Points scored cannot be negative');
  if (scored.gt(possible)) throw new Error('Points scored cannot exceed total points');
  if (weight.lt(0) || weight.gt(100)) throw new Error('Weight must be between 0 and 100%');

  const percentage = scored.div(possible).times(100);
  const weightedScore = percentage.times(weight.div(100));
  const pointsNeededForA = possible.times(0.93);
  const pointsNeededForB = possible.times(0.83);
  const letterGrade = getLetterGrade(percentage.toNumber());

  return {
    percentage: parseFloat(percentage.toFixed(2)),
    letterGrade,
    weightedScore: parseFloat(weightedScore.toFixed(2)),
    pointsMissed: parseFloat(possible.minus(scored).toFixed(1)),
    pointsForA: parseFloat(pointsNeededForA.toFixed(1)),
    pointsForB: parseFloat(pointsNeededForB.toFixed(1)),
  };
}
