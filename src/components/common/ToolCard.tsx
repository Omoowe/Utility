'use client';

import React from 'react';
import Link from 'next/link';
import { getCategoryColors } from '@/lib/data/categoryColors';
import { getCategoryName } from '@/lib/data/categories';
import { FavoriteButton } from './FavoriteButton';

export interface ToolCardData {
  slug: string;
  name: string;
  description: string;
  icon?: string;
  category: string;
  inputs?: Array<{ name: string }>;
}

interface ToolCardProps {
  tool: ToolCardData;
  size?: 'sm' | 'md';
  showFavorite?: boolean;
}

export function ToolCard({ tool, size = 'md', showFavorite = true }: ToolCardProps): React.JSX.Element {
  const colors = getCategoryColors(tool.category);

  return (
    <Link
      href={`/calculators/${tool.slug}`}
      className={`group flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 border-t-2 ${colors.borderTop} hover:shadow-md dark:hover:shadow-gray-900/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all ${size === 'sm' ? 'p-4' : 'p-5'}`}
    >
      {/* Top row: icon + title + favorite */}
      <div className="flex items-start gap-3">
        <span className={`shrink-0 flex items-center justify-center w-11 h-11 text-2xl rounded-xl ${colors.iconBg}`}>
          {tool.icon ?? '🔧'}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className={`font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-snug ${size === 'sm' ? 'text-sm' : 'text-[15px]'}`}>
            {tool.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
        {showFavorite && (
          <div className="shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            <FavoriteButton slug={tool.slug} toolName={tool.name} />
          </div>
        )}
      </div>

      {/* CTA row */}
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-100 dark:border-gray-700/60">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
          {getCategoryName(tool.category)}
        </span>
        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
          Use tool →
        </span>
      </div>
    </Link>
  );
}
