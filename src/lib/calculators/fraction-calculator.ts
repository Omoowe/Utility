import Decimal from 'decimal.js';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function simplify(num: number, den: number): { num: number; den: number } {
  if (den === 0) throw new Error('Denominator cannot be zero');
  const g = gcd(Math.abs(num), Math.abs(den));
  const sign = den < 0 ? -1 : 1;
  return { num: sign * num / g, den: sign * den / g };
}

export function calculateFraction(inputs: Record<string, unknown>) {
  const num1 = Math.round(Number(inputs.num1 || 1));
  const den1 = Math.round(Number(inputs.den1 || 2));
  const num2 = Math.round(Number(inputs.num2 || 1));
  const den2 = Math.round(Number(inputs.den2 || 4));
  const operation = String(inputs.operation || 'add');

  if (den1 === 0 || den2 === 0) throw new Error('Denominator cannot be zero');

  let rNum: number, rDen: number;

  switch (operation) {
    case 'subtract':
      rNum = num1 * den2 - num2 * den1;
      rDen = den1 * den2;
      break;
    case 'multiply':
      rNum = num1 * num2;
      rDen = den1 * den2;
      break;
    case 'divide':
      if (num2 === 0) throw new Error('Cannot divide by zero');
      rNum = num1 * den2;
      rDen = den1 * num2;
      break;
    default: // add
      rNum = num1 * den2 + num2 * den1;
      rDen = den1 * den2;
  }

  const simplified = simplify(rNum, rDen);
  const decimal = new Decimal(simplified.num).div(simplified.den);
  const wholePart = Math.trunc(simplified.num / simplified.den);
  const remainder = Math.abs(simplified.num % simplified.den);

  const mixedNumber = wholePart !== 0 && remainder !== 0
    ? `${wholePart} ${remainder}/${Math.abs(simplified.den)}`
    : wholePart !== 0
    ? String(wholePart)
    : `${simplified.num}/${simplified.den}`;

  return {
    numerator: simplified.num,
    denominator: simplified.den,
    fraction: `${simplified.num}/${simplified.den}`,
    mixedNumber,
    decimal: parseFloat(decimal.toFixed(6)),
  };
}
