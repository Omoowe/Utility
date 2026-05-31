'use client';

import React, { useState } from 'react';
import { CalculatorOutput } from '@/lib/data/tools';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/formatting';

interface CopyResultButtonProps {
  toolName: string;
  results: Record<string, unknown>;
  outputs: CalculatorOutput[];
}

function formatValue(value: unknown, output: CalculatorOutput): string {
  if (typeof value === 'string') return value;
  if (typeof value !== 'number') return String(value);
  const dec = output.decimals ?? 2;
  switch (output.type) {
    case 'currency': return formatCurrency(value, dec);
    case 'percent':  return formatPercent(value, dec, false);
    case 'number':   return formatNumber(value, dec);
    default:         return String(value);
  }
}

export function CopyResultButton({ toolName, results, outputs }: CopyResultButtonProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const buildText = (): string => {
    const lines = [`${toolName} Results`, ''];
    for (const output of outputs) {
      if (output.type === 'array') continue;
      const value = results[output.name];
      if (value === undefined || value === null) continue;
      const formatted = formatValue(value, output);
      const suffix = output.unit ? ` ${output.unit}` : '';
      lines.push(`${output.label}: ${formatted}${suffix}`);
    }
    lines.push('', 'toolnest.vercel.app');
    return lines.join('\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy results
        </>
      )}
    </button>
  );
}
