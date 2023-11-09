import { oklab } from 'culori';
import { colorScale } from './colorScale.js';
import { stretchToGamut } from './stretchToGamut.js';
import { findClosestPointOnScale } from './findClosestPointOnScale.js';
import { okLabDelta } from './okLabDelta.js';

const ORIGIN = oklab({ l: 0.5, a: 0, b: 0 });

export function findOpposite(color, fitsGamut, midpoint = ORIGIN) {
  const okLabColor = oklab(color);
  // `colorScale` is used to interpolate colors between current point and the origin, 50% gray point.
  const scale = colorScale(okLabColor, midpoint);
  // To find the opposite color we need to extend this scale, `stretchToGamut` is used for this.
  const gamutWideScale = stretchToGamut(scale, fitsGamut);
  // To use resulting scale we first need to find current color on it, `closestPointOnScale` helps with this.
  const closestPointOnScale = findClosestPointOnScale(
    okLabColor,
    gamutWideScale,
    okLabDelta,
  );
  // And now we can just pick the color on the opposite side of the scale, equally distant from gamut edge.
  return gamutWideScale(1 - closestPointOnScale);
}
