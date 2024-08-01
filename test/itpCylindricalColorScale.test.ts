import { describe, test } from 'bun:test';
import { itpFromLch } from '../src/cylindrical/itpFromLch';
import { itpCylindricalColorScale } from '../src/scales/itpCylindricalColorScale';
import { verifyObject } from './helpers';
import { Itp } from '../src/types/colors';

describe('ICtCp cylindrical color scale', () => {
  test('has predictable midpoint', () => {
    const FROM: Itp = {
      mode: 'itp',
      i: 0,
      t: 1,
      p: 0,
    };
    const TO: Itp = { mode: 'itp', i: 1, t: 0, p: 0.5 };
    const scale = itpCylindricalColorScale([FROM, TO]);
    const SQRT2 = Math.sqrt(2);

    verifyObject(scale(0), FROM);
    verifyObject(scale(0.5), {
      mode: 'itp',
      i: 0.5,
      t: SQRT2 / 2,
      p: SQRT2 / 4,
    });
    verifyObject(scale(1), TO);
  });

  test('uses short arc by default', () => {
    const FROM: Itp = itpFromLch({ mode: 'lch', l: 0, c: 0.5, h: 359 });
    const TO: Itp = itpFromLch({ mode: 'lch', l: 0, c: 0.5, h: 1 });
    const scale = itpCylindricalColorScale([FROM, TO]);

    verifyObject(scale(0), FROM);
    verifyObject(scale(0.5), { mode: 'itp', i: 0, t: 0, p: 0.5 });
    verifyObject(scale(1), TO);
  });

  test('uses long arc if requested so', () => {
    const FROM: Itp = itpFromLch({ mode: 'lch', l: 0, c: 0.5, h: 359 });
    const TO: Itp = itpFromLch({ mode: 'lch', l: 0, c: 0.5, h: 1 });
    const scale = itpCylindricalColorScale([FROM, TO], false);

    verifyObject(scale(0), FROM);
    verifyObject(scale(0.5), { mode: 'itp', i: 0, t: 0, p: -0.5 });
    verifyObject(scale(1), TO);
  });
});
