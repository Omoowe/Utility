'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'cookie-consent';

type ConsentState = 'accepted' | 'necessary' | null;

export function CookieConsent(): React.JSX.Element | null {
  const [consent, setConsent] = useState<ConsentState | 'loading'>('loading');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null;
      setConsent(stored);
    } catch {
      setConsent(null);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch { /* ignore */ }
    setConsent('accepted');
  };

  const handleNecessaryOnly = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'necessary');
    } catch { /* ignore */ }
    setConsent('necessary');
  };

  // Don't render during SSR or after consent given
  if (consent === 'loading' || consent === 'accepted' || consent === 'necessary') return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl px-5 py-4">
        <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold text-gray-900 dark:text-white">We use cookies.</span>{' '}
          Analytics and advertising cookies help us improve ToolNest and keep it free.{' '}
          <Link
            href="/privacy-policy"
            className="underline text-blue-600 dark:text-blue-400 hover:no-underline"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleNecessaryOnly}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Necessary only
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
