import { describe, test } from 'bun:test';
import { fromLch } from '../lib/polar/fromLch';
import { Itp } from '../lib/types';
import { itpSpiralScale } from '../lib/scales/itpSpiralScale';
import { verifyObject } from './helpers';

describe('itp spiral scale', () => {
  test('has predictable midpoint', () => {
    const FROM: Itp = {
      mode: 'itp',
      i: 0,
      t: 1,
      p: 0,
    };
    const TO: Itp = { mode: 'itp', i: 1, t: 0, p: 0.5 };
    const scale = itpSpiralScale([FROM, TO]);
    const SQRT2 = Math.sqrt(2);

    verifyObject(scale(0), FROM);
    verifyObject(scale(0.5), { mode: 'itp', i: 0.5, t: SQRT2 / 2, p: SQRT2 / 4 });
    verifyObject(scale(1), TO);
  });

  test('uses short arc by default', () => {
    const FROM: Itp = fromLch({ mode: 'lch', l: 0, c: 0.5, h: 359 });
    const TO: Itp = fromLch({ mode: 'lch', l: 0, c: 0.5, h: 1 });
    const scale = itpSpiralScale([FROM, TO]);

    verifyObject(scale(0), FROM);
    verifyObject(scale(0.5), { mode: 'itp', i: 0, t: 0, p: 0.5 });
    verifyObject(scale(1), TO);
  });

  test('uses long arc if requested so', () => {
    const FROM: Itp = fromLch({ mode: 'lch', l: 0, c: 0.5, h: 359 });
    const TO: Itp = fromLch({ mode: 'lch', l: 0, c: 0.5, h: 1 });
    const scale = itpSpiralScale([FROM, TO], false);

    verifyObject(scale(0), FROM);
    verifyObject(scale(0.5), { mode: 'itp', i: 0, t: 0, p: -0.5 });
    verifyObject(scale(1), TO);
  });
});
