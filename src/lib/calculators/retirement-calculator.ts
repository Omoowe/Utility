import Decimal from 'decimal.js';

export function calculateRetirement(inputs: Record<string, unknown>) {
  const currentAge = new Decimal(Number(inputs.currentAge));
  const retirementAge = new Decimal(Number(inputs.retirementAge || 65));
  const currentSavings = new Decimal(Number(inputs.currentSavings || 0));
  const monthlyContribution = new Decimal(Number(inputs.monthlyContribution || 500));
  const annualReturn = new Decimal(Number(inputs.annualReturn || 7));
  const withdrawalRate = new Decimal(Number(inputs.withdrawalRate || 4));

  if (currentAge.lte(0) || currentAge.gte(100)) throw new Error('Current age must be between 1 and 99');
  if (retirementAge.lte(currentAge)) throw new Error('Retirement age must be greater than current age');
  if (annualReturn.lt(0) || annualReturn.gt(30)) throw new Error('Annual return must be between 0% and 30%');

  const yearsToRetirement = retirementAge.minus(currentAge);
  const monthsToRetirement = yearsToRetirement.times(12);
  const monthlyRate = annualReturn.div(100).div(12);

  // Future value of existing savings
  const fvSavings = currentSavings.times(
    Decimal.pow(new Decimal(1).plus(monthlyRate), monthsToRetirement)
  );

  // Future value of monthly contributions (annuity)
  let fvContributions = new Decimal(0);
  if (monthlyRate.gt(0)) {
    fvContributions = monthlyContribution.times(
      Decimal.pow(new Decimal(1).plus(monthlyRate), monthsToRetirement).minus(1).div(monthlyRate)
    );
  } else {
    fvContributions = monthlyContribution.times(monthsToRetirement);
  }

  const totalAtRetirement = fvSavings.plus(fvContributions);
  const monthlyIncomeAt4 = totalAtRetirement.times(withdrawalRate.div(100)).div(12);
  const totalContributed = currentSavings.plus(monthlyContribution.times(monthsToRetirement));
  const investmentGrowth = totalAtRetirement.minus(totalContributed);

  return {
    totalAtRetirement: parseFloat(totalAtRetirement.toFixed(2)),
    monthlyIncome: parseFloat(monthlyIncomeAt4.toFixed(2)),
    yearsToRetirement: parseFloat(yearsToRetirement.toFixed(0)),
    totalContributed: parseFloat(totalContributed.toFixed(2)),
    investmentGrowth: parseFloat(investmentGrowth.toFixed(2)),
  };
}
