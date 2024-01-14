import { Color, Mode } from 'culori';
import { ConvertFn } from 'culori/src/converter';
import { colorScale } from './colorScale';
import { stretchScaleToGamut } from './stretchScaleToGamut';
import { findClosestPointOnScale } from './findClosestPointOnScale';
import { InGamutFn } from '../types';

export const findOppositeColor = <M extends Mode>(
  color: Color,
  origin: Color,
  inGamut: InGamutFn,
  colorModel: ConvertFn<M>,
) => {
  // `colorScale` is used to interpolate colors between current point and the origin.
  const scale = colorScale(color, origin, colorModel);
  // To find the opposite color we need to extend this scale, `stretchScaleToGamut` is used for this.
  const gamutStretchedScale = stretchScaleToGamut(scale, inGamut, colorModel);
  // To use resulting scale we first need to find current color on it, `closestPointOnScale` helps with this.
  const colorInModel = colorModel(color);
  const closestPointOnScale = findClosestPointOnScale(
    colorInModel,
    gamutStretchedScale,
  );
  // And now we can just pick the color on the opposite side of the scale, equally distant from gamut edge.
  return gamutStretchedScale(1 - closestPointOnScale);
};
