import { describe, expect, test } from 'bun:test';
import { colorScale } from '../lib/scales/colorScale';
import { displayable, rgb } from 'culori';

describe('color scale', () => {
  test('stretch', () => {
    const scale = colorScale(['#010000', '#020000'], rgb);
    const stretched = scale.stretchToGamut(displayable);
    expect(stretched.invert(rgb('#010000'))).not.toBe(
      stretched.invert(rgb('#020000')),
    );
  });

  test('invert', () => {
    const scale = colorScale(['#0100' + '00', '#020000'], rgb);
    expect(scale.invert(rgb('#010000'))).toBeCloseTo(0);
    expect(scale.invert(rgb('#020000'))).toBeCloseTo(1);
  });
});
