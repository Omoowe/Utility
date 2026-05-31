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
  const featuredTools = TOOLS.filter((t) => t.featured).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ── Hero ── */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-xs font-medium text-blue-700 dark:text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
            {TOOLS.length} free tools — no sign-up required
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
            Free Online Calculators<br className="hidden sm:block" />&amp; Utility Tools
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">
            Instant, accurate results across {CATEGORIES.length} categories. Finance, health, home, and more — all free, all in your browser.
          </p>
          <div className="max-w-lg mx-auto">
            <SearchBar placeholder={`Search ${TOOLS.length} tools…`} />
          </div>
        </div>

        {/* Featured tools — visible above fold */}
        {featuredTools.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8">
            <p className="text-xs text-center font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
              Popular right now
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {featuredTools.map(({ compute: _c, ...tool }) => (
                <ToolCard key={tool.slug} tool={tool} size="sm" showFavorite={false} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Main content ── */}
      <div className="container-custom py-8 space-y-8">

        <AdPlaceholder format="leaderboard" slot="homepage-top" />

        <SavedToolsSection />

        {/* Category sections */}
        {CATEGORIES.map((cat, idx) => {
          const allTools = getToolsByCategory(cat.slug);
          const previewTools = allTools.slice(0, 3);
          return (
            <section key={cat.slug} className="space-y-3">
              {/* Section header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl shrink-0">{cat.icon}</span>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{allTools.length} tools</p>
                  </div>
                </div>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="shrink-0 text-xs font-medium text-blue-700 dark:text-blue-400 hover:underline"
                >
                  View all →
                </Link>
              </div>

              {/* Tool grid — 3 col max, matches reference site density */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {previewTools.map(({ compute: _c, ...tool }) => (
                  <ToolCard key={tool.slug} tool={tool} size="sm" />
                ))}
              </div>

              {idx === 1 && (
                <div className="pt-1">
                  <AdPlaceholder format="rectangle" slot="homepage-mid1" />
                </div>
              )}
              {idx === 3 && (
                <div className="pt-1">
                  <AdPlaceholder format="rectangle" slot="homepage-mid2" />
                </div>
              )}
            </section>
          );
        })}

        {/* Browse all CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 border-t border-gray-100 dark:border-gray-800">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">
              Looking for something else?
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {TOOLS.length} tools across {CATEGORIES.length} categories — all free
            </p>
          </div>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm transition-colors shadow-sm"
          >
            Browse all {TOOLS.length} tools →
          </Link>
        </div>

        <RecentlyViewedSection />

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-2 max-w-2xl">
            {HOMEPAGE_FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
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
            in your browser — nothing to install, no account needed, your data never sent to any server.
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
