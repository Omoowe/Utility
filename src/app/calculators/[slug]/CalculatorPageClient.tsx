'use client';

import { useCallback, useEffect, useState } from 'react';
import { CalculatorInput, CalculatorOutput, ToolConfig, getToolBySlug } from '@/lib/data/tools';
import { ToolContent } from '@/lib/data/content/types';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { InputGroup } from '@/components/calculators/InputGroup';
import { ResultBox } from '@/components/calculators/ResultBox';
import { useDebounce } from '@/hooks/useDebounce';
import { useRecentTools } from '@/hooks/useRecentTools';
import { CUSTOM_COMPONENTS } from '@/lib/data/customComponents';

type SerializableTool = Omit<ToolConfig, 'compute'>;

interface CalculatorPageClientProps {
  tool: SerializableTool;
  toolSlug: string;
  content: ToolContent | null;
  relatedTools: SerializableTool[];
}

export function CalculatorPageClient({
  tool,
  toolSlug,
  content,
  relatedTools,
}: CalculatorPageClientProps) {
  const [inputs, setInputs] = useState<Record<string, unknown>>(() => {
    // Pre-populate select defaults
    const defaults: Record<string, unknown> = {};
    if (tool.kind === 'calculator') {
      tool.inputs.forEach((input) => {
        if (input.type === 'select' && input.options?.[0]) {
          defaults[input.name] = input.options[0].value;
        }
      });
    }
    return defaults;
  });
  const [results, setResults] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isComputing, setIsComputing] = useState(false);

  const debouncedInputs = useDebounce(inputs, 300);
  const { addRecent } = useRecentTools();

  // Track this tool as recently viewed
  useEffect(() => {
    addRecent(toolSlug);
  }, [toolSlug, addRecent]);

  // Compute results when debounced inputs change (calculator kind only)
  useEffect(() => {
    if (tool.kind !== 'calculator') return;

    const computeResults = async () => {
      try {
        setIsComputing(true);
        setError(null);
        const fullTool = getToolBySlug(toolSlug);
        if (!fullTool || !fullTool.compute) {
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
  }, [debouncedInputs, toolSlug, tool.kind]);

  const handleInputChange = useCallback((inputName: string, value: string, inputType?: string) => {
    setInputs((prev) => {
      if (inputType === 'select' || inputType === 'text' || inputType === 'date') {
        return { ...prev, [inputName]: value };
      }
      // number type
      return {
        ...prev,
        [inputName]: value === '' ? undefined : isNaN(Number(value)) ? value : Number(value),
      };
    });
  }, []);

  // Interactive tool render
  if (tool.kind === 'interactive' && tool.customComponent) {
    const InteractiveTool = CUSTOM_COMPONENTS[tool.customComponent];
    return (
      <CalculatorLayout
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tool={tool as any}
        intro={content?.intro}
        howItWorks={content?.howItWorks}
        faqs={content?.faqs}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        relatedTools={relatedTools as any}
        results={
          InteractiveTool ? (
            <InteractiveTool tool={{ slug: tool.slug, name: tool.name, description: tool.description }} />
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Tool loading…
            </div>
          )
        }
      />
    );
  }

  // Calculator render
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
          Enter values above to see results
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-4">
        {(tool as SerializableTool & { outputs: CalculatorOutput[] }).outputs.map((output) => {
          const value = results[output.name];
          if (value === undefined || value === null) return null;

          if (output.type === 'array' && Array.isArray(value)) {
            return (
              <div
                key={output.name}
                className="rounded-lg border-2 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-5 space-y-2"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{output.label}</p>
                <div className="flex flex-wrap gap-2">
                  {(value as number[]).map((num: number, idx: number) => (
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

  const calculatorInputs = (tool as SerializableTool & { inputs: CalculatorInput[] }).inputs;

  return (
    <CalculatorLayout
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tool={tool as any}
      intro={content?.intro}
      results={renderResults()}
      howItWorks={content?.howItWorks}
      faqs={content?.faqs}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      relatedTools={relatedTools as any}
    >
      <div className="space-y-5">
        {calculatorInputs.map((input) => (
          <InputGroup
            key={input.name}
            label={input.label}
            type={input.type}
            value={String((inputs[input.name] as unknown) ?? '')}
            onChange={(value) => handleInputChange(input.name, value, input.type)}
            placeholder={input.placeholder}
            min={input.type === 'number' ? input.min : undefined}
            max={input.type === 'number' ? input.max : undefined}
            step={input.type === 'number' ? input.step : undefined}
            unit={input.unit}
            required={input.required}
            disabled={isComputing}
            options={input.options}
            help={input.required ? undefined : 'Optional'}
          />
        ))}
      </div>
    </CalculatorLayout>
  );
}
