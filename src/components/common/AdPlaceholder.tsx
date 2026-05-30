'use client';

import React from 'react';

interface AdPlaceholderProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'vertical';
}

export function AdPlaceholder({
  slot = '1234567890',
  format = 'auto',
}: AdPlaceholderProps): React.JSX.Element {
  return (
    <div
      className="w-full min-h-[90px] rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
      data-ad-slot={slot}
      data-ad-format={format}
      aria-hidden="true"
    />
  );
}
