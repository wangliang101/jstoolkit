import { LimitFunction } from '../types/index';
/**
 * Run multiple promise-returning & async functions with limited concurrency
 * @param concurrency - Concurrency limit. Minimum: `1`.
 * @returns Promise A `limit` function.
 */
declare function pLimit(concurrency: number): LimitFunction;
export default pLimit;
