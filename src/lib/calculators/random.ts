export interface RandomInputs {
  min: number;
  max: number;
  count: number;
}

export interface RandomOutput {
  numbers: number[];
}

/**
 * Generate random integers within a range
 * Uses Math.random() with floor rounding
 *
 * Test case: min=1, max=100, count=10
 * Expected: array of 10 random numbers, all in [1, 100]
 */
export function calculateRandom(inputs: RandomInputs): RandomOutput {
  const min = Math.floor(inputs.min);
  const max = Math.floor(inputs.max);
  const count = Math.floor(inputs.count);

  // Validate inputs
  if (min > max) throw new Error('Min must be less than or equal to max');
  if (count <= 0) throw new Error('Count must be positive');
  if (count > 10000) throw new Error('Count must not exceed 10000');

  const numbers: number[] = [];

  for (let i = 0; i < count; i++) {
    // Generate random integer between min and max (inclusive)
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.push(randomNum);
  }

  // Verify all numbers are within range
  const allInRange = numbers.every((n) => n >= min && n <= max);
  if (!allInRange) {
    throw new Error('Generated numbers outside of range');
  }

  return {
    numbers,
  };
}
