'use client';

import React from 'react';
import Link from 'next/link';
import { getCategoryColors } from '@/lib/data/categoryColors';
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
  const estimatedMins = tool.inputs
    ? Math.max(1, Math.ceil(tool.inputs.length / 3))
    : null;

  const iconSize = size === 'sm'
    ? 'w-9 h-9 text-lg rounded-md mt-0.5'
    : 'w-11 h-11 text-2xl rounded-lg';

  return (
    <Link
      href={`/calculators/${tool.slug}`}
      className={`group relative flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 border-l-4 ${colors.border} hover:shadow-[0_4px_6px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_4px_6px_rgba(0,0,0,0.3)] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all`}
    >
      <span className={`shrink-0 flex items-center justify-center ${iconSize} ${colors.iconBg}`}>
        {tool.icon ?? '🔧'}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className={`font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-tight ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
          {tool.name}
        </h3>
        <p className={`text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {tool.description}
        </p>
        {estimatedMins && (
          <span className="inline-block mt-1.5 text-xs text-gray-400 dark:text-gray-500">
            ~{estimatedMins} min
          </span>
        )}
      </div>
      {showFavorite && (
        <div className="shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <FavoriteButton slug={tool.slug} toolName={tool.name} />
        </div>
      )}
    </Link>
  );
}
