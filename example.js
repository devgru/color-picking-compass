import { displayable, formatCss, formatHex, oklab, p3, rgb } from 'culori';
import roundToPrecision from 'round-to-precision';

import { okLabDelta, findOpposite } from './index.js';

function inP3(color) {
  let { r, b, g } = p3(color);
  return r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1;
}

function formatP3(color) {
  return displayable(color) ? formatHex(color) : formatCss(color);
}

const toCents = roundToPrecision(0.01, Number);

const primaryColors = [
  rgb('rgb(0, 0, 0)'),
  rgb('rgb(255, 0, 0)'),
  rgb('rgb(255, 255, 0)'),
  rgb('rgb(0, 255, 0)'),
  rgb('rgb(0, 255, 255)'),
  rgb('rgb(0, 0, 255)'),
  rgb('rgb(255, 0, 255)'),
  rgb('rgb(255, 255, 255)'),
];

const gamuts = [
  {
    name: 'sRGB',
    fitsGamut: displayable,
  },
  {
    name: 'P3',
    fitsGamut: inP3,
  },
];

console.log('Looking for opposite color for each primary color:');

gamuts.forEach(({ name, fitsGamut }) => {
  console.log();
  console.log('Gamut', name);
  primaryColors.forEach(color => {
    const oppositeColor = findOpposite(color, fitsGamut);

    console.log(
      formatP3(color),
      '→',
      formatP3(oppositeColor),
      'ΔE00',
      toCents(okLabDelta(oklab(color), oklab(oppositeColor))),
    );
  });
});
