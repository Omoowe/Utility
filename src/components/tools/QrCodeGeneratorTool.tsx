'use client';
import React, { useCallback, useEffect, useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

export function QrCodeGeneratorTool({ tool: _tool }: Props): React.JSX.Element {
  const [text, setText] = useState('https://toolnest.vercel.app');
  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = useCallback(async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const QRCode = (await import('qrcode')).default;
      const url = await QRCode.toDataURL(text, { width: 256, margin: 2, color: { dark: '#1f2937', light: '#ffffff' } });
      setQrUrl(url);
    } catch {
      setQrUrl('');
    } finally {
      setLoading(false);
    }
  }, [text]);

  useEffect(() => { generate(); }, [generate]);

  const download = () => {
    if (!qrUrl) return;
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = 'qr-code.png';
    a.click();
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">URL or Text</label>
        <div className="flex gap-2">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}
            placeholder="Enter URL or text…"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]" />
          <button onClick={generate} className="btn-primary px-5">Generate</button>
        </div>
      </div>
      {loading && <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" /></div>}
      {qrUrl && !loading && (
        <div className="flex flex-col items-center gap-4">
          <img src={qrUrl} alt="Generated QR Code" className="rounded-xl border-4 border-white shadow-lg dark:border-gray-700" width={256} height={256} />
          <div className="flex gap-3">
            <button onClick={download} className="btn-primary">Download PNG</button>
            <button onClick={() => navigator.clipboard.writeText(text)} className="btn-secondary">Copy Text</button>
          </div>
        </div>
      )}
    </div>
  );
}
