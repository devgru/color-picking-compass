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
export type ColorScale<M extends Mode> = (n: number) => FindColorByMode<M>;
export type DeltaEFn = (color1: Color, color2: Color) => number;
