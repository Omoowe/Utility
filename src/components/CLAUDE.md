# src/components — Component Conventions

## Directory Structure

```
components/
├── calculators/    # Data-driven engine components
├── common/         # Shared UI primitives reused across pages
├── layout/         # Header, Footer, ThemeToggle
├── providers/      # ThemeProvider (React context)
├── tools/          # Interactive tool components (*Tool.tsx)
└── index.ts        # Barrel export
```

## Rules

**All components: functional + hooks only.** No class components.

**Naming:**
- Files: `PascalCase.tsx`
- Exported function: same as file name, no default export (named exports only)
- Barrel re-exports go through `components/index.ts`

**Props:**
- Always define a local `interface Props` or inline interface — never use `any`
- Use `_propName` prefix for intentionally unused props (e.g. `tool: _tool`)

**Tailwind only** — no inline styles, no CSS modules.

**Dark mode** — always include `dark:` variant alongside light classes:
```tsx
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
```

**Server vs Client:**
- Default to Server Components (no `'use client'`)
- Add `'use client'` only when using hooks, browser APIs, or event handlers
- Never import `'use client'` components from Server Components directly — they become client boundaries automatically

## Shared CSS Classes (defined in globals.css)

```css
.btn-primary   /* blue filled button */
.btn-secondary /* gray outlined button */
.container-custom /* max-w + horizontal padding */
```

Use these rather than repeating Tailwind sequences for buttons.

## Barrel Export Pattern

`components/index.ts` re-exports everything. Import from `@/components` not deep paths when using components across the codebase.

```typescript
// prefer
import { CalculatorLayout, InputGroup } from '@/components';
// over
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
```

## Diagnostics

```bash
npx eslint src/components --max-warnings 0
npm run type-check
```

TS diagnostics: `mcp__ide__getDiagnostics` with file path. LSP unavailable for `.ts`/`.tsx` in this environment.
