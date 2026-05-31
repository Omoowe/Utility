import Decimal from 'decimal.js';

export function calculateTimeDuration(inputs: Record<string, unknown>) {
  const hours1 = new Decimal(Number(inputs.hours1 || 0));
  const minutes1 = new Decimal(Number(inputs.minutes1 || 0));
  const seconds1 = new Decimal(Number(inputs.seconds1 || 0));
  const hours2 = new Decimal(Number(inputs.hours2 || 0));
  const minutes2 = new Decimal(Number(inputs.minutes2 || 0));
  const seconds2 = new Decimal(Number(inputs.seconds2 || 0));
  const operation = String(inputs.operation || 'add');

  if (hours1.lt(0) || minutes1.lt(0) || seconds1.lt(0)) throw new Error('Time values cannot be negative');
  if (hours2.lt(0) || minutes2.lt(0) || seconds2.lt(0)) throw new Error('Time values cannot be negative');
  if (minutes1.gte(60) || minutes2.gte(60)) throw new Error('Minutes must be less than 60');
  if (seconds1.gte(60) || seconds2.gte(60)) throw new Error('Seconds must be less than 60');

  const totalSeconds1 = hours1.times(3600).plus(minutes1.times(60)).plus(seconds1);
  const totalSeconds2 = hours2.times(3600).plus(minutes2.times(60)).plus(seconds2);

  let resultSeconds: Decimal;
  if (operation === 'subtract') {
    resultSeconds = totalSeconds1.minus(totalSeconds2);
    if (resultSeconds.lt(0)) {
      resultSeconds = resultSeconds.abs();
    }
  } else {
    resultSeconds = totalSeconds1.plus(totalSeconds2);
  }

  const rH = resultSeconds.div(3600).floor();
  const rM = resultSeconds.minus(rH.times(3600)).div(60).floor();
  const rS = resultSeconds.minus(rH.times(3600)).minus(rM.times(60));

  const totalMinutes = resultSeconds.div(60);
  const totalHours = resultSeconds.div(3600);

  const pad = (n: Decimal) => String(n.toNumber()).padStart(2, '0');
  const formatted = `${pad(rH)}:${pad(rM)}:${pad(rS)}`;

  return {
    formatted,
    totalHours: parseFloat(totalHours.toFixed(4)),
    totalMinutes: parseFloat(totalMinutes.toFixed(2)),
    totalSeconds: parseFloat(resultSeconds.toFixed(0)),
    resultHours: parseFloat(rH.toFixed(0)),
    resultMinutes: parseFloat(rM.toFixed(0)),
    resultSecondsOnly: parseFloat(rS.toFixed(0)),
  };
}
