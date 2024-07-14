import { linearColorScale } from './linearColorScale';
import { Color, ConvertFn, ColorInMode, InGamutFn, Mode } from '../types';

export const findOppositeColor = <M extends Mode>(
  color: Color,
  origin: Color,
  colorModel: ConvertFn<M>,
  inGamut: InGamutFn,
): ColorInMode<M> => {
  // `linearColorScale` is used to interpolate colors between current point and the origin.
  const scale = linearColorScale([color, origin], colorModel);

  // To find the opposite color we need to extend this scale using `stretchToGamut`.
  const gamutStretchedScale = scale.stretchToGamut(inGamut);

  // To use resulting scale we first need to find current color on it using `invert`.
  const closestPointOnScale = gamutStretchedScale.invert(color);

  // And now we can just pick the color on the opposite side of the scale, equally distant from gamut edge.
  return gamutStretchedScale(1 - closestPointOnScale);
};
