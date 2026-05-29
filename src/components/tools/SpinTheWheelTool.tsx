'use client';
import React, { useCallback, useRef, useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

const COLORS = ['#3B82F6','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899','#06B6D4','#84CC16'];

export function SpinTheWheelTool({ tool: _tool }: Props): React.JSX.Element {
  const [input, setInput] = useState('Option 1\nOption 2\nOption 3\nOption 4\nOption 5');
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const items = input.split('\n').map((s) => s.trim()).filter(Boolean);

  const drawWheel = useCallback((rot: number) => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cx = canvas.width / 2, cy = canvas.height / 2, r = Math.min(cx, cy) - 10;
    const arc = (2 * Math.PI) / items.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    items.forEach((item, i) => {
      const start = rot + i * arc, end = start + arc;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, start, end); ctx.fillStyle = COLORS[i % COLORS.length]; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(start + arc / 2);
      ctx.textAlign = 'right'; ctx.fillStyle = '#fff'; ctx.font = `bold ${Math.min(14, 80 / items.length)}px sans-serif`;
      ctx.fillText(item.length > 12 ? item.slice(0, 12) + '…' : item, r - 10, 5); ctx.restore();
    });
    ctx.beginPath(); ctx.arc(cx, cy, 15, 0, 2 * Math.PI); ctx.fillStyle = '#1f2937'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx + r - 5, cy); ctx.lineTo(cx + r + 20, cy - 10); ctx.lineTo(cx + r + 20, cy + 10); ctx.fillStyle = '#EF4444'; ctx.fill();
  }, [items]);

  React.useEffect(() => { drawWheel(rotation); }, [drawWheel, rotation]);

  const spin = useCallback(() => {
    if (spinning || items.length === 0) return;
    setSpinning(true); setResult(null);
    const extra = 5 * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 3000; const startTime = Date.now(); const startRot = rotation;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = startRot + extra * ease;
      setRotation(current);
      drawWheel(current);
      if (progress < 1) { requestAnimationFrame(animate); }
      else {
        const finalRot = current % (2 * Math.PI);
        const arc = (2 * Math.PI) / items.length;
        const idx = Math.floor((2 * Math.PI - finalRot % (2 * Math.PI)) / arc) % items.length;
        setResult(items[idx]);
        setSpinning(false);
      }
    };
    requestAnimationFrame(animate);
  }, [spinning, items, rotation, drawWheel]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Items (one per line)</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
          <button onClick={spin} disabled={spinning || items.length < 2} className="btn-primary w-full text-lg py-3">
            {spinning ? '🎡 Spinning…' : '🎡 Spin!'}
          </button>
          {result && (
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <p className="text-sm opacity-80">Result:</p>
              <p className="text-2xl font-bold">🎉 {result}</p>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <canvas ref={canvasRef} width={260} height={260} className="rounded-full shadow-xl" />
        </div>
      </div>
    </div>
  );
}
