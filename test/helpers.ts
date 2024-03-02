import { expect } from 'bun:test';
import { Itp } from '../lib/types';

export const verifyItp = (a: Itp, b: Itp) => {
  expect(a.i).toBeCloseTo(b.i);
  expect(a.t).toBeCloseTo(b.t);
  expect(a.p).toBeCloseTo(b.p);
};
