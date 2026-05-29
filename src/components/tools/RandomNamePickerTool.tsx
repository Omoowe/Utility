'use client';
import React, { useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

export function RandomNamePickerTool({ tool: _tool }: Props): React.JSX.Element {
  const [input, setInput] = useState('Alice\nBob\nCharlie\nDiana\nEve');
  const [picked, setPicked] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const names = input.split('\n').map((n) => n.trim()).filter(Boolean);

  const pick = () => {
    if (names.length === 0) return;
    const n = Math.min(count, names.length);
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    setPicked(shuffled.slice(0, n));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Names (one per line) — {names.length} total</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
      </div>
      <div className="flex gap-3 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Pick</label>
          <input type="number" value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10) || 1))} min={1} max={names.length || 1}
            className="w-20 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button onClick={pick} disabled={names.length === 0} className="btn-primary flex-1">Pick {count === 1 ? 'a Name' : `${count} Names`}</button>
      </div>
      {picked.length > 0 && (
        <div className="space-y-2">
          {picked.map((name, i) => (
            <div key={i} className="px-5 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center text-xl font-bold shadow-md">
              🎉 {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
