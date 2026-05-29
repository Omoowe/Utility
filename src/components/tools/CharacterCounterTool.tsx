'use client';
import React, { useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

export function CharacterCounterTool({ tool: _tool }: Props): React.JSX.Element {
  const [text, setText] = useState('');
  const [limit, setLimit] = useState('');
  const count = text.length;
  const limitNum = parseInt(limit, 10);
  const over = !isNaN(limitNum) && count > limitNum;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Character limit (optional)</label>
          <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="e.g. 280 for Twitter"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text…" rows={8}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
      <div className="flex items-center justify-between">
        <div className={`text-4xl font-bold ${over ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'}`}>
          {count.toLocaleString()}
          {!isNaN(limitNum) && <span className="text-base font-normal text-gray-400 ml-1">/ {limitNum.toLocaleString()}</span>}
        </div>
        <div className="text-right text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>{text.replace(/\s/g, '').length} non-space chars</p>
          <p>{text.trim() === '' ? 0 : text.trim().split(/\s+/).length} words</p>
        </div>
      </div>
      {over && <p className="text-sm text-red-500">{count - limitNum} characters over limit</p>}
    </div>
  );
}
