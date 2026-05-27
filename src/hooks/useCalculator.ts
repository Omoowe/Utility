'use client';

import React, { useState } from 'react';
import { useDebounce } from './useDebounce';

/**
 * Custom hook for managing calculator state with debounced input
 * Prevents INP slowdown by debouncing input changes before computation
 *
 * @template I - Type of calculator inputs
 * @template O - Type of calculator outputs
 * @param computeFn - Function that takes inputs and returns outputs or error
 * @returns Object with inputs, setInputs, results, error, isComputing, and debouncedInputs
 */
export function useCalculator<I extends Record<string, unknown>, O extends Record<string, unknown>>(
  computeFn: (inputs: I) => O | null
) {
  const [inputs, setInputs] = useState<Partial<I>>({});
  const [results, setResults] = useState<O | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isComputing, setIsComputing] = useState<boolean>(false);

  const debouncedInputs = useDebounce(inputs, 300);

  const computeResults = (inputValues: Partial<I>) => {
    try {
      setIsComputing(true);
      setError(null);
      const computed = computeFn(inputValues as I);
      setResults(computed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
      setResults(null);
    } finally {
      setIsComputing(false);
    }
  };

  React.useEffect(() => {
    computeResults(debouncedInputs);
  }, [debouncedInputs]);

  return {
    inputs,
    setInputs,
    results,
    error,
    isComputing,
    debouncedInputs,
  };
}
