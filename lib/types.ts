import { Color, Mode } from 'culori';
import { FindColorByMode } from 'culori/src/common';

export type CssGamut = 'srgb' | 'display-p3';

export type RgbCubeVertexName =
  | 'black'
  | 'red'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'magenta'
  | 'white';

export type RgbCubeVertex = {
  r: number;
  g: number;
  b: number;
  letter: string;
  name: RgbCubeVertexName;
  isMonochrome: boolean;
  toCssString: (gamut?: CssGamut) => string;
};

export type InGamutFn = (c: Color) => boolean;

export type ColorScale<M extends Mode> = {
  stretchToGamut: (inGamut: InGamutFn) => ColorScale<M>;
  invert: (color: Color) => number;
  (n: number): FindColorByMode<M>;
};

export type HSPoint = {
  h: number;
  s: number;
};

export type ColorOrString = Color | string;
