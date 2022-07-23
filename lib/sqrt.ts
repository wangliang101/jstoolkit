import { Sqrt } from '../types/index';
/**
 * Calculates the square root of a number.
 *
 * @param x the number to calculate the root of.
 * @returns the square root if `x` is non-negative or `NaN` if `x` is negative.
 */

// export default function sqrt(x: number): number {
//   return Math.sqrt(x);
// }

const sqrt: Sqrt = (x: number) => {
  return Math.sqrt(x);
};

export default sqrt;
