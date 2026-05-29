'use client';

import React, { ChangeEvent } from 'react';
import clsx from 'clsx';

interface SelectOption {
  value: string;
  label: string;
}

interface InputGroupProps {
  label: string;
  type: 'number' | 'text' | 'date' | 'select';
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
  options?: SelectOption[];
}

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
  options = [],
}: InputGroupProps): React.JSX.Element {
  const baseClasses = clsx(
    'w-full px-4 py-2.5 rounded-lg border transition-colors min-h-[44px]',
    'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    error
      ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
      : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500'
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value);

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {type === 'select' ? (
          <select
            value={String(value)}
            onChange={handleSelectChange}
            disabled={disabled}
            className={clsx(
              baseClasses,
              'appearance-none pr-10 placeholder-gray-400 dark:placeholder-gray-500',
              !String(value) && 'text-gray-400 dark:text-gray-500'
            )}
          >
            {!value && (
              <option value="" disabled>
                {placeholder ?? 'Select an option'}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={clsx(
              baseClasses,
              'placeholder-gray-400 dark:placeholder-gray-500'
            )}
          />
        )}

        {type === 'select' && (
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}

        {unit && type !== 'select' && !error && (
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
