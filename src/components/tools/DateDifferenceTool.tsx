'use client';
import React, { useState } from 'react';

interface Props { tool: { slug: string; name: string; description: string } }

export function DateDifferenceTool({ tool: _tool }: Props): React.JSX.Element {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  let result: { days: number; weeks: number; months: number; years: number } | null = null;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const msPerDay = 86400000;
    const days = Math.round((end.getTime() - start.getTime()) / msPerDay);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = end.getFullYear() - start.getFullYear() - (end.getMonth() < start.getMonth() || (end.getMonth() === start.getMonth() && end.getDate() < start.getDate()) ? 1 : 0);
    result = { days, weeks: Math.round(days / 7 * 10) / 10, months, years };
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[{ label: 'Start Date', value: startDate, set: setStartDate }, { label: 'End Date', value: endDate, set: setEndDate }].map((f) => (
          <div key={f.label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{f.label}</label>
            <input type="date" value={f.value} onChange={(e) => f.set(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]" />
          </div>
        ))}
      </div>
      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Days', value: Math.abs(result.days).toLocaleString() },
            { label: 'Weeks', value: Math.abs(result.weeks).toLocaleString() },
            { label: 'Months', value: Math.abs(result.months).toLocaleString() },
            { label: 'Years', value: Math.abs(result.years).toLocaleString() },
          ].map((s) => (
            <div key={s.label} className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
          {result.days < 0 && <p className="col-span-full text-sm text-amber-600 dark:text-amber-400 text-center">End date is before start date</p>}
        </div>
      )}
    </div>
  );
}
