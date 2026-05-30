import Link from 'next/link';
import { getToolsByCategory } from '@/lib/data/tools';
import { CATEGORIES, getCategoryBySlug } from '@/lib/data/categories';
import { getCategoryColors } from '@/lib/data/categoryColors';
import { BreadcrumbNav } from '@/components/common/BreadcrumbNav';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';
import { ToolCard } from '@/components/common/ToolCard';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  const tools = getToolsByCategory(category);

  if (!cat || tools.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container-custom py-20 text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Category Not Found</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            That category doesn&apos;t exist yet.
          </p>
          <a
            href="/calculators"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Tools
          </a>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'All Tools', href: '/calculators' },
    { label: cat.name, href: `/categories/${cat.slug}` },
  ];

  const otherCategories = CATEGORIES.filter((c) => c.slug !== cat.slug).filter(
    (c) => getToolsByCategory(c.slug).length > 0
  );

  const colors = getCategoryColors(cat.slug);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-3">
          <BreadcrumbNav items={breadcrumbs} />
        </div>
      </div>

      {/* Category banner */}
      <div className={`bg-gradient-to-br ${colors.banner} border-b`}>
        <div className="container-custom py-10">
          <div className="flex items-center gap-4">
            <span className={`text-4xl w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${colors.iconBg} shadow-sm`}>
              {cat.icon}
            </span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{cat.name} Tools</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tools.length} free tools · No sign-up required</p>
            </div>
          </div>
          <p className="text-base text-gray-700 dark:text-gray-300 max-w-2xl mt-4">{cat.seoBlurb}</p>
        </div>
      </div>

      <main className="container-custom py-10 space-y-10">
        {/* Tools grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map(({ compute: _c, ...tool }) => (
              <ToolCard key={tool.slug} tool={tool} size="sm" />
            ))}
          </div>
        </section>

        <AdPlaceholder />

        {/* Other categories */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Browse Other Categories</h2>
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
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  const tools = getToolsByCategory(category);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app';

  if (!cat) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `Free ${cat.name} Tools & Calculators`,
    description: `${tools.length} free ${cat.name.toLowerCase()} tools. ${cat.seoBlurb}`,
    keywords: [cat.name.toLowerCase(), 'calculator', 'free tools', 'online tools'],
    alternates: {
      canonical: `${baseUrl}/categories/${cat.slug}`,
    },
    openGraph: {
      title: `Free ${cat.name} Tools & Calculators | ToolNest`,
      description: cat.seoBlurb,
      url: `/categories/${cat.slug}`,
      type: 'website',
    },
  };
}

