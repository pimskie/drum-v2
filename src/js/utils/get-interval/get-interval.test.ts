import { describe, expect, it } from 'vitest';

import { minInterval, maxInterval, getInterval } from './index';

describe('getInterval', () => {
  it('Returns a high interval percentage = 0', () => {
    const result = getInterval(0);
    const expected = minInterval;

    expect(result).toBe(expected);
  });

  it('Returns a high interval percentage = 1', () => {
    const result = getInterval(1);
    const expected = maxInterval;

    expect(result).toBe(expected);
  });

  it('Returns the right tempo', () => {
    const result = getInterval(0.5);
    const expected = 550;

    expect(result).toBe(expected);
  });
});
