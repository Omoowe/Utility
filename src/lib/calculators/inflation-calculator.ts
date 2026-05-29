import Decimal from 'decimal.js';

export interface InflationInputs {
  presentValue: number;
  inflationRate: number;
  years: number;
}

export interface InflationOutput {
  futureValue: number;
  purchasingPowerLost: number;
  purchasingPowerLostPercent: number;
}

export function calculateInflation(inputs: InflationInputs): InflationOutput {
  const PV = new Decimal(inputs.presentValue);
  const rate = new Decimal(inputs.inflationRate).div(100);
  const years = new Decimal(inputs.years);

  if (PV.lte(0)) throw new Error('Present value must be positive');
  if (rate.lt(0)) throw new Error('Inflation rate cannot be negative');
  if (years.lte(0)) throw new Error('Years must be positive');

  // FV = PV * (1 + r)^t
  const futureValue = PV.times(new Decimal(1).plus(rate).pow(years));
  const purchasingPowerLost = futureValue.minus(PV);
  const purchasingPowerLostPercent = purchasingPowerLost.div(PV).times(100);

  return {
    futureValue: parseFloat(futureValue.toFixed(2)),
    purchasingPowerLost: parseFloat(purchasingPowerLost.toFixed(2)),
    purchasingPowerLostPercent: parseFloat(purchasingPowerLostPercent.toFixed(2)),
  };
}
