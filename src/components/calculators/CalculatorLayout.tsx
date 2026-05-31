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
  interpretationGuide?: string;
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
  interpretationGuide,
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
        {/* Ad Slot 1 — above tool header */}
        <AdPlaceholder format="leaderboard" slot="calc-top" />

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
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          {children ? (
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Inputs panel */}
              <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800/60 p-6 md:p-8 space-y-5 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Inputs</h2>
                </div>
                {children}
              </div>
              {/* Results panel */}
              <div className="lg:col-span-3 bg-white dark:bg-gray-900 p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Results</h2>
                </div>
                {results ?? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enter values to see results</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Interactive tool — render full width */
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8">
              {results}
            </div>
          )}
        </section>

        {/* Ad Slot 2 — after calculator widget */}
        <AdPlaceholder format="rectangle" slot="calc-mid" />

        {/* How It Works */}
        {howItWorks && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How It Works</h2>
            <div className="prose dark:prose-invert prose-sm max-w-none text-gray-700 dark:text-gray-300">
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <p>{howItWorks}</p>
              )}
            </div>
          </section>
        )}

        {/* Ad Slot 3 — after How It Works */}
        <AdPlaceholder format="rectangle" slot="calc-content" />

        {/* How to Interpret Results */}
        {interpretationGuide && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How to Interpret Your Results</h2>
            <div className="prose dark:prose-invert prose-sm max-w-none text-gray-700 dark:text-gray-300">
              <p>{interpretationGuide}</p>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={faqs} />
          </section>
        )}

        {/* Ad Slot 4 — above Related Tools */}
        <AdPlaceholder format="leaderboard" slot="calc-pre-related" />

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Related Tools</h2>
            <RelatedTools tools={relatedTools} />
          </section>
        )}

        {/* Ad Slot 5 — page bottom */}
        <AdPlaceholder format="leaderboard" slot="calc-bottom" />
      </main>
    </div>
  );
}
