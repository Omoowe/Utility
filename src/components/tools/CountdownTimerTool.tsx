'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

export function CountdownTimerTool({ tool: _tool }: Props): React.JSX.Element {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  const stop = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const start = useCallback(() => {
    const initial = remaining !== null ? remaining : totalSeconds;
    if (initial <= 0) return;
    setRemaining(initial);
    setRunning(true);
  }, [remaining, totalSeconds]);

  const reset = useCallback(() => {
    stop();
    setRemaining(null);
  }, [stop]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev === null || prev <= 1) {
          stop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, stop]);

  const display = remaining !== null ? remaining : totalSeconds;
  const h = Math.floor(display / 3600);
  const m = Math.floor((display % 3600) / 60);
  const s = display % 60;
  const done = remaining === 0;

  return (
    <div className="space-y-6 text-center">
      <div className={`text-7xl font-mono font-bold tabular-nums ${done ? 'text-green-500 animate-pulse' : 'text-gray-900 dark:text-white'}`}>
        {String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
      </div>
      {done && <p className="text-green-500 font-semibold text-lg">⏰ Time&apos;s up!</p>}
      {!running && remaining === null && (
        <div className="flex gap-3 justify-center">
          {[{ label: 'Hours', val: hours, set: setHours, max: 23 }, { label: 'Minutes', val: minutes, set: setMinutes, max: 59 }, { label: 'Seconds', val: seconds, set: setSeconds, max: 59 }].map((f) => (
            <div key={f.label} className="text-center">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
              <input type="number" value={f.val} min={0} max={f.max} onChange={(e) => f.set(Math.max(0, Math.min(f.max, parseInt(e.target.value, 10) || 0)))}
                className="w-20 px-3 py-2 text-center text-xl rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-3 justify-center">
        {!running ? (
          <button onClick={start} disabled={totalSeconds === 0 && remaining === null} className="btn-primary px-8">{remaining !== null ? 'Resume' : 'Start'}</button>
        ) : (
          <button onClick={stop} className="btn-secondary px-8">Pause</button>
        )}
        <button onClick={reset} className="btn-secondary px-8">Reset</button>
      </div>
    </div>
  );
}
