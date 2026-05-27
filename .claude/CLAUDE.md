# ToolNest Developer Guide

## Project Overview

**ToolNest:** SEO-focused utility calculator website. Next.js 15 + Tailwind + Vercel. No backend. Designed for organic ranking + AdSense monetization.

- **Phase 1 Goal:** 7 calculators + 6 essential pages live Week 1
- **Tech Stack:** TypeScript + React 19 + Tailwind CSS 4 + math.js
- **Deployment:** Vercel (auto-optimized Core Web Vitals)
- **Code Quality:** ESLint strict, TypeScript strict, Prettier formatting

---

## Architecture Overview

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components (organized by feature)
├── lib/                    # Business logic, utilities, data
├── styles/                 # Global CSS, Tailwind overrides
└── config/                 # Configuration files

public/                     # Static assets (robots.txt, sitemap.xml, images)
.planning/                  # Project planning artifacts (REQUIREMENTS, ROADMAP, etc.)
```

### Data Model: Central Source of Truth

All tool metadata defined in `src/lib/data/tools.ts`:
- Tool routing (slug, URL)
- SEO metadata (title, description, keywords)
- Content references (what to load)
- Calculator config (inputs, outputs, compute function)
- Schema markup (auto-generated JSON-LD)

**Why:** Single source of truth for routing, metadata, filtering. Enables programmatic generation (state variations, category pages, sitemap).

### Component Philosophy

**Reusable over specific.**
- `CalculatorLayout` wraps any calculator (not MortgageCalculatorPage + LoanCalculatorPage)
- `InputGroup` used by all calculator inputs (not custom input per calculator)
- `ResultBox` formats any output (currency, number, percentage)

**Props over composition.**
```tsx
// YES: data-driven
<CalculatorLayout tool={mortgageConfig} />

// NO: duplicated code
<MortgageCalculatorPage />
<LoanCalculatorPage />
```

### Content Model

Content stored as JSON in `src/lib/data/content/{slug}.json`, not hardcoded in components.

```json
{
  "slug": "mortgage-calculator",
  "intro": "...",
  "howItWorks": "...",
  "interpretationGuide": "...",
  "faqs": [...]
}
```

**Why:** Decouples content from UI. Easy updates without rebuilds. Enables bulk content generation.

### SEO Architecture

- **Programmatic routes:** `/calculators/[slug]`, `/categories/[category]`
- **Dynamic sitemap:** `app/sitemap.ts` generates from tools.ts
- **Auto-generated schema markup:** `lib/utils/seo.ts` creates Calculator + FAQPage + Breadcrumb JSON-LD
- **Metadata per page:** `lib/config/metadata.ts` + page-specific overrides
- **Breadcrumb navigation:** Home > Category > Calculator (internal links + schema)

---

## Code Conventions

### TypeScript

**Strict mode: Required.**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

**Types over any.**
```tsx
// YES
interface Tool {
  slug: string;
  name: string;
}

// NO
const tool: any = {...}
```

### React & Components

**Functional components with hooks.**
- No class components
- Prefer hooks (useState, useEffect, useContext)
- Custom hooks for reusable logic (useCalculator, useFavorites, useTheme)

**Component naming:**
- Components: PascalCase (Button.tsx, CalculatorLayout.tsx)
- Hooks: camelCase with `use` prefix (useCalculator, useFavorites)
- Utilities: camelCase (formatCurrency, validateInput)

**File organization:**
```
src/components/
├── layout/
│   ├── Header.tsx          # Top nav
│   ├── Footer.tsx          # Bottom nav + links
│   └── StickyNav.tsx       # Sticky header variant
├── calculators/
│   ├── CalculatorLayout.tsx    # Wrapper for all calculators
│   ├── InputGroup.tsx          # Reusable input component
│   ├── ResultBox.tsx           # Reusable output component
│   └── ...
├── common/
│   ├── AdPlaceholder.tsx   # Ad container
│   └── SchemaMarkup.tsx    # Schema generation
└── sections/
    ├── HeroSection.tsx     # Home hero
    └── ...
```

### Styling

**Tailwind CSS for everything.**
- No inline styles
- No CSS modules (unless necessary)
- Use Tailwind utilities + `clsx` for conditional classes

```tsx
// YES
<button className={clsx("px-4 py-2 rounded", isActive && "bg-blue-500")}>
  Submit
</button>

// NO
<button style={{ padding: "8px 16px", borderRadius: "4px" }}>
  Submit
</button>
```

**Dark mode:** Use Tailwind `dark:` prefix
```tsx
<div className="bg-white dark:bg-gray-900">
  Content
</div>
```

### Naming Conventions

**Variables & functions:** camelCase
```ts
const mortaggePayment = calculateMortgage(...)
const formatCurrency = (amount) => ...
```

**Constants:** UPPER_SNAKE_CASE
```ts
const MAX_LOAN_AMOUNT = 1_000_000
const TAX_RATES = { federal: 0.12, ... }
```

**Files & folders:** kebab-case (except components)
```
src/
├── calculators/
│   ├── mortgage.ts         # kebab-case
│   └── compound-interest.ts
├── components/
│   ├── CalculatorLayout.tsx  # PascalCase
└── config/
    └── site-config.ts      # kebab-case
```

### Error Handling

**Always validate inputs:**
```ts
function calculateMortgage(principal: number, rate: number, years: number) {
  if (principal <= 0) throw new Error("Principal must be positive");
  if (rate < 0) throw new Error("Rate cannot be negative");
  if (years <= 0) throw new Error("Years must be positive");
  // calculate...
}
```

**Component-level error boundaries (Phase 2):**
- Wrap CalculatorLayout in ErrorBoundary
- Show user-friendly error messages
- Log to analytics for debugging

---

## Testing & Linting

### ESLint

**Config:** `.eslintrc.json` (strict, no-any, no-unused-vars)

**Rules:**
- No `any` type
- No unused variables
- No console logs in production
- Import order (Next.js, React, third-party, local)

**Run:**
```bash
npm run lint
npm run lint:fix
```

### TypeScript

**Config:** `tsconfig.json` (strict mode enabled)

**Check types:**
```bash
npm run type-check
```

### Testing (Phase 2+)

**Scope:** Unit tests for calculators (logic), component tests for UI.

**Framework:** Vitest + React Testing Library

**Files:**
```
src/lib/calculators/__tests__/
├── mortgage.test.ts
├── paycheck.test.ts
└── ...

src/components/__tests__/
├── InputGroup.test.tsx
└── ...
```

**Run:**
```bash
npm run test
npm run test:watch
```

---

## Development Workflow

### Setup
```bash
npm install
npm run dev
```

### Before Committing
```bash
npm run lint:fix
npm run type-check
npm run test (Phase 2+)
git add .
git commit -m "..."
```

### Adding a New Calculator

1. **Define inputs/outputs** in `src/lib/data/tools.ts`
2. **Write compute logic** in `src/lib/calculators/{slug}.ts`
3. **Create content** in `src/lib/data/content/{slug}.json`
4. **Create page** at `src/app/calculators/{slug}/page.tsx` (reuses CalculatorLayout)
5. **Test manually** at http://localhost:3000/calculators/{slug}
6. **Run lints:** `npm run lint:fix && npm run type-check`

### Adding a New Page

1. Create file in `src/app/{path}/page.tsx`
2. Add metadata (title, description) at top
3. Use reusable sections (HeroSection, etc.)
4. Deploy with `git push` (Vercel auto-deploys main)

---

## LSP & Editor Setup

### TypeScript Language Server

**Enabled by default in VS Code with TypeScript extension.**

**Verify:** Open any .ts/.tsx file, hover over a symbol. Should show type info.

**Commands:**
- `Cmd+Click` - Go to definition
- `Cmd+Shift+O` - Show document symbols
- `Cmd+Shift+P` > "Go to Type Definition" - Jump to type

### VS Code Settings (Optional)

Create `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Prettier

**Config:** `.prettierrc.json`
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100
}
```

**Format before commit:**
```bash
npm run format
```

---

## Performance & Core Web Vitals

### Targets
- **LCP (Largest Contentful Paint):** <2.5s
- **INP (Interaction to Next Paint):** <200ms
- **CLS (Cumulative Layout Shift):** <0.1

### Best Practices

**Images:**
- Use Next.js `<Image>` component (auto-optimization, WebP, srcset)
- Preload LCP image: `<Image priority />`
- Lazy load others: `<Image loading="lazy" />`
- Never lazy load hero image or calculator preview

**Calculations:**
- Debounce input changes (300ms)
- Run compute client-side (no API calls per keystroke)
- Measure compute time (<50ms target)

**Bundling:**
- Use `next/dynamic` for code splitting
- Load calculator libraries on-demand (not in main bundle)
- Tree-shake unused utility functions

**Monitoring:**
- Vercel Analytics: automatic CWV tracking
- Plausible: privacy-friendly analytics
- Google Search Console: indexation + performance report

---

## SEO Checklist (Per Calculator Page)

- [ ] Title tag (60 chars, keyword + "Calculator")
- [ ] Meta description (160 chars, problem + solution)
- [ ] H1 heading (unique, primary keyword)
- [ ] 1000+ word content (intro + how-it-works + FAQ)
- [ ] Calculator schema markup (via seo.ts)
- [ ] FAQPage schema (10-15 Q&A pairs)
- [ ] Breadcrumb navigation + schema
- [ ] OpenGraph + Twitter card meta tags
- [ ] Internal links (related tools, category page)
- [ ] Mobile responsive (320px-1440px)
- [ ] Core Web Vitals passing (<2.5s LCP)

---

## Deployment

### Vercel

**Connected to GitHub repo.**

**Deploy process:**
1. Write code locally
2. `git commit -m "message"`
3. `git push origin main`
4. Vercel auto-deploys (checks pass → live)

**Environment variables:** None required for Phase 1 (static site).

**Monitoring:**
- Vercel Analytics dashboard (CWV tracking)
- Build logs (any errors show in Vercel UI)

### Pre-Deployment Checklist
- [ ] All pages render without errors
- [ ] All calculators compute correctly
- [ ] Mobile responsive (test on actual device)
- [ ] Lighthouse score ≥90 (performance)
- [ ] No console errors/warnings
- [ ] Schema markup valid (Google Rich Results Test)

---

## Troubleshooting

### TypeScript Errors

**Type 'X' has no property 'Y'**
- Verify types are defined in tools.ts or interface file
- Check imports (did you import the interface?)
- Restart TypeScript server: `Cmd+Shift+P` > "TypeScript: Restart TS Server"

### Build Errors

**Cannot find module 'X'**
- Verify import path (relative or absolute)
- Check file exists in correct location
- Restart dev server: `npm run dev`

### Performance Issues

**LCP slow (>2.5s)**
- Profile in Lighthouse (npm run build → npm run preview)
- Check if hero image lazy-loaded (should be preloaded)
- Use WebP format (smaller file size)
- Consider Vercel Image Optimization

**INP slow (>200ms)**
- Debounce calculator inputs
- Check compute time (should be <50ms)
- Profile in DevTools > Performance tab

---

## References

- **REQUIREMENTS.md:** Feature list, content model, SEO requirements
- **ROADMAP.md:** 7-day Phase 1 execution breakdown
- **PROJECT.md:** Vision, scope, decisions, risks
- **Techstack:** Next.js 15, React 19, Tailwind CSS 4, TypeScript strict
- **Deployment:** Vercel (vercel.app)

---

## Quick Links

- **Dev server:** `npm run dev` → http://localhost:3000
- **Build:** `npm run build`
- **Lint:** `npm run lint:fix`
- **Type check:** `npm run type-check`
- **Format:** `npm run format`

---

## Owner Notes

**Solo project: no code review needed, but maintain standards.**

- Commit often, write clear messages
- Test manually before pushing
- Update STATE.md after milestones (Phase 1 complete, AdSense approved, etc.)
- Track metrics (organic traffic, revenue, rankings)
