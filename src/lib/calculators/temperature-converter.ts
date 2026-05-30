export function calculateTemperatureConverter(inputs: Record<string, unknown>) {
  const value = Number(inputs.value);
  const fromUnit = String(inputs.fromUnit ?? 'celsius');

  if (isNaN(value)) throw new Error('Enter a valid temperature value');

  let celsius: number;
  switch (fromUnit) {
    case 'fahrenheit': celsius = (value - 32) * (5 / 9); break;
    case 'kelvin':     celsius = value - 273.15; break;
    default:           celsius = value;
  }

  if (fromUnit === 'kelvin' && value < 0) throw new Error('Kelvin cannot be negative');
  if (fromUnit !== 'kelvin' && celsius < -273.15) throw new Error('Temperature below absolute zero');

  return {
    celsius: parseFloat(celsius.toFixed(4)),
    fahrenheit: parseFloat((celsius * (9 / 5) + 32).toFixed(4)),
    kelvin: parseFloat((celsius + 273.15).toFixed(4)),
  };
}
