'use client';

import React from 'react';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  slug: string;
  toolName: string;
  className?: string;
}

export function FavoriteButton({ slug, toolName, className = '' }: FavoriteButtonProps): React.JSX.Element {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(slug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(slug);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? `Unsave ${toolName}` : `Save ${toolName}`}
      className={`flex items-center justify-center w-7 h-7 rounded-full transition-all active:scale-125 ${
        saved
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-300 hover:text-red-400 dark:text-gray-600 dark:hover:text-red-400'
      } ${className}`}
    >
      <svg
        className="w-4 h-4"
        fill={saved ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
