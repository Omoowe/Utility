import Decimal from 'decimal.js';

const LETTER_GRADES: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0,
};

export function calculateGpa(inputs: Record<string, unknown>) {
  const credits1 = new Decimal(Number(inputs.credits1 || 3));
  const credits2 = new Decimal(Number(inputs.credits2 || 3));
  const credits3 = new Decimal(Number(inputs.credits3 || 3));
  const credits4 = new Decimal(Number(inputs.credits4 || 3));

  const grade1 = String(inputs.grade1 || 'A');
  const grade2 = String(inputs.grade2 || 'A');
  const grade3 = String(inputs.grade3 || 'B+');
  const grade4 = String(inputs.grade4 || 'B');

  const gp1 = new Decimal(LETTER_GRADES[grade1] ?? 0);
  const gp2 = new Decimal(LETTER_GRADES[grade2] ?? 0);
  const gp3 = new Decimal(LETTER_GRADES[grade3] ?? 0);
  const gp4 = new Decimal(LETTER_GRADES[grade4] ?? 0);

  const totalCredits = credits1.plus(credits2).plus(credits3).plus(credits4);
  if (totalCredits.lte(0)) throw new Error('Total credits must be positive');

  const qualityPoints = gp1.times(credits1)
    .plus(gp2.times(credits2))
    .plus(gp3.times(credits3))
    .plus(gp4.times(credits4));

  const gpa = qualityPoints.div(totalCredits);
  const totalQualityPoints = parseFloat(qualityPoints.toFixed(1));

  let letterEquivalent = 'F';
  const gpaNum = gpa.toNumber();
  if (gpaNum >= 3.7) letterEquivalent = 'A';
  else if (gpaNum >= 3.3) letterEquivalent = 'A-/B+';
  else if (gpaNum >= 3.0) letterEquivalent = 'B';
  else if (gpaNum >= 2.7) letterEquivalent = 'B-';
  else if (gpaNum >= 2.3) letterEquivalent = 'C+';
  else if (gpaNum >= 2.0) letterEquivalent = 'C';
  else if (gpaNum >= 1.7) letterEquivalent = 'C-';
  else if (gpaNum >= 1.0) letterEquivalent = 'D';

  const standing = gpaNum >= 3.5 ? 'Dean\'s List' : gpaNum >= 3.0 ? 'Good Standing' : gpaNum >= 2.0 ? 'Satisfactory' : 'Academic Probation Risk';

  return {
    gpa: parseFloat(gpa.toFixed(2)),
    totalCredits: parseFloat(totalCredits.toFixed(0)),
    totalQualityPoints,
    letterEquivalent,
    standing,
  };
}
