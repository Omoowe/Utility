'use client';
import React, { useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

function textToBinary(text: string): string {
  return text.split('').map((c) => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

export function TextToBinaryTool({ tool: _tool }: Props): React.JSX.Element {
  const [input, setInput] = useState('');
  const result = input ? textToBinary(input) : '';
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(result).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Text Input</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type text to convert to binary…"
          rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
      </div>
      {result && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Binary Output</label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-gray-900 dark:text-white font-mono text-sm break-all leading-relaxed">{result}</div>
            <button onClick={copy} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors shrink-0">
              {copied ? '✓' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{input.length} characters → {result.split(' ').length} binary groups</p>
        </div>
      )}
    </div>
  );
}
