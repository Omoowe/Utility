const TO_METERS: Record<string, number> = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

export function calculateLengthConverter(inputs: Record<string, unknown>) {
  const value = Number(inputs.value);
  const fromUnit = String(inputs.fromUnit ?? 'meter');

  if (isNaN(value) || value < 0) throw new Error('Enter a valid non-negative length');

  const meters = value * (TO_METERS[fromUnit] ?? 1);

  return {
    millimeters: parseFloat((meters / TO_METERS.millimeter).toFixed(4)),
    centimeters: parseFloat((meters / TO_METERS.centimeter).toFixed(4)),
    meters: parseFloat(meters.toFixed(6)),
    kilometers: parseFloat((meters / TO_METERS.kilometer).toFixed(6)),
    inches: parseFloat((meters / TO_METERS.inch).toFixed(4)),
    feet: parseFloat((meters / TO_METERS.foot).toFixed(4)),
    yards: parseFloat((meters / TO_METERS.yard).toFixed(4)),
    miles: parseFloat((meters / TO_METERS.mile).toFixed(6)),
  };
}
