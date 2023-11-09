import { displayable, inGamut, oklab, p3, rgb } from 'culori';
import roundToPrecision from 'round-to-precision';

import { findOpposite, formatHexOrCss, okLabDelta } from '.';

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
    name: 'P3',
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

console.log('Looking for opposite color for each primary color:');

gamuts.forEach(({ name, primaryColors, fitsGamut }) => {
  console.log();
  console.log('Gamut', name);
  primaryColors.forEach(color => {
    const oppositeColor = findOpposite(color, fitsGamut);

    console.log(
      formatHexOrCss(color),
      '→',
      formatHexOrCss(oppositeColor),
      'ΔE00',
      toCents(okLabDelta(oklab(color), oklab(oppositeColor))),
    );
  });
});
