import { CssGamut, RgbCubeVertex, RgbCubeVertexName } from '../types';

function toCssString(gamut: CssGamut = 'srgb'): string {
  const { r, g, b } = this as RgbCubeVertex;
  return `color(${gamut} ${r} ${g} ${b})`;
}

const black = {
  r: 0,
  g: 0,
  b: 0,
  letter: 'k',
  name: 'black' as RgbCubeVertexName,
  isMonochrome: true,
  toCssString,
};
const red = {
  r: 1,
  g: 0,
  b: 0,
  letter: 'r',
  name: 'red' as RgbCubeVertexName,
  isMonochrome: false,
  toCssString,
};
const yellow = {
  r: 1,
  g: 1,
  b: 0,
  letter: 'y',
  name: 'yellow' as RgbCubeVertexName,
  isMonochrome: false,
  toCssString,
};
const green = {
  r: 0,
  g: 1,
  b: 0,
  letter: 'g',
  name: 'green' as RgbCubeVertexName,
  isMonochrome: false,
  toCssString,
};
const cyan = {
  r: 0,
  g: 1,
  b: 1,
  letter: 'c',
  name: 'cyan' as RgbCubeVertexName,
  isMonochrome: false,
  toCssString,
};
const blue = {
  r: 0,
  g: 0,
  b: 1,
  letter: 'b',
  name: 'blue' as RgbCubeVertexName,
  isMonochrome: false,
  toCssString,
};
const magenta = {
  r: 1,
  g: 0,
  b: 1,
  letter: 'm',
  name: 'magenta' as RgbCubeVertexName,
  isMonochrome: false,
  toCssString,
};
const white = {
  r: 1,
  g: 1,
  b: 1,
  letter: 'w',
  name: 'white' as RgbCubeVertexName,
  isMonochrome: true,
  toCssString,
};

export const rgbCubeVerticesArray: RgbCubeVertex[] = [
  black,
  red,
  yellow,
  green,
  cyan,
  blue,
  magenta,
  white,
];

export const rgbCubeVerticesMap: Map<RgbCubeVertexName, RgbCubeVertex> =
  new Map(rgbCubeVerticesArray.map(Vertex => [Vertex.name, Vertex]));
