import Link from 'next/link';
import { TOOLS } from '@/lib/data/tools';
import { BreadcrumbNav } from '@/components/common/BreadcrumbNav';
import { Metadata } from 'next';

/**
 * All calculators listing page
 * Displays grid of all 7 available calculators
 */
export default function CalculatorsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-4">
          <BreadcrumbNav items={breadcrumbs} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container-custom py-12 space-y-12">
        {/* Header Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">All Calculators</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Browse our comprehensive collection of online calculators. Whether you need to calculate mortgage
            payments, manage your finances, or solve everyday math problems, we have the tools you need.
          </p>
        </section>

        {/* Calculators Grid */}
        <section className="space-y-8">
          {/* Finance Category */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Finance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOOLS.filter((tool) => tool.category === 'Finance').map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/calculators/${tool.slug}`}
                  className="group block p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                >
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
                    <div className="pt-3">
                      <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all">
                        Open Calculator
                        <span className="ml-2">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Utilities Category */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Utilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOOLS.filter((tool) => tool.category === 'Utilities').map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/calculators/${tool.slug}`}
                  className="group block p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                >
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
                    <div className="pt-3">
                      <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all">
                        Open Calculator
                        <span className="ml-2">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'All Calculators | ToolNest',
  description: 'Browse our comprehensive collection of online calculators for finance, utilities, and everyday math.',
  keywords: ['calculator', 'finance', 'utilities', 'online tools'],
  openGraph: {
    title: 'All Calculators | ToolNest',
    description: 'Browse our comprehensive collection of online calculators for finance, utilities, and everyday math.',
    url: '/calculators',
    type: 'website',
  },
};
