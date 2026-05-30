import Decimal from 'decimal.js';

export function calculateFreelanceRate(inputs: Record<string, unknown>) {
  const annualIncome = new Decimal(Number(inputs.annualIncome));
  const hoursPerWeek = new Decimal(Number(inputs.hoursPerWeek));
  const vacationWeeks = new Decimal(Number(inputs.vacationWeeks));
  const nonBillablePercent = new Decimal(Number(inputs.nonBillablePercent));

  if (annualIncome.lte(0)) throw new Error('Income target must be positive');
  if (hoursPerWeek.lte(0)) throw new Error('Hours per week must be positive');
  if (vacationWeeks.lt(0)) throw new Error('Vacation weeks cannot be negative');

  const workingWeeks = new Decimal(52).minus(vacationWeeks);
  const billableRatio = new Decimal(100).minus(nonBillablePercent).div(100);
  const billableHoursPerYear = workingWeeks.times(hoursPerWeek).times(billableRatio);

  if (billableHoursPerYear.lte(0)) throw new Error('Billable hours must be positive — adjust non-billable ratio or working hours');

  const hourlyRate = annualIncome.div(billableHoursPerYear);
  const monthlyGrossTarget = annualIncome.div(12);
  const dailyRate = hourlyRate.times(hoursPerWeek.div(5));

  return {
    hourlyRate: parseFloat(hourlyRate.toFixed(2)),
    dailyRate: parseFloat(dailyRate.toFixed(2)),
    monthlyGrossTarget: parseFloat(monthlyGrossTarget.toFixed(2)),
    billableHoursPerYear: parseFloat(billableHoursPerYear.toFixed(0)),
  };
}
