function toAmPm(totalMins: number): string {
  const clamped = ((totalMins % 1440) + 1440) % 1440;
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  const period = h < 12 ? 'AM' : 'PM';
  const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${display}:${String(m).padStart(2, '0')} ${period}`;
}

export function calculateSleep(inputs: Record<string, unknown>) {
  const wakeHour = Number(inputs.wakeHour);
  const wakeMin = Number(inputs.wakeMin || 0);
  const latency = Number(inputs.sleepLatency || 14);

  if (wakeHour < 0 || wakeHour > 23) throw new Error('Wake hour must be 0–23');
  if (latency < 0 || latency > 60) throw new Error('Sleep latency must be 0–60 minutes');

  const wakeMins = wakeHour * 60 + wakeMin;
  const CYCLE = 90;

  const bed = (cycles: number) => toAmPm(wakeMins - cycles * CYCLE - latency);
  const dur = (cycles: number) => {
    const total = cycles * CYCLE;
    return `${Math.floor(total / 60)}h ${total % 60}m`;
  };

  return {
    bedtime6Cycles: bed(6),
    bedtime5Cycles: bed(5),
    bedtime4Cycles: bed(4),
    sleep6Duration: dur(6),
    sleep5Duration: dur(5),
    sleep4Duration: dur(4),
  };
}
