import Link from 'next/link';
import { TOOLS, getToolsByCategory } from '@/lib/data/tools';
import { CATEGORIES } from '@/lib/data/categories';
import { BreadcrumbNav } from '@/components/common/BreadcrumbNav';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';
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

  const categoriesWithTools = CATEGORIES.map((cat) => ({
    ...cat,
    tools: getToolsByCategory(cat.slug),
  })).filter((c) => c.tools.length > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-3">
          <BreadcrumbNav items={breadcrumbs} />
        </div>
      </div>

      <main className="container-custom py-10 space-y-14">
        {/* Header */}
        <section className="space-y-4 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Free Online Calculators & Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {TOOLS.length}+ free tools across {CATEGORIES.length} categories. No sign-up, no fees — instant results.
          </p>
        </section>

        {/* All categories */}
        {categoriesWithTools.map((cat) => (
          <section key={cat.slug} className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{cat.name}</h2>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  ({cat.tools.length} tools)
                </span>
              </div>
              <Link
                href={`/categories/${cat.slug}`}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/calculators/${tool.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                >
                  <span className="text-2xl shrink-0 mt-0.5">{tool.icon ?? '🔧'}</span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm leading-tight">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <AdPlaceholder />

        {/* SEO copy */}
        <section className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-400 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
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
      </main>
    </div>
  );
}
