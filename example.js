import { displayable, inGamut, oklab } from 'culori';
import DeltaE from 'delta-e';
import roundToPrecision from 'round-to-precision';

import {
  findOppositeColor,
  formatHexOrCss,
  cachedDeltaE,
  OKLAB_ORIGIN,
  rgbCubeCornersColors,
} from '.';

const deltaEFn = cachedDeltaE(DeltaE.getDeltaE00);

const toCents = roundToPrecision(0.01, Number);

const gamuts = [
  {
    name: 'sRGB',
    cssColorSpace: 'srgb',
    fitsGamut: displayable,
  },
  {
    name: 'Display-P3',
    cssColorSpace: 'display-p3',
    fitsGamut: inGamut('p3'),
  },
];

console.log(
  'Looking for opposite color for each of the RGB cube corner colors.',
);

for (const { name, cssColorSpace, fitsGamut } of gamuts) {
  console.log();
  console.log(name, 'gamut');

  for (const color of rgbCubeCornersColors(cssColorSpace)) {
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
