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

const CATEGORY_BG: Record<number, string> = {
  0: 'bg-white dark:bg-gray-900',
  1: 'bg-gray-50 dark:bg-gray-800/50',
};

export default function HomePage() {
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ── Hero ── */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            Free Online Calculators<br className="hidden sm:block" />
            <span className="text-blue-600 dark:text-blue-400"> & Utility Tools</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">
            Instant, accurate results — all free, all in your browser. No sign-up required.
          </p>
          <div className="max-w-lg mx-auto pt-1">
            <SearchBar placeholder={`Search ${TOOLS.length} tools…`} />
          </div>
        </div>

        {/* Trust stats */}
        <div className="max-w-lg mx-auto mt-8 grid grid-cols-3 gap-4">
          {[
            { value: `${TOOLS.length}+`, label: 'Free tools' },
            { value: `${CATEGORIES.length}`, label: 'Categories' },
            { value: '0', label: 'Sign-ups needed' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Overview ── */}
      <section className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 py-8 px-4">
        <div className="container-custom">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center mb-5">
            Browse by category
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => {
              const count = getToolsByCategory(cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md dark:hover:shadow-gray-900/40 transition-all group text-center"
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {cat.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{count} tools</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div>
        <div className="container-custom pt-6 pb-2">
          <AdPlaceholder format="leaderboard" slot="homepage-top" />
        </div>

        <div className="container-custom pb-4">
          <SavedToolsSection />
        </div>

        {/* Category sections — alternating backgrounds */}
        {CATEGORIES.map((cat, idx) => {
          const allTools = getToolsByCategory(cat.slug);
          const previewTools = allTools.slice(0, 6);
          const bg = CATEGORY_BG[idx % 2];

          return (
            <section key={cat.slug} className={`${bg} border-b border-gray-100 dark:border-gray-800`}>
              <div className="container-custom py-10">
                {/* Section header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl shrink-0 leading-none">{cat.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                        {cat.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 max-w-md">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                  >
                    View all {allTools.length} →
                  </Link>
                </div>

                {/* Tool grid — 6 tools */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {previewTools.map(({ compute: _c, ...tool }) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>

                {idx === 1 && (
                  <div className="mt-8">
                    <AdPlaceholder format="rectangle" slot="homepage-mid1" />
                  </div>
                )}
                {idx === 3 && (
                  <div className="mt-8">
                    <AdPlaceholder format="rectangle" slot="homepage-mid2" />
                  </div>
                )}
              </div>
            </section>
          );
        })}

        <div className="container-custom py-8 space-y-8">
          {/* Browse all CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-blue-600 dark:bg-blue-700 px-8 py-6">
            <div>
              <p className="font-bold text-white text-lg">
                Looking for something else?
              </p>
              <p className="text-blue-100 text-sm mt-0.5">
                {TOOLS.length} tools across {CATEGORIES.length} categories — all free
              </p>
            </div>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors shadow-sm shrink-0"
            >
              Browse all {TOOLS.length} tools →
            </Link>
          </div>

          <RecentlyViewedSection />

          {/* FAQ */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
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
      </div>
    </>
  );
}
