'use client';
import React, { useCallback, useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

const ADJECTIVES = ['swift','brave','clever','bright','cool','dark','fast','funky','lucky','magic','noble','quiet','sharp','sleek','smart','spicy','wild','zen'];
const NOUNS = ['axe','bear','bolt','byte','chip','claw','code','dart','dash','echo','flux','gear','hawk','iris','jade','kite','lens','lion','lynx','maze','nova','orb','peak','pine','prism','pulse','reef','sage','sky','spark','storm','tide','viper','void','wave','wolf','zen'];
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export function UsernameGeneratorTool({ tool: _tool }: Props): React.JSX.Element {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [numbers, setNumbers] = useState(true);
  const [copied, setCopied] = useState('');

  const generate = useCallback(() => {
    const list = Array.from({ length: 8 }, () => {
      const base = `${pick(ADJECTIVES)}_${pick(NOUNS)}`;
      return numbers ? `${base}${Math.floor(Math.random() * 999)}` : base;
    });
    setUsernames(list);
    setCopied('');
  }, [numbers]);

  const copy = async (u: string) => {
    await navigator.clipboard.writeText(u).catch(() => {});
    setCopied(u);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="rounded" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Include numbers</span>
        </label>
      </div>
      <button onClick={generate} className="btn-primary w-full">Generate Usernames</button>
      {usernames.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {usernames.map((u) => (
            <div key={u} className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <span className="font-mono text-gray-900 dark:text-white">{u}</span>
              <button onClick={() => copy(u)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">{copied === u ? '✓' : 'Copy'}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
