# ToolNest - SEO Utility Calculator Website

Production-ready SEO utility calculator website. Built with Next.js 15 + Tailwind CSS. Designed for organic search ranking + AdSense monetization.

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## What's Included

### Project Planning
- `.planning/PROJECT.md` - Vision, scope, decisions
- `.planning/REQUIREMENTS.md` - Feature list, content model, SEO requirements
- `.planning/ROADMAP.md` - 7-day Phase 1 execution breakdown
- `.planning/STATE.md` - Project memory, metrics, learnings

### Code Structure
- `src/app/` - Next.js App Router pages (routing convention in `.context`)
- `src/components/` - Reusable React components (component pattern in `.context`)
- `src/lib/` - Business logic, utilities, data (architecture in `.context`)
- `src/styles/` - Global CSS + Tailwind
- `public/` - Static assets, robots.txt, sitemap.xml

### Configuration Files
- `.eslintrc.json` - Strict ESLint config (no-any, type-safe)
- `.prettierrc.json` - Code formatting rules
- `tsconfig.json` - TypeScript strict mode
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind theme + colors
- `package.json` - Dependencies + scripts
- `.env.example` - Environment variable template

### Developer Guides
- `.claude/CLAUDE.md` - **Main developer guide** (architecture, conventions, setup)
- `src/app/.context` - Page routing conventions
- `src/components/.context` - Component design patterns
- `src/lib/.context` - Business logic organization
- `public/.context` - Static asset management

## Developer Guide

**Start here:** [`.claude/CLAUDE.md`](./.claude/CLAUDE.md)

This file contains:
- Architecture overview
- Code conventions (TypeScript, React, Tailwind)
- Component philosophy (reusable, data-driven)
- Development workflow (setup, adding calculators)
- LSP & editor setup
- Core Web Vitals targets
- SEO checklist
- Deployment notes

## Key Architecture Decisions

### Single Source of Truth
All tool metadata defined in `src/lib/data/tools.ts`:
- Tool routing (slug, URL)
- SEO metadata (title, description)
- Calculator config (inputs, outputs, compute logic)
- Related tools (internal linking)
- Schema markup (auto-generated JSON-LD)

**Why:** Enables programmatic generation of pages, categories, sitemap. Easy to add tools without duplicating code.

### Reusable Components
- `CalculatorLayout` - Wraps ANY calculator (not per-tool components)
- `InputGroup`, `ResultBox`, `FAQAccordion` - Shared across tools
- `BreadcrumbNav`, `RelatedTools` - Automatic internal linking

**Why:** Add 50 calculators without 50× the code. Consistent UX.

### Data-Driven Content
Calculator content stored as JSON in `src/lib/data/content/{slug}.json`:
- Intro, how-it-works, interpretation guide, FAQs
- Decoupled from UI (easy bulk updates)
- Enables AI content generation

**Why:** Fast iteration. Single component + many data files = scales well.

## Phase 1 MVP (Week 1)

### Calculators (7 tools)
1. **Mortgage Calculator** - Monthly payment, amortization
2. **Paycheck/Salary Calculator** - Gross to net with tax estimation
3. **ROI Calculator** - Return on investment calculation
4. **Loan Calculator** - Monthly payment + interest breakdown
5. **Investment Calculator** - Compound interest calculation
6. **Age Calculator** - Years, months, days + countdown to birthday
7. **Random Number Generator** - Generate random integers

### Pages
- Homepage (hero + tool grid + categories + FAQ)
- Calculator listing page
- Individual calculator pages (reuses CalculatorLayout)
- Category pages (Finance, Utility)
- About, Contact, Privacy, Terms pages

### SEO
- Schema markup (Calculator + FAQPage + Breadcrumb)
- Auto-generated sitemap.xml
- robots.txt
- OpenGraph + Twitter card meta tags
- 1000-1200 words content per calculator

### Performance Targets
- LCP (Largest Contentful Paint): <2.5s
- INP (Interaction to Next Paint): <200ms
- CLS (Cumulative Layout Shift): <0.1
- Lighthouse score: ≥90 (performance)

## Development Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

npm run lint         # Run ESLint (fail if any errors)
npm run lint:fix     # Auto-fix ESLint issues
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
npm run test         # Run unit tests (Phase 2+)
```

## Adding a New Calculator

1. **Define in `src/lib/data/tools.ts`:**
   ```typescript
   'new-calculator': {
     slug: 'new-calculator',
     name: 'New Calculator',
     title: 'New Calculator | ToolNest',
     metaDescription: '...',
     calculator: {
       inputs: [...],
       compute: calculateNew,
       outputs: [...],
     },
     relatedTools: ['mortgage-calculator', ...],
   }
   ```

2. **Implement logic in `src/lib/calculators/new.ts`:**
   ```typescript
   export function calculateNew(inputs: NewInputs): NewOutput {
     // calculation logic
   }
   ```

3. **Create content in `src/lib/data/content/new-calculator.json`:**
   ```json
   {
     "slug": "new-calculator",
     "intro": "...",
     "howItWorks": "...",
     "faqs": [...]
   }
   ```

4. **Create page at `src/app/calculators/[slug]/page.tsx`:**
   - Page auto-generates from tools.ts + content JSON
   - Reuses CalculatorLayout component

5. **Test:**
   ```bash
   npm run lint:fix && npm run type-check
   npm run dev
   # Visit http://localhost:3000/calculators/new-calculator
   ```

## Code Quality

### TypeScript
- Strict mode enabled (`noImplicitAny`, `strictNullChecks`, etc.)
- All types explicit (no `any`)
- Props interfaces for all components

### Linting
- ESLint strict config (no console logs, unused vars, etc.)
- Import ordering enforced
- React hooks rules checked

### Formatting
- Prettier auto-formats on save (VS Code)
- Consistent 2-space indentation
- Trailing commas in ES5+ (arrays/objects)

### Testing (Phase 2+)
- Unit tests for calculators (Vitest)
- Component tests for UI (React Testing Library)
- Target: 80%+ coverage

## Deployment

### Vercel (Recommended)

```bash
# Connect GitHub repo
# Vercel auto-deploys on push to main

git add .
git commit -m "Add mortgage calculator"
git push origin main
```

Vercel handles:
- Automatic Core Web Vitals optimization
- Image optimization (WebP, srcset)
- Edge caching
- Automatic HTTPS + redirects

### Environment Variables
- Phase 1: None required (static site)
- Phase 2+: `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`, etc.

See `.env.example` for template.

## SEO Monitoring

### Week 1-2
- Submit sitemap to Google Search Console
- Monitor indexation status

### Week 2-4
- Check which pages are ranking
- Monitor CTR + impressions
- Fix any crawl errors

### Month 2+
- Track organic traffic + conversions
- Analyze top-performing tools
- Expand similar categories

## Future Phases

### Phase 2: Expansion (Week 2-3)
- +8 Health/Home/Pet calculators
- AdSense application + approval
- Google Search Console monitoring

### Phase 3: Scale (Week 4+)
- Programmatic content (state-based variations: Paycheck × 50 states)
- Affiliate links (financial products, tools)
- Database + user accounts (optional)

### Phase 4+: Monetization
- Advanced AdSense optimization (header bidding)
- Affiliate program setup
- Newsletter signup + automation

## References

- **Architecture:** `.claude/CLAUDE.md`
- **Planning:** `.planning/ROADMAP.md`
- **Requirements:** `.planning/REQUIREMENTS.md`
- **Tech Docs:**
  - [Next.js 15 Docs](https://nextjs.org/docs)
  - [React 19 Docs](https://react.dev)
  - [Tailwind CSS](https://tailwindcss.com)

## Performance Benchmarks

**Target Core Web Vitals (Google standards):**
- LCP: < 2.5s ✓
- INP: < 200ms ✓
- CLS: < 0.1 ✓

**Lighthouse Score:**
- Performance: ≥ 90 ✓
- Accessibility: ≥ 95 ✓
- Best Practices: ≥ 90 ✓
- SEO: 100 ✓

## License

This project is for personal/commercial use.

---

**Last Updated:** 2026-05-27

**Owner:** Hafeez (hafeezalliowe@gmail.com)

**Status:** Phase 1 Planning → Ready for Execution
