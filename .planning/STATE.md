---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: planning
last_updated: "2026-05-28T11:00:09.320Z"
progress:
  total_phases: 3
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
---

# PROJECT STATE: ToolNest

**Last Updated:** 2026-05-27 (initial planning)
**Status:** Planning Complete → Ready for Phase 1 Execution
**Owner:** Hafeez

---

## CURRENT PHASE

**Phase 1: MVP Launch (Week 1)**

- Status: Planned, not started
- Timeline: Target end of Week 1 (2026-06-05)
- Key deliverables: 7 calculators + 6 essential pages live on Vercel
- Blocker: None (greenfield project)

---

## COMPLETED ARTIFACTS

- [x] Domain research (SEO landscape, monetization, tool selection)
- [x] REQUIREMENTS.md (feature list, content model, SEO strategy)
- [x] ROADMAP.md (7-day breakdown by sprint)
- [x] PROJECT.md (vision, scope, decisions, risks)
- [x] This STATE.md (memory + tracking)

---## DECISIONS LOCKED

1. **MVP Scope:** 7 tools (5 Finance + 2 Utility) + 6 pages
2. **Timeline:** Week 1 (solo dev, 35-40 hours)
3. **Tech Stack:** Next.js 15 + Tailwind + Vercel
4. **Finance-First:** Mortgage, Paycheck, ROI, Loan, Investment (highest RPM)
5. **Content Model:** 1000-1200 words per calculator + schema markup
6. **Content Generation:** AI drafting (Claude/ChatGPT) + human edit
7. **Deployment:** Vercel (auto-deploy from GitHub)

---

## NEXT IMMEDIATE ACTION

**Option A (Recommended):** Start Phase 1 planning with `/gsd-plan-phase 1`

- Generates day-by-day task breakdown
- Creates checklist for Phase 1 execution
- Ready to start coding immediately

**Option B:** Generate full project skeleton now

- Create GitHub repo structure
- Generate all component scaffolding
- Pre-generate content JSON templates
- Start coding today

---

## ASSUMPTIONS TO VALIDATE

1. **Content can be drafted by AI:** Assume ChatGPT/Claude can write calculator explanations; 30 min to draft + edit per tool
2. **math.js available on npm:** Assume we use existing library for calculations (no custom math engine)
3. **Tailwind sufficient for design:** Assume no custom CSS needed; utility classes sufficient
4. **Vercel free tier adequate:** Assume ~50 pages, minimal monthly traffic fits free tier
5. **AdSense approval likely within 2 weeks:** Assume 20+ original pages + legal pages = approval (subject to Google's discretion)

---

## METRICS TO TRACK (Phase 2+)

**Week 2 Checklist:**

- [ ] Phase 1 shipped to Vercel
- [ ] AdSense application submitted
- [ ] Google Search Console set up
- [ ] Initial indexation status (should show 20-30 pages)

**Week 4 (End of Phase 2):**

- [ ] 15+ calculators live
- [ ] Google Search Console: 30-50 pages indexed
- [ ] Organic traffic: Expect 0-50 visits (SEO still early)
- [ ] AdSense status: Approved or rejection feedback received

**Week 8 (Phase 3):**

- [ ] 30-50 tools live (mix of single + variations)
- [ ] Organic traffic: 50-500 visits/month (some tools starting to rank)
- [ ] AdSense revenue: $5-50/month (depending on traffic)

**Month 6:**

- [ ] 50+ tools live
- [ ] Organic traffic: 10K+/month target
- [ ] AdSense revenue: $200-500/month target

---

## LEARNING POINTS (from research)

- **Schema markup > keyword optimization:** Calculator + FAQPage schema drives more traffic than keyword stuffing
- **Breadcrumb architecture = natural internal linking:** No need for complicated internal link strategy; breadcrumbs + category pages do the work
- **Content depth signals quality to Google:** 1000+ words beats 200-word thin pages (even if they rank initially)
- **Mobile optimization essential for approval:** AdSense checks Core Web Vitals; poor mobile = auto-reject
- **Programmatic variations scale linearly:** State-based calculator (Paycheck × 50 states) multiplies traffic without proportional content work
- **Financial niche = high RPM but competitive:** Bankrate, SmartAsset already dominate; differentiate via UX + specialized angles (e.g., paycheck calculator specifically for gig workers)
- **First AdSense approval often rejected:** Expect feedback (need more content, improve mobile performance, etc.). Plan for reapplication.

---

## BLOCKERS & DEPENDENCIES

**Current:** None
**Phase 1:** None (greenfield)
**Phase 2:** 

- AdSense approval (must be approved before aggressive monetization)
- Google indexation (need to see pages in GSC before measuring SEO)

**Phase 3:**

- Database (if implementing user favorites)
- Email service (if implementing newsletter)

---

## OWNER NOTES

**Why this project matters:**

- Validates passive income + SEO fundamentals
- Builds portfolio: "Built SEO calculator site ranked for 100+ keywords, 10K+ organic visits"
- Scalable: Can expand to 100+ tools with programmatic variations
- Low risk: No client, no deadline pressure, learn as you go

**Success looks like:**

- Week 1: MVP shipped + working
- Week 4: AdSense approved, first organic visitors
- Month 6: $300/month revenue + 10K visits/month
- Year 1: $2K+/month, 100K+ visits/month (if aggressive content expansion)

---

## REFERENCES

- Research findings: .planning/research/ (compiled by agent)
- REQUIREMENTS: .planning/REQUIREMENTS.md
- ROADMAP: .planning/ROADMAP.md
- Tech decisions: .planning/PROJECT.md
