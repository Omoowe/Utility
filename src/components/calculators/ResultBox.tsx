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
}

/**
 * Reusable result display component for calculator outputs
 * Handles formatting, copy-to-clipboard, and dark mode
 */
export function ResultBox({
  label,
  value,
  format,
  decimals = 2,
  copyable = false,
  unit,
}: ResultBoxProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const formatValue = (): string => {
    if (typeof value === 'string') {
      return value;
    }

    switch (format) {
      case 'currency':
        return formatCurrency(value, decimals);
      case 'percent':
        return formatPercent(value, decimals);
      case 'number':
        return formatNumber(value, decimals);
      case 'text':
      default:
        return String(value);
    }
  };

  const handleCopy = async () => {
    const textToCopy = typeof value === 'string' ? value : String(value);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formattedValue = formatValue();

  return (
    <div
      className={clsx(
        'rounded-lg border-2 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950',
        'p-6 space-y-2 h-[180px] flex flex-col justify-between'
      )}
    >
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</p>
        <p className="text-3xl font-bold text-green-700 dark:text-green-300 break-words">
          {formattedValue}
          {unit && <span className="text-lg ml-2">{unit}</span>}
        </p>
      </div>

      {copyable && (
        <button
          onClick={handleCopy}
          className={clsx(
            'self-start px-3 py-2 rounded text-xs font-medium transition-all',
            copied
              ? 'bg-green-700 text-white dark:bg-green-600'
              : 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 hover:bg-green-300 dark:hover:bg-green-700'
          )}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      )}
    </div>
  );
}
