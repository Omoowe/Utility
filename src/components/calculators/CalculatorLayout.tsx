'use client';

import React from 'react';
import { ToolConfig } from '@/lib/data/tools';
import { getCategoryBySlug } from '@/lib/data/categories';
import { FAQAccordion } from './FAQAccordion';
import { BreadcrumbNav } from '../common/BreadcrumbNav';
import { RelatedTools } from '../common/RelatedTools';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { ShareButton } from '../common/ShareButton';

interface CalculatorLayoutProps {
  tool: ToolConfig;
  children?: React.ReactNode;
  results?: React.ReactNode;
  intro?: string;
  howItWorks?: string;
  faqs?: Array<{ question: string; answer: string }>;
  relatedTools?: ToolConfig[];
  contentHtml?: string;
}

export function CalculatorLayout({
  tool,
  children,
  results,
  intro,
  howItWorks,
  faqs = [],
  relatedTools = [],
  contentHtml,
}: CalculatorLayoutProps): React.JSX.Element {
  const category = getCategoryBySlug(tool.category);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'All Tools', href: '/calculators' },
    {
      label: category?.name ?? tool.category,
      href: `/categories/${tool.category}`,
    },
    { label: tool.name, href: `/calculators/${tool.slug}` },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-3">
          <BreadcrumbNav items={breadcrumbs} />
        </div>
      </div>

      <main className="container-custom py-10 space-y-10">
        {/* Header */}
        <section className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {tool.icon && <span className="text-4xl">{tool.icon}</span>}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    {category?.icon} {category?.name ?? tool.category}
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓ Free</span>
                </div>
              </div>
            </div>
            <ShareButton title={tool.name} text={tool.description} className="shrink-0 hidden sm:flex" />
          </div>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl">{tool.description}</p>
          {intro && (
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">{intro}</p>
          )}
        </section>

        {/* Calculator */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          {children ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Enter Values</h2>
                {children}
              </div>
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Results</h2>
                {results ?? (
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 text-gray-500 dark:text-gray-400 text-center">
                    Enter values to see results
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Interactive tool — render full width */
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sr-only">Tool</h2>
              {results}
            </div>
          )}
        </section>

        {/* Ad */}
        <AdPlaceholder />

        {/* How It Works */}
        {howItWorks && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How It Works</h2>
            <div className="prose dark:prose-invert prose-sm max-w-none text-gray-700 dark:text-gray-300">
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <p>{howItWorks}</p>
              )}
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={faqs} />
          </section>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Related Tools</h2>
            <RelatedTools tools={relatedTools} />
          </section>
        )}

        {/* Bottom ad */}
        <AdPlaceholder slot="9876543210" />
      </main>
    </div>
  );
}
