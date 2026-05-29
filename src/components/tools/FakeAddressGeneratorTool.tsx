'use client';
import React, { useCallback, useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

const FIRST = ['James','Emma','Liam','Olivia','Noah','Ava','William','Sophia','Benjamin','Isabella','Lucas','Mia','Mason','Charlotte','Ethan','Amelia'];
const LAST = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris'];
const STREETS = ['Maple Ave','Oak Street','Elm Dr','Pine Rd','Cedar Lane','Birch Blvd','Willow Way','Spruce Court','Walnut St','Aspen Pl'];
const CITIES = [['New York','NY','10001'],['Los Angeles','CA','90001'],['Chicago','IL','60601'],['Houston','TX','77001'],['Phoenix','AZ','85001'],['Philadelphia','PA','19101'],['San Antonio','TX','78201'],['San Diego','CA','92101'],['Dallas','TX','75201'],['Austin','TX','73301']];
const r = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

interface Address { name: string; street: string; city: string; state: string; zip: string; phone: string; email: string }

export function FakeAddressGeneratorTool({ tool: _tool }: Props): React.JSX.Element {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [copied, setCopied] = useState('');

  const generate = useCallback(() => {
    const list: Address[] = Array.from({ length: 5 }, (_, i) => {
      const [city, state, zip] = r(CITIES);
      const first = r(FIRST); const last = r(LAST);
      return { name: `${first} ${last}`, street: `${100 + i * 111} ${r(STREETS)}`, city, state, zip, phone: `(${Math.floor(Math.random()*900)+100}) ${Math.floor(Math.random()*900)+100}-${Math.floor(Math.random()*9000)+1000}`, email: `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(Math.random()*99)+1}@example.com` };
    });
    setAddresses(list);
  }, []);

  const copy = async (a: Address, key: string) => {
    const text = `${a.name}\n${a.street}\n${a.city}, ${a.state} ${a.zip}\n${a.phone}\n${a.email}`;
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-2">⚠️ For testing purposes only. All data is randomly generated and fictitious.</p>
      <button onClick={generate} className="btn-primary w-full">Generate Addresses</button>
      {addresses.map((a, i) => (
        <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-1">
          <div className="flex justify-between items-start">
            <div className="text-sm space-y-0.5">
              <p className="font-semibold text-gray-900 dark:text-white">{a.name}</p>
              <p className="text-gray-600 dark:text-gray-400">{a.street}</p>
              <p className="text-gray-600 dark:text-gray-400">{a.city}, {a.state} {a.zip}</p>
              <p className="text-gray-500 dark:text-gray-500">{a.phone} · {a.email}</p>
            </div>
            <button onClick={() => copy(a, `${i}`)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline shrink-0 ml-3">{copied === `${i}` ? '✓ Copied' : 'Copy'}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
