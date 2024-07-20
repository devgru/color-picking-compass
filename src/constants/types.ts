export type RgbCubeVertexName =
  | 'black'
  | 'red'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'magenta'
  | 'white';

export type CssGamut = 'srgb' | 'display-p3';

export type RgbCubeVertex = {
  r: number;
  g: number;
  b: number;
  letter: string;
  name: RgbCubeVertexName;
  isMonochrome: boolean;
  toCssString: (gamut?: CssGamut) => string;
};
