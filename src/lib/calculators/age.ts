import { calculateAge, parseDate } from '../utils/math';

export interface AgeInputs {
  birthDate: string | Date;
}

export interface AgeOutput {
  years: number;
  months: number;
  days: number;
  daysToNextBirthday: number;
}

/**
 * Calculate age from birth date to today
 * Returns years, months, days, and days until next birthday
 *
 * Test case: birthDate=2000-01-01, today=2026-05-27
 * Expected: 26 years, 4 months, 26 days, 219 days to next birthday
 */
export function calculateAgeCalculator(inputs: AgeInputs): AgeOutput {
  const birthDate = parseDate(inputs.birthDate);

  // Validate input
  if (birthDate > new Date()) {
    throw new Error('Birth date cannot be in the future');
  }

  const ageData = calculateAge(birthDate);

  return {
    years: ageData.years,
    months: ageData.months,
    days: ageData.days,
    daysToNextBirthday: ageData.daysToNextBirthday,
  };
}
