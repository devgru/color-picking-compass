import { describe, expect, test } from 'bun:test';
import { cartesianColorScale } from '../src/scales/cartesianColorScale';
import {
  differenceCie76,
  differenceItp,
  displayable,
  itp,
  Lab65,
  Rgb,
  rgb,
} from 'culori';

import { Itp } from '../src/types/colors';

describe('cartesian color scale', () => {
  const rgbs: [Rgb, Rgb] = [rgb('#010000'), rgb('#030000')];
  test('stretch', () => {
    const scale = cartesianColorScale(rgbs);
    const stretched = scale.stretch(displayable);
    expect(stretched.invert(rgb('#000000'))).toBeCloseTo(0);
    expect(stretched.invert(rgb('#7f7f7f'))).toBeCloseTo(0.5);
    expect(stretched.invert(rgb('#ffffff'))).toBeCloseTo(1);
  });

  test('identity', () => {
    const scale = cartesianColorScale(rgbs);
    expect(scale(0) !== scale(0)).toBeTrue();
  });

  test('invert', () => {
    const scale = cartesianColorScale(rgbs);
    expect(scale.invert(rgb('#010000'))).toBeCloseTo(0);
    expect(scale.invert(rgb('#020000'))).toBeCloseTo(0.5);
    expect(scale.invert(rgb('#030000'))).toBeCloseTo(1);
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
    const scale = cartesianColorScale([FROM, TO]);

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
    const scale = cartesianColorScale([itp(FROM), itp(TO)]);

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
    const scale = cartesianColorScale([FROM, TO]);

    const colors = scale.consume(differenceItp(), 90);
    expect(colors[0]).toEqual(FROM);
    expect(colors[colors.length - 1]).toEqual(TO);
    expect(colors.length).toBe(5);
  });

  test('consume ITP scale (uniform)', () => {
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
    const scale = cartesianColorScale([FROM, TO]);

    const colors = scale.consumeWithNaturalMetric(differenceItp(), 90);
    expect(colors[0]).toEqual(FROM);
    expect(colors[colors.length - 1]).toEqual(TO);
    expect(colors.length).toBe(5);
  });
});
