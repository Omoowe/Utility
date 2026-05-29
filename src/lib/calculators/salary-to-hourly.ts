import Decimal from 'decimal.js';

export interface SalaryToHourlyInputs {
  annualSalary: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface SalaryToHourlyOutput {
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
}

/**
 * Salary to hourly: annual / (hours/week * weeks/year)
 * Standard: 40 hrs/week × 52 weeks = 2080 hours
 */
export function calculateSalaryToHourly(inputs: SalaryToHourlyInputs): SalaryToHourlyOutput {
  const annual = new Decimal(inputs.annualSalary);
  const hoursPerWeek = new Decimal(inputs.hoursPerWeek || 40);
  const weeksPerYear = new Decimal(inputs.weeksPerYear || 52);

  if (annual.lte(0)) throw new Error('Annual salary must be positive');
  if (hoursPerWeek.lte(0)) throw new Error('Hours per week must be positive');
  if (weeksPerYear.lte(0)) throw new Error('Weeks per year must be positive');

  const totalHours = hoursPerWeek.times(weeksPerYear);
  const hourlyRate = annual.div(totalHours);
  const dailyRate = hourlyRate.times(hoursPerWeek).div(5);
  const weeklyRate = annual.div(weeksPerYear);
  const monthlyRate = annual.div(12);

  return {
    hourlyRate: parseFloat(hourlyRate.toFixed(2)),
    dailyRate: parseFloat(dailyRate.toFixed(2)),
    weeklyRate: parseFloat(weeklyRate.toFixed(2)),
    monthlyRate: parseFloat(monthlyRate.toFixed(2)),
  };
}
