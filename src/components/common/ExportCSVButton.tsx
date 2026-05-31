'use client';

import React from 'react';
import { CalculatorOutput } from '@/lib/data/tools';

interface ExportCSVButtonProps {
  toolName: string;
  results: Record<string, unknown>;
  outputs: CalculatorOutput[];
}

function toCSVRow(cells: string[]): string {
  return cells.map((c) => (c.includes(',') || c.includes('"') ? `"${c.replace(/"/g, '""')}"` : c)).join(',');
}

export function ExportCSVButton({ toolName, results, outputs }: ExportCSVButtonProps): React.JSX.Element {
  const handleExport = () => {
    const rows: string[] = [toCSVRow(['Metric', 'Value', 'Unit'])];

    for (const output of outputs) {
      if (output.type === 'array') continue;
      const value = results[output.name];
      if (value === undefined || value === null) continue;
      rows.push(toCSVRow([output.label, String(value), output.unit ?? '']));
    }

    const csv = rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${toolName.toLowerCase().replace(/\s+/g, '-')}-results.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Export CSV
    </button>
  );
}
