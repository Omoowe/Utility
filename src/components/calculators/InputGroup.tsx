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
  prefix?: string;
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
  prefix,
  options = [],
}: InputGroupProps): React.JSX.Element {
  const hasPrefix = Boolean(prefix);
  const hasUnit = Boolean(unit) && type !== 'select';

  const inputClasses = clsx(
    'w-full py-2.5 rounded-lg border text-sm transition-all min-h-[44px]',
    'bg-white dark:bg-gray-900 text-gray-900 dark:text-white',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    hasPrefix ? 'pl-9 pr-4' : 'px-4',
    hasUnit && 'pr-14',
    error
      ? 'border-red-400 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
    disabled && 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800'
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value);

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>

      <div className="relative">
        {/* Prefix symbol (e.g. $) */}
        {hasPrefix && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-medium text-gray-400 dark:text-gray-500">
            {prefix}
          </span>
        )}

        {type === 'select' ? (
          <select
            value={String(value)}
            onChange={handleSelectChange}
            disabled={disabled}
            className={clsx(
              inputClasses,
              'appearance-none pl-4 pr-10',
              !String(value) && 'text-gray-400 dark:text-gray-500'
            )}
          >
            {!value && (
              <option value="" disabled>
                {placeholder ?? 'Select…'}
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
            inputMode={type === 'number' ? 'decimal' : undefined}
            className={inputClasses}
          />
        )}

        {/* Select chevron */}
        {type === 'select' && (
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}

        {/* Unit suffix */}
        {hasUnit && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-gray-400 dark:text-gray-500">
            {unit}
          </span>
        )}
      </div>

      {error && <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
      {help && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{help}</p>}
    </div>
  );
}
