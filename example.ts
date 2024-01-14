// @ts-ignore inGamut is missing from culori types
import {
  Color,
  displayable,
  formatCss,
  formatHex,
  inGamut,
  lab,
  Lab,
  Oklab,
  oklab,
  parse,
} from 'culori';
// @ts-ignore weird types
import DeltaE, { LAB } from 'delta-e';
import {
  CssGamut,
  DeltaEFn,
  findOppositeColor,
  OKLAB_ORIGIN,
  rgbCubeVerticesArray,
} from '.';

export const labToLAB = ({ l, a, b }: Lab): LAB => ({ L: l, A: a, B: b });

const formatHexOrCss = (color: Color): string =>
  displayable(color) ? formatHex(color) : formatCss(color);

const deltaE: DeltaEFn = (color1: Color, color2: Color): number =>
  DeltaE.getDeltaE00(labToLAB(lab(color1)), labToLAB(lab(color2)));

const gamuts = [
  {
    name: 'sRGB',
    cssGamut: 'srgb' as CssGamut,
    fitsGamut: displayable,
  },
  {
    name: 'Display-P3',
    cssGamut: 'display-p3' as CssGamut,
    fitsGamut: inGamut('p3'),
  },
];

console.log(
  'Looking for opposite color for each of the RGB cube corner colors.',
);

for (const { name, cssGamut, fitsGamut } of gamuts) {
  console.log();
  console.log(name, 'gamut');

  for (const vertex of rgbCubeVerticesArray) {
    const color = parse(vertex.toCssString(cssGamut));
    const oppositeColor: Oklab = findOppositeColor(
      color,
      OKLAB_ORIGIN,
      fitsGamut,
      oklab,
    );

    console.log(
      'ΔE00',
      formatHexOrCss(color),
      '↔',
      formatHexOrCss(oppositeColor),
      Math.round(deltaE(color, oppositeColor)),
    );
  }
}
