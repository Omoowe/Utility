'use client';

import React from 'react';
import { ToolConfig } from '@/lib/data/tools';
import { getCategoryBySlug } from '@/lib/data/categories';
import { FAQAccordion } from './FAQAccordion';
import { BreadcrumbNav } from '../common/BreadcrumbNav';
import { RelatedTools } from '../common/RelatedTools';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { ShareButton } from '../common/ShareButton';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

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

      <main className="container-custom py-8">
        {/* Content constrained to a comfortable reading/tool width */}
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Tool header */}
          <section className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {tool.icon && (
                  <span className="text-3xl shrink-0" aria-hidden="true">{tool.icon}</span>
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                    {tool.name}
                  </h1>
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
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl">{tool.description}</p>
          </section>

          {/* YMYL disclaimer for finance / health */}
          <DisclaimerBanner category={tool.category} />

          {/* Calculator widget */}
          <section className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            {children ? (
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Inputs */}
                <div className="bg-gray-50 dark:bg-gray-800/60 p-5 md:p-6 space-y-4 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Inputs
                  </p>
                  {children}
                </div>
                {/* Results */}
                <div className="bg-white dark:bg-gray-900 p-5 md:p-6 space-y-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Results
                  </p>
                  {results ?? (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Enter values above</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 p-5 md:p-6">
                {results}
              </div>
            )}
          </section>

          {/* Ad — after calculator, before content */}
          <AdPlaceholder format="leaderboard" slot="calc-mid" />

          {/* Intro */}
          {intro && (
            <section className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-gray-200 dark:border-gray-700 pl-4">
              {intro}
            </section>
          )}

          {/* How It Works */}
          {howItWorks && (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">How It Works</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {contentHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                ) : (
                  <p>{howItWorks}</p>
                )}
              </div>
            </section>
          )}

          {/* Interpretation Guide */}
          {interpretationGuide && (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">How to Read Your Results</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>{interpretationGuide}</p>
              </div>
            </section>
          )}

          {/* Ad — mid content */}
          <AdPlaceholder format="rectangle" slot="calc-content" />

          {/* FAQ */}
          {faqs.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <FAQAccordion faqs={faqs} />
            </section>
          )}

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="space-y-4 border-t border-gray-100 dark:border-gray-800 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Related Tools</h2>
              <RelatedTools tools={relatedTools} />
            </section>
          )}

          {/* Bottom ad */}
          <AdPlaceholder format="leaderboard" slot="calc-bottom" />
        </div>
      </main>
    </div>
  );
}
