# src/hooks — Custom React Hooks

All hooks are `'use client'` — localStorage-backed or React state. None make network requests.

## Hook Inventory

### useCalculator

```typescript
function useCalculator<I extends Record<string, unknown>, O extends Record<string, unknown>>(
  computeFn: (inputs: I) => O | null
): {
  inputs: Partial<I>;
  setInputs: React.Dispatch<React.SetStateAction<Partial<I>>>;
  results: O | null;
  error: string | null;
  isComputing: boolean;
  debouncedInputs: Partial<I>;
}
```

Wraps a compute function with 300ms debounce (via `useDebounce`). Catches thrown errors and surfaces as `error` string. Used by `CalculatorPageClient` for the data-driven calculator path.

### useDebounce

```typescript
function useDebounce<T>(value: T, delay: number): T
```

Simple debounce — returns the value after `delay` ms of no changes. Used internally by `useCalculator`. Can be used standalone for any debounced value.

### useFavorites

```typescript
function useFavorites(): {
  favorites: string[];           // array of tool slugs
  addFavorite: (slug: string) => void;
  removeFavorite: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
}
```

localStorage key: `toolnest_favorites`. `favorites` returns `[]` until mounted (hydration guard — no SSR mismatch). `isFavorite` returns `false` until mounted for same reason.

### useRecentTools

```typescript
function useRecentTools(): {
  recentSlugs: string[];         // most recent first, max 10
  addRecent: (slug: string) => void;
}
```

localStorage key: `toolnest_recent`. Max 10 entries. `addRecent` called on tool page mount by `CalculatorPageClient`. `recentSlugs` returns `[]` until mounted.

### useTheme

```typescript
function useTheme(): {
  isDark: boolean;
  toggleDark: () => void;
}
```

Reads/writes `localStorage.theme`. Toggles `document.documentElement.classList` between `dark` and `''`. Initial value read from `ThemeProvider` context — use `useThemeContext()` from `providers/ThemeProvider.tsx` instead for components within the provider tree.

## barrel export

`src/hooks/index.ts` re-exports all hooks. Import from `@/hooks`.

## Diagnostics

```bash
npx eslint src/hooks --max-warnings 0
npm run type-check
```

TS diagnostics: `mcp__ide__getDiagnostics` with file path. LSP unavailable for `.ts` in this environment.
