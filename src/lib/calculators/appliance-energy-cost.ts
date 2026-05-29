import Decimal from 'decimal.js';

export interface ApplianceEnergyInputs {
  watts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  kwhRate: number;
}

export interface ApplianceEnergyOutput {
  dailyCost: number;
  monthlyCost: number;
  annualCost: number;
  monthlyKwh: number;
}

export function calculateApplianceEnergy(inputs: ApplianceEnergyInputs): ApplianceEnergyOutput {
  const watts = new Decimal(inputs.watts);
  const hoursPerDay = new Decimal(inputs.hoursPerDay);
  const days = new Decimal(inputs.daysPerMonth || 30);
  const rate = new Decimal(inputs.kwhRate);

  if (watts.lte(0)) throw new Error('Watts must be positive');
  if (hoursPerDay.lte(0)) throw new Error('Hours per day must be positive');
  if (rate.lte(0)) throw new Error('kWh rate must be positive');

  const kwhPerDay = watts.times(hoursPerDay).div(1000);
  const monthlyKwh = kwhPerDay.times(days);
  const dailyCost = kwhPerDay.times(rate);
  const monthlyCost = monthlyKwh.times(rate);
  const annualCost = dailyCost.times(365);

  return {
    dailyCost: parseFloat(dailyCost.toFixed(2)),
    monthlyCost: parseFloat(monthlyCost.toFixed(2)),
    annualCost: parseFloat(annualCost.toFixed(2)),
    monthlyKwh: parseFloat(monthlyKwh.toFixed(2)),
  };
}
