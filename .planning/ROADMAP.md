# ROADMAP: ToolNest MVP → Scale

**Project:** ToolNest (SEO Utility Calculator Website)
**Timeline:** Week 1 (MVP) → Phase 2 (Expansion) → Phase 3+ (Scale)
**Owned By:** Solo Developer
**Last Updated:** 2026-05-27

---

## PHASE 1: MVP LAUNCH (WEEK 1)

### Goal
Ship 7 production-ready calculators + essential pages live on Vercel. Core Web Vitals passing. AdSense-ready.

### Deliverables
- [ ] Project scaffold (Next.js, Tailwind, TypeScript)
- [ ] Design system + reusable components (10 components)
- [ ] 5 Finance calculators (Mortgage, Paycheck, ROI, Loan, Investment)
- [ ] 2 Utility calculators (Age, Random Number)
- [ ] 6 Essential pages (Home, About, Contact, Privacy, Terms, Calculators listing)
- [ ] SEO infrastructure (schema markup, sitemap, robots.txt, metadata)
- [ ] Deployed to Vercel
- [ ] Core Web Vitals passing (<2.5s LCP, <200ms INP, <0.1 CLS)
- [ ] Mobile UX tested (320px-1440px)
- [ ] AdSense approval application submitted

### Breakdown by Day

#### **DAY 1: Foundation (Fri 2026-05-30 if starting Tue 2026-05-27)**

**Morning (2-3 hours)**
- [ ] Create Next.js 15 project with TypeScript + Tailwind
- [ ] Setup folder structure (src/app, src/components, src/lib, etc.)
- [ ] Configure metadata defaults, SEO config (metadata.ts, siteConfig.ts)
- [ ] Create .env.example + environment setup
- [ ] Git init + first commit

**Afternoon (2-3 hours)**
- [ ] Build core layout components:
  - [ ] Header (sticky nav, dark mode toggle)
  - [ ] Footer (links, sitemap, social)
  - [ ] CalculatorLayout (wrapper for all calculator pages)
  - [ ] BreadcrumbNav (Home > Category > Tool)
  - [ ] StickyHeader for sticky navigation
- [ ] Setup globals.css + Tailwind config for theme colors
- [ ] Create useTheme hook for dark/light toggle

**Outcome:** Working Next.js project with layout scaffolding deployed to Vercel.

---

#### **DAY 2: Design System + Component Foundation (Sat 2026-05-31)**

**Morning (2-3 hours)**
- [ ] Build reusable calculator components:
  - [ ] InputGroup (labeled input with validation feedback)
  - [ ] ResultBox (displays calculated results with formatting)
  - [ ] CalculatorCard (preview card for tool grid)
  - [ ] FAQAccordion (expandable FAQ items)
  - [ ] RelatedTools (grid of related calculators)
  - [ ] AdPlaceholder (responsive ad container)
- [ ] Create utility functions:
  - [ ] Currency formatter (format to USD, with commas)
  - [ ] Number formatter (decimals, percentage)
  - [ ] Input validation (range checking, required fields)
  - [ ] Schema markup generator (Calculator + FAQPage JSON-LD)

**Afternoon (2-3 hours)**
- [ ] Create common sections:
  - [ ] HeroSection (H1, description, CTA)
  - [ ] ToolGrid (grid of calculator cards)
  - [ ] CategoryGrid (cards for finance/utility/health/etc.)
  - [ ] FAQSection (site-wide FAQs with schema)
- [ ] Build tools.ts (central metadata for all calculators)
  - Define structure for tool metadata
  - Create entries for 7 Phase 1 tools
- [ ] Create data/content/ structure for tool content (JSON files)

**Outcome:** Reusable component library + central tool metadata system. 5 components = 95% of page building done.

---

#### **DAY 3: Calculator Implementations (Sun 2026-06-01)**

**Full Day (6-8 hours)**

**Mortgage Calculator** (1.5-2 hours)
- [ ] Implement mortgage calculation logic (lib/calculators/mortgage.ts)
  - Inputs: Loan amount, interest rate, term (years)
  - Formula: M = P[r(1+r)^n]/[(1+r)^n-1]
  - Output: Monthly payment (+ principal, interest breakdown if advanced)
- [ ] Create data/content/mortgage.json
  - Intro, how-it-works, interpretation, 12 FAQs (~1000 words)
- [ ] Create /calculators/mortgage-calculator page
  - Reuse CalculatorLayout component
  - Use schema markup generator for FAQPage + Calculator schema

**Paycheck/Salary Calculator** (1.5-2 hours)
- [ ] Implement paycheck calculation logic (lib/calculators/paycheck.ts)
  - Inputs: Annual salary, pay frequency (annual/monthly/biweekly/weekly)
  - Formula: Gross pay - federal tax (simplified bracket lookup) - state tax - FICA
  - Challenge: Tax brackets vary by state; start with federal + CA only, extend later
- [ ] Create data/content/paycheck.json (~1000 words)
- [ ] Create /calculators/paycheck-calculator page
  - Note: State-based variations (e.g., /calculators/paycheck-calculator-california) deferred to Phase 2

**ROI Calculator** (1 hour)
- [ ] Implement ROI calculation (lib/calculators/roi.ts)
  - Inputs: Initial investment, gain/loss, period (years)
  - Formula: ROI = (Gain - Cost) / Cost × 100
  - Output: ROI %, annualized ROI
- [ ] Create data/content/roi.json (~900 words)
- [ ] Create /calculators/roi-calculator page

**Loan Calculator** (1 hour)
- [ ] Implement loan calculation (lib/calculators/loan.ts)
  - Inputs: Loan amount, interest rate, term, extra payment (optional)
  - Formula: Same as mortgage, but handles extra principal payments
  - Output: Monthly payment, total interest, payoff date
- [ ] Create data/content/loan.json (~1000 words)
- [ ] Create /calculators/loan-calculator page

**Investment/Compound Interest Calculator** (1 hour)
- [ ] Implement compound interest calculation (lib/calculators/investment.ts)
  - Inputs: Principal, monthly contribution, annual rate, years
  - Formula: A = P(1+r/n)^nt + PMT × [((1+r/n)^nt - 1) / (r/n)]
  - Output: Final amount, total interest earned
- [ ] Create data/content/investment.json (~900 words)
- [ ] Create /calculators/investment-calculator page

**Outcome:** 5 finance calculators live with full content + schema markup. Total content generated ~4,700 words.

---

#### **DAY 4: Utility Calculators + Calculator Listing (Mon 2026-06-02)**

**Morning (2-3 hours)**

**Age Calculator** (45 min)
- [ ] Implement age calculation (lib/calculators/age.ts)
  - Inputs: Birth date
  - Formula: Today - birth date
  - Output: Years, months, days + days to next birthday
- [ ] Create data/content/age.json (~800 words)
- [ ] Create /calculators/age-calculator page

**Random Number Generator** (45 min)
- [ ] Implement RNG (lib/calculators/random.ts)
  - Inputs: Min, max, how many numbers
  - Output: Array of random integers
  - Feature: Copy to clipboard, shuffle option
- [ ] Create data/content/random.json (~600 words)
- [ ] Create /calculators/random-number-generator page

**Afternoon (2-3 hours)**
- [ ] Create /calculators page (listing all 7 tools)
  - Filter by category (Finance, Utility)
  - Search bar (client-side filter)
  - Cards for each calculator with descriptions
- [ ] Create /categories/finance page
  - Category intro (200 words on financial calculators)
  - Grid of 5 finance tools with links
  - FAQ for finance category
- [ ] Update tools.ts to include relatedTools arrays
  - Mortgage ↔ Loan ↔ Investment (cross-linked)
  - Age ↔ Random (cross-linked)

**Outcome:** 7 calculators live. Listing + category pages working.

---

#### **DAY 5: Essential Pages + Content (Tue 2026-06-03)**

**Morning (2-3 hours)**

**Homepage** (1 hour)
- [ ] /app/page.tsx (homepage)
  - Hero section (headline + description + calculator search)
  - Popular tools grid (5 most important calculators)
  - Category showcase (Finance, Utility cards)
  - Recently added (just list Phase 1 tools)
  - FAQ section (5-6 site-wide questions)
  - SEO text block (300 words on calculator benefits + accuracy)

**About Page** (30 min)
- [ ] /about/page.tsx
  - Mission statement (200 words)
  - Why ToolNest? (calculator accuracy + free access)
  - Team/author bio (trust building)
  - Call to action (contact, feedback)

**Contact Page** (30 min)
- [ ] /contact/page.tsx
  - Simple form (name, email, message)
  - or mailto link (minimal implementation)
  - Optional: SendGrid integration (defer to Phase 2)

**Afternoon (2-3 hours)**

**Privacy Policy** (1 hour)
- [ ] /privacy/page.tsx
  - Data collection (Vercel Analytics, cookies)
  - Use of data (analytics only, no selling)
  - Compliance (GDPR, CCPA friendly)
  - Template from privacy-policy.com, customize

**Terms of Service** (1 hour)
- [ ] /terms/page.tsx (or /disclaimer)
  - Disclaimer on calculator accuracy
  - Not financial advice
  - User responsibility
  - Trademark notice
  - Terms for use

**Outcome:** All 6 essential pages live. Legal pages support AdSense approval.

---

#### **DAY 6: SEO Infrastructure + Optimization (Wed 2026-06-04)**

**Morning (2-3 hours)**

**Sitemap Generation** (45 min)
- [ ] Create app/sitemap.ts (auto-generate sitemap.xml)
  - Dynamic routes: /calculators/[slug]
  - Static routes: /, /about, /contact, /privacy, /terms, /categories/finance
  - Include priority + changefreq
- [ ] Create public/sitemap.html (human-readable sitemap)

**robots.txt** (15 min)
- [ ] Create public/robots.txt
  - Allow all crawlers
  - Disallow admin paths (if any)
  - Sitemap URL

**Schema Markup Validation** (1 hour)
- [ ] Run each calculator page through Google Rich Results Test
  - Validate Calculator schema + FAQPage schema
  - Validate Breadcrumb schema
  - Fix any errors

**Core Web Vitals Optimization** (45 min)
- [ ] Test LCP: Preload calculator JS chunks
  - Add <script> preload in header for math.js
  - Use next/dynamic for code splitting
- [ ] Test INP: Debounce calculator inputs
  - 300ms debounce on input change
  - Measure compute time (<50ms target)
- [ ] Test CLS: Fix layout shifts
  - Fixed-height result containers
  - Ad space reserved (no pushing)
  - Test on mobile 320px

**Afternoon (2-3 hours)**

**Mobile Testing** (1 hour)
- [ ] Test on actual devices (iPhone + Android)
  - Touch target sizes (≥44×44px)
  - Input field usability
  - Result readability
  - Ad placement (not blocking calculator)
- [ ] Use Chrome DevTools (device emulation)
  - 320px (iPhone SE), 375px (iPhone 12), 414px (iPhone 14 Plus)
  - 768px (iPad), 1024px (iPad Pro), 1440px (desktop)

**Performance Audit** (1 hour)
- [ ] Lighthouse report on each page type
  - Target: Performance ≥90, Accessibility ≥95, Best Practices ≥90, SEO ≥100
  - Run on desktop + mobile
  - Address any failing audits
- [ ] PageSpeed Insights (external tool)
  - Target: LCP <2.5s, CLS <0.1

**Outcome:** SEO infrastructure complete. Core Web Vitals passing. Mobile UX solid.

---

#### **DAY 7: Testing, Polish + Deployment (Thu 2026-06-05)**

**Morning (2-3 hours)**

**Content Review** (1 hour)
- [ ] Read each calculator page for:
  - Grammar/spelling (use Grammarly or read aloud)
  - Accuracy of explanations
  - Keyword placement (natural, not stuffed)
  - Links work + point to correct related tools

**Functionality Testing** (1 hour)
- [ ] Test each calculator:
  - Valid inputs produce correct output
  - Invalid inputs show error (required field)
  - Edge cases handled (0, negative, very large numbers)
  - Copy result to clipboard button works (if added)
- [ ] Test navigation:
  - Breadcrumbs work
  - Related tools links navigate correctly
  - Category page filters work
  - Search bar filters (if client-side)

**Afternoon (2-3 hours)**

**Vercel Deployment** (45 min)
- [ ] Connect GitHub repo to Vercel
  - Import project
  - Set environment variables (none required for MVP)
  - Deploy main branch
  - Test on vercel.app domain

**Final QA** (1.5 hours)
- [ ] Test production URL (vercel deployment)
  - All pages load
  - All calculators compute correctly
  - Mobile responsive
  - Links work
  - Sitemap.xml accessible at /sitemap.xml
- [ ] Google Search Console setup (optional, can do Week 2)
  - Submit sitemap
  - Verify domain

**AdSense Application Prep** (30 min)
- [ ] Checklist:
  - [x] 20+ pages with 500+ words? (7 calculators × 1000 words + 6 pages ≈ 13 pages × 800+ words avg)
  - [x] Privacy policy page
  - [x] Terms/disclaimer page
  - [x] Fast mobile? (Core Web Vitals passing)
  - [x] Proper navigation (sticky header, category links)
  - [x] <title> + <meta> tags correct
  - [x] No suspicious content
- [ ] Prepare to apply for AdSense (actual submission in Week 2 after more content)

**Outcome:** Production-ready MVP live on Vercel. Ready for Week 2 Phase 2 expansion.

---

## PHASE 2: EXPANSION (WEEK 2-3)

### Goal
Scale to 15-20 tools. Submit AdSense application. Begin SEO monitoring.

### Deliverables
- [ ] +8 Health/Home/Pet calculators
- [ ] Advanced Paycheck variations (state-specific, if time)
- [ ] AdSense application submitted
- [ ] Google Search Console setup + monitoring
- [ ] Internal linking optimization
- [ ] Category pages for Health, Home, Pet

### Breakdown

**Week 2 (3-4 days):**
- [ ] Health calculators (BMI, TDEE, Calorie, Macro, Water Intake)
  - Each ~1000 words + schema markup
  - Follow same pattern as Phase 1
- [ ] Home calculators (Paint, Tile, start: 2-3 tools)
- [ ] Pet calculators (Dog Age, Cat Age)
- [ ] Create category pages for each

**Estimated effort:** 20-25 hours
**Solo dev: ~ 3-4 intensive days**

---

## PHASE 3: SCALE (WEEK 4+)

### Goal
Mature toolset (30-50 calculators). Programmatic content generation for state/location variations.

### Deliverables
- [ ] Remaining Finance tools (Savings Goal, Budget, Debt Payoff, etc.)
- [ ] Remaining Home/Utility tools (Flooring, Roofing, Concrete, etc.)
- [ ] Business/Creator tools (Profit Margin, YouTube Money, Commission, etc.)
- [ ] Programmatic content multiplier:
  - State-based paycheck variations (50 states = 50 paycheck pages)
  - Location-specific utility costs (zip code lookup for energy cost calculator)
- [ ] Affiliate link integration (Phase 2 AdSense approval required first)
- [ ] Advanced features:
  - User favorites (localStorage)
  - Recent tools (localStorage)
  - Advanced calculator options (e.g., mortgage with property tax/insurance)

### Timeline
- Phase 3a (Week 4-5): 10-15 more calculators
- Phase 3b (Week 6+): Programmatic variations + affiliate integration

---

## DEPENDENCIES & RISKS

### Dependencies
- None blocking Phase 1

### Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|-----------|
| Content writing takes longer than expected | Medium | Use AI (ChatGPT, Claude) to draft content, edit for accuracy |
| Calculator logic has bugs | Low | Write unit tests; test edge cases (0, negative, large numbers) |
| Mobile performance doesn't meet targets | Low | Preload JS, debounce inputs, use Vercel Image optimization |
| AdSense rejects application | Medium | Over-deliver on content (30-40 pages by submission); ensure original content |
| SEO takes months to rank | Expected | Phase 1 is launch; ranking comes 2-3 months. Content depth + schema markup speed it up |

---

## SUCCESS CRITERIA

### Phase 1 Completion (Week 1)
- [ ] MVP live on Vercel
- [ ] 7 calculators working + 6 essential pages
- [ ] All pages: LCP <2.5s, INP <200ms, CLS <0.1 (mobile + desktop)
- [ ] Schema markup valid (Google Rich Results Test)
- [ ] Mobile UX tested (responsive, touch-friendly)
- [ ] Lighthouse scores ≥90 (performance), ≥95 (accessibility)

### Phase 2 Completion (Week 3)
- [ ] 15+ calculators live
- [ ] AdSense application submitted
- [ ] Google Search Console showing 20+ indexed pages
- [ ] Initial SEO metrics tracked (0 traffic expected at this stage, but infrastructure in place)

### Phase 3 Completion (Week 6-8)
- [ ] 30-50 calculators (mix of single + state-based variations)
- [ ] AdSense approved + live ads
- [ ] 100+ indexed pages
- [ ] First organic traffic visible (likely <100 visits/month at 6-week mark)

### 6-Month Target
- [ ] 10K+/month organic visits
- [ ] $200-500/month revenue (AdSense + affiliate)
- [ ] 20+ tools ranking for primary keywords

---

## NOTES & DECISIONS

### Why 7 tools for MVP, not 50?
- Solo developer time constraint (week deadline = ~35-40 hours available)
- Quality > quantity (1000-word content beats thin 200-word pages)
- Fast iteration (ship, measure, expand) better than perfectionism
- 7 tools ÷ 6 essential pages = ~3 hours per "section", sustainable

### Why Finance-first?
- Highest RPM ($15-50 vs. $2-6 for entertainment)
- Strongest search intent (people actively seeking financial calculators)
- Affiliate bridges (mortgage lenders, financial products = commission revenue)
- Risk: Bankrate + SmartAsset dominate; mitigate with better UX + mobile optimization

### Why Vercel?
- Zero backend (Next.js + Vercel = fully serverless)
- Core Web Vitals optimization built-in (Edge caching, image optimization)
- Deploy main branch automatically (no DevOps)
- Free tier adequate for MVP (~50 pages, minimal traffic)
- Scales to millions of pages (programmatic approach)

### Content Generation: AI or Human?
- Recommended: AI (ChatGPT, Claude) for drafting; human edit for accuracy/brand voice
- Estimated: 30 min/tool for AI draft + edit + fact-check
- Alternative: Hire freelancer (content writer) if budget available (Phase 2+)

---

## NEXT STEPS

1. **Day 1 morning:** Review & approve ROADMAP
2. **Day 1 early afternoon:** `/gsd-plan-phase 1` (create detailed task breakdown for Phase 1)
3. **Day 1 late afternoon:** Start coding (foundation)
4. **Day 2-7:** Execute sprints per roadmap
5. **End of Week 1:** Ship to Vercel
6. **Week 2:** Execute Phase 2 expansion
7. **Week 3:** Submit AdSense application + begin SEO monitoring
