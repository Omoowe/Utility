# REQUIREMENTS: ToolNest (SEO Utility Calculator Website)

**Project:** ToolNest
**Scope:** MVP Launch (Week 1) + Phase 2 Expansion
**Owner:** Solo Developer
**Deadline:** Production-ready by end of Week 1 (target Friday)

---

## VISION

Build a **production-ready SEO utility calculator website** designed for organic traffic growth and AdSense monetization. Focus: high-value finance calculators first (highest RPM $15-50), expand to health/home/pet tools. Target: 15-20 tools at launch, scale to 50+ over 6-12 months.

Design philosophy: minimal, mobile-first, fast (LCP <2.5s), trust-building.

---

## CORE OBJECTIVES

### Primary Goals (Non-negotiable)
1. **SEO-Ready Structure:** Programmatic routes, schema markup (Calculator + FAQPage + Breadcrumb), internal linking strategy
2. **AdSense Approval Path:** 20-30 pages × 500+ words; original research; proper navigation; privacy/terms pages
3. **Mobile-First Performance:** Core Web Vitals optimized; interactive calculators with <50ms compute time
4. **Fast Deployment:** Ready for Vercel day 1; zero backend required

### Secondary Goals (Nice-to-have, Phase 2+)
- Affiliate link integration (financial products, tools)
- User favorites via localStorage
- Dark/light mode toggle
- Advanced filtering + search

---

## MVP SCOPE: PHASE 1 (WEEK 1)

### Calculator Tools (Core 7 Finance + Quick Utility)

**FINANCE CALCULATORS** (generate immediate revenue)
1. Mortgage Calculator (largest traffic + CPC)
2. Paycheck/Salary Calculator (state-based variations: US 50-state multiplier)
3. ROI Calculator (business intent = high affiliate potential)
4. Loan Calculator (personal/auto/student versatile)
5. Investment Calculator (compound interest/SIP)

**QUICK UTILITY CALCULATORS** (engagement + internal linking)
6. Age Calculator (evergreen, high engagement)
7. Random Number Generator (sticky users, low friction)

**Why 7? Not 15-20 yet?**
- Solo dev constraint: 7 × 2-3 hours each (calc + 1000-word content) = 14-21 hours
- Plus essential pages (home, category, about, privacy, contact, sitemap) = ~10 hours
- Plus component/utility scaffolding = ~5 hours
- **Total: ~30-35 hours achievable in week with focused sprints**

- Phase 2 (Week 2): +8 health/home calculators
- Phase 3 (Week 3+): +12 pet/business calculators

### Essential Pages (Static + Dynamic)

**Static Pages** (written once, hand-optimized SEO)
- Homepage (hero + tool grid + categories + FAQ + featured tools)
- About page (trust-building, author bio, mission)
- Contact page (lead capture, affiliate partnerships inquiry)
- Privacy Policy (AdSense approval requirement)
- Terms of Service / Disclaimer (legal protection)
- Sitemap (XML auto-generated + HTML version)
- robots.txt (search engine directives)

**Dynamic Pages** (generated from component templates)
- /calculators/[slug] (individual calculator pages × 7)
- /categories/[category] (category listing pages × 1 for Finance initially)
- Related tools sections (on each calculator page)
- Breadcrumb navigation (Home > Finance > Mortgage Calculator)

### Content Requirements per Calculator

**Minimum per tool:**
- SEO-optimized title (60 chars)
- Meta description (160 chars)
- H1 heading (unique, includes primary keyword)
- Introduction (100-150 words: problem statement + tool value)
- Interactive calculator (inputs + compute + results display)
- "How It Works" section (H2, 200-300 words: formula + variables + example)
- Interpretation guide (H2, 150-200 words: what results mean, context)
- FAQ section (H2, 10-15 questions × 50-100 words each)
- Related calculators section (internal links)
- Schema markup (Calculator + FAQPage + Breadcrumb JSON-LD)

**Target: 1,000-1,200 words per calculator page**

### Design System

**Visual Language:**
- White/light gray background (#FFFFFF, #F9FAFB)
- Primary accent: Neutral blue or teal (for buttons, links)
- Dark mode support (Tailwind `dark:` utilities)
- Rounded cards (8px border-radius)
- Typography: System font stack (faster load than custom fonts)

**Components (reusable across all tools):**
1. **CalculatorCard** - displays tool preview with tags, link
2. **CalculatorLayout** - wrapper for all calculator pages (header + sidebar + footer)
3. **InputGroup** - labeled input fields with validation
4. **ResultBox** - displays calculator output with formatting
5. **FAQAccordion** - expandable FAQ items
6. **BreadcrumbNav** - navigational breadcrumbs + schema
7. **RelatedTools** - card grid linking to related calculators
8. **AdPlaceholder** - responsive ad container (300×250, 300×600, responsive)
9. **StickyHeader** - navigation + dark mode toggle
10. **FooterNav** - footer with links + sitemap + social (optional)

**Responsive Breakpoints:**
- Mobile: 320px-767px
- Tablet: 768px-1023px
- Desktop: 1024px+

**Performance Targets:**
- LCP (Largest Contentful Paint): <2.5s
- INP (Interaction to Next Paint): <200ms
- CLS (Cumulative Layout Shift): <0.1
- First Paint: <1.5s

---

## TECHNICAL ARCHITECTURE

### Tech Stack (Locked)
- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4
- **Calculations:** math.js or decimal.js (precision for financial calcs)
- **Metadata:** next-seo for Next.js (automatic OG, Twitter, schema)
- **Deployment:** Vercel (automatic Core Web Vitals optimization)
- **Analytics:** Vercel Analytics + Plausible (privacy-compliant)
- **Images:** Next.js Image component (automatic WebP, srcset, optimization)

### Project Structure

```
toolnest/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Homepage
│   │   ├── about/page.tsx          # About page
│   │   ├── contact/page.tsx        # Contact page
│   │   ├── privacy/page.tsx        # Privacy policy
│   │   ├── terms/page.tsx          # Terms of service
│   │   ├── sitemap.ts              # Sitemap generation
│   │   ├── robots.ts               # robots.txt generation
│   │   ├── calculators/
│   │   │   ├── [slug]/page.tsx     # Dynamic calculator pages
│   │   │   └── page.tsx            # All calculators listing
│   │   ├── categories/
│   │   │   └── [category]/page.tsx # Category pages
│   │   └── api/
│   │       └── (optional for future calc endpoints)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── StickyNav.tsx
│   │   ├── calculators/
│   │   │   ├── CalculatorLayout.tsx
│   │   │   ├── CalculatorCard.tsx
│   │   │   ├── InputGroup.tsx
│   │   │   ├── ResultBox.tsx
│   │   │   ├── FAQAccordion.tsx
│   │   │   ├── RelatedTools.tsx
│   │   │   └── BreadcrumbNav.tsx
│   │   ├── common/
│   │   │   ├── AdPlaceholder.tsx
│   │   │   ├── SEOHead.tsx
│   │   │   └── SchemaMarkup.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── ToolGrid.tsx
│   │       ├── CategoryGrid.tsx
│   │       └── FAQSection.tsx
│   │
│   ├── lib/
│   │   ├── calculators/
│   │   │   ├── mortgage.ts         # Mortgage calculation logic
│   │   │   ├── paycheck.ts         # Paycheck calculation logic
│   │   │   ├── roi.ts              # ROI calculation logic
│   │   │   ├── loan.ts             # Loan calculation logic
│   │   │   ├── investment.ts       # Investment calculation logic
│   │   │   ├── age.ts              # Age calculation logic
│   │   │   └── random.ts           # Random number logic
│   │   ├── utils/
│   │   │   ├── formatting.ts       # Number formatting, currency
│   │   │   ├── validation.ts       # Input validation
│   │   │   ├── seo.ts              # SEO utilities (schema generation)
│   │   │   └── constants.ts        # Constants, tax rates, etc.
│   │   ├── data/
│   │   │   ├── tools.ts            # Tool metadata + routing
│   │   │   ├── categories.ts       # Category definitions
│   │   │   └── content/            # Calculator content (markdown or JSON)
│   │   │       ├── mortgage.json
│   │   │       ├── paycheck.json
│   │   │       └── ...
│   │   └── hooks/
│   │       ├── useCalculator.ts    # Reusable calculator state
│   │       ├── useFavorites.ts     # localStorage favorites
│   │       └── useTheme.ts         # Dark mode toggle
│   │
│   ├── styles/
│   │   ├── globals.css             # Tailwind imports + global styles
│   │   └── animations.css          # Optional fast animations
│   │
│   └── config/
│       ├── metadata.ts             # SEO metadata defaults
│       └── siteConfig.ts           # Site-wide config (name, URL, etc.)
│
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.ico
│   └── images/
│       ├── og-image.png            # OpenGraph default image
│       └── ...
│
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Data Model: Tool Metadata

Each calculator has a central metadata definition (tools.ts):

```typescript
interface Tool {
  slug: string;                    // URL slug: "mortgage-calculator"
  name: string;                    // Display name
  category: "finance" | "utility" | "health" | "home" | "pet" | "business";
  description: string;             // Short 1-liner for cards
  keywords: string[];              // SEO keywords
  title: string;                   // Page <title> (60 chars)
  metaDescription: string;         // Meta description (160 chars)
  h1: string;                       // H1 heading
  intro: string;                   // Intro paragraph (100-150 words)
  howItWorks: string;              // "How It Works" section (markdown)
  interpretationGuide: string;     // Interpretation section (markdown)
  faqs: FAQ[];                      // FAQ items with Q&A
  relatedTools: string[];          // Slugs of related calculators
  calculator: CalculatorConfig;    // Input/output schema for this tool
  schema: SchemaMarkup;            // FAQPage + Calculator JSON-LD
}

interface CalculatorConfig {
  inputs: {
    name: string;
    label: string;
    type: "number" | "select" | "currency" | "percentage";
    placeholder?: string;
    validation?: { min?: number; max?: number; required: boolean };
  }[];
  compute: (inputs: Record<string, number>) => Record<string, number>;
  outputs: {
    name: string;
    label: string;
    format: "currency" | "number" | "percentage" | "text";
    decimals?: number;
  }[];
}
```

This allows:
- Single source of truth for routing, metadata, SEO
- Reusable CalculatorLayout component (fits any tool)
- Automated schema generation
- Category/filtering logic

---

## SEO REQUIREMENTS

### Schema Markup (Required on All Calculator Pages)

1. **Calculator Schema**
   - Input types (loan amount, interest rate, etc.)
   - Output type (monthly payment)
   - Enhances SERP display

2. **FAQPage Schema**
   - 10-15 Q&A pairs per calculator
   - Drives featured snippet eligibility
   - JSON-LD format, auto-generated from tools.ts

3. **Breadcrumb Schema**
   - Home > Finance > Mortgage Calculator
   - Improves SERP display with breadcrumbs
   - Internal link authority distribution

4. **OpenGraph + Twitter Cards**
   - og:title, og:description, og:image (all calculators)
   - twitter:card (summary_large_image)
   - Improves social sharing appearance

### Metadata Strategy

- **Title Tags:** Keyword + "Calculator" pattern
  - Example: "Mortgage Calculator | Calculate Monthly Payment Instantly"
  - Max 60 chars; imperative verb (Calculate, Estimate, Find)

- **Meta Descriptions:** Problem + solution in 155-160 chars
  - Example: "Free mortgage calculator. Estimate your monthly payment based on loan amount, interest rate, and term. Get results instantly."

- **H1 Tags:** Unique per page; primary keyword
  - Only one H1 per page
  - Include tool name + value prop

- **URL Structure:** SEO-friendly slugs
  - `/calculators/mortgage-calculator`
  - `/categories/finance`
  - No query params for main content

### Internal Linking Strategy

- **Breadcrumbs:** Every calculator links up to category page
- **Related Tools:** Every calculator footer suggests 3-5 related tools
- **Category Pages:** Link to all calculators in category
- **Homepage:** Links to top calculators + all categories

**Link structure creates:**
- Homepage → Categories → Calculators (hub-and-spoke)
- Breadcrumbs accumulate 100s of internal links naturally
- PageRank concentrated on high-value pages (categories, homepage)

### Performance & Core Web Vitals

- **LCP Target:** <2.5s
  - Preload calculator JS chunk
  - Optimize hero image (WebP, lazy load all others)
  - Use Vercel Image Optimization

- **INP Target:** <200ms
  - Debounce calculator inputs
  - Async number formatting (no blocking render)
  - Client-side compute only (no API calls per keystroke)

- **CLS Target:** <0.1
  - Fixed-height result containers
  - No ads pushing content (ad space reserved)
  - No cumulative layout shifts on interaction

---

## CONTENT STRATEGY

### Per-Calculator Content Minimum

Each calculator page must include:

1. **Hero Section** (above fold)
   - H1 heading
   - One-liner description
   - Interactive calculator widget

2. **Introduction** (below hero, 100-150 words)
   - Why does this matter? (problem statement)
   - What is this tool? (solution)
   - CTA: "Use calculator below"

3. **How It Works Section** (H2, 200-300 words)
   - Formula explanation (if applicable)
   - Variable definitions
   - Real-world example
   - Not overly technical; target general audience

4. **Interpretation/Results Guide** (H2, 150-200 words)
   - What do results mean?
   - How to use findings
   - Context/caveats

5. **FAQ Section** (H2, 10-15 questions)
   - Common user questions
   - Edge cases
   - Contextual advice
   - Each answer 50-100 words

6. **Related Calculators Section** (sidebar or end of page)
   - 3-5 related tool cards
   - Links to category page
   - Internal SEO value

**Total word count per page: 1,000-1,200 words**
**Content should read naturally, not be SEO-stuffed**

### Content Data Format

Content stored as JSON in `src/lib/data/content/{slug}.json`:

```json
{
  "slug": "mortgage-calculator",
  "intro": "Lorem ipsum...",
  "howItWorks": "Lorem ipsum...",
  "interpretationGuide": "Lorem ipsum...",
  "faqs": [
    {
      "question": "What's a good mortgage rate?",
      "answer": "Lorem ipsum..."
    }
  ]
}
```

This allows:
- Static generation at build time
- Easy content updates
- Reusable CalculatorLayout component

### Homepage Content

**Sections:**
1. Hero (headline + subheader + search bar for tools)
2. Popular tools grid (top 5-6 calculators)
3. Featured tool (e.g., Mortgage Calculator with mini-description)
4. Category showcase (Finance, Utility, Health cards)
5. Recently added tools (will expand as tools are added)
6. FAQ section (site-wide, not tool-specific)
7. SEO text block (300-500 words on calculator benefits, accuracy, etc.)

---

## MONETIZATION & ADSENSE

### Ad Placement Structure

**On each calculator page:**
1. **Sticky top ad** (300×250 medium rectangle, desktop only)
   - Position: top-right, below sticky nav
   - Mobile: removed (UX impact)

2. **Mid-article ad** (responsive, after intro)
   - 300×250 desktop
   - Stacked 300×600 on large desktop
   - Full-width mobile (adapt to container)

3. **In-calculator context** (NO ads inside calculator itself)
   - Ads before and after calculator
   - Never overlay calculator inputs/results

4. **End-of-page ad** (300×600 vertical, desktop sidebar)
   - Below related tools section
   - Mobile: stacked as 300×250

**Total: 3-4 ads per page maximum**

### AdSense Approval Readiness

**Checklist for approval:**
- ✓ 20-30 pages with 500+ words each (7 calculators + essential pages)
- ✓ Privacy policy page (link in footer)
- ✓ Terms/disclaimer page (trust building)
- ✓ Clear navigation (sticky header, category links)
- ✓ Original content (no copied calculator explanations)
- ✓ Fast mobile performance (Core Web Vitals passing)
- ✓ No suspicious content (no crypto, gambling, weapons)
- ✓ Proper <title>, <meta> tags (SEO correct)

**Approval timeline:** 2-3 weeks typical; expect rejection (common first pass), reapply with feedback addressed

---

## SUCCESS METRICS

### Week 1 Launch Goals
- [ ] 7 calculators + essential pages live on Vercel
- [ ] All pages: <2.5s LCP, <200ms INP, <0.1 CLS
- [ ] SEO metadata + schema markup 100% valid (Google Rich Results Test)
- [ ] Mobile UX tested on 320px-1440px viewports
- [ ] AdSense application ready (content depth + legal pages)

### Phase 2 Goals (Week 2+)
- [ ] +8 health/home calculators
- [ ] Submit AdSense application
- [ ] Begin monitoring Google Search Console (indexation, impressions)
- [ ] Internal linking optimization (category pages ranking)

### 6-Month Goals (SEO maturity)
- [ ] 10K+ organic monthly visits
- [ ] 15-20 calculators ranking for primary keywords
- [ ] $200-500/month AdSense revenue (depending on traffic mix)
- [ ] AdSense approval + 3-4 ads per page live

---

## CONSTRAINTS & ASSUMPTIONS

**Constraints:**
- Solo developer (no backend, no CMS)
- One-week MVP deadline (7 calculators, not 50)
- Static generation preferred (SEO + performance)
- No database required (Phase 1; future: user favorites, analytics)
- Vercel deployment (simplicity, performance, free tier adequate for MVP)

**Assumptions:**
- Content can be written by developer or AI (no external writers)
- Math formulas are standard (mortgage = PMT formula, etc.)
- No user accounts/authentication required (Phase 1)
- Tax rates/financial data updated annually (manual or via config)
- Affiliate links added post-launch (AdSense approval first priority)

---

## DEPENDENCIES & BLOCKERS

**None identified.** This is a greenfield project. Static generation + Vercel removes typical backend dependencies.

**Optional Future Dependencies (Phase 2+):**
- Database (PostgreSQL + Vercel Postgres) for user-saved calculations
- Email service (SendGrid) for newsletter/contact form
- Header bidding network (Ezoic, Raptive) for RPM optimization

---

## APPROVAL SIGN-OFF

**Requirements Approved?**

Scope: 7 finance/utility calculators + 6 essential pages + design system
Timeline: Week 1 (solo dev, ~35 hours)
Tech Stack: Next.js + Tailwind + math.js + Vercel
Success Criteria: Live MVP, Core Web Vitals passing, AdSense-ready
