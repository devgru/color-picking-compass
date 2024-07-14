import { Color as CuloriColor, Mode as CuloriMode } from 'culori';

export type HSPoint = {
  h: number;
  s: number;
};

export type Itp = {
  mode: 'itp';
  i: number;
  t: number;
  p: number;
  alpha?: number;
};

export type Color = CuloriColor | Itp;

export type Mode = CuloriMode | 'itp';

export type ColorOrString = Color | string;

export type DiffFn = (colorA: ColorOrString, colorB: ColorOrString) => number;

export type ColorInMode<M extends Mode, C extends Color = Color> = C extends {
  mode: M;
}
  ? C
  : never;

export interface ConvertFn<M extends Mode> {
  (color: Color, target_mode?: M): ColorInMode<M>;

  (color?: ColorOrString, target_mode?: M): ColorInMode<M> | undefined;
}

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

export type InGamutFn = (color: Color) => boolean;

export interface ColorScale<M extends Mode> {
  consume: (diffFn: DiffFn, maxDiff: number) => ColorInMode<M>[];

  (n: number): ColorInMode<M>;
}

export interface LinearColorScale<M extends Mode> extends ColorScale<M> {
  stretchToGamut: (inGamut: InGamutFn) => LinearColorScale<M>;
  invert: (color: ColorOrString) => number;
  consumeWithNaturalMetric: (
    diffFn: DiffFn,
    maxDiff: number,
  ) => ColorInMode<M>[];
}
