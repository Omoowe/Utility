'use client';
import React, { useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

function binaryToText(bin: string): string {
  try {
    return bin.trim().split(/\s+/).map((b) => String.fromCharCode(parseInt(b, 2))).join('');
  } catch { return 'Invalid binary input'; }
}

export function BinaryToTextTool({ tool: _tool }: Props): React.JSX.Element {
  const [input, setInput] = useState('');
  const result = input.trim() ? binaryToText(input) : '';
  const copy = () => navigator.clipboard.writeText(result).catch(() => {});

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Binary Input (space-separated 8-bit groups)</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="01001000 01100101 01101100 01101100 01101111"
          rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono text-sm" />
      </div>
      {result && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Text Output</label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-gray-900 dark:text-white font-mono break-all">{result}</div>
            <button onClick={copy} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors shrink-0">Copy</button>
          </div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Enter binary numbers separated by spaces. Each 8-bit group = one character.</p>
    </div>
  );
}
