import { FINANCIAL_LIMITS } from '../constants';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validatePositiveNumber(
  value: unknown,
  fieldName = 'Value'
): ValidationResult {
  const num = Number(value);
  if (isNaN(num) || num <= 0) {
    return {
      valid: false,
      error: `${fieldName} must be a positive number`,
    };
  }
  return { valid: true };
}

export function validateNonNegative(
  value: unknown,
  fieldName = 'Value'
): ValidationResult {
  const num = Number(value);
  if (isNaN(num) || num < 0) {
    return {
      valid: false,
      error: `${fieldName} must be zero or greater`,
    };
  }
  return { valid: true };
}

export function validatePercentage(
  value: unknown,
  fieldName = 'Percentage'
): ValidationResult {
  const num = Number(value);
  if (isNaN(num) || num < 0 || num > 100) {
    return {
      valid: false,
      error: `${fieldName} must be between 0 and 100`,
    };
  }
  return { valid: true };
}

export function validateInterestRate(
  value: unknown,
  fieldName = 'Interest Rate'
): ValidationResult {
  const num = Number(value);
  if (
    isNaN(num) ||
    num < FINANCIAL_LIMITS.MIN_INTEREST_RATE ||
    num > FINANCIAL_LIMITS.MAX_INTEREST_RATE
  ) {
    return {
      valid: false,
      error: `${fieldName} must be between ${FINANCIAL_LIMITS.MIN_INTEREST_RATE} and ${FINANCIAL_LIMITS.MAX_INTEREST_RATE}`,
    };
  }
  return { valid: true };
}

export function validateLoanAmount(
  value: unknown,
  fieldName = 'Loan Amount'
): ValidationResult {
  const num = Number(value);
  if (
    isNaN(num) ||
    num < FINANCIAL_LIMITS.MIN_LOAN_AMOUNT ||
    num > FINANCIAL_LIMITS.MAX_LOAN_AMOUNT
  ) {
    return {
      valid: false,
      error: `${fieldName} must be between $${FINANCIAL_LIMITS.MIN_LOAN_AMOUNT} and $${FINANCIAL_LIMITS.MAX_LOAN_AMOUNT.toLocaleString()}`,
    };
  }
  return { valid: true };
}

export function validateLoanTerm(
  value: unknown,
  fieldName = 'Loan Term'
): ValidationResult {
  const num = Number(value);
  if (
    isNaN(num) ||
    !Number.isInteger(num) ||
    num < FINANCIAL_LIMITS.MIN_YEARS ||
    num > FINANCIAL_LIMITS.MAX_YEARS
  ) {
    return {
      valid: false,
      error: `${fieldName} must be a whole number between ${FINANCIAL_LIMITS.MIN_YEARS} and ${FINANCIAL_LIMITS.MAX_YEARS}`,
    };
  }
  return { valid: true };
}

export function validateSalary(
  value: unknown,
  fieldName = 'Salary'
): ValidationResult {
  const num = Number(value);
  if (
    isNaN(num) ||
    num < FINANCIAL_LIMITS.MIN_SALARY ||
    num > FINANCIAL_LIMITS.MAX_SALARY
  ) {
    return {
      valid: false,
      error: `${fieldName} must be between $0 and $${FINANCIAL_LIMITS.MAX_SALARY.toLocaleString()}`,
    };
  }
  return { valid: true };
}

export function validateRequired(
  value: unknown,
  fieldName = 'Field'
): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return {
      valid: false,
      error: `${fieldName} is required`,
    };
  }
  return { valid: true };
}

export function validateMultiple(
  validators: Array<() => ValidationResult>
): ValidationResult[] {
  return validators.map((validator) => validator());
}

export function areAllValid(results: ValidationResult[]): boolean {
  return results.every((result) => result.valid);
}
