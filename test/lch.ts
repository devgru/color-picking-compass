import { describe, test } from 'bun:test';
import { fromLch } from '../lib/polar/fromLch';
import { toLch } from '../lib/polar/toLch';
import { Itp } from '../lib/types';
import { verifyItp } from './helpers';

const verifyConversion = (color: Itp) => {
  verifyItp(color, fromLch(toLch(color)));
};

describe('LCH conversion', () => {
  test('converts ITP to LCH and back', () => {
    for (let i = 0; i <= 1; i += 0.5) {
      for (let t = 0; t <= 1; t += 0.5) {
        for (let p = 0; p <= 1; p += 0.5) {
          verifyConversion({ mode: 'itp', i, t, p });
        }
      }
    }
  });
});
