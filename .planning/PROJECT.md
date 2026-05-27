# PROJECT: ToolNest

**Project Name:** ToolNest (placeholder, easy to rename)
**Type:** SEO Utility Calculator Website
**Status:** Planning → Phase 1 (Week 1 MVP)
**Owner:** Hafeez (solo developer)
**Created:** 2026-05-27

---

## ELEVATOR PITCH

Build a production-ready SEO utility calculator website designed to rank for hundreds of financial/home/health tool searches and monetize with Google AdSense. Launch 7 core tools (finance focus) in Week 1, scale to 50+ tools over 6 months through programmatic variations.

Target: 10K+ organic visits/month + $200-500/month AdSense revenue within 6 months.

---

## WHY THIS PROJECT?

**Market Opportunity:**
- OmniCalculator: 7M+ organic monthly visits
- Calculator.net: 70M+ total visits (March 2026)
- Low barrier: No backend, static site, cost-free deployment
- High ROI: Finance calculator traffic = $15-50 RPM (vs. $2-6 for most content)

**Owner Goal:**
Generate passive income from organic search traffic + build production SaaS/product experience (scaling from 7 → 50 tools).

---

## SCOPE

### In Scope (Phase 1, Week 1)
- 7 calculators (5 Finance + 2 Utility)
- 6 essential pages (Home, About, Contact, Privacy, Terms, Calculators listing)
- Responsive design (mobile-first)
- SEO infrastructure (schema markup, sitemap, robots.txt)
- Core Web Vitals passing
- AdSense-ready content

### Out of Scope (Phase 2+)
- Database/user accounts
- Advanced features (saved calculations, user profiles)
- Affiliate links (comes after AdSense approval)
- State-specific calculator variations (Paycheck × 50 states = Phase 3)
- Advanced analytics/tracking

---

## SUCCESS DEFINITION

### Week 1 (Phase 1)
- MVP live on Vercel
- 7 calculators working, 500+ words each
- Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1
- Schema markup valid
- AdSense application ready (submit Week 2)

### Month 1 (Phase 2-3)
- 15-20 tools live
- AdSense approved + ads live
- Google Search Console indexing 20+ pages
- 0-100 organic visits (ranking starts slowly)

### Month 6
- 30-50 tools (mix of single + variations)
- 10K+ organic visits/month
- $200-500/month revenue

---

## CONSTRAINTS

- **Timeline:** Week 1 (solo dev, 35-40 hours available)
- **Tech:** Next.js 15 + Tailwind, static generation, Vercel deployment
- **Team:** Solo (developer writes content + code, uses AI for drafting)
- **Backend:** None (Phase 1)
- **Database:** None (Phase 1)

---

## RESEARCH FINDINGS

**Top insights from domain research:**
1. **Quality > Quantity:** 7 well-written calculators (1000 words) beats 50 thin pages
2. **Finance dominates ROI:** Mortgage ($50 CPC), Paycheck, Investment = highest revenue
3. **Schema markup is critical:** Calculator + FAQPage schema drives featured snippets, higher CTR
4. **Breadcrumb architecture scales:** Natural internal linking via category hierarchies
5. **Mobile is 80% of traffic:** Core Web Vitals directly impact both rankings + AdSense approval
6. **Content depth required for approval:** AdSense rejects thin calculators; need 500+ words + FAQs
7. **Programmatic multiplier potential:** State-based variations (paycheck × 50) scale linearly without manual work
8. **Affiliate bridges exist:** Financial calculators → lending products, credit card recommendations
9. **Niche advantages:** Less competition than generalist sites; specialized tools rank faster
10. **AdSense timeline:** Approval typically 2-3 weeks; first approval often rejected (expect feedback loop)

---

## TECHNOLOGY STACK

| Component | Tech | Why |
|-----------|------|-----|
| Framework | Next.js 15 | Fast builds, automatic optimization, App Router, API routes |
| Language | TypeScript | Type safety, better dev experience |
| Styling | Tailwind CSS 4 | Utility-first, fast, no runtime |
| Math Engine | math.js or decimal.js | Financial precision (decimals matter) |
| Metadata | next-seo + custom JSON-LD | SEO, schema markup automation |
| Deployment | Vercel | Zero-config, Core Web Vitals optimization, free tier |
| Analytics | Vercel Analytics + Plausible | Privacy-compliant, CWV tracking |
| No Backend | N/A | Static generation, client-side calc, no database |

---

## KEY DECISIONS

| Decision | Rationale | Alternative |
|----------|-----------|------------|
| **7 tools (not 50) for MVP** | Quality over quantity; solo dev time constraint | Could do 20 tools, but content depth suffers |
| **Finance-first category** | Highest RPM ($15-50); strong search intent | Health/fitness less risky (lower competition) but lower revenue |
| **Static generation** | Fast, SEO-friendly, zero backend | SSR for dynamic content (overkill for calculators) |
| **Vercel deployment** | Built-in optimization, free tier, auto-deploy | AWS/DigitalOcean (more ops overhead) |
| **Programmatic structure** | Scales to 50+ tools via content + metadata | Manual pages for each tool (doesn't scale) |
| **AI content generation** | Fast drafting (30 min/tool), edit for accuracy | Hire content writer ($1500-5000 for 50 pages) |

---

## RISKS & MITIGATION

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Content writing slower than expected | Medium | Phase 1 slips to 2 weeks | Use AI for drafting; batch write content |
| SEO takes 3+ months to rank | High (expected) | No traffic for months | Accept this; focus on content quality |
| AdSense rejects application | Medium | Delayed monetization | Over-deliver on content (30-40 pages); ensure original |
| Mobile performance issues | Low | Lower rankings, AdSense rejection | Preload JS, debounce inputs, Vercel optimization |
| Calculator accuracy bugs | Low | User distrust, no backlinks | Unit tests, edge-case testing, fact-check formulas |
| Scope creep (feature requests) | High | Phase 1 slips | Lock scope; defer features to Phase 2+ |

---

## FUTURE EXPANSION PATHS

### Phase 3 (Week 4+): Programmatic Content
- **Paycheck calculator:** Multiply by 50 US states (tax variation)
  - Single code path; content templating
  - Result: 50× pages from 1 calculator
- **Energy cost calculator:** Multiply by ZIP code (electricity rates)
- **Student loan calculator:** Multiply by federal loan types

### Phase 4: Affiliate Monetization
- Mortgage calculator → Lending products (LendingTree, Rocket Mortgage)
- Investment calculator → Brokerages (Fidelity, Charles Schwab)
- Paycheck calculator → Tax software (TurboTax)
- Health calculator → Supplements, fitness apps

### Phase 5: Premium Features
- Saved calculations (user accounts + database)
- Advanced options (mortgage with property tax/insurance/HOA)
- Export to PDF/email results
- Newsletter signup + daily "tip"

---

## COMMUNICATION PLAN

**Solo project; no standup needed. But:**
- Update this PROJECT.md after each phase completes
- Track wins/learnings in STATE.md
- Measure progress: tracker (`/gsd-progress` command)

---

## CONTACT & REFERENCES

**Owner:** Hafeez (hafeezalliowe@gmail.com)
**Codebase:** /Users/hafee/Documents/Claude/Utility Website (git repo)
**Deployment:** Vercel (TBD after Phase 1 complete)
**Domain:** ToolNest (placeholder; change if needed)
**Analytics:** Vercel Analytics + Plausible (setup Week 2)

---

## FILES & ARTIFACTS

**Planning:**
- PROJECT.md (this file)
- REQUIREMENTS.md (detailed feature list + content model)
- ROADMAP.md (week-by-week breakdown)
- STATE.md (project memory + learnings)
- config.json (workflow preferences)

**Code (generated in Phase 1):**
- See ROADMAP for file structure
