import { rgb } from 'd3-color';

// Numbers and formulas from https://observablehq.com/@fil/oklab-color-space

export default function okLabToRgb({ l, a, b }) {
  return lmsToRgb(
    l + 0.3963377774 * a + 0.2158037573 * b,
    l - 0.1055613458 * a - 0.0638541728 * b,
    l - 0.0894841775 * a - 1.291485548 * b,
  );
}

function lmsToRgb(l, m, s) {
  l = l ** 3;
  m = m ** 3;
  s = s ** 3;
  return rgb(
    255 * gamma(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    255 * gamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    255 * gamma(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  );
}

function gamma(x) {
  return x >= 0.0031308 ? 1.055 * Math.pow(x, 1 / 2.4) - 0.055 : 12.92 * x;
}
