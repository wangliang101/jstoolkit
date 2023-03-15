import { LimitFunction } from '../types/index';

type AnyFunction = (...args: any[]) => any;

/**
 * Run multiple promise-returning & async functions with limited concurrency
 * @param concurrency - Concurrency limit. Minimum: `1`.
 * @returns Promise A `limit` function.
 */
function pLimit(concurrency: number): LimitFunction {
  if (
    !(
      (Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) &&
      concurrency > 0
    )
  ) {
    throw new TypeError('参数不符合要求，参数必须为正整数');
  }

  const queue: Array<any> = [];
  let activeCount = 0;

  const next = () => {
    activeCount -= 1;

    if (queue.length) {
      queue.shift()();
    }
  };

  const run = async <T extends AnyFunction>(
    fn: T,
    resolve: (value?: unknown | PromiseLike<unknown>) => void,
    ...arg: Parameters<T>
  ) => {
    activeCount += 1;

    const result = (async () => fn(...arg))();
    resolve(result);
    try {
      await result;
    } catch (err) {
      console.log(err);
    }
    next();
  };

  const enqueue = (fn, resolve, args) => {
    queue.push(run.bind(null, fn, resolve, ...args));
    (async () => {
      await Promise.resolve();

      if (activeCount < concurrency && queue.length) {
        queue.shift()();
      }
    })();
  };

  const generator = (fn, ...args) =>
    new Promise(resolve => {
      enqueue(fn, resolve, args);
    });

  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount,
    },
    pendingCount: {
      get: () => queue.length,
    },
    clearQueue: {
      value: () => {
        queue.length = 0;
      },
    },
  });

  return generator as LimitFunction;
}

export default pLimit;
