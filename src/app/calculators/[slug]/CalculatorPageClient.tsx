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

    const hasAnyInput = Object.values(debouncedInputs).some(
      (v) => v !== undefined && v !== '' && v !== null
    );
    if (!hasAnyInput) {
      setResults(null);
      setError(null);
      return;
    }

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
    if (isComputing) {
      return (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Calculating…</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="bg-red-50 dark:bg-red-950 rounded-xl p-5 border border-red-200 dark:border-red-900 flex gap-3 items-start">
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      );
    }
    if (!results) return null;

    const outputs = (tool as SerializableTool & { outputs: CalculatorOutput[] }).outputs;
    let primaryRendered = false;

    return (
      <div className="space-y-3">
        {outputs.map((output) => {
          const value = results[output.name];
          if (value === undefined || value === null) return null;

          if (output.type === 'array' && Array.isArray(value)) {
            return (
              <div
                key={output.name}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 space-y-3"
              >
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{output.label}</p>
                <div className="flex flex-wrap gap-2">
                  {(value as number[]).map((num: number, idx: number) => (
                    <span
                      key={idx}
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1.5 rounded-lg text-sm font-semibold"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            );
          }
          if (output.type === 'array') return null;

          const isPrimary = !primaryRendered;
          if (isPrimary) primaryRendered = true;

          return (
            <ResultBox
              key={output.name}
              label={output.label}
              value={value as string | number}
              format={output.type as 'currency' | 'number' | 'percent' | 'text'}
              decimals={output.decimals}
              unit={output.unit}
              copyable
              primary={isPrimary}
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
          />
        ))}
      </div>
    </CalculatorLayout>
  );
}
