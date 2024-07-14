import { expect } from 'bun:test';

export const verifyObject = (a: any, b: any) => {
  for (const key in a) {
    if (typeof b[key] === 'undefined') {
      throw new Error(`Unmatched key: ${key}`);
    }

    if (typeof a[key] === 'string') {
      expect(a[key]).toBe(b[key]);
    } else {
      expect(a[key]).toBeCloseTo(b[key]);
    }
  }
};
