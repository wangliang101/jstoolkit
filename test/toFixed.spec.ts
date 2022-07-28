import { toFixed } from '../lib/index';

test('toFixed 2.34', () => {
  expect(toFixed(2.34, 1)).toBe('2.3');
});

test('toFixed -2.34', () => {
  expect(toFixed(-2.34, 1)).toBe('-2.3');
});

test('toFixed 2.55', () => {
  expect(toFixed(2.55, 1)).toBe('2.6');
});

test('toFixed -2.5', () => {
  expect(toFixed(-2.55, 1)).toBe('-2.6');
});

test('toFixed 1.23e+20', () => {
  expect(toFixed(1.23e20, 2)).toBe('123000000000000000000.00');
});

test('toFixed 1.23e-20', () => {
  expect(toFixed(1.23e-20, 2)).toBe('0.00');
});
