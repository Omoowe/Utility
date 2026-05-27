export const TAX_BRACKETS_2024 = {
  federal: {
    single: [
      { min: 0, max: 11600, rate: 0.1 },
      { min: 11601, max: 47150, rate: 0.12 },
      { min: 47151, max: 100525, rate: 0.22 },
      { min: 100526, max: 191950, rate: 0.24 },
      { min: 191951, max: 243725, rate: 0.32 },
      { min: 243726, max: 609350, rate: 0.35 },
      { min: 609351, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23200, rate: 0.1 },
      { min: 23201, max: 94300, rate: 0.12 },
      { min: 94301, max: 201050, rate: 0.22 },
      { min: 201051, max: 383900, rate: 0.24 },
      { min: 383901, max: 487450, rate: 0.32 },
      { min: 487451, max: 731200, rate: 0.35 },
      { min: 731201, max: Infinity, rate: 0.37 },
    ],
  },
  standard_deduction_2024: {
    single: 14600,
    married: 29200,
    headOfHousehold: 21900,
  },
};

export const FINANCIAL_LIMITS = {
  MAX_LOAN_AMOUNT: 10_000_000,
  MIN_LOAN_AMOUNT: 100,
  MAX_INTEREST_RATE: 50,
  MIN_INTEREST_RATE: 0,
  MAX_YEARS: 50,
  MIN_YEARS: 1,
  MAX_SALARY: 1_000_000,
  MIN_SALARY: 0,
};

export const CURRENCY_SYMBOL = '$';
export const DEFAULT_LOCALE = 'en-US';

export const VALIDATION_RULES = {
  POSITIVE_NUMBER: 'Must be a positive number',
  NON_NEGATIVE: 'Must be zero or greater',
  VALID_PERCENTAGE: 'Must be between 0 and 100',
  VALID_RATE: 'Must be a valid interest rate',
  REQUIRED_FIELD: 'This field is required',
} as const;
