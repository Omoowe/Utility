'use client';
import React, { useCallback, useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

const CHARS = { upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz', numbers: '0123456789', symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?' };

export function PasswordGeneratorTool({ tool: _tool }: Props): React.JSX.Element {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const pool = Object.entries(opts).filter(([, v]) => v).map(([k]) => CHARS[k as keyof typeof CHARS]).join('');
    if (!pool) return;
    setPassword(Array.from({ length }, () => pool[Math.floor(Math.random() * pool.length)]).join(''));
    setCopied(false);
  }, [length, opts]);

  const copy = async () => {
    await navigator.clipboard.writeText(password).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = (p: string) => {
    if (!p) return null;
    const s = [p.length >= 12, /[A-Z]/.test(p), /[a-z]/.test(p), /\d/.test(p), /[^a-zA-Z0-9]/.test(p)].filter(Boolean).length;
    return s <= 2 ? { label: 'Weak', color: 'text-red-500' } : s <= 3 ? { label: 'Fair', color: 'text-yellow-500' } : s === 4 ? { label: 'Good', color: 'text-blue-500' } : { label: 'Strong', color: 'text-green-500' };
  };

  const s = strength(password);

  return (
    <div className="space-y-5">
      {password && (
        <div className="flex gap-2 items-center">
          <div className="flex-1 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-lg tracking-wider break-all text-gray-900 dark:text-white">{password}</div>
          <button onClick={copy} className="px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0 text-sm">{copied ? '✓' : 'Copy'}</button>
        </div>
      )}
      {s && <p className={`text-sm font-semibold ${s.color}`}>Strength: {s.label}</p>}
      <div className="space-y-3">
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            <span>Password Length</span><span>{length}</span>
          </label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.entries({ upper: 'A–Z', lower: 'a–z', numbers: '0–9', symbols: '!@#' }).map(([k, label]) => (
            <label key={k} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={opts[k as keyof typeof opts]}
                onChange={(e) => setOpts((p) => ({ ...p, [k]: e.target.checked }))}
                className="rounded" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
            </label>
          ))}
        </div>
      </div>
      <button onClick={generate} className="btn-primary w-full">Generate Password</button>
    </div>
  );
}
