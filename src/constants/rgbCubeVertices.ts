
import { CssGamut, RgbCubeVertex, RgbCubeVertexName } from "./types";

function toCssString(gamut: CssGamut = 'srgb'): string {
  const { r, g, b } = this as RgbCubeVertex;
  return `color(${gamut} ${r} ${g} ${b})`;
}

const black: RgbCubeVertex = {
  r: 0,
  g: 0,
  b: 0,
  letter: 'k',
  name: 'black',
  isMonochrome: true,
  toCssString,
};

const red: RgbCubeVertex = {
  r: 1,
  g: 0,
  b: 0,
  letter: 'r',
  name: 'red',
  isMonochrome: false,
  toCssString,
};

const yellow: RgbCubeVertex = {
  r: 1,
  g: 1,
  b: 0,
  letter: 'y',
  name: 'yellow',
  isMonochrome: false,
  toCssString,
};

const green: RgbCubeVertex = {
  r: 0,
  g: 1,
  b: 0,
  letter: 'g',
  name: 'green',
  isMonochrome: false,
  toCssString,
};

const cyan: RgbCubeVertex = {
  r: 0,
  g: 1,
  b: 1,
  letter: 'c',
  name: 'cyan',
  isMonochrome: false,
  toCssString,
};

const blue: RgbCubeVertex = {
  r: 0,
  g: 0,
  b: 1,
  letter: 'b',
  name: 'blue',
  isMonochrome: false,
  toCssString,
};

const magenta: RgbCubeVertex = {
  r: 1,
  g: 0,
  b: 1,
  letter: 'm',
  name: 'magenta',
  isMonochrome: false,
  toCssString,
};

const white: RgbCubeVertex = {
  r: 1,
  g: 1,
  b: 1,
  letter: 'w',
  name: 'white',
  isMonochrome: true,
  toCssString,
};

export const rgbCubeVerticesObject: {
  [key in RgbCubeVertexName]: RgbCubeVertex;
} = {
  black,
  red,
  yellow,
  green,
  cyan,
  blue,
  magenta,
  white,
};

export const rgbCubeVerticesArray: RgbCubeVertex[] = Object.values(
  rgbCubeVerticesObject,
);

export const rgbCubeVerticesMap: Map<RgbCubeVertexName, RgbCubeVertex> =
  new Map(rgbCubeVerticesArray.map(Vertex => [Vertex.name, Vertex]));
