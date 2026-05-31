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
        {/* Hero — subtle gradient, stats as large numbers (utilitybillcalculator.quest pattern) */}
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 py-16 px-4">
          <div className="container-custom text-center space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Free Online Calculators<br className="hidden sm:block" /> &amp; Utility Tools
              </h1>

              {/* Stats as large numbers */}
              <div className="flex items-center justify-center gap-8 pt-2">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{TOOLS.length}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">tools</div>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{CATEGORIES.length}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">categories</div>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Free</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">forever</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 text-xs text-gray-400 dark:text-gray-500 pt-1">
                <span>🔒 No Sign-Up</span>
                <span>·</span>
                <span>🖥️ Browser-Only</span>
                <span>·</span>
                <span>📱 Works on Mobile</span>
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

          {/* Categories — compact row cards (calculator.net pattern) */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const count = getToolsByCategory(cat.slug).length;
                const colors = getCategoryColors(cat.slug);
                return (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <span className={`text-xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors.iconBg}`}>
                      {cat.icon}
                    </span>
                    <span className="flex-1 font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{count} tools →</span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Ad Slot 2 */}
          <AdPlaceholder format="rectangle" slot="homepage-mid1" />

          {/* Popular Tools */}
          <section className="space-y-4">
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

          {/* Ad Slot 4 */}
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
