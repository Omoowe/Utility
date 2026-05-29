# src/lib — Business Logic & Data

## Directory Map

```
lib/
├── calculators/         # Pure compute functions, one file per tool slug
├── data/
│   ├── tools.ts         # TOOLS registry — single source of truth
│   ├── categories.ts    # CATEGORIES — 6 categories, typed
│   ├── customComponents.ts  # Lazy next/dynamic registry for interactive tools
│   ├── content/
│   │   ├── types.ts     # ToolContent interface + getContent() helper
│   │   └── {slug}.json  # Per-tool content (intro, FAQs, SEO copy)
├── utils/
│   ├── math.ts          # Decimal.js helper functions
│   ├── formatting.ts    # formatCurrency, formatNumber, formatPercent
│   ├── validation.ts    # Input validators
│   └── seo.ts           # JSON-LD schema generators + buildToolMetadata()
├── constants.ts         # Shared constants
└── siteConfig.ts        # SITE_NAME, BASE_URL, nav structure
```

## Rules

- `lib/` is framework-agnostic where possible. No Next.js imports in `calculators/` or `utils/`.
- `data/customComponents.ts` is the exception — uses `next/dynamic` by necessity.
- No `'use client'` anywhere in `lib/`.
- All financial math uses `decimal.js` (`import Decimal from 'decimal.js'`). Never `+`, `-`, `*`, `/` on money values.

## Dependency Map

```
calculators/{slug}.ts → utils/math.ts (Decimal helpers)
data/tools.ts         → calculators/* (compute functions)
data/tools.ts         → data/categories.ts (category slugs)
app/**                → data/tools.ts, data/categories.ts, data/content/types.ts
app/**                → utils/seo.ts
```

## Diagnostics

```bash
npx eslint src/lib --max-warnings 0
npm run type-check

# Run calculator unit tests
npx vitest run src/lib/calculators/
```

TS diagnostics: `mcp__ide__getDiagnostics` with file path. LSP is not available for `.ts` files in this environment.
