import { DEFAULT_LOCALE } from '../constants';

export function formatCurrency(value: number, decimals = 2): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(
  value: number,
  decimals = 2,
  isDecimal = true
): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(isDecimal ? value : value / 100);
}

export function toFixedNumber(value: number, decimals = 2): number {
  return parseFloat(value.toFixed(decimals));
}

export function numberToWords(num: number): string {
  const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const teens = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];
  const scales = ['', 'thousand', 'million', 'billion', 'trillion'];

  if (num === 0) return 'zero';
  if (num < 0) return 'negative ' + numberToWords(-num);

  let result = '';
  let scaleIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      result = convertChunk(chunk, ones, teens, tens) + ' ' + scales[scaleIndex] + ' ' + result;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return result.trim().replace(/\s+/g, ' ');
}

function convertChunk(
  num: number,
  ones: string[],
  teens: string[],
  tens: string[]
): string {
  let result = '';

  const hundreds = Math.floor(num / 100);
  if (hundreds > 0) {
    result += ones[hundreds] + ' hundred ';
  }

  const remainder = num % 100;
  if (remainder >= 20) {
    const ten = Math.floor(remainder / 10);
    const one = remainder % 10;
    result += tens[ten];
    if (one > 0) {
      result += ' ' + ones[one];
    }
  } else if (remainder >= 10) {
    result += teens[remainder - 10];
  } else if (remainder > 0) {
    result += ones[remainder];
  }

  return result.trim();
}
