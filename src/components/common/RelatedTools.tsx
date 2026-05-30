'use client';

import React from 'react';
import Link from 'next/link';
import { ToolConfig } from '@/lib/data/tools';
import { getCategoryColors } from '@/lib/data/categoryColors';
import { getCategoryName } from '@/lib/data/categories';

interface RelatedToolsProps {
  tools: ToolConfig[];
}

export function RelatedTools({ tools }: RelatedToolsProps): React.JSX.Element {
  if (!tools || tools.length === 0) return <></>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => {
        const colors = getCategoryColors(tool.category);
        return (
          <Link
            key={tool.slug}
            href={`/calculators/${tool.slug}`}
            className={`group flex items-start gap-3 p-4 rounded-xl border-l-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all ${colors.border}`}
          >
            <span className={`text-xl shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${colors.iconBg}`}>
              {tool.icon ?? '🔧'}
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                {tool.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{getCategoryName(tool.category)}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
