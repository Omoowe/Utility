'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook for managing dark/light theme
 * Persists preference to localStorage and detects system preference
 *
 * @returns Object with isDark boolean and toggleDark function
 */
export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
      applyTheme(storedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      applyTheme(true);
    } else {
      setIsDark(false);
      applyTheme(false);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDark = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    applyTheme(newValue);
  };

  return { isDark: isMounted ? isDark : false, toggleDark };
}

function applyTheme(isDark: boolean) {
  const html = document.documentElement;
  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}
