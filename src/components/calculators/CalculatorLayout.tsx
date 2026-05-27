'use client';

import React from 'react';
import { ToolConfig } from '@/lib/data/tools';
import { FAQAccordion } from './FAQAccordion';
import { BreadcrumbNav } from '../common/BreadcrumbNav';
import { RelatedTools } from '../common/RelatedTools';
import { AdPlaceholder } from '../common/AdPlaceholder';

interface CalculatorLayoutProps {
  tool: ToolConfig;
  children?: React.ReactNode;
  results?: React.ReactNode;
  howItWorks?: string;
  faqs?: Array<{ question: string; answer: string }>;
  relatedTools?: ToolConfig[];
  contentHtml?: string;
}

/**
 * Main calculator wrapper component
 * Provides consistent layout, navigation, and sections for all calculators
 * 92% reuse across all calculator pages
 */
export function CalculatorLayout({
  tool,
  children,
  results,
  howItWorks,
  faqs = [],
  relatedTools = [],
  contentHtml,
}: CalculatorLayoutProps): React.JSX.Element {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: tool.category, href: `/calculators?category=${tool.category}` },
    { label: tool.name, href: `/calculators/${tool.slug}` },
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{tool.description}</p>
        </section>

        {/* Calculator Section */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Calculator Inputs
              </h2>
              <div className="space-y-5">{children}</div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Results</h2>
              <div className="space-y-5">
                {results || (
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 text-gray-500 dark:text-gray-400 text-center">
                    Enter values to see results
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Ad Placeholder */}
        <AdPlaceholder />

        {/* How It Works Section */}
        {howItWorks && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How It Works</h2>
            <div className="prose dark:prose-invert prose-sm max-w-none">
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <p className="text-gray-700 dark:text-gray-300">{howItWorks}</p>
              )}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">FAQ</h2>
            <FAQAccordion faqs={faqs} />
          </section>
        )}

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Related Tools
            </h2>
            <RelatedTools tools={relatedTools} />
          </section>
        )}
      </main>
    </div>
  );
}
