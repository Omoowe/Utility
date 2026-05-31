import Decimal from 'decimal.js';

function formatPace(minPerKm: Decimal): string {
  const mins = minPerKm.floor();
  const secs = minPerKm.minus(mins).times(60).round();
  return `${mins}:${String(secs.toNumber()).padStart(2, '0')}`;
}

function formatRaceTime(totalMins: Decimal): string {
  const h = totalMins.div(60).floor();
  const m = totalMins.minus(h.times(60)).floor();
  const s = totalMins.minus(h.times(60)).minus(m).times(60).round();
  if (h.gt(0)) return `${h}:${String(m.toNumber()).padStart(2, '0')}:${String(s.toNumber()).padStart(2, '0')}`;
  return `${m}:${String(s.toNumber()).padStart(2, '0')}`;
}

export function calculateRunningPace(inputs: Record<string, unknown>) {
  const distanceKm = new Decimal(Number(inputs.distanceKm));
  const totalMinutes = new Decimal(Number(inputs.totalMinutes));

  if (distanceKm.lte(0)) throw new Error('Distance must be positive');
  if (totalMinutes.lte(0)) throw new Error('Time must be positive');

  const paceKm = totalMinutes.div(distanceKm);
  const paceMile = paceKm.times(new Decimal('1.60934'));
  const speedKmh = distanceKm.div(totalMinutes).times(60);
  const speedMph = speedKmh.div(new Decimal('1.60934'));

  return {
    pacePerKm: `${formatPace(paceKm)} /km`,
    pacePerMile: `${formatPace(paceMile)} /mi`,
    speedKmh: parseFloat(speedKmh.toFixed(2)),
    speedMph: parseFloat(speedMph.toFixed(2)),
    projected5k: formatRaceTime(paceKm.times(5)),
    projected10k: formatRaceTime(paceKm.times(10)),
    projectedHalfMarathon: formatRaceTime(paceKm.times(new Decimal('21.0975'))),
    projectedMarathon: formatRaceTime(paceKm.times(new Decimal('42.195'))),
  };
}
