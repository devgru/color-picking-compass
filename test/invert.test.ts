import { expect, test } from 'bun:test';
import { colorScale } from '../lib/scales/colorScale';
import { rgb } from 'culori';

test('invert', () => {
  const scale = colorScale(['#0100' +
  '00', '#020000'], rgb);
  expect(scale.invert(rgb('#010000'))).toBeCloseTo(0);
  expect(scale.invert(rgb('#020000'))).toBeCloseTo(1);
});
