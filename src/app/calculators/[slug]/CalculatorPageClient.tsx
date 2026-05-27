'use client';

import { useCallback, useEffect, useState } from 'react';
import { CalculatorInput, CalculatorOutput, getToolBySlug } from '@/lib/data/tools';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { InputGroup } from '@/components/calculators/InputGroup';
import { ResultBox } from '@/components/calculators/ResultBox';
import { useDebounce } from '@/hooks/useDebounce';

interface ContentFile {
  slug: string;
  intro: string;
  howItWorks: string;
  interpretationGuide: string;
  faqs: Array<{ question: string; answer: string }>;
}

interface ToolInfo {
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
  keywords: string[];
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  contentFile: string;
}

interface CalculatorPageClientProps {
  tool: ToolInfo;
  toolSlug: string;
  content: ContentFile | null;
  relatedTools: ToolInfo[];
}

/**
 * Client component for calculator page
 * Handles all interactive functionality
 */
export function CalculatorPageClient({
  tool,
  toolSlug,
  content,
  relatedTools,
}: CalculatorPageClientProps) {
  const [inputs, setInputs] = useState<Record<string, unknown>>({});
  const [results, setResults] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isComputing, setIsComputing] = useState(false);

  // Debounce inputs to prevent rapid recalculation
  const debouncedInputs = useDebounce(inputs, 300);

  // Compute results when debounced inputs change
  useEffect(() => {
    const computeResults = async () => {
      try {
        setIsComputing(true);
        setError(null);

        // Get the tool with its compute function
        const fullTool = getToolBySlug(toolSlug);
        if (!fullTool) {
          setError('Tool not found');
          setResults(null);
          return;
        }

        const computed = fullTool.compute(debouncedInputs);
        setResults(computed);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Calculation error');
        setResults(null);
      } finally {
        setIsComputing(false);
      }
    };

    computeResults();
  }, [debouncedInputs, toolSlug]);

  // Handle input change
  const handleInputChange = useCallback((inputName: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [inputName]: value === '' ? undefined : isNaN(Number(value)) ? value : Number(value),
    }));
  }, []);

  // Render results
  const renderResults = () => {
    if (error) {
      return (
        <div className="bg-red-50 dark:bg-red-950 rounded-lg p-6 border border-red-200 dark:border-red-900">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      );
    }

    if (!results) {
      return (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 text-gray-500 dark:text-gray-400 text-center">
          Enter values to see results
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-5">
        {tool.outputs.map((output) => {
          const value = results[output.name];
          if (value === undefined || value === null) return null;

          // Handle array type (for random number generator)
          if (output.type === 'array' && Array.isArray(value)) {
            return (
              <div
                key={output.name}
                className="rounded-lg border-2 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-6 space-y-2"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{output.label}</p>
                <div className="flex flex-wrap gap-2">
                  {value.map((num: number, idx: number) => (
                    <span
                      key={idx}
                      className="bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100 px-3 py-1 rounded text-sm font-medium"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            );
          }

          // Filter out 'array' type from ResultBox since it doesn't support it
          if (output.type === 'array') return null;

          return (
            <ResultBox
              key={output.name}
              label={output.label}
              value={value as string | number}
              format={output.type as 'currency' | 'number' | 'percent' | 'text'}
              decimals={output.decimals}
              unit={output.unit}
              copyable={output.type === 'currency' || output.type === 'number'}
            />
          );
        })}
      </div>
    );
  };

  return (
    <CalculatorLayout
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tool={tool as unknown as any}
      results={renderResults()}
      howItWorks={content?.howItWorks}
      faqs={content?.faqs}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      relatedTools={relatedTools as unknown as any}
    >
      {/* Input fields */}
      <div className="space-y-5">
        {tool.inputs.map((input) => {
          // Skip select type inputs for now (Phase 2)
          if (input.type === 'select') return null;

          return (
            <InputGroup
              key={input.name}
              label={input.label}
              type={input.type as 'number' | 'text' | 'date'}
              value={String((inputs[input.name] as unknown) ?? '')}
              onChange={(value) => handleInputChange(input.name, value)}
              placeholder={input.placeholder}
              min={input.type === 'number' ? input.min : undefined}
              max={input.type === 'number' ? input.max : undefined}
              step={input.type === 'number' ? input.step : undefined}
              unit={input.unit}
              required={input.required}
              disabled={isComputing}
              help={input.required ? undefined : 'Optional'}
            />
          );
        })}
      </div>
    </CalculatorLayout>
  );
}
