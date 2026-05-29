import Decimal from 'decimal.js';

export interface YoutubeMoneyInputs {
  monthlyViews: number;
  rpm: number;
}

export interface YoutubeMoneyOutput {
  monthlyEarnings: number;
  annualEarnings: number;
  earningsPer1000Views: number;
}

export function calculateYoutubeMoney(inputs: YoutubeMoneyInputs): YoutubeMoneyOutput {
  const views = new Decimal(inputs.monthlyViews);
  const rpm = new Decimal(inputs.rpm);

  if (views.lte(0)) throw new Error('Monthly views must be positive');
  if (rpm.lte(0)) throw new Error('RPM must be positive');

  const monthlyEarnings = views.times(rpm).div(1000);
  const annualEarnings = monthlyEarnings.times(12);

  return {
    monthlyEarnings: parseFloat(monthlyEarnings.toFixed(2)),
    annualEarnings: parseFloat(annualEarnings.toFixed(2)),
    earningsPer1000Views: parseFloat(rpm.toFixed(2)),
  };
}
