# ToolNest Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply a clean minimal design system, restructure the homepage to search-first with 5 sections, and add 5 ad slots to every major page type.

**Architecture:** Pure UI changes across 6 existing files — no new routes, no new hooks, no data layer changes. AdPlaceholder gains format-based sizing. ToolCard loses its left-border color stripe. Homepage cuts from 8 sections to 5. Three other page types get 4 additional ad slots each (1 already exists).

**Tech Stack:** Next.js 15 App Router · Tailwind CSS v4 · TypeScript strict · React 19

---

## File Map

| File | Change |
|------|--------|
| `src/components/common/AdPlaceholder.tsx` | Add "Advertisement" label, format-based min-h, dashed border |
| `src/components/common/ToolCard.tsx` | Remove `border-l-4 ${colors.border}`, add `hover:-translate-y-0.5` |
| `src/app/page.tsx` | Restructure: 5 sections + 5 ad slots, remove Trust strip, remove New Additions |
| `src/components/calculators/CalculatorLayout.tsx` | Add 4 more ad slots (5 total), update H2 to `text-xl` |
| `src/app/calculators/page.tsx` | Add Ad Slot 1 (above client) + Ad Slot 5 (below SEO text) |
| `src/app/calculators/CalculatorsPageClient.tsx` | Import AdPlaceholder, add Slots 2–4 |
| `src/app/categories/[category]/page.tsx` | Replace gradient banner, add 5 ad slots |

---

## Task 1: Update AdPlaceholder

**Files:**
- Modify: `src/components/common/AdPlaceholder.tsx`

- [ ] **Step 1: Replace the file with the updated component**

```tsx
'use client';

import React from 'react';

interface AdPlaceholderProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'vertical';
}

const minHeights: Record<NonNullable<AdPlaceholderProps['format']>, string> = {
  auto: 'min-h-[90px]',
  leaderboard: 'min-h-[90px]',
  rectangle: 'min-h-[250px]',
  vertical: 'min-h-[600px]',
};

export function AdPlaceholder({
  slot = '1234567890',
  format = 'auto',
}: AdPlaceholderProps): React.JSX.Element {
  return (
    <div
      className={`w-full ${minHeights[format]} rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center`}
      data-ad-slot={slot}
      data-ad-format={format}
      aria-hidden="true"
    >
      <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium select-none">
        Advertisement
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```
Expected: no errors related to AdPlaceholder.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/AdPlaceholder.tsx
git commit -m "feat: update AdPlaceholder — labeled dashed border, format-based min-h"
```

---

## Task 2: Update ToolCard

**Files:**
- Modify: `src/components/common/ToolCard.tsx`

The current card uses `border-l-4 ${colors.border}` on the Link wrapper. Remove the left-border stripe and add a subtle translate on hover.

- [ ] **Step 1: Update the Link className in ToolCard**

Replace the existing `className` on the `<Link>` element (line ~28):

**Before:**
```tsx
className={`group relative flex items-start gap-3 p-4 rounded-xl border-l-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all ${colors.border}`}
```

**After:**
```tsx
className="group relative flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all"
```

Note: `${colors.border}` and `border-l-4` are removed entirely. The `iconBg` class stays on the icon span — that's fine.

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/ToolCard.tsx
git commit -m "feat: ToolCard — remove left-border stripe, add hover lift"
```

---

## Task 3: Restructure Homepage

**Files:**
- Modify: `src/app/page.tsx`

Current homepage has 8+ sections. New homepage has 5 content sections + 5 ad slots. Removed: Trust strip (merged into hero inline), New Additions section (redundant). SavedToolsSection and RecentlyViewedSection stay (conditional, hidden until user has data).

- [ ] **Step 1: Replace src/app/page.tsx entirely**

```tsx
import Link from 'next/link';
import { CATEGORIES } from '@/lib/data/categories';
import { getCategoryColors } from '@/lib/data/categoryColors';
import { getPopularTools, getToolsByCategory, TOOLS } from '@/lib/data/tools';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';
import { SearchBar } from '@/components/common/SearchBar';
import { ToolCard } from '@/components/common/ToolCard';
import { SavedToolsSection } from '@/components/common/SavedToolsSection';
import { RecentlyViewedSection } from '@/components/common/RecentlyViewedSection';
import { generateWebsiteSchema } from '@/lib/utils/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ToolNest — Free Online Calculators & Utility Tools',
  description:
    'Free online calculators for mortgage, BMI, loan, age, ROI, and 50+ more tools. No sign-up. Instant results. Finance, health, home, and everyday utilities.',
  keywords: [
    'free calculator',
    'online calculator',
    'mortgage calculator',
    'bmi calculator',
    'loan calculator',
    'age calculator',
    'utility tools',
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app',
  },
};

const HOMEPAGE_FAQS = [
  {
    q: 'Are all the tools on ToolNest free to use?',
    a: 'Yes. Every calculator and tool on ToolNest is completely free with no sign-up, subscription, or hidden fees.',
  },
  {
    q: 'Are the calculations accurate?',
    a: 'Our calculators use standard mathematical formulas with high-precision arithmetic. Results are estimates — always consult a qualified professional for financial or medical decisions.',
  },
  {
    q: 'Does ToolNest store my data?',
    a: 'No. All calculations run in your browser. We do not collect, store, or share your input data.',
  },
  {
    q: 'Can I use ToolNest on my phone?',
    a: 'Yes. All tools are fully responsive and work on any device — smartphones, tablets, and desktops.',
  },
  {
    q: 'How often are new tools added?',
    a: 'We regularly add new calculators and tools across all categories. Bookmark ToolNest to stay up to date.',
  },
];

export default function HomePage() {
  const popularTools = getPopularTools(6);
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 py-16 px-4">
          <div className="container-custom text-center space-y-6 max-w-3xl mx-auto">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Free Online Calculators<br />& Utility Tools
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{TOOLS.length} tools</span>
                {' · '}
                <span className="font-semibold text-gray-700 dark:text-gray-300">{CATEGORIES.length} categories</span>
                {' · '}
                <span className="font-semibold text-gray-700 dark:text-gray-300">100% free</span>
              </p>
              <div className="flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                <span>🔒 No Sign-Up</span>
                <span>🖥️ Browser-Only</span>
                <span>∞ Free Forever</span>
              </div>
            </div>

            <div className="max-w-xl mx-auto">
              <SearchBar placeholder="Search mortgage, BMI, age calculator…" />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>

            <div>
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-sm"
              >
                Browse All Tools
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Ad Slot 1 */}
        <div className="container-custom pt-8">
          <AdPlaceholder format="leaderboard" slot="homepage-top" />
        </div>

        <div className="container-custom py-12 space-y-12">
          {/* Saved Tools — conditional */}
          <SavedToolsSection />

          {/* Categories */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => {
                const count = getToolsByCategory(cat.slug).length;
                const colors = getCategoryColors(cat.slug);
                return (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="group p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors.iconBg}`}>
                          {cat.icon}
                        </span>
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {cat.name}
                        </h3>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${colors.badge}`}>
                        {count}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cat.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Ad Slot 2 */}
          <AdPlaceholder format="rectangle" slot="homepage-mid1" />

          {/* Popular Tools */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Popular Tools</h2>
              <Link href="/calculators" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularTools.map(({ compute: _c, ...tool }) => (
                <ToolCard key={tool.slug} tool={tool} size="md" />
              ))}
            </div>
          </section>

          {/* Ad Slot 3 */}
          <AdPlaceholder format="rectangle" slot="homepage-mid2" />

          {/* Recently Viewed — conditional */}
          <RecentlyViewedSection />

          {/* FAQ */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-3 max-w-2xl">
              {HOMEPAGE_FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{faq.q}</span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Ad Slot 4 */}
          <AdPlaceholder format="leaderboard" slot="homepage-prefooter1" />

          {/* SEO text */}
          <section className="space-y-3 prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-10">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Your Free Online Calculator Hub
            </h2>
            <p>
              ToolNest is a free collection of online calculators and utility tools covering finance,
              health, home improvement, everyday utilities, pets, and business. Every tool runs entirely
              in your browser — there&apos;s nothing to install, no account needed, and your data is never
              sent to any server.
            </p>
            <p>
              Whether you&apos;re calculating mortgage payments before buying a house, checking your BMI,
              estimating how much paint you need for a room, or converting text to binary, ToolNest has
              you covered with accurate, easy-to-use tools that work on any device.
            </p>
          </section>

          {/* Ad Slot 5 */}
          <AdPlaceholder format="leaderboard" slot="homepage-prefooter2" />
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: homepage — search-first layout, 5 sections, 5 ad slots, minimal hero"
```

---

## Task 4: Add 5 Ad Slots to CalculatorLayout

**Files:**
- Modify: `src/components/calculators/CalculatorLayout.tsx`

Currently has 1 AdPlaceholder (after calculator widget). Need 4 more. Also update all section H2s from `text-2xl` to `text-xl` per design system.

- [ ] **Step 1: Add Ad Slot 1 — between breadcrumb and tool header**

Find the `<main>` tag opening in CalculatorLayout.tsx. Currently:
```tsx
<main className="container-custom py-10 space-y-10">
  {/* Header */}
  <section className="space-y-3">
```

Replace with:
```tsx
<main className="container-custom py-10 space-y-10">
  {/* Ad Slot 1 */}
  <AdPlaceholder format="leaderboard" slot="calc-top" />

  {/* Header */}
  <section className="space-y-3">
```

- [ ] **Step 2: Add Ad Slots 3, 4, 5 and update H2 sizes**

Find the block after the existing `<AdPlaceholder />` (Slot 2, already present after calculator widget). Replace the entire content section below it:

**Before (everything after the existing AdPlaceholder):**
```tsx
        {/* How It Works */}
        {howItWorks && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How It Works</h2>
```

**After:**
```tsx
        {/* How It Works */}
        {howItWorks && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How It Works</h2>
```

Then find:
```tsx
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Interpret Your Results</h2>
```
Replace with:
```tsx
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How to Interpret Your Results</h2>
```

Then find the FAQ section:
```tsx
        {faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
```
Replace with:
```tsx
        {faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
```

- [ ] **Step 3: Insert Ad Slot 3 after How It Works/Interpret, Ad Slot 4 above related tools, Ad Slot 5 at end**

Find the section block that contains interpretationGuide and everything after. Replace the full closing portion of `<main>` (from after the existing AdPlaceholder to end of main) with:

```tsx
        {/* Ad Slot 2 — already exists, keep as-is */}
        <AdPlaceholder slot="calc-mid" />

        {/* How It Works */}
        {howItWorks && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How It Works</h2>
            <div className="prose dark:prose-invert prose-sm max-w-none text-gray-700 dark:text-gray-300">
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <p>{howItWorks}</p>
              )}
            </div>
          </section>
        )}

        {/* Ad Slot 3 */}
        <AdPlaceholder format="rectangle" slot="calc-content" />

        {/* How to Interpret Results */}
        {interpretationGuide && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How to Interpret Your Results</h2>
            <div className="prose dark:prose-invert prose-sm max-w-none text-gray-700 dark:text-gray-300">
              <p>{interpretationGuide}</p>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={faqs} />
          </section>
        )}

        {/* Ad Slot 4 */}
        <AdPlaceholder format="leaderboard" slot="calc-pre-related" />

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Related Tools</h2>
            <RelatedTools tools={relatedTools} />
          </section>
        )}

        {/* Ad Slot 5 */}
        <AdPlaceholder format="leaderboard" slot="calc-bottom" />
      </main>
```

- [ ] **Step 4: Type-check**

```bash
npm run type-check
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/calculators/CalculatorLayout.tsx
git commit -m "feat: CalculatorLayout — 5 ad slots, text-xl section headings"
```

---

## Task 5: All Tools Page — Header + 5 Ad Slots

**Files:**
- Modify: `src/app/calculators/page.tsx`
- Modify: `src/app/calculators/CalculatorsPageClient.tsx`

### 5a: Update page.tsx (server component)

Ad Slot 1 goes between the H1 section and CalculatorsPageClient. The existing AdPlaceholder after CalculatorsPageClient becomes Slot 4. Add Slot 5 after SEO text.

- [ ] **Step 1: Replace src/app/calculators/page.tsx**

```tsx
import { TOOLS } from '@/lib/data/tools';
import { BreadcrumbNav } from '@/components/common/BreadcrumbNav';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';
import { CalculatorsPageClient } from './CalculatorsPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Free Online Tools & Calculators',
  description:
    'Browse 50+ free online calculators and tools for finance, home improvement, health, everyday utilities, pets, and business.',
  keywords: ['calculator', 'free tools', 'online calculator', 'finance calculator', 'bmi calculator'],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app'}/calculators`,
  },
  openGraph: {
    title: 'All Free Online Tools & Calculators | ToolNest',
    description:
      'Browse 50+ free calculators and tools for finance, health, home, and everyday use.',
    url: '/calculators',
    type: 'website',
  },
};

export default function CalculatorsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'All Tools', href: '/calculators' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-3">
          <BreadcrumbNav items={breadcrumbs} />
        </div>
      </div>

      <main className="container-custom py-10 space-y-8">
        <section className="space-y-2 max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            All Free Online Tools
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {TOOLS.length} tools across 6 categories — no sign-up, no fees, instant results.
          </p>
        </section>

        {/* Ad Slot 1 */}
        <AdPlaceholder format="leaderboard" slot="tools-top" />

        <CalculatorsPageClient />

        {/* Ad Slot 4 — after grid */}
        <AdPlaceholder format="rectangle" slot="tools-post-grid" />

        <section className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-400 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-10">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            About ToolNest&apos;s Free Calculators
          </h2>
          <p>
            ToolNest provides free, accurate, and easy-to-use online calculators for everyone. Whether
            you&apos;re planning a home renovation, managing your personal finances, tracking your health
            goals, or running a business, our tools give you instant answers with no sign-up required.
          </p>
          <p>
            All calculations run directly in your browser — your data is never sent to a server. Every
            tool is designed for mobile and desktop use, with results updating instantly as you type.
          </p>
        </section>

        {/* Ad Slot 5 */}
        <AdPlaceholder format="leaderboard" slot="tools-bottom" />
      </main>
    </div>
  );
}
```

### 5b: Update CalculatorsPageClient.tsx (add Slots 2 and 3)

- [ ] **Step 2: Add AdPlaceholder import to CalculatorsPageClient.tsx**

At the top of `src/app/calculators/CalculatorsPageClient.tsx`, after existing imports, add:
```tsx
import { AdPlaceholder } from '@/components/common/AdPlaceholder';
```

- [ ] **Step 3: Add Ad Slot 2 between tabs/search and the results grid**

In CalculatorsPageClient, find the search input block and the results section. After the search `<div>` closing tag and before the empty state / grid, insert:

```tsx
      {/* Ad Slot 2 */}
      <AdPlaceholder format="leaderboard" slot="tools-filter-mid" />
```

The exact location is after the closing `</div>` of the search input wrapper, before the `{/* Empty state */}` comment.

- [ ] **Step 4: Add Ad Slot 3 — after first grouped category or after flat grid**

In the grouped view block (`{filtered.length > 0 && !isFiltered && ...}`), insert an ad after the first category group. Replace the grouped section render:

**Before:**
```tsx
      {filtered.length > 0 && !isFiltered && (
        <div className="space-y-14">
          {groupedByCategory.map((cat) => (
            <section key={cat.slug} className="space-y-5">
```

**After:**
```tsx
      {filtered.length > 0 && !isFiltered && (
        <div className="space-y-14">
          {groupedByCategory.map((cat, idx) => (
            <React.Fragment key={cat.slug}>
              <section className="space-y-5">
```

And close the section and add the ad after the first group. Replace the closing of the mapped section:

**Before (closing of the `.map` callback):**
```tsx
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.tools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} size="sm" />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
```

**After:**
```tsx
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.tools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} size="sm" />
                ))}
              </div>
            </section>
            {idx === 0 && <AdPlaceholder format="rectangle" slot="tools-mid-grid" />}
          </React.Fragment>
          ))}
        </div>
      )}
```

Also add `React` import if not already present. Check the top of the file — it currently does `import React, { useState } from 'react';` so `React` is available.

In the flat view (filtered), add the ad after the flat grid:

**Before:**
```tsx
      {filtered.length > 0 && isFiltered && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} size="sm" />
          ))}
        </div>
      )}
```

**After:**
```tsx
      {filtered.length > 0 && isFiltered && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} size="sm" />
            ))}
          </div>
          <AdPlaceholder format="rectangle" slot="tools-mid-grid" />
        </>
      )}
```

- [ ] **Step 5: Type-check**

```bash
npm run type-check
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/calculators/page.tsx src/app/calculators/CalculatorsPageClient.tsx
git commit -m "feat: all-tools page — left-aligned header, 5 ad slots"
```

---

## Task 6: Category Pages — Clean Header + 5 Ad Slots

**Files:**
- Modify: `src/app/categories/[category]/page.tsx`

Replace the gradient banner div with a clean white/gray-50 header. Add 5 ad slots.

- [ ] **Step 1: Replace the CategoryPage default export body**

Replace the full return statement of `CategoryPage` (everything inside the outer `<div className="min-h-screen ...">`) with:

```tsx
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-3">
          <BreadcrumbNav items={breadcrumbs} />
        </div>
      </div>

      {/* Ad Slot 1 */}
      <div className="container-custom pt-6">
        <AdPlaceholder format="leaderboard" slot="cat-top" />
      </div>

      {/* Category header — clean, no gradient */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-8">
          <div className="flex items-center gap-4">
            <span className={`text-3xl w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${colors.iconBg}`}>
              {cat.icon}
            </span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{cat.name} Tools</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {tools.length} free tools · No sign-up required
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mt-4">{cat.seoBlurb}</p>
        </div>
      </div>

      <main className="container-custom py-10 space-y-10">
        {/* Ad Slot 2 */}
        <AdPlaceholder format="leaderboard" slot="cat-above-grid" />

        {/* Tools grid — first 6 */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.slice(0, 6).map(({ compute: _c, ...tool }) => (
              <ToolCard key={tool.slug} tool={tool} size="sm" />
            ))}
          </div>
        </section>

        {/* Ad Slot 3 — mid-grid (only if more than 6 tools) */}
        {tools.length > 6 && <AdPlaceholder format="rectangle" slot="cat-mid-grid" />}

        {/* Tools grid — remaining */}
        {tools.length > 6 && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.slice(6).map(({ compute: _c, ...tool }) => (
                <ToolCard key={tool.slug} tool={tool} size="sm" />
              ))}
            </div>
          </section>
        )}

        {/* Ad Slot 4 */}
        <AdPlaceholder format="rectangle" slot="cat-post-grid" />

        {/* Other categories */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Browse Other Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {otherCategories.map((c) => {
              const otherColors = getCategoryColors(c.slug);
              return (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all"
                >
                  <span className={`text-base w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${otherColors.iconBg}`}>
                    {c.icon}
                  </span>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block truncate">{c.name}</span>
                    <span className="text-xs text-gray-400">{getToolsByCategory(c.slug).length} tools</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Ad Slot 5 */}
        <AdPlaceholder format="leaderboard" slot="cat-bottom" />
      </main>
    </div>
  );
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/categories/\[category\]/page.tsx
git commit -m "feat: category pages — clean header, 5 ad slots, split grid"
```

---

## Task 7: Full Build Verification

- [ ] **Step 1: Run full type-check**

```bash
npm run type-check
```
Expected: 0 errors.

- [ ] **Step 2: Run build**

```bash
npm run build
```
Expected: successful build, all static pages generated, no prerender errors.

- [ ] **Step 3: Visual smoke-test**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- Hero: subtle gray-to-white gradient (no blue gradient)
- Trust badges inline in hero
- No "New Additions" section
- 5 clearly visible ad placeholder blocks (dashed border, "Advertisement" label)
- ToolCards have no left-border color stripe, hover lift works
- Category cards: icon badge has color, card border is gray

Open http://localhost:3000/calculators/mortgage-calculator:
- Ad placeholder below breadcrumb
- Ad placeholder after calculator
- Ad placeholder after How It Works
- Ad placeholder above Related Tools
- Ad placeholder at page bottom

Open http://localhost:3000/calculators:
- H1 left-aligned "All Free Online Tools"
- 5 ad placeholders visible

Open http://localhost:3000/categories/finance:
- No gradient banner — clean gray-50 header
- 5 ad placeholders visible
- Grid splits at 6 with ad in between

- [ ] **Step 4: Push**

```bash
git push origin main
```

---

## Self-Review

**Spec coverage check:**
- ✓ Design system (palette, typography, cards, AdPlaceholder, spacing) — Tasks 1–2 + inline in Tasks 3–6
- ✓ Homepage 5 sections + 5 slots — Task 3
- ✓ Calculator pages 5 slots — Task 4
- ✓ All Tools page header + 5 slots — Task 5
- ✓ Category page clean header + 5 slots — Task 6
- ✓ ToolCard left-border removal — Task 2

**Placeholder scan:** No TBDs, no vague steps, all code blocks present. ✓

**Type consistency:**
- `AdPlaceholder` props: `slot: string`, `format: 'auto' | 'rectangle' | 'leaderboard' | 'vertical'` — consistent across all tasks. ✓
- `ToolCard` receives `ToolCardData` — no changes to interface. ✓
- `React.Fragment` used with key in Task 5 grouped view — correct pattern. ✓
