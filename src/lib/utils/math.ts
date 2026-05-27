import Decimal from 'decimal.js';

/**
 * Calculate compound interest using continuous compounding formula
 * A = P * e^(rt) for continuous compounding
 * Or for discrete: A = P(1 + r/n)^(nt)
 */
export function calculateCompoundInterest(
  principal: Decimal,
  annualRate: Decimal,
  years: Decimal,
  periods: number = 12
): Decimal {
  // A = P(1 + r/n)^(nt)
  // For monthly: n = 12
  const n = new Decimal(periods);
  const t = years;
  const r = annualRate.div(100);
  const rOverN = r.div(n);
  const exponent = n.times(t);
  const multiplier = new Decimal(1).plus(rOverN).pow(exponent);
  return principal.times(multiplier);
}

/**
 * Calculate monthly payment for a loan/mortgage using standard amortization formula
 * M = P[r(1+r)^n] / [(1+r)^n-1]
 * where r is monthly rate, n is number of payments
 */
export function calculateMonthlyPayment(
  principal: Decimal,
  annualRate: Decimal,
  years: Decimal
): Decimal {
  const monthlyRate = annualRate.div(100).div(12);
  const numberOfPayments = years.times(12);

  // Handle 0% interest case
  if (monthlyRate.eq(0)) {
    return principal.div(numberOfPayments);
  }

  const numerator = monthlyRate.times(
    new Decimal(1).plus(monthlyRate).pow(numberOfPayments)
  );
  const denominator = new Decimal(1)
    .plus(monthlyRate)
    .pow(numberOfPayments)
    .minus(1);

  return principal.times(numerator).div(denominator);
}

/**
 * Calculate number of months to pay off a loan with extra monthly payments
 */
export function calculatePayoffMonths(
  monthlyPayment: Decimal,
  extraPaymentPerMonth: Decimal,
  initialBalance: Decimal,
  annualRate: Decimal
): number {
  const monthlyRate = annualRate.div(100).div(12);
  const totalMonthlyPayment = monthlyPayment.plus(extraPaymentPerMonth);

  let balance = initialBalance;
  let months = 0;
  const maxMonths = 600; // Safety limit (50 years)

  while (balance.gt(0) && months < maxMonths) {
    const interestCharge = balance.times(monthlyRate);
    balance = balance.plus(interestCharge).minus(totalMonthlyPayment);
    months++;
  }

  return months;
}

/**
 * Calculate age from birth date to today
 * Returns {years, months, days, daysToNextBirthday}
 */
export function calculateAge(birthDate: Date): {
  years: number;
  months: number;
  days: number;
  daysToNextBirthday: number;
} {
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate days to next birthday
  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  // If birthday has passed this year, next birthday is next year
  if (nextBirthday < today) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysToNextBirthday = Math.ceil(
    (nextBirthday.getTime() - today.getTime()) / msPerDay
  );

  return {
    years,
    months,
    days,
    daysToNextBirthday,
  };
}

/**
 * Parse ISO date string (YYYY-MM-DD) or Date object
 */
export function parseDate(dateInput: string | Date): Date {
  if (typeof dateInput === 'string') {
    // Handle YYYY-MM-DD format
    const parts = dateInput.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return new Date(dateInput);
  }
  return dateInput;
}

/**
 * Calculate federal income tax based on 2024 tax brackets
 * Assumes single filer, standard deduction already taken
 */
export function calculateFederalTax(
  taxableIncome: Decimal,
  brackets: Array<{ min: number; max: number; rate: number }>
): Decimal {
  let tax = new Decimal(0);

  for (const bracket of brackets) {
    if (taxableIncome.lte(bracket.min)) {
      break;
    }

    const bracketStart = new Decimal(bracket.min);
    const bracketEnd = new Decimal(bracket.max);
    const incomeInBracket = Decimal.min(taxableIncome, bracketEnd).minus(
      bracketStart
    );

    if (incomeInBracket.gt(0)) {
      tax = tax.plus(incomeInBracket.times(bracket.rate));
    }
  }

  return tax;
}
