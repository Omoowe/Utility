# ToolNest — Architecture Overview

## What This Is

Static SEO utility site. Next.js 15 App Router + Tailwind v4 + TypeScript strict. No backend, no DB. Deploys to Vercel. Revenue model: Google AdSense (placeholders in place, publisher ID pending).

Target: 50+ free tools across 6 categories, fully prerendered via `generateStaticParams`.

## URL Structure

| Pattern | Purpose |
|---------|---------|
| `/` | Homepage — hero, search, popular tools, categories |
| `/calculators` | All-tools listing (dynamic from TOOLS registry) |
| `/calculators/[slug]` | Individual tool page (calculator or interactive) |
| `/categories/[category]` | Category listing page |
| `/about`, `/contact`, `/privacy-policy`, `/disclaimer`, `/terms` | Trust pages (AdSense requirement) |

All tool URLs live under `/calculators/[slug]` regardless of category or tool type.

## Data Flow (Single Source of Truth)

```
src/lib/data/tools.ts (TOOLS array)
  ↓ slug → routing (generateStaticParams)
  ↓ metadata → SEO (generateMetadata)
  ↓ kind: 'calculator' | 'interactive' → render path
  ↓ contentFile → JSON content (intro, FAQs, SEO copy)

src/lib/data/categories.ts (CATEGORIES array)
  ↓ category slug on every ToolConfig
  ↓ drives /categories/[category] pages
  ↓ drives nav dropdown, footer links

src/lib/data/customComponents.ts (CUSTOM_COMPONENTS record)
  ↓ lazy next/dynamic imports for interactive tools
  ↓ keyed by customComponent slug on ToolConfig
```

**Never hardcode category lists or tool slugs in pages.** Always read from `TOOLS` / `CATEGORIES`.

## Two Tool Kinds

| `kind` | How it renders | Requires |
|--------|---------------|---------|
| `'calculator'` | data-driven InputGroup → compute() → ResultBox | `compute` fn, typed `inputs`/`outputs` |
| `'interactive'` | custom React component mounted inside CalculatorLayout | `customComponent` key in CUSTOM_COMPONENTS |

Both kinds get: CalculatorLayout, breadcrumbs, FAQs, related tools, schema JSON-LD, AdPlaceholder.

## Directory Map

```
src/
├── app/                    # Next.js App Router — pages only, minimal logic
├── components/
│   ├── calculators/        # Data-driven engine: CalculatorLayout, InputGroup, ResultBox, FAQAccordion
│   ├── common/             # Shared UI: SearchBar, ShareButton, BreadcrumbNav, AdPlaceholder, RelatedTools
│   ├── layout/             # Header, Footer, ThemeToggle
│   ├── providers/          # ThemeProvider (context)
│   └── tools/              # Interactive tool components (*Tool.tsx)
├── hooks/                  # useCalculator, useFavorites, useRecentTools, useTheme, useDebounce
└── lib/
    ├── calculators/        # Pure compute functions (one file per tool)
    ├── data/               # TOOLS, CATEGORIES, content types, customComponents registry
    ├── utils/              # math.ts, formatting.ts, validation.ts, seo.ts
    └── siteConfig.ts       # SITE_NAME, BASE_URL, nav links
```

## Key Invariants

- **`src/lib/data/tools.ts`** — edit to add/modify tools. Slug must match `src/lib/data/content/{slug}.json`.
- **`src/lib/data/categories.ts`** — edit to add/modify categories. `ToolConfig.category` must be a valid slug from here.
- **`src/lib/data/customComponents.ts`** — register every new interactive component here before it can be used.
- **`src/lib/data/content/{slug}.json`** — required for every tool (drives SEO copy + FAQs).
- **decimal.js** — all financial arithmetic uses `Decimal` type. Never use native `+` or `*` on money values.
- **Dark mode** — no-flash inline script in `layout.tsx` reads `localStorage.theme` before CSS loads. All components use `dark:` Tailwind prefix.
- **AdPlaceholder** — must reserve fixed height with `min-h-[90px]` (or similar) to prevent CLS.

## Diagnostics

LSP is **not available** for `.ts`/`.tsx` files in this environment.

```bash
# TypeScript errors (project-wide only)
npm run type-check

# Lint with zero-warning budget
npm run lint

# Auto-fix lint
npm run lint:fix

# Full build (catches route/prerender errors)
npm run build

# TS diagnostics via IDE tool (preferred over LSP)
# Use: mcp__ide__getDiagnostics with filePath argument
```

## Adding a New Calculator (quick ref)

1. `src/lib/calculators/{slug}.ts` — write `calculate{Name}(inputs): Output` using decimal.js
2. `src/lib/data/tools.ts` — add `ToolConfig` entry with `kind: 'calculator'`, wire `compute`
3. `src/lib/data/content/{slug}.json` — add content with `intro`, `howItWorks`, `interpretationGuide`, `faqs` (10+)
4. Done — `generateStaticParams` picks it up automatically

## Adding a New Interactive Tool (quick ref)

1. `src/components/tools/{Name}Tool.tsx` — implement `({ tool }: Props) => JSX.Element`
2. `src/lib/data/customComponents.ts` — add `next/dynamic` entry
3. `src/lib/data/tools.ts` — add `ToolConfig` with `kind: 'interactive'`, `customComponent: 'key'`
4. `src/lib/data/content/{slug}.json` — add content
5. Done
