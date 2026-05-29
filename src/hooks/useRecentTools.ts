'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'toolnest_recent';
const MAX_RECENT = 10;

export function useRecentTools() {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setRecentSlugs(JSON.parse(stored) as string[]);
    } catch {
      // ignore
    }
  }, []);

  const addRecent = useCallback((slug: string) => {
    setRecentSlugs((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      const next = [slug, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { recentSlugs: mounted ? recentSlugs : [], addRecent };
}
