import Link from 'next/link';
import { CATEGORIES } from '@/lib/data/categories';
import { getPopularTools, getRecentTools, TOOLS } from '@/lib/data/tools';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';
import { SearchBar } from '@/components/common/SearchBar';
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
  const recentTools = getRecentTools(4);
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-b border-blue-100 dark:border-gray-700 py-16 px-4">
          <div className="container-custom text-center space-y-6 max-w-3xl mx-auto">
            <div className="space-y-3">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Free Online{' '}
                <span className="text-blue-600 dark:text-blue-400">Calculators</span>
                <br />& Utility Tools
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {TOOLS.length}+ free tools. No sign-up. Instant results.
              </p>
            </div>
            <div className="max-w-xl mx-auto">
              <SearchBar placeholder="Search mortgage, BMI, age calculator…" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
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
          </div>
        </section>

        <div className="container-custom py-14 space-y-16">
          {/* Popular Tools */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⭐ Popular Tools</h2>
              <Link href="/calculators" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/calculators/${tool.slug}`}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                >
                  <span className="text-3xl shrink-0">{tool.icon ?? '🔧'}</span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📂 Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cat.description}</p>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Browse tools →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Ad */}
          <AdPlaceholder />

          {/* Recently Added */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🆕 Recently Added</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/calculators/${tool.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                >
                  <span className="text-2xl shrink-0">{tool.icon ?? '🔧'}</span>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                      {tool.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">❓ Frequently Asked Questions</h2>
            <div className="space-y-3 max-w-2xl">
              {HOMEPAGE_FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3"
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

          {/* SEO text */}
          <section className="space-y-4 prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-10">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
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
            <p>
              New tools are added regularly across all six categories. Bookmark this page or follow us on
              social media to stay updated with the latest additions.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
