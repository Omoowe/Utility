# src/app — Next.js App Router Pages

## Convention

Pages are thin. No business logic, no inline data. Import from `src/lib/` and render.

Every page in `app/` must export:
- `default` async Server Component
- `generateMetadata` (for non-root pages with slug/category params)
- `generateStaticParams` (for dynamic `[slug]` / `[category]` routes)

## Page Inventory

```
app/
├── layout.tsx                      # Root layout: fonts, ThemeProvider, Header, Footer, no-flash script
├── page.tsx                        # Homepage
├── not-found.tsx                   # 404
├── error.tsx                       # 'use client' error boundary
├── loading.tsx                     # Suspense fallback
├── sitemap.ts                      # Auto-generates all URLs from TOOLS + CATEGORIES
├── robots.ts                       # Allow all, disallow /api/ /_next/
├── calculators/
│   ├── page.tsx                    # All-tools listing (iterates CATEGORIES dynamically)
│   └── [slug]/
│       ├── page.tsx                # Individual tool page (Server Component)
│       └── CalculatorPageClient.tsx  # 'use client' interactive shell
├── categories/
│   └── [category]/
│       └── page.tsx                # Category listing
├── about/page.tsx
├── contact/page.tsx
├── privacy-policy/page.tsx
├── disclaimer/page.tsx
└── terms/page.tsx
```

## Dynamic Route Pattern

```typescript
// [slug]/page.tsx pattern
export async function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  // ...return metadata object
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  // ...fetch data, render Server Component
}
```

`params` is always a `Promise` in Next.js 15 — always `await params`.

## Server → Client Boundary

`CalculatorPageClient.tsx` is the only `'use client'` file in `app/calculators/[slug]/`. The Server Component (`page.tsx`) passes serializable data via props. `compute` functions are **stripped** before passing:

```typescript
type SerializableTool = Omit<ToolConfig, 'compute'>;
```

The client file receives `SerializableTool` and re-imports `CUSTOM_COMPONENTS` (for interactive) or runs compute inline (for calculator).

## Schema Injection

Tool pages inject three JSON-LD scripts:
1. `generateCalculatorSchema(tool)` — SoftwareApplication
2. `generateFAQSchema(content.faqs)` — FAQPage
3. `generateBreadcrumbSchema(items)` — BreadcrumbList

```tsx
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

## Canonical URLs

All `generateMetadata` calls set `alternates.canonical`:
```typescript
alternates: { canonical: `${baseUrl}/calculators/${slug}` }
```
`baseUrl` comes from `process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app'`.

## Diagnostics

```bash
# Lint this directory only
npx eslint src/app --max-warnings 0

# Type-check (always project-wide)
npm run type-check

# Build — verifies generateStaticParams output + no prerender errors
npm run build
```

TS diagnostics: use `mcp__ide__getDiagnostics` with the file path. LSP is not available for `.ts`/`.tsx` in this environment.
