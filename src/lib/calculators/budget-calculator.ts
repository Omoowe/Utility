import Decimal from 'decimal.js';

export interface BudgetInputs {
  monthlyIncome: number;
  housing: number;
  transportation: number;
  food: number;
  utilities: number;
  entertainment: number;
  savings: number;
  other: number;
}

export interface BudgetOutput {
  totalExpenses: number;
  surplus: number;
  savingsRate: number;
  housingPercent: number;
}

export function calculateBudget(inputs: BudgetInputs): BudgetOutput {
  const income = new Decimal(inputs.monthlyIncome);
  const housing = new Decimal(inputs.housing || 0);
  const transportation = new Decimal(inputs.transportation || 0);
  const food = new Decimal(inputs.food || 0);
  const utilities = new Decimal(inputs.utilities || 0);
  const entertainment = new Decimal(inputs.entertainment || 0);
  const savings = new Decimal(inputs.savings || 0);
  const other = new Decimal(inputs.other || 0);

  if (income.lte(0)) throw new Error('Monthly income must be positive');

  const totalExpenses = housing.plus(transportation).plus(food).plus(utilities)
    .plus(entertainment).plus(savings).plus(other);
  const surplus = income.minus(totalExpenses);
  const savingsRate = income.gt(0) ? savings.div(income).times(100) : new Decimal(0);
  const housingPercent = income.gt(0) ? housing.div(income).times(100) : new Decimal(0);

  return {
    totalExpenses: parseFloat(totalExpenses.toFixed(2)),
    surplus: parseFloat(surplus.toFixed(2)),
    savingsRate: parseFloat(savingsRate.toFixed(2)),
    housingPercent: parseFloat(housingPercent.toFixed(2)),
  };
}
