export interface CalculatorInput {
  name: string;
  label: string;
  type: 'number' | 'text' | 'select';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  required: boolean;
}

export interface CalculatorOutput {
  name: string;
  label: string;
  type: 'currency' | 'number' | 'percent' | 'text';
  decimals?: number;
  unit?: string;
}

export interface ToolConfig {
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

export const TOOLS: ToolConfig[] = [];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(TOOLS.map((tool) => tool.category)));
}
