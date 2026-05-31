'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { TOOLS, ToolConfig } from '@/lib/data/tools';
import { getCategoryName } from '@/lib/data/categories';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSelect?: () => void;
  autoFocus?: boolean;
}

function scoreMatch(tool: ToolConfig, query: string): number {
  const q = query.toLowerCase();
  if (tool.name.toLowerCase().includes(q)) return 3;
  if (tool.description.toLowerCase().includes(q)) return 2;
  if (tool.keywords.some((k) => k.toLowerCase().includes(q))) return 1;
  if (getCategoryName(tool.category).toLowerCase().includes(q)) return 1;
  return 0;
}

export function SearchBar({ placeholder = 'Search calculators and tools…', className = '', onSelect, autoFocus = false }: SearchBarProps): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ToolConfig[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const matched = TOOLS.filter((t) => scoreMatch(t, q) > 0)
      .sort((a, b) => scoreMatch(b, q) - scoreMatch(a, q))
      .slice(0, 8);
    setResults(matched);
    setOpen(matched.length > 0);
  }, [query]);

  const handleSelect = useCallback(() => {
    setQuery('');
    setOpen(false);
    onSelect?.();
  }, [onSelect]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
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
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[44px]"
          aria-label="Search tools"
          autoComplete="off"
          autoFocus={autoFocus}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden max-h-80 overflow-y-auto">
          {results.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/calculators/${tool.slug}`}
                onClick={handleSelect}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-xl">{tool.icon ?? '🔧'}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{tool.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{getCategoryName(tool.category)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
