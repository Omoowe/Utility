# ToolNest Visual Redesign — Design Spec

## Goal

Simplify the site to a clean minimal aesthetic, restructure the homepage to a search-first layout, and add 5 ad slots to every major page type.

## Architecture

Three layers of change: (1) design system tokens applied via Tailwind classes throughout, (2) homepage restructured from 8 sections to 5, (3) AdPlaceholder added to 4 page types at defined positions. No new routes, no new data dependencies, no new hooks.

## Tech Stack

Next.js 15 App Router · Tailwind CSS v4 · TypeScript strict · existing AdPlaceholder component

---

## 1. Design System

### Palette
- Base: `bg-white dark:bg-gray-900`
- Section alt background: `bg-gray-50 dark:bg-gray-800/50`
- Borders: `border-gray-200 dark:border-gray-700`
- Accent: `blue-600` only — no secondary accent
- Category colors: used only on icon badge backgrounds, not card borders

### Typography hierarchy
| Element | Classes |
|---------|---------|
| Page H1 | `text-4xl font-bold text-gray-900 dark:text-white` |
| Section H2 | `text-xl font-semibold text-gray-900 dark:text-white` |
| Body | `text-sm text-gray-600 dark:text-gray-400` |
| Label / meta | `text-xs text-gray-400 dark:text-gray-500` |

### Cards (ToolCard)
- Remove left-border color stripe
- Category color stays on icon badge (`iconBg` class) only
- Card: `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl`
- Hover: `hover:shadow-md hover:-translate-y-0.5 transition-all`

### AdPlaceholder
- Replace current invisible placeholder with visible ad unit:
  ```tsx
  <div className="w-full min-h-[90px] rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
    <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium">Advertisement</span>
  </div>
  ```
- Props: `slot`, `format` (auto | rectangle | leaderboard | vertical)
- `min-h` varies: leaderboard = `min-h-[90px]`, rectangle = `min-h-[250px]`, vertical = `min-h-[600px]`

### Spacing
- Section vertical padding: `py-12` (down from `py-16`)
- Grid gap: `gap-4` (down from `gap-5`)
- Container: keep `container-custom` unchanged

---

## 2. Homepage (`src/app/page.tsx`)

### New section order

1. **Hero** — white/near-white bg (`bg-gradient-to-b from-gray-50 to-white`)
   - H1: "Free Online Calculators & Utility Tools" (`text-4xl font-bold`)
   - Subtext: `{TOOLS.length} tools · {CATEGORIES.length} categories · 100% free` (inline, `text-sm text-gray-500`)
   - 3 trust badges inline below subtext (No Sign-Up · Browser-Only · Free Forever)
   - Search bar (full width, max-w-xl)
   - Category chips: 6 pill links to `/categories/[slug]`
   - "Browse All Tools →" CTA button

2. **Ad Slot 1** — `format="leaderboard"` (`min-h-[90px]`)

3. **Categories section** — `bg-gray-50` background
   - H2: "Browse by Category"
   - 6-card grid, 3-col on lg
   - Each card: icon badge + name + tool count + short blurb + "Browse →" link

4. **Ad Slot 2** — `format="rectangle"` (`min-h-[250px]`)

5. **Featured Tools section**
   - H2: "Popular Tools" + "View all →" link to `/calculators`
   - 6 cards from `getPopularTools(6)`, 3-col grid
   - Replaces both "Popular Tools" AND "New Additions" sections

6. **Ad Slot 3** — `format="rectangle"` (`min-h-[250px]`)

7. **FAQ accordion** — keep existing, max-w-2xl

8. **Ad Slot 4** — `format="leaderboard"` (`min-h-[90px]`)

9. **SEO text block** — keep, small gray text

10. **Ad Slot 5** — `format="leaderboard"` (`min-h-[90px]`) — immediately above footer

### Removed sections
- "New Additions" — redundant with Popular Tools
- Trust strip (standalone) — merged into hero
- SavedToolsSection and RecentlyViewedSection remain but render conditionally (already implemented)

---

## 3. Calculator Pages (`src/components/calculators/CalculatorLayout.tsx`)

### 5 ad slot positions
1. **Slot 1** — between breadcrumb bar and tool header (`format="leaderboard"`)
2. **Slot 2** — after calculator widget section (`format="rectangle"`)
3. **Slot 3** — after "How It Works" section (`format="rectangle"`)
4. **Slot 4** — above Related Tools section (`format="leaderboard"`)
5. **Slot 5** — after Related Tools, before end of `<main>` (`format="leaderboard"`)

### Visual changes
- Breadcrumb bar: keep `bg-gray-50` strip
- Tool header: no visual change needed
- Calculator widget: keep 2-col panel layout, apply updated card styles (border, rounded-xl)
- "How It Works" + "Interpret Results" + FAQ: keep layout, apply H2 size update (`text-xl`)

---

## 4. All Tools Page (`src/app/calculators/page.tsx` + `CalculatorsPageClient.tsx`)

### 5 ad slot positions
1. **Slot 1** — below page header, above category tabs (`format="leaderboard"`)
2. **Slot 2** — between category tabs and tool grid (`format="leaderboard"`)
3. **Slot 3** — injected after first category group in grouped view; after the full grid in flat/filtered view (`format="rectangle"`)
4. **Slot 4** — after all results (`format="rectangle"`)
5. **Slot 5** — bottom of page (`format="leaderboard"`)

### Page header (new)
Add a thin header to the server wrapper (`page.tsx`):
```
H1: "All Free Online Tools"
Subtext: "{TOOLS.length} tools across {CATEGORIES.length} categories"
```
Currently the page goes straight to CalculatorsPageClient with no header.

---

## 5. Category Pages (`src/app/categories/[category]/page.tsx`)

### Header change
Remove `bg-gradient-to-br ${colors.banner}` banner. Replace with white/gray-50 header:
```tsx
<div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
  <div className="container-custom py-8">
    <div className="flex items-center gap-4">
      <span className={`text-3xl w-14 h-14 rounded-xl flex items-center justify-center ${colors.iconBg}`}>
        {cat.icon}
      </span>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{cat.name} Tools</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{tools.length} free tools · No sign-up</p>
      </div>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mt-4">{cat.seoBlurb}</p>
  </div>
</div>
```

### 5 ad slot positions
1. **Slot 1** — below breadcrumb, above category header (`format="leaderboard"`)
2. **Slot 2** — below category header, above tool grid (`format="leaderboard"`)
3. **Slot 3** — after first 6 tools (mid-grid injection) (`format="rectangle"`)
4. **Slot 4** — after tool grid, above "Other Categories" section (`format="rectangle"`)
5. **Slot 5** — bottom of page (`format="leaderboard"`)

---

## 6. ToolCard Component (`src/components/common/ToolCard.tsx`)

Remove `border-l-4 ${colors.border}` left-border stripe.
Keep `${colors.iconBg}` on icon badge only.
Update hover: add `hover:-translate-y-0.5 hover:shadow-md`.
Card wrapper: `rounded-xl` (already present, confirm consistent).

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/common/AdPlaceholder.tsx` | Add label, format-based min-h, dashed border |
| `src/components/common/ToolCard.tsx` | Remove left-border stripe, update hover |
| `src/app/page.tsx` | Restructure to 5 sections + 5 ad slots |
| `src/components/calculators/CalculatorLayout.tsx` | Add 5 ad slots at defined positions, update H2 size |
| `src/app/calculators/page.tsx` | Add page header (H1 + subtext) |
| `src/app/calculators/CalculatorsPageClient.tsx` | Add 5 ad slots |
| `src/app/categories/[category]/page.tsx` | Replace gradient banner, add 5 ad slots |

---

## Out of Scope

- No new routes
- No changes to calculator logic or compute functions
- No changes to Header or Footer
- No changes to tool content JSON files
- No changes to dark mode system
