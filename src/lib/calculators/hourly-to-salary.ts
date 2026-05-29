import Decimal from 'decimal.js';

export interface HourlyToSalaryInputs {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface HourlyToSalaryOutput {
  annualSalary: number;
  monthlyRate: number;
  weeklyRate: number;
  dailyRate: number;
}

export function calculateHourlyToSalary(inputs: HourlyToSalaryInputs): HourlyToSalaryOutput {
  const hourly = new Decimal(inputs.hourlyRate);
  const hoursPerWeek = new Decimal(inputs.hoursPerWeek || 40);
  const weeksPerYear = new Decimal(inputs.weeksPerYear || 52);

  if (hourly.lte(0)) throw new Error('Hourly rate must be positive');
  if (hoursPerWeek.lte(0)) throw new Error('Hours per week must be positive');
  if (weeksPerYear.lte(0)) throw new Error('Weeks per year must be positive');

  const annualSalary = hourly.times(hoursPerWeek).times(weeksPerYear);
  const monthlyRate = annualSalary.div(12);
  const weeklyRate = hourly.times(hoursPerWeek);
  const dailyRate = weeklyRate.div(5);

  return {
    annualSalary: parseFloat(annualSalary.toFixed(2)),
    monthlyRate: parseFloat(monthlyRate.toFixed(2)),
    weeklyRate: parseFloat(weeklyRate.toFixed(2)),
    dailyRate: parseFloat(dailyRate.toFixed(2)),
  };
}
