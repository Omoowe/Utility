# src/components/calculators — Data-Driven Engine

## Files

```
calculators/
├── CalculatorLayout.tsx   # Wrapper for every tool page
├── InputGroup.tsx         # Renders one CalculatorInput field
├── ResultBox.tsx          # Renders one CalculatorOutput value
└── FAQAccordion.tsx       # Collapsible FAQ list
```

## CalculatorLayout

Wraps **both** calculator and interactive tools. Renders breadcrumbs, title, description, ad placeholder, content sections, FAQs, related tools, share button.

```typescript
interface CalculatorLayoutProps {
  tool: ToolConfig;
  children?: React.ReactNode;   // calculator: input column
  results?: React.ReactNode;    // calculator: output column (also full-width for interactive)
  intro?: string;
  howItWorks?: string;
  faqs?: Array<{ question: string; answer: string }>;
  relatedTools?: ToolConfig[];
}
```

When `children` is absent (interactive tools), `results` renders full-width.

Breadcrumb path: `Home / All Tools / {Category Name} / {Tool Name}` — links to `/`, `/calculators`, `/categories/{slug}`.

## InputGroup

```typescript
interface InputGroupProps {
  label: string;
  type: 'number' | 'text' | 'date' | 'select';
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;  // required when type='select'
  error?: string;
}
```

`type='select'` renders a `<select>` with a chevron SVG overlay. The parent (`CalculatorPageClient`) must pre-populate select state with `options[0].value` — InputGroup does not set defaults.

## ResultBox

```typescript
interface ResultBoxProps {
  label: string;
  value: number | string | null;
  type: 'currency' | 'number' | 'percent' | 'text' | 'array';
  decimals?: number;
  unit?: string;
  highlight?: boolean;
}
```

Formatting:
- `'currency'` → `Intl.NumberFormat` with `style: 'currency'`, `currency: 'USD'`
- `'percent'` → appends `%`, uses `decimals` (default 2)
- `'number'` → `Intl.NumberFormat`, uses `decimals`
- `'text'` → renders as-is
- `'array'` → renders each element in a list

## FAQAccordion

```typescript
interface FAQAccordionProps {
  faqs: Array<{ question: string; answer: string }>;
}
```

Uses `<details>`/`<summary>` for no-JS accessibility. Generates inline FAQPage schema via `generateFAQSchema` from `src/lib/utils/seo.ts`.

## Diagnostics

```bash
npx eslint src/components/calculators --max-warnings 0
npm run type-check
```
