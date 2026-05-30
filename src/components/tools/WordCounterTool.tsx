'use client';
import React, { useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

export function WordCounterTool({ tool: _tool }: Props): React.JSX.Element {
  const [text, setText] = useState('');
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text === '' ? 0 : text.split(/\n\n+/).filter(Boolean).length;
  const readingTimeSecs = Math.ceil((words / 225) * 60);
  const readingTime = words === 0 ? '0s' : readingTimeSecs < 60 ? `${readingTimeSecs}s` : `${Math.ceil(readingTimeSecs / 60)}m`;

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here…"
        rows={8}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Words', value: words.toLocaleString() },
          { label: 'Characters', value: chars.toLocaleString() },
          { label: 'No Spaces', value: charsNoSpaces.toLocaleString() },
          { label: 'Sentences', value: sentences.toLocaleString() },
          { label: 'Paragraphs', value: paragraphs.toLocaleString() },
          { label: 'Read Time', value: readingTime },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      {text && (
        <button onClick={() => setText('')} className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors">
          Clear text
        </button>
      )}
    </div>
  );
}
