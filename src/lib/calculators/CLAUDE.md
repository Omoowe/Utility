# src/lib/calculators — Pure Compute Functions

## Pattern

One file per calculator tool. Named export follows `calculate{Name}(inputs: XInputs): XOutput`.

```typescript
import Decimal from 'decimal.js';
import { calculateMonthlyPayment } from '../utils/math';

export interface MyInputs {
  principal: number;
  rate: number;
}

export interface MyOutput {
  result: number;
  breakdown: number;
}

export function calculateMyThing(inputs: MyInputs): MyOutput {
  // 1. Validate inputs (throw with user-facing message)
  if (inputs.principal <= 0) throw new Error('Principal must be positive');

  // 2. Wrap in Decimal for precision
  const principal = new Decimal(inputs.principal);
  const rate = new Decimal(inputs.rate);

  // 3. Compute using Decimal arithmetic (no native +/-/*/)
  const result = principal.times(rate.div(100));

  // 4. Return plain numbers (parseFloat(x.toFixed(n)))
  return {
    result: parseFloat(result.toFixed(2)),
    breakdown: parseFloat(result.div(12).toFixed(2)),
  };
}
```

## Rules

- **Always use `decimal.js`** for any multiplication, division, or addition involving money or rates. Never `a * b` on floats.
- **Validate first** — throw `Error` with clear message. `CalculatorPageClient` catches and displays the message.
- **Return plain `number`** (not `Decimal`) — use `parseFloat(x.toFixed(n))`.
- **No side effects** — no imports from `react`, `next`, or `components/`. Pure functions only.
- Wire the function into `ToolConfig.compute` in `tools.ts` via top-level import.

## Available Math Utilities (src/lib/utils/math.ts)

```typescript
calculateMonthlyPayment(principal, annualRate, years): Decimal
calculateCompoundInterest(principal, annualRate, years, periods?): Decimal
calculatePayoffMonths(monthlyPayment, extraPayment, balance, annualRate): number
calculateAge(birthDate: Date): { years, months, days, daysToNextBirthday }
calculateFederalTax(taxableIncome, brackets): Decimal
parseDate(input: string | Date): Date
```

Use these rather than re-implementing.

## Existing Calculators

| File | Slug |
|------|------|
| `mortgage.ts` | `mortgage-calculator` |
| `loan.ts` | `loan-calculator` |
| `paycheck.ts` | `paycheck-calculator` |
| `roi.ts` | `roi-calculator` |
| `investment.ts` | `investment-calculator` |
| `age.ts` | `age-calculator` |
| `random.ts` | `random-number-generator` |

## Testing

```bash
# Run all calculator tests
npx vitest run src/lib/calculators/

# Watch mode
npx vitest --watch src/lib/calculators/

# With coverage
npx vitest --coverage src/lib/calculators/
```

Test files go in `src/lib/calculators/__tests__/{slug}.test.ts`. Test the compute function directly with known input → expected output pairs.

## Diagnostics

```bash
npx eslint src/lib/calculators --max-warnings 0
npm run type-check
```
