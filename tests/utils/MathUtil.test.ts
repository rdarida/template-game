import { describe, expect, it, vi } from 'vitest';

import * as MathUtil from '../../src/utils/MathUtil';

describe('Test MathUtil functions', () => {
  it('should shuffle an array of numbers', () => {
    const mockRandomValues = [0.75, 0.5, 0.25, 0.0];
    let callCount = 0;

    vi.spyOn(Math, 'random').mockImplementation(() => {
      const val = mockRandomValues[callCount % mockRandomValues.length];
      callCount++;
      return val;
    });

    const actual = MathUtil.shuffle([1, 2, 3, 4, 5]);
    expect(actual).toStrictEqual([2, 5, 1, 3, 4]);

    vi.mocked(Math.random).mockRestore();
  });
});
