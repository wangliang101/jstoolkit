import delay from 'delay';
import { pLimit } from '../lib/index';

const randomInt = (maximum, minimum) => {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};
test('concurrency: 1', async () => {
  const input: Array<[number, number]> = [
    [10, 300],
    [20, 200],
    [30, 100],
  ];

  // const end = timeSpan();\
  const start = Date.now();

  const limit = pLimit(1);

  const mapper = ([value, ms]) =>
    limit(async () => {
      await delay(ms);
      return value;
    });

  expect(await Promise.all(input.map(x => mapper(x)))).toMatchInlineSnapshot(
    [10, 20, 30],
    `
    Array [
      10,
      20,
      30,
    ]
  `,
  );
  const end = Date.now();
  const diff = end - start;

  expect(diff).toBeGreaterThanOrEqual(590);
  expect(diff).toBeLessThanOrEqual(650);
});

test('concurrency: 4', async () => {
  const concurrency = 5;
  let running = 0;

  const limit = pLimit(concurrency);

  const input = Array.from({ length: 100 }, () =>
    limit(async () => {
      running++;
      expect(running).toBeLessThanOrEqual(concurrency);
      await delay(randomInt(30, 200));
      running--;
    }),
  );
  await Promise.all(input);
});

test('non-promise returning function', async () => {
  const fn = async () => {
    const limit = pLimit(1);
    await limit(() => null);
  };
  await expect(fn()).resolves.not.toThrow();
});

test('continues after sync throw', async () => {
  const limit = pLimit(1);
  let ran = false;

  const promises = [
    limit(() => {
      throw new Error('err');
    }),
    limit(() => {
      ran = true;
    }),
  ];

  await Promise.all(promises).catch(() => {});

  expect(ran).toBe(true);
});

test('accepts additional arguments', async () => {
  const limit = pLimit(1);
  const symbol = Symbol('test');

  await limit(a => expect(a).toBe(symbol), symbol);
});

test('does not ignore errors', async () => {
  const limit = pLimit(1);
  const error = new Error('🦄');

  const promises = [
    limit(async () => {
      await delay(30);
    }),
    limit(async () => {
      await delay(80);
      throw error;
    }),
    limit(async () => {
      await delay(50);
    }),
  ];

  await expect(Promise.all(promises)).rejects.toThrowError(error);
});

test('activeCount and pendingCount properties', async () => {
  const limit = pLimit(5);
  expect(limit.activeCount).toBe(0);
  expect(limit.pendingCount).toBe(0);

  const runningPromise1 = limit(() => delay(1000));
  expect(limit.activeCount).toBe(0);
  expect(limit.pendingCount).toBe(1);

  await Promise.resolve();
  expect(limit.activeCount).toBe(1);
  expect(limit.pendingCount).toBe(0);

  await runningPromise1;
  expect(limit.activeCount).toBe(0);
  expect(limit.pendingCount).toBe(0);

  const immediatePromises = Array.from({ length: 5 }, () => limit(() => delay(1000)));
  const delayedPromises = Array.from({ length: 3 }, () => limit(() => delay(1000)));

  await Promise.resolve();
  expect(limit.activeCount).toBe(5);
  expect(limit.pendingCount).toBe(3);

  await Promise.all(immediatePromises);
  expect(limit.activeCount).toBe(3);
  expect(limit.pendingCount).toBe(0);

  await Promise.all(delayedPromises);
  expect(limit.activeCount).toBe(0);
  expect(limit.pendingCount).toBe(0);
});

test('clearQueue', async () => {
  const limit = pLimit(1);

  Array.from({ length: 1 }, () => limit(() => delay(1000)));
  Array.from({ length: 3 }, () => limit(() => delay(1000)));
  await Promise.resolve();
  expect(limit.pendingCount).toBe(3);
  limit.clearQueue();
  expect(limit.pendingCount).toBe(0);
});

test('throws on invalid concurrency argument', () => {
  expect(() => pLimit(0)).toThrow(TypeError);
  expect(() => pLimit(-1)).toThrow(TypeError);
  expect(() => pLimit(1.2)).toThrow(TypeError);
  // expect(() => pLimit(undefined)).toThrow(TypeError);
  // expect(() => pLimit(true)).toThrow(TypeError);
});
