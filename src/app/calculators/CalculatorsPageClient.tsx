'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/data/tools';
import { CATEGORIES } from '@/lib/data/categories';
import { ToolCard } from '@/components/common/ToolCard';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';

const SERIALIZABLE_TOOLS = TOOLS.map(({ compute: _c, ...t }) => t);

export function CalculatorsPageClient(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [query, setQuery] = useState('');

  const filtered = SERIALIZABLE_TOOLS
    .filter((t) => activeCategory === 'all' || t.category === activeCategory)
    .filter((t) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    });

  const groupedByCategory = CATEGORIES.map((cat) => ({
    ...cat,
    tools: filtered.filter((t) => t.category === cat.slug),
  })).filter((c) => c.tools.length > 0);

  const isFiltered = activeCategory !== 'all' || query.trim() !== '';

  return (
    <div className="space-y-8">
      {/* Category tabs */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2 pb-1 min-w-max">
          <button
            onClick={() => { setActiveCategory('all'); setQuery(''); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All ({SERIALIZABLE_TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = SERIALIZABLE_TOOLS.filter((t) => t.category === cat.slug).length;
            return (
              <button
                key={cat.slug}
                onClick={() => { setActiveCategory(cat.slug); setQuery(''); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat.icon} {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Search input */}
      <div className="relative max-w-md">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter tools…"
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear filter"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Ad Slot 2 — between filter controls and results */}
      <AdPlaceholder format="leaderboard" slot="tools-filter-mid" />

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <p className="text-4xl">🔍</p>
          <p className="text-gray-600 dark:text-gray-400">
            No tools match <strong>&quot;{query}&quot;</strong>
          </p>
          <button
            onClick={() => { setActiveCategory('all'); setQuery(''); }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Flat grid when any filter active */}
      {filtered.length > 0 && isFiltered && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} size="sm" />
            ))}
          </div>
          {/* Ad Slot 3 — after flat grid */}
          <AdPlaceholder format="rectangle" slot="tools-mid-grid" />
        </>
      )}

      {/* Grouped by category when showing all with no query */}
      {filtered.length > 0 && !isFiltered && (
        <div className="space-y-14">
          {groupedByCategory.map((cat, idx) => (
            <React.Fragment key={cat.slug}>
              <section className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{cat.name}</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{cat.tools.length} tools</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveCategory(cat.slug)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                  >
                    Filter →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {cat.tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} size="sm" />
                  ))}
                </div>
              </section>
              {/* Ad Slot 3 — after first category group */}
              {idx === 0 && <AdPlaceholder format="rectangle" slot="tools-mid-grid" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
