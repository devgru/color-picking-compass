import { colorScale } from './colorScale.js';
import { stretchScaleToGamut } from './stretchScaleToGamut.js';
import { findClosestPointOnScale } from './findClosestPointOnScale.js';

export const findOppositeColor = (
  color,
  fitsGamut,
  colorModel,
  origin,
  deltaEFn,
) => {
  // `colorScale` is used to interpolate colors between current point and the origin.
  const scale = colorScale(color, origin, colorModel);
  // To find the opposite color we need to extend this scale, `stretchScaleToGamut` is used for this.
  const gamutStretchedScale = stretchScaleToGamut(scale, fitsGamut, colorModel);
  // To use resulting scale we first need to find current color on it, `closestPointOnScale` helps with this.
  const closestPointOnScale = findClosestPointOnScale(
    color,
    gamutStretchedScale,
    deltaEFn,
  );
  // And now we can just pick the color on the opposite side of the scale, equally distant from gamut edge.
  return gamutStretchedScale(1 - closestPointOnScale);
};
