# src/components/tools — Interactive Tool Components

## Pattern

Every file here is a self-contained interactive tool. Named export, `'use client'`, receives a `tool` prop.

```typescript
interface Props {
  tool: { slug: string; name: string; description: string };
}

export function XxxTool({ tool: _tool }: Props): React.JSX.Element {
  // ...
}
```

The `tool` prop is available if the component needs slug/name for analytics or aria labels. Prefix with `_tool` if unused to satisfy the no-unused-vars lint rule.

## Registration

Every tool here **must** be registered in `src/lib/data/customComponents.ts`:
```typescript
'my-tool-slug': dynamic(() =>
  import('@/components/tools/MyTool').then((m) => m.MyTool)
),
```

And the corresponding `ToolConfig` in `tools.ts` must have:
```typescript
kind: 'interactive',
customComponent: 'my-tool-slug',
```

## Current Tools

| File | Slug | What it does |
|------|------|-------------|
| `CountdownTimerTool.tsx` | `countdown-timer` | H:M:S countdown with start/pause/reset |
| `QrCodeGeneratorTool.tsx` | `qr-code-generator` | QR code from text/URL via `qrcode` npm (dynamic import) |
| `SpinTheWheelTool.tsx` | `spin-the-wheel` | Canvas wheel with RAF animation |
| `PasswordGeneratorTool.tsx` | `password-generator` | Configurable password gen (chars, length) |
| `UsernameGeneratorTool.tsx` | `username-generator` | Adjective+noun combos |
| `FakeAddressGeneratorTool.tsx` | `fake-address-generator` | Seeded random US address |
| `RandomNamePickerTool.tsx` | `random-name-picker` | Pick from a list, history |
| `DateDifferenceTool.tsx` | `date-difference` | Days/weeks/months between two dates |
| `WordCounterTool.tsx` | `word-counter` | Words, chars, sentences, reading time |
| `CharacterCounterTool.tsx` | `character-counter` | Char count with/without spaces |
| `CaseConverterTool.tsx` | `case-converter` | UPPER / lower / Title / camelCase / snake_case |
| `BinaryToTextTool.tsx` | `binary-to-text` | Binary string → ASCII text |
| `TextToBinaryTool.tsx` | `text-to-binary` | ASCII text → binary string |

## Notes

- `QrCodeGeneratorTool` uses `await import('qrcode')` inside the handler — the `qrcode` package is already installed (`npm install qrcode --legacy-peer-deps` was required due to React 19 peer dep conflict).
- `SpinTheWheelTool` uses `useRef<HTMLCanvasElement>` + `requestAnimationFrame`. Canvas draw is triggered by `useEffect` on rotation state change.
- No interactive tool should make network requests. All computation is client-side.

## Diagnostics

```bash
npx eslint src/components/tools --max-warnings 0
npm run type-check
```
