# src/components/common — Shared UI Components

## Files

```
common/
├── AdPlaceholder.tsx   # AdSense placeholder div
├── BreadcrumbNav.tsx   # Breadcrumb trail with schema
├── RelatedTools.tsx    # "You might also like" grid
├── SearchBar.tsx       # Fuzzy search over TOOLS ('use client')
└── ShareButton.tsx     # Web Share API + clipboard fallback ('use client')
```

## AdPlaceholder

```typescript
interface AdPlaceholderProps {
  className?: string;
}
```

Renders a fixed-height box that will hold an AdSense ad unit. **Must not shrink to zero height** — keeps a `min-h-[90px]` (or configured height) to prevent CLS. Replace the inner content with the actual AdSense script when publisher ID is approved.

## BreadcrumbNav

```typescript
interface BreadcrumbItem { label: string; href: string }
interface BreadcrumbNavProps { items: BreadcrumbItem[] }
```

Renders `<nav aria-label="breadcrumb">` with schema-compatible markup. Last item has `aria-current="page"` and no link.

## RelatedTools

```typescript
interface RelatedToolsProps {
  tools: ToolConfig[];
  title?: string;   // default: "Related Tools"
}
```

Renders a grid of tool cards linking to `/calculators/{slug}`. Shows tool icon, name, description.

## SearchBar

```typescript
interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSelect?: (tool: ToolConfig) => void;  // called when user picks a result
}
```

Client component. Fuzzy-matches `TOOLS` array across name (score 3), description (score 2), keywords + category (score 1). Debounced 150ms. Results shown in a dropdown overlay.

Scoring function:
```typescript
function scoreMatch(tool: ToolConfig, query: string): number
```

When `onSelect` is provided, fires on click/enter. Otherwise navigates to `/calculators/{slug}` directly.

## ShareButton

```typescript
interface ShareButtonProps {
  title: string;
  url?: string;      // defaults to window.location.href
  className?: string;
}
```

Client component. Tries `navigator.share()` first (mobile). Falls back to `navigator.clipboard.writeText()` + shows "Copied!" feedback. Renders nothing on SSR (mounts check).

## Diagnostics

```bash
npx eslint src/components/common --max-warnings 0
npm run type-check
```
