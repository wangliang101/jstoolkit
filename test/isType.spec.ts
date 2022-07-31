/**
 * @jest-environment jsdom
 */

import { isType } from '../lib/index';

test('isType string', () => {
  expect(isType('123', 'string')).toBe(true);
});

test('isType number', () => {
  expect(isType(123, 'number')).toBe(true);
});

test('isType boolean', () => {
  expect(isType(true, 'boolean')).toBe(true);
});

test('isType undefined', () => {
  expect(isType(undefined, 'undefined')).toBe(true);
});

test('isType symbol', () => {
  expect(isType(Symbol('test'), 'symbol')).toBe(true);
});

test('isType object', () => {
  expect(isType({}, 'object')).toBe(true);
});

test('isType array empty', () => {
  expect(isType([], 'array')).toBe(true);
});

test('isType array', () => {
  expect(isType([1, 2], 'array')).toBe(true);
});

test('isType function', () => {
  expect(isType(() => {}, 'function')).toBe(true);
});

test('isType date', () => {
  expect(isType(new Date('2022-02-22'), 'date')).toBe(true);
});

test('isType file', () => {
  const file = new File(['text1', 'text2'], 'test.txt', { type: 'text/plain' });
  expect(isType(file, 'file')).toBe(true);
});

test('isType blob', () => {
  const content = { name: 'Alice', age: 23 };
  const blob = new Blob([JSON.stringify(content, null, 2)], {
    type: 'application/json',
  });
  expect(isType(blob, 'blob')).toBe(true);
});

test('isType buffer', () => {
  expect(isType(Buffer.from('a'), 'buffer')).toBe(true);
});

test('isType buffer', () => {
  expect(isType(null, 'buffer')).toBe(false);
});

test('isType formData', () => {
  expect(isType(new FormData(), 'formData')).toBe(true);
});

test('isType arrayBufferView', () => {
  const buffer = new ArrayBuffer(24);
  const arrayBufferView = new DataView(buffer);
  expect(isType(arrayBufferView, 'arrayBufferView')).toBe(true);
});
