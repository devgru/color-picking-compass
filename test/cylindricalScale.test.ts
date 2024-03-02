import { describe, test } from 'bun:test';
import { fromLch } from '../lib/polar/fromLch';
import { Itp } from '../lib/types';
import { cylindricalScale } from '../lib/scales/cylindricalScale';
import { verifyItp } from './helpers';

describe('cylindrical color scale', () => {
  test('has predictable midpoint', () => {
    const FROM: Itp = {
      mode: 'itp',
      i: 0,
      t: 1,
      p: 0,
    };
    const TO: Itp = { mode: 'itp', i: 1, t: 0, p: 0.5 };
    const scale = cylindricalScale([FROM, TO]);
    const SQRT2 = Math.sqrt(2);

    verifyItp(scale(0), FROM);
    verifyItp(scale(0.5), { mode: 'itp', i: 0.5, t: SQRT2 / 2, p: SQRT2 / 4 });
    verifyItp(scale(1), TO);
  });

  test('uses short arc by default', () => {
    const FROM: Itp = fromLch({ mode: 'lch', l: 0, c: 0.5, h: 359 });
    const TO: Itp = fromLch({ mode: 'lch', l: 0, c: 0.5, h: 1 });
    const scale = cylindricalScale([FROM, TO]);

    verifyItp(scale(0), FROM);
    verifyItp(scale(0.5), { mode: 'itp', i: 0, t: 0, p: 0.5 });
    verifyItp(scale(1), TO);
  });

  test('uses long arc if requested so', () => {
    const FROM: Itp = fromLch({ mode: 'lch', l: 0, c: 0.5, h: 359 });
    const TO: Itp = fromLch({ mode: 'lch', l: 0, c: 0.5, h: 1 });
    const scale = cylindricalScale([FROM, TO], true);

    verifyItp(scale(0), FROM);
    verifyItp(scale(0.5), { mode: 'itp', i: 0, t: 0, p: -0.5 });
    verifyItp(scale(1), TO);
  });
});
