import Link from 'next/link';
import { CATEGORIES } from '@/lib/data/categories';
import { getToolsByCategory, TOOLS } from '@/lib/data/tools';
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
    'Free online calculators for mortgage, BMI, TDEE, retirement, loan, age, ROI, and 80+ more tools. No sign-up. Instant results. Finance, health, home, and everyday utilities.',
  keywords: [
    'free calculator',
    'online calculator',
    'mortgage calculator',
    'bmi calculator',
    'loan calculator',
    'tdee calculator',
    'retirement calculator',
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
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Free Online<br className="hidden sm:block" /> Calculators &amp; Tools
          </h1>
          <p className="text-blue-200 text-base">
            {TOOLS.length} free tools — no sign-up, no fees, instant results in your browser.
          </p>
          <div className="max-w-lg mx-auto">
            <SearchBar placeholder={`Search ${TOOLS.length} tools — mortgage, TDEE, retirement…`} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {(['82 Free Tools', 'No Account Needed', 'Works Offline', 'Mobile-Ready'] as const).map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20"
              >
                <svg className="w-3 h-3 text-green-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200 dark:divide-gray-700">
            {[
              { value: TOOLS.length.toString(), label: 'Free Tools' },
              { value: CATEGORIES.length.toString(), label: 'Categories' },
              { value: '0', label: 'Sign-ups Required' },
              { value: '100%', label: 'Browser-Based' },
            ].map((stat) => (
              <div key={stat.label} className="py-4 px-6 text-center">
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container-custom py-10 space-y-12">

        {/* Ad Slot */}
        <AdPlaceholder format="leaderboard" slot="homepage-top" />

        {/* Saved Tools — shows only when user has favorites */}
        <SavedToolsSection />

        {/* Category sections — reference site pattern */}
        {CATEGORIES.map((cat, idx) => {
          const allTools = getToolsByCategory(cat.slug);
          const previewTools = allTools.slice(0, 4);
          return (
            <section key={cat.slug} className="space-y-4">
              {/* Section header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl shrink-0">{cat.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{allTools.length} tools</p>
                  </div>
                </div>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="shrink-0 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View all {allTools.length} →
                </Link>
              </div>

              {/* Tool grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {previewTools.map(({ compute: _c, ...tool }) => (
                  <ToolCard key={tool.slug} tool={tool} size="sm" />
                ))}
              </div>

              {/* Inline ads at intervals */}
              {idx === 1 && (
                <div className="pt-2">
                  <AdPlaceholder format="rectangle" slot="homepage-mid1" />
                </div>
              )}
              {idx === 3 && (
                <div className="pt-2">
                  <AdPlaceholder format="rectangle" slot="homepage-mid2" />
                </div>
              )}
            </section>
          );
        })}

        {/* Browse all CTA */}
        <div className="text-center py-4 border-t border-gray-100 dark:border-gray-800">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            Browse All {TOOLS.length} Tools →
          </Link>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Filter by category · Search by name · Free, always
          </p>
        </div>

        {/* Recently Viewed — conditional */}
        <RecentlyViewedSection />

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-2 max-w-2xl">
            {HOMEPAGE_FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="font-medium text-sm text-gray-900 dark:text-white">{faq.q}</span>
                  <svg
                    className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <AdPlaceholder format="leaderboard" slot="homepage-prefooter1" />

        {/* SEO text */}
        <section className="space-y-3 max-w-none text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300">
            Your Free Online Calculator Hub
          </h2>
          <p>
            ToolNest is a free collection of online calculators and utility tools covering finance,
            health, home improvement, everyday utilities, pets, and business. Every tool runs entirely
            in your browser — there&apos;s nothing to install, no account needed, and your data is never
            sent to any server.
          </p>
          <p>
            Whether you&apos;re calculating mortgage payments before buying a house, checking your TDEE,
            planning for retirement, or converting fractions to decimals, ToolNest has you covered with
            accurate, easy-to-use tools that work on any device.
          </p>
        </section>

        <AdPlaceholder format="leaderboard" slot="homepage-prefooter2" />
      </div>
    </>
  );
}
