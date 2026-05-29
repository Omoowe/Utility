# src/lib/data — Tool Registry & Content

## tools.ts

Single source of truth. Defines every tool's routing, metadata, inputs, outputs, compute fn.

### ToolConfig Interface

```typescript
interface CalculatorInput {
  name: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'date';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  required: boolean;
  options?: Array<{ value: string; label: string }>;  // required if type='select'
}

interface CalculatorOutput {
  name: string;
  label: string;
  type: 'currency' | 'number' | 'percent' | 'text' | 'array';
  decimals?: number;
  unit?: string;
}

interface ToolConfig {
  slug: string;                   // URL segment: /calculators/{slug}
  name: string;                   // Display name
  category: string;               // Must be a valid slug from CATEGORIES
  kind: 'calculator' | 'interactive';
  title: string;                  // SEO <title>
  description: string;            // SEO meta description
  keywords: string[];
  icon?: string;                  // Emoji
  featured?: boolean;             // Show in homepage popular grid
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  contentFile: string;            // JSON filename without path: '{slug}.json'
  compute?: (inputs: any) => any; // Required for kind='calculator'
  customComponent?: string;       // Key in CUSTOM_COMPONENTS, required for kind='interactive'
}
```

### Exported Helpers

```typescript
getToolBySlug(slug: string): ToolConfig | undefined
getToolsByCategory(category: string): ToolConfig[]
getToolsByCategorySlug(slug: string): ToolConfig[]  // same as above, explicit name
getAllCategories(): string[]
getPopularTools(limit?: number): ToolConfig[]       // featured=true, then by order
getRecentTools(limit?: number): ToolConfig[]        // last N added to TOOLS array
getRelatedTools(slug: string, limit?: number): ToolConfig[]  // same category, excl. self
```

## categories.ts

```typescript
interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;    // Emoji
  seoBlurb: string;
}

const CATEGORIES: Category[]  // 6 entries

getCategoryBySlug(slug: string): Category | undefined
getCategoryName(slug: string): string  // returns slug if not found
```

Valid category slugs: `finance`, `everyday-utilities`, `home-diy`, `health-fitness`, `pets`, `business-creator`

## content/types.ts

```typescript
interface ToolContent {
  slug: string;
  intro: string;              // 1-2 paragraph intro, shown above calculator
  howItWorks: string;         // Explanation of the calculation
  interpretationGuide: string;
  faqs: Array<{ question: string; answer: string }>;  // 10+ FAQs for SEO
}

async function getContent(contentFile: string): Promise<ToolContent | null>
// Dynamic import of content/{contentFile} — returns null if file missing
```

Content JSON files live at `src/lib/data/content/{slug}.json`. Every ToolConfig must have a matching content file.

## customComponents.ts

```typescript
type DynamicComponent = React.ComponentType<{
  tool: { slug: string; name: string; description: string }
}>;

const CUSTOM_COMPONENTS: Record<string, DynamicComponent>
// Keys map to next/dynamic lazy imports of components in src/components/tools/
```

Add a new entry when creating a new interactive tool. The key must match `ToolConfig.customComponent`.

## Diagnostics

```bash
npx eslint src/lib/data --max-warnings 0
npm run type-check
```
