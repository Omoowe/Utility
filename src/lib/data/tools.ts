import { calculateMortgage } from '../calculators/mortgage';
import { calculatePaycheck } from '../calculators/paycheck';
import { calculateROI } from '../calculators/roi';
import { calculateLoan } from '../calculators/loan';
import { calculateInvestment } from '../calculators/investment';
import { calculateAgeCalculator } from '../calculators/age';
import { calculateRandom } from '../calculators/random';

export interface CalculatorInput {
  name: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'date';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  required: boolean;
  options?: Array<{ value: string; label: string }>;
}

export interface CalculatorOutput {
  name: string;
  label: string;
  type: 'currency' | 'number' | 'percent' | 'text' | 'array';
  decimals?: number;
  unit?: string;
}

export interface ToolConfig {
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
  keywords: string[];
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  contentFile: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compute: (inputs: any) => any;
}

export const TOOLS: ToolConfig[] = [
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'Finance',
    title: 'Mortgage Payment Calculator',
    description: 'Calculate monthly mortgage payments, total interest, and loan payoff timeline.',
    keywords: ['mortgage', 'payment', 'interest', 'loan', 'home'],
    inputs: [
      {
        name: 'principal',
        label: 'Loan Amount ($)',
        type: 'number',
        placeholder: '300000',
        min: 100,
        max: 10000000,
        step: 1000,
        required: true,
      },
      {
        name: 'annualRate',
        label: 'Annual Interest Rate (%)',
        type: 'number',
        placeholder: '6.5',
        min: 0,
        max: 20,
        step: 0.1,
        required: true,
      },
      {
        name: 'years',
        label: 'Loan Term (Years)',
        type: 'number',
        placeholder: '30',
        min: 1,
        max: 50,
        step: 1,
        required: true,
      },
    ],
    outputs: [
      { name: 'monthlyPayment', label: 'Monthly Payment', type: 'currency' },
      { name: 'totalPaid', label: 'Total Paid Over Life', type: 'currency' },
      { name: 'totalInterest', label: 'Total Interest Paid', type: 'currency' },
    ],
    contentFile: 'mortgage-calculator.json',
    compute: calculateMortgage,
  },
  {
    slug: 'paycheck-calculator',
    name: 'Paycheck Calculator',
    category: 'Finance',
    title: 'Paycheck Deductions Calculator',
    description: 'Calculate net take-home pay after taxes and deductions.',
    keywords: ['paycheck', 'salary', 'taxes', 'deductions', 'net pay'],
    inputs: [
      {
        name: 'annualSalary',
        label: 'Annual Salary ($)',
        type: 'number',
        placeholder: '50000',
        min: 0,
        max: 1000000,
        step: 1000,
        required: true,
      },
      {
        name: 'payFrequency',
        label: 'Pay Frequency',
        type: 'select',
        required: true,
        options: [
          { value: 'annual', label: 'Annual' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'biweekly', label: 'Bi-weekly' },
          { value: 'weekly', label: 'Weekly' },
        ],
      },
    ],
    outputs: [
      { name: 'grossPerPeriod', label: 'Gross Pay', type: 'currency' },
      { name: 'federalTaxPerPeriod', label: 'Federal Tax', type: 'currency' },
      { name: 'ficaTaxPerPeriod', label: 'FICA (Social Security & Medicare)', type: 'currency' },
      { name: 'stateTaxPerPeriod', label: 'State Tax', type: 'currency' },
      { name: 'netPerPeriod', label: 'Net Pay', type: 'currency' },
    ],
    contentFile: 'paycheck-calculator.json',
    compute: calculatePaycheck,
  },
  {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    category: 'Investment',
    title: 'Return on Investment Calculator',
    description: 'Calculate ROI percentage and annualized returns on your investments.',
    keywords: ['roi', 'return', 'investment', 'profit', 'gain'],
    inputs: [
      {
        name: 'initialInvestment',
        label: 'Initial Investment ($)',
        type: 'number',
        placeholder: '10000',
        min: 100,
        max: 10000000,
        step: 100,
        required: true,
      },
      {
        name: 'gain',
        label: 'Gain ($)',
        type: 'number',
        placeholder: '2000',
        min: 0,
        max: 10000000,
        step: 100,
        required: true,
      },
      {
        name: 'years',
        label: 'Time Period (Years)',
        type: 'number',
        placeholder: '2',
        min: 0.1,
        max: 100,
        step: 0.1,
        required: true,
      },
    ],
    outputs: [
      { name: 'roiPercent', label: 'ROI', type: 'percent', decimals: 2 },
      { name: 'annualizedRoiPercent', label: 'Annualized ROI', type: 'percent', decimals: 2 },
      { name: 'finalValue', label: 'Final Value', type: 'currency' },
    ],
    contentFile: 'roi-calculator.json',
    compute: calculateROI,
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    category: 'Finance',
    title: 'Personal Loan Calculator',
    description: 'Calculate loan payments, total interest, and payoff timeline.',
    keywords: ['loan', 'payment', 'personal loan', 'interest', 'payoff'],
    inputs: [
      {
        name: 'principal',
        label: 'Loan Amount ($)',
        type: 'number',
        placeholder: '50000',
        min: 100,
        max: 10000000,
        step: 100,
        required: true,
      },
      {
        name: 'annualRate',
        label: 'Annual Interest Rate (%)',
        type: 'number',
        placeholder: '5.5',
        min: 0,
        max: 50,
        step: 0.1,
        required: true,
      },
      {
        name: 'years',
        label: 'Loan Term (Years)',
        type: 'number',
        placeholder: '5',
        min: 1,
        max: 50,
        step: 1,
        required: true,
      },
      {
        name: 'extraPaymentPerMonth',
        label: 'Extra Monthly Payment ($)',
        type: 'number',
        placeholder: '0',
        min: 0,
        max: 100000,
        step: 50,
        required: false,
      },
    ],
    outputs: [
      { name: 'monthlyPayment', label: 'Monthly Payment', type: 'currency' },
      { name: 'totalPaid', label: 'Total Paid', type: 'currency' },
      { name: 'totalInterest', label: 'Total Interest', type: 'currency' },
      { name: 'payoffMonths', label: 'Payoff Timeline', type: 'number', unit: 'months' },
    ],
    contentFile: 'loan-calculator.json',
    compute: calculateLoan,
  },
  {
    slug: 'investment-calculator',
    name: 'Investment Calculator',
    category: 'Investment',
    title: 'Investment Growth Calculator',
    description: 'Calculate future investment value with compound interest and monthly contributions.',
    keywords: ['investment', 'compound interest', 'growth', 'savings', 'returns'],
    inputs: [
      {
        name: 'principal',
        label: 'Initial Investment ($)',
        type: 'number',
        placeholder: '10000',
        min: 0,
        max: 10000000,
        step: 100,
        required: true,
      },
      {
        name: 'monthlyContribution',
        label: 'Monthly Contribution ($)',
        type: 'number',
        placeholder: '500',
        min: 0,
        max: 100000,
        step: 50,
        required: true,
      },
      {
        name: 'annualRate',
        label: 'Annual Return Rate (%)',
        type: 'number',
        placeholder: '7',
        min: 0,
        max: 100,
        step: 0.1,
        required: true,
      },
      {
        name: 'years',
        label: 'Time Period (Years)',
        type: 'number',
        placeholder: '5',
        min: 0.1,
        max: 100,
        step: 0.1,
        required: true,
      },
    ],
    outputs: [
      { name: 'finalAmount', label: 'Final Amount', type: 'currency' },
      { name: 'totalContributions', label: 'Total Contributions', type: 'currency' },
      { name: 'totalInterestEarned', label: 'Interest Earned', type: 'currency' },
    ],
    contentFile: 'investment-calculator.json',
    compute: calculateInvestment,
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'Utilities',
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    keywords: ['age', 'birthday', 'date calculator', 'how old'],
    inputs: [
      {
        name: 'birthDate',
        label: 'Birth Date',
        type: 'date',
        placeholder: 'YYYY-MM-DD',
        required: true,
      },
    ],
    outputs: [
      { name: 'years', label: 'Years', type: 'number' },
      { name: 'months', label: 'Months', type: 'number' },
      { name: 'days', label: 'Days', type: 'number' },
      { name: 'daysToNextBirthday', label: 'Days to Next Birthday', type: 'number' },
    ],
    contentFile: 'age-calculator.json',
    compute: calculateAgeCalculator,
  },
  {
    slug: 'random-number-generator',
    name: 'Random Number Generator',
    category: 'Utilities',
    title: 'Random Number Generator',
    description: 'Generate random numbers within a specified range.',
    keywords: ['random', 'number generator', 'random integer', 'lottery'],
    inputs: [
      {
        name: 'min',
        label: 'Minimum Number',
        type: 'number',
        placeholder: '1',
        min: -1000000,
        max: 1000000,
        step: 1,
        required: true,
      },
      {
        name: 'max',
        label: 'Maximum Number',
        type: 'number',
        placeholder: '100',
        min: -1000000,
        max: 1000000,
        step: 1,
        required: true,
      },
      {
        name: 'count',
        label: 'How Many Numbers?',
        type: 'number',
        placeholder: '10',
        min: 1,
        max: 10000,
        step: 1,
        required: true,
      },
    ],
    outputs: [
      { name: 'numbers', label: 'Random Numbers', type: 'array' },
    ],
    contentFile: 'random-number-generator.json',
    compute: calculateRandom,
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(TOOLS.map((tool) => tool.category)));
}
