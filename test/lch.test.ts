import { describe, test } from 'bun:test';
import { itpFromLch } from '../src/cylindrical/itpFromLch';
import { itpToLch } from '../src/cylindrical/itpToLch';
import { verifyObject } from './helpers';
import { Itp } from "../src/types/colors";

const verifyConversion = (color: Itp) => {
  verifyObject(color, itpFromLch(itpToLch(color)));
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
