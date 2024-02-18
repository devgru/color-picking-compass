// @ts-ignore inGamut is missing from culori types
import {
  Color,
  differenceItp,
  displayable,
  formatCss,
  formatHex,
  inGamut,
  itp,
  Oklab,
  parse,
  xyz65,
} from 'culori'; // @ts-ignore weird types
import {
  CssGamut,
  findOppositeColor,
  OKLAB_ORIGIN,
  rgbCubeVerticesArray,
} from '.';

const formatHexOrCss = (color: Color): string =>
  displayable(color) ? formatHex(color) : formatCss(color);

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

  const diff = differenceItp();
  for (const vertex of rgbCubeVerticesArray) {
    const color = parse(vertex.toCssString(cssGamut));
    const oppositeColor: Oklab = findOppositeColor(
      color,
      OKLAB_ORIGIN,
      itp,
      color => diff(itp(xyz65(color)), color) < 0.0001 && fitsGamut(color),
    );

    console.log(
      'ΔE00',
      formatHexOrCss(color),
      '↔',
      formatHexOrCss(oppositeColor),
      Math.round(diff(color, oppositeColor)),
    );
  }
}
