'use client';

import React from 'react';

interface AdPlaceholderProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'vertical';
}

const minHeights: Record<NonNullable<AdPlaceholderProps['format']>, string> = {
  auto: 'min-h-[90px]',
  leaderboard: 'min-h-[90px]',
  rectangle: 'min-h-[250px]',
  vertical: 'min-h-[600px]',
};

export function AdPlaceholder({
  slot = '1234567890',
  format = 'auto',
}: AdPlaceholderProps): React.JSX.Element {
  return (
    <div
      className={`w-full ${minHeights[format]} rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center`}
      data-ad-slot={slot}
      data-ad-format={format}
      aria-hidden="true"
    >
      <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium select-none">
        Advertisement
      </span>
    </div>
  );
}
