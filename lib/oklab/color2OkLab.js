import { rgb } from 'd3-color';
import okLab from './okLab.js';

// Numbers and formulas from https://observablehq.com/@fil/oklab-color-space

export default function color2OkLab(c) {
  c = rgb(c);
  if (!c.displayable()) {
    throw new Error('Color scale needs displayable colors');
  }
  const r = inverseGamma(c.r / 255);
  const g = inverseGamma(c.g / 255);
  const b = inverseGamma(c.b / 255);
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  return lmsToOkLab(l, m, s);
}

function lmsToOkLab(l, m, s) {
  l = Math.cbrt(l);
  m = Math.cbrt(m);
  s = Math.cbrt(s);
  return okLab(
    100 * (0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s),
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  );
}

function inverseGamma(x) {
  return x >= 0.04045 ? Math.pow((x + 0.055) / (1 + 0.055), 2.4) : x / 12.92;
}
