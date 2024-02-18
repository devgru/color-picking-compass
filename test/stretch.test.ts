import { expect, test } from 'bun:test';
import { colorScale } from '../lib/scales/colorScale';
import { displayable, rgb } from 'culori';

test('stretch', () => {
  const scale = colorScale(['#010000', '#020000'], rgb);
  const stretched = scale.stretchToGamut(displayable);
  expect(stretched.invert(rgb('#010000'))).not.toBe(
    stretched.invert(rgb('#020000')),
  );
});
