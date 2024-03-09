import { describe, expect, test } from 'bun:test';
import { colorScale } from '../lib/scales/colorScale';
import {
  differenceCie76,
  differenceItp,
  displayable,
  itp,
  lab65,
  Lab65,
  rgb,
} from 'culori';
import { Itp } from '../lib/types';

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

  test('consume LAB scale', () => {
    const FROM: Lab65 = {
      mode: 'lab65',
      l: 0,
      a: 0,
      b: 0,
    };
    const TO: Lab65 = {
      mode: 'lab65',
      l: 16,
      a: 0,
      b: 0,
    };
    const scale = colorScale([FROM, TO], lab65);

    const colors = scale.consume(differenceCie76(), 1);
    expect(colors[0]).toEqual(FROM);
    expect(colors[colors.length - 1]).toEqual(TO);
    expect(colors.length).toBe(17);
  });

  test('consume ITP scale (marginal case)', () => {
    const FROM: Itp = {
      mode: 'itp',
      i: 0,
      t: 0,
      p: 0,
    };
    const TO: Itp = {
      mode: 'itp',
      i: 0.5,
      t: 0,
      p: 0,
    };
    const scale = colorScale([FROM, TO], itp);

    const colors = scale.consume(differenceItp(), 360);
    expect(colors[0]).toEqual(FROM);
    expect(colors[colors.length - 1]).toEqual(TO);
    expect(colors.length).toBe(2);
  });

  test('consume ITP scale', () => {
    const FROM: Itp = {
      mode: 'itp',
      i: 0,
      t: 0,
      p: 0,
    };
    const TO: Itp = {
      mode: 'itp',
      i: 0.5,
      t: 0,
      p: 0,
    };
    const scale = colorScale([FROM, TO], itp);

    const colors = scale.consume(differenceItp(), 90);
    expect(colors[0]).toEqual(FROM);
    expect(colors[colors.length - 1]).toEqual(TO);
    expect(colors.length).toBe(5);
  });
});
