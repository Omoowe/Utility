'use client';

import React from 'react';
import Link from 'next/link';
import { ToolConfig } from '@/lib/data/tools';
import clsx from 'clsx';

interface RelatedToolsProps {
  tools: ToolConfig[];
}

/**
 * Grid of related calculator tool cards
 * Displays recommended tools with links
 */
export function RelatedTools({ tools }: RelatedToolsProps): React.JSX.Element {
  if (!tools || tools.length === 0) {
    return <div className="text-gray-500 dark:text-gray-400">No related tools available</div>;
  }

  return (
    <div
      className={clsx(
        'grid gap-6',
        {
          'grid-cols-1': tools.length === 1,
          'grid-cols-1 md:grid-cols-2': tools.length === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': tools.length >= 3,
        }
      )}
    >
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          href={`/calculators/${tool.slug}`}
          className={clsx(
            'group rounded-lg border border-gray-200 dark:border-gray-700',
            'bg-white dark:bg-gray-800 p-6 transition-all',
            'hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-600'
          )}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900">
              <span className="text-xl">📊</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300">
                {tool.category}
              </span>
            </div>

            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all pt-2">
              <span className="text-sm font-medium">Learn more</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
