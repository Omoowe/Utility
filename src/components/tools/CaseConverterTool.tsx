'use client';
import React, { useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

function toTitle(s: string) { return s.replace(/\b\w/g, (c) => c.toUpperCase()); }
function toSentence(s: string) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); }
function toCamel(s: string) { return s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, ''); }

export function CaseConverterTool({ tool: _tool }: Props): React.JSX.Element {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState('');

  const copy = async (val: string, key: string) => {
    await navigator.clipboard.writeText(val).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const cases = [
    { label: 'UPPERCASE', value: text.toUpperCase(), key: 'upper' },
    { label: 'lowercase', value: text.toLowerCase(), key: 'lower' },
    { label: 'Title Case', value: toTitle(text), key: 'title' },
    { label: 'Sentence case', value: toSentence(text), key: 'sentence' },
    { label: 'camelCase', value: toCamel(text), key: 'camel' },
    { label: 'INVERTED', value: text.split('').map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''), key: 'inverted' },
  ];

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to convert…" rows={4}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cases.map((c) => (
          <div key={c.key} className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{c.label}</p>
            <div className="flex gap-2">
              <div className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white font-mono truncate min-h-[38px]">{c.value}</div>
              <button onClick={() => copy(c.value, c.key)}
                className="px-3 py-2 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0">
                {copied === c.key ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
