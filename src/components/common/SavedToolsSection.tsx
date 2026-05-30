'use client';

import React from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { getToolBySlug } from '@/lib/data/tools';
import { ToolCard } from './ToolCard';

export function SavedToolsSection(): React.JSX.Element | null {
  const { favorites, toggleFavorite } = useFavorites();

  const tools = favorites
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  if (tools.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Tools</h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
            {tools.length}
          </span>
        </div>
        <button
          onClick={() => favorites.forEach((slug) => toggleFavorite(slug))}
          className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          Clear all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} size="sm" />
        ))}
      </div>
    </section>
  );
}
