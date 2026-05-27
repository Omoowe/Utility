import Link from 'next/link';
import { getToolsByCategory, getAllCategories } from '@/lib/data/tools';
import { BreadcrumbNav } from '@/components/common/BreadcrumbNav';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ category: string }>;
}

const CATEGORY_METADATA: Record<string, { title: string; description: string }> = {
  Finance: {
    title: 'Finance Calculators',
    description:
      'Comprehensive financial calculators for mortgages, loans, investments, ROI, and paycheck calculations. Plan your finances with precision.',
  },
  Utilities: {
    title: 'Utility Calculators',
    description:
      'Essential utility calculators for everyday tasks. Calculate your age, generate random numbers, and more.',
  },
};

/**
 * Dynamic category page
 * Displays all calculators in a specific category
 */
export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const category = resolvedParams.category;

  // Normalize category name (finance -> Finance)
  const normalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  const tools = getToolsByCategory(normalizedCategory);

  if (tools.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container-custom py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404 - Category Not Found</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The category you're looking for doesn't exist.
            </p>
            <a
              href="/calculators"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Calculators
            </a>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: normalizedCategory, href: `/categories/${category}` },
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {normalizedCategory} Calculators
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {CATEGORY_METADATA[normalizedCategory]?.description ||
              `Browse our collection of ${normalizedCategory.toLowerCase()} calculators.`}
          </p>
        </section>

        {/* Calculators Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
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
        </section>

        {/* Browse Other Categories */}
        <section className="border-t border-gray-200 dark:border-gray-700 pt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Browse Other Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getAllCategories()
              .filter((cat) => cat !== normalizedCategory)
              .map((cat) => (
                <Link
                  key={cat}
                  href={`/categories/${cat.toLowerCase()}`}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {cat} ({getToolsByCategory(cat).length})
                  </h3>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/**
 * Generate static params for all categories
 */
export async function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: category.toLowerCase(),
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = resolvedParams.category;

  // Normalize category name
  const normalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  const metadata = CATEGORY_METADATA[normalizedCategory];

  return {
    title: `${metadata?.title || normalizedCategory + ' Calculators'} | ToolNest`,
    description:
      metadata?.description || `Browse our collection of ${normalizedCategory.toLowerCase()} calculators.`,
    keywords: [normalizedCategory.toLowerCase(), 'calculator', 'tools'],
    openGraph: {
      title: `${metadata?.title || normalizedCategory + ' Calculators'} | ToolNest`,
      description:
        metadata?.description || `Browse our collection of ${normalizedCategory.toLowerCase()} calculators.`,
      url: `/categories/${category}`,
      type: 'website',
    },
  };
}
