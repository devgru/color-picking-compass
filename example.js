import { displayable, inGamut, oklab, p3, rgb } from 'culori';
import DeltaE from 'delta-e';
import roundToPrecision from 'round-to-precision';

import { findOppositeColor, formatHexOrCss, cachedDeltaE } from '.';
import { OKLAB_ORIGIN } from './lib/origins.js';

const deltaEFn = cachedDeltaE(DeltaE.getDeltaE00);

const toCents = roundToPrecision(0.01, Number);

const gamuts = [
  {
    name: 'sRGB',
    fitsGamut: displayable,
    primaryColors: [
      rgb('rgb(0, 0, 0)'),
      rgb('rgb(255, 0, 0)'),
      rgb('rgb(255, 255, 0)'),
      rgb('rgb(0, 255, 0)'),
      rgb('rgb(0, 255, 255)'),
      rgb('rgb(0, 0, 255)'),
      rgb('rgb(255, 0, 255)'),
      rgb('rgb(255, 255, 255)'),
    ],
  },
  {
    name: 'Display-P3',
    fitsGamut: inGamut('p3'),
    primaryColors: [
      p3('color(display-p3 0 0 0)'),
      p3('color(display-p3 1 0 0)'),
      p3('color(display-p3 1 1 0)'),
      p3('color(display-p3 0 1 0)'),
      p3('color(display-p3 0 1 1)'),
      p3('color(display-p3 0 0 1)'),
      p3('color(display-p3 1 0 1)'),
      p3('color(display-p3 1 1 1)'),
    ],
  },
];

console.log('Looking for opposite color for each of the primary colors.');

for (const { name, primaryColors, fitsGamut } of gamuts) {
  console.log();
  console.log(name, 'gamut');

  for (const color of primaryColors) {
    const oppositeColor = findOppositeColor(
      color,
      fitsGamut,
      oklab,
      OKLAB_ORIGIN,
      deltaEFn,
    );

    console.log(
      'ΔE00',
      formatHexOrCss(color),
      '↔',
      formatHexOrCss(oppositeColor),
      toCents(deltaEFn(oklab(color), oklab(oppositeColor))),
    );
  }
}
