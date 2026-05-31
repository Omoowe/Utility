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

        <section className="text-sm text-gray-500 dark:text-gray-400 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300">
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
