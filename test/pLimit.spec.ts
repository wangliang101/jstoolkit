import delay from 'delay';
// import inRange from 'in-range';
// import timeSpan from 'time-span';
// import randomInt from 'random-int';
import { pLimit } from '../lib/index';

// const timeSpan = require('time-span');

test('concurrency: 1', async () => {
  const input: Array<[number, number]> = [
    [10, 300],
    [20, 200],
    [30, 100],
  ];

  // const end = timeSpan();
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

  // deepEqual(await Promise.all(input.map(x => mapper(x))), [10, 20, 30]);
  // inRange(end(), { start: 590, end: 650 });
});
