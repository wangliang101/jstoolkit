type AnyFunction = (...args: any[]) => any;

function pLimit(concurrency: number) {
  if (!(Number.isInteger(concurrency) || Infinity === concurrency) && concurrency > 0) {
    throw new Error('参数不符合要求，参数必须为正整数');
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

    // const result = (async () => fn(...arg))();
    const result = fn(...arg);
    const a = resolve(result);
    // console.log('aa', a);
    try {
      await result;
    } catch (err) {
      console.log(err);
    }
    next();
  };

  const generator = <T extends AnyFunction>(fn: T, ...arg: Parameters<T>) =>
    new Promise((resolve: (value?: unknown | PromiseLike<unknown>) => void) => {
      queue.push(run.bind(null, fn, resolve, ...arg));
      if (activeCount < concurrency && queue.length) {
        queue.shift()();
      }
    });

  return generator;
}

export default pLimit;
