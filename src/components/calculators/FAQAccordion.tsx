'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

/**
 * Expandable FAQ accordion component
 * Displays frequently asked questions with smooth expand/collapse
 */
export function FAQAccordion({ faqs }: FAQAccordionProps): React.JSX.Element {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!faqs || faqs.length === 0) {
    return <div className="text-gray-500 dark:text-gray-400">No FAQs available</div>;
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleExpand(index)}
            className={clsx(
              'w-full px-6 py-4 flex items-center justify-between text-left font-medium transition-colors',
              'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700',
              expandedId === index && 'bg-blue-50 dark:bg-blue-950'
            )}
          >
            <span className="text-gray-900 dark:text-white">{faq.question}</span>
            <span
              className={clsx(
                'flex-shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200',
                expandedId === index && 'transform rotate-180'
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>

          {expandedId === index && (
            <div className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
