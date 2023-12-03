import { parse } from 'culori';

export const rgbCubeCornersColorsComponents = [
  '0 0 0',
  '1 0 0',
  '1 1 0',
  '0 1 0',
  '0 1 1',
  '0 0 1',
  '1 0 1',
  '1 1 1',
];

export const rgbCubeCornersColors = cssColorSpace =>
  rgbCubeCornersColorsComponents.map(components =>
    parse(`color(${cssColorSpace} ${components})`),
  );
