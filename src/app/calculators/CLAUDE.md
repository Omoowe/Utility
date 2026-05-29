# src/app/calculators — Tool Route

## Files

```
calculators/
├── page.tsx                   # /calculators — all tools listing
└── [slug]/
    ├── page.tsx               # Server Component: metadata, schema, data fetch
    └── CalculatorPageClient.tsx  # 'use client': inputs, state, compute, render
```

## [slug]/page.tsx responsibilities

1. `generateStaticParams` → maps `TOOLS` to `[{ slug }]`
2. `generateMetadata` → title, description, keywords, canonical, OG, Twitter
3. Schema injection: Calculator + FAQ + Breadcrumb JSON-LD
4. Fetch `getContent(tool.contentFile)` (async import of JSON)
5. `getRelatedTools(slug, 3)` — pass to `CalculatorPageClient`
6. Strip `compute` before passing tool to client: `const { compute: _, ...serializable } = tool`

## CalculatorPageClient.tsx responsibilities

- Receives `SerializableTool` (ToolConfig minus `compute`), `content`, `relatedTools`
- On mount: calls `addRecent(tool.slug)` via `useRecentTools`
- **If `kind === 'interactive'`**: looks up `CUSTOM_COMPONENTS[tool.customComponent!]`, renders inside `CalculatorLayout` as full-width result
- **If `kind === 'calculator'`**: renders `InputGroup` per input, calls `compute()` on change, renders `ResultBox` per output

### Input state pre-population

Select inputs must be pre-populated with their first option's value:
```typescript
const initialState: Record<string, string> = {};
tool.inputs.forEach((inp) => {
  if (inp.type === 'select' && inp.options?.[0]) {
    initialState[inp.name] = inp.options[0].value;
  }
});
```

### handleInputChange type safety

Do NOT coerce select/text/date values to numbers:
```typescript
function handleInputChange(name: string, value: string, type: CalculatorInput['type']) {
  const coerced = type === 'number' ? parseFloat(value) || 0 : value;
  setState((prev) => ({ ...prev, [name]: coerced }));
}
```

## /calculators page.tsx

Iterates `CATEGORIES` array, renders all tools per category in a grid. No hardcoded category list.

```typescript
import { CATEGORIES } from '@/lib/data/categories';
import { getToolsByCategory } from '@/lib/data/tools';

// renders CATEGORIES.map(cat => section with getToolsByCategory(cat.slug))
```

## Diagnostics

```bash
npx eslint src/app/calculators --max-warnings 0
npm run type-check
```
