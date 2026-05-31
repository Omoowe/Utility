'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/formatting';

interface ResultBoxProps {
  label: string;
  value: string | number;
  format: 'currency' | 'number' | 'percent' | 'text';
  decimals?: number;
  copyable?: boolean;
  unit?: string;
  primary?: boolean;
}

export function ResultBox({
  label,
  value,
  format,
  decimals = 2,
  copyable = false,
  unit,
  primary = false,
}: ResultBoxProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const formatValue = (): string => {
    if (typeof value === 'string') return value;
    switch (format) {
      case 'currency': return formatCurrency(value, decimals);
      // false = value is already a percentage (e.g. 33.33), not a decimal (0.3333)
      case 'percent':  return formatPercent(value, decimals, false);
      case 'number':   return formatNumber(value, decimals);
      default:         return String(value);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(typeof value === 'string' ? value : String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const formattedValue = formatValue();

  if (primary) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 p-6 text-white shadow-lg">
        <p className="text-sm font-medium text-blue-100 uppercase tracking-wide">{label}</p>
        <p className="text-5xl font-extrabold mt-2 break-words leading-none">
          {formattedValue}
          {unit && <span className="text-2xl font-semibold ml-2 text-blue-200">{unit}</span>}
        </p>
        {copyable && (
          <button
            onClick={handleCopy}
            className={clsx(
              'mt-4 px-4 py-1.5 rounded-full text-xs font-semibold transition-all',
              copied
                ? 'bg-white text-blue-700'
                : 'bg-white/20 text-white hover:bg-white/30'
            )}
          >
            {copied ? '✓ Copied' : 'Copy result'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-1">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white break-words">
        {formattedValue}
        {unit && <span className="text-base font-medium text-gray-500 dark:text-gray-400 ml-1.5">{unit}</span>}
      </p>
      {copyable && (
        <button
          onClick={handleCopy}
          className={clsx(
            'text-xs font-medium transition-colors',
            copied ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400 hover:underline'
          )}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      )}
    </div>
  );
}
