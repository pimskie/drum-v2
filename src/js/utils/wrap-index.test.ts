import { describe, expect, it } from 'vitest';

import { wrapIndex } from './wrap-index';

describe('getNextStep', () => {
  it('Returns 0 when index is undefined', () => {
    const result = wrapIndex(undefined, 10);
    const expected = 0;

    expect(result).toBe(expected);
  });

  it("Increases a number by one, if it's within bounds", () => {
    const result = wrapIndex(1, 10);
    const expected = 2;

    expect(result).toBe(expected);
  });

  it('Goes up to including the maximum', () => {
    const result = wrapIndex(9, 10);
    const expected = 10;

    expect(result).toBe(expected);
  });

  it('Returns 0 if next is higher than max', () => {
    const result = wrapIndex(10, 10);
    const expected = 0;

    expect(result).toBe(expected);
  });
});
