'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'toolnest_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored) as string[]);
    } catch {
      // ignore
    }
  }, []);

  const persist = useCallback((slugs: string[]) => {
    setFavorites(slugs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // ignore
    }
  }, []);

  const addFavorite = useCallback(
    (slug: string) => {
      setFavorites((prev) => {
        if (prev.includes(slug)) return prev;
        const next = [slug, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const removeFavorite = useCallback(
    (slug: string) => {
      setFavorites((prev) => {
        const next = prev.filter((s) => s !== slug);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      setFavorites((prev) => {
        const next = prev.includes(slug)
          ? prev.filter((s) => s !== slug)
          : [slug, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const isFavorite = useCallback(
    (slug: string) => (mounted ? favorites.includes(slug) : false),
    [favorites, mounted]
  );

  void persist;

  return { favorites: mounted ? favorites : [], addFavorite, removeFavorite, toggleFavorite, isFavorite };
}
