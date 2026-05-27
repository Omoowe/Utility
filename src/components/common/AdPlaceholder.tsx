'use client';

import React from 'react';

interface AdPlaceholderProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'vertical';
}

/**
 * AdSense placeholder component for future monetization
 * Ready for AdSense script injection
 */
export function AdPlaceholder({
  slot = '1234567890',
  format = 'auto',
}: AdPlaceholderProps): React.JSX.Element {
  return (
    <div
      className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-700 min-h-[250px]"
      data-ad-slot={slot}
      data-ad-format={format}
    >
      <div className="text-center">
        <p className="text-sm font-medium mb-2">Advertisement</p>
        <p className="text-xs">AdSense will appear here</p>
      </div>
    </div>
  );
}
