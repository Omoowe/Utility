'use client';

import React from 'react';
import { useRecentTools } from '@/hooks/useRecentTools';
import { getToolBySlug } from '@/lib/data/tools';
import { ToolCard } from './ToolCard';

export function RecentlyViewedSection(): React.JSX.Element | null {
  const { recentSlugs } = useRecentTools();

  const tools = recentSlugs
    .slice(0, 6)
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  if (tools.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} size="sm" />
        ))}
      </div>
    </section>
  );
}
