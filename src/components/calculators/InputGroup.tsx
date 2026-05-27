'use client';

import React, { ChangeEvent } from 'react';
import clsx from 'clsx';

interface InputGroupProps {
  label: string;
  type: 'number' | 'text' | 'date';
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  help?: string;
  required?: boolean;
  disabled?: boolean;
  unit?: string;
}

/**
 * Reusable input component for calculator inputs
 * Handles validation display, help text, and dark mode
 */
export function InputGroup({
  label,
  type,
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
  error,
  help,
  required = false,
  disabled = false,
  unit,
}: InputGroupProps): React.JSX.Element {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={clsx(
            'w-full px-4 py-2.5 rounded-lg border transition-colors min-h-[44px]',
            'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
              : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500'
          )}
        />
        {unit && !error && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm pointer-events-none">
            {unit}
          </span>
        )}
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {help && !error && <p className="text-sm text-gray-500 dark:text-gray-400">{help}</p>}
    </div>
  );
}
