import { Sqrt } from '../types/index';
/**
 * Calculates the square root of a number.
 *
 * @param x the number to calculate the root of.
 * @returns the square root if `x` is non-negative or `NaN` if `x` is negative.
 */

const sqrt: Sqrt = (x: number) => Math.sqrt(x);

export default sqrt;
