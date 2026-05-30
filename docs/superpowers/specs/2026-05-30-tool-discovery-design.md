# Tool Discovery Design
**Date:** 2026-05-30  
**Scope:** Favorites, Recently Viewed, /calculators filter (category tabs + search)  
**Status:** Approved

---

## Problem

- 56 tools on `/calculators` with no filtering — users must scroll the full page
- `useFavorites` and `useRecentTools` hooks exist but have zero UI — saves and history are silently lost
- Tool card markup is duplicated inline across 4+ pages, blocking clean extension

---

## Architecture

### New Files

| File | Type | Purpose |
|------|------|---------|
| `src/components/common/ToolCard.tsx` | Client | Shared tool card with optional heart button |
| `src/components/common/FavoriteButton.tsx` | Client | Heart toggle, stop-propagation safe |
| `src/components/common/SavedToolsSection.tsx` | Client | Saved tools grid, renders null if empty |
| `src/components/common/RecentlyViewedSection.tsx` | Client | Recent tools grid, renders null if empty |
| `src/app/calculators/CalculatorsPageClient.tsx` | Client | Category tabs + search filter state |

### Modified Files

| File | Change |
|------|--------|
| `src/app/page.tsx` | Add `SavedToolsSection` and `RecentlyViewedSection` |
| `src/app/calculators/page.tsx` | Thin server wrapper — pass `TOOLS`/`CATEGORIES` to client |
| `src/app/calculators/[slug]/CalculatorPageClient.tsx` | Replace inline card usage with `ToolCard` |
| `src/app/categories/[category]/page.tsx` | Replace inline card usage with `ToolCard` |
| `src/components/common/RelatedTools.tsx` | Replace inline card usage with `ToolCard` |

---

## Component Specs

### `ToolCard`

```typescript
interface ToolCardProps {
  tool: SerializableTool;       // Omit<ToolConfig, 'compute'>
  showFavorite?: boolean;       // default: true
  size?: 'sm' | 'md';          // sm = compact list, md = featured homepage card
}
```

- `size="md"`: current homepage popular-tools card style (icon 44px, description shown)
- `size="sm"`: compact /calculators list style (icon 36px, description line-clamp-2)
- Heart button is `position: absolute top-2 right-2`, visible on hover (always visible on touch devices)
- Card is a `<Link>` — heart button is a `<button>` inside with `e.stopPropagation()` + `e.preventDefault()`
- Category color border (left-border) applied from `getCategoryColors(tool.category)`

### `FavoriteButton`

```typescript
interface FavoriteButtonProps {
  slug: string;
  className?: string;
}
```

- Reads `useFavorites()` → `{ toggle, isFavorite }`
- Renders filled heart (♥ red) when saved, outline heart (♡ gray) when not
- `onClick`: `e.preventDefault(); e.stopPropagation(); toggle(slug)`
- Scale animation on click: `active:scale-125 transition-transform duration-100`
- `aria-label`: "Save [tool name]" / "Unsave [tool name]"

### `SavedToolsSection`

- `'use client'` — reads `useFavorites()` on mount
- Returns `null` when `favorites.length === 0`
- Heading: "Saved Tools" with count badge (e.g. `3`)
- Right: "Clear all" text button (confirmation not required — localStorage only)
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` of `<ToolCard size="sm" />`
- Max display: all saved tools (no truncation)

### `RecentlyViewedSection`

- `'use client'` — reads `useRecentTools()` on mount
- Returns `null` when `recentTools.length === 0`
- Heading: "Recently Viewed"
- Shows last 6 tools (already capped in hook)
- Grid: same as SavedToolsSection
- No clear button (history is passive)

---

## Homepage Section Order

```
Hero
Trust strip
SavedToolsSection         ← NEW (conditional, after first save)
Popular Tools
Browse by Category
RecentlyViewedSection     ← NEW (conditional, after first tool visit)
New Additions
FAQ
SEO copy
Ad
```

---

## /calculators Page Filter

### State (in `CalculatorsPageClient`)

```typescript
const [activeCategory, setActiveCategory] = useState<string>('all');
const [query, setQuery] = useState('');
```

### Category Tabs

- Horizontal scrollable pill row, below the page `<h1>`
- Pills: `All (N)` + one per category with tool count
- Active: `bg-blue-600 text-white`, inactive: `bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300`
- `overflow-x-auto` on mobile, no wrapping
- Clicking a tab: sets `activeCategory`, clears `query`

### Search Input

- Positioned below tabs, `max-w-md` on desktop, full-width on mobile
- Placeholder: "Filter tools…"
- Inline × clear button when query is non-empty
- No dropdown — filters grid in-place

### Filter Logic

```typescript
const visible = TOOLS
  .filter(t => activeCategory === 'all' || t.category === activeCategory)
  .filter(t => !query.trim() ||
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.description.toLowerCase().includes(query.toLowerCase()));
```

### Render Mode

- `activeCategory === 'all'` + no query → grouped by category sections (current layout)
- Specific category OR query active → flat grid, no section headers
- Empty state: centered `🔍 No tools match "[query]"` + "Clear filter" button

### Server/Client Split

`page.tsx` remains a Server Component (keeps metadata, breadcrumbs, OG tags server-side).  
It renders `<CalculatorsPageClient tools={TOOLS} categories={CATEGORIES} />` as its only body content.

---

## Error Handling

- `useFavorites` wraps localStorage reads in try/catch — already done in hook
- `useRecentTools` same — already done
- `SavedToolsSection` / `RecentlyViewedSection`: if a saved slug no longer exists in TOOLS (tool was removed), `getToolBySlug` returns undefined — filter out undefined before rendering
- Filter with no results: show empty state, not an error

---

## What This Does NOT Include

- No `/saved` dedicated page (Option 1 chosen — inline only)
- No server-side persistence of favorites (localStorage only)
- No search analytics
- No drag-to-reorder favorites
