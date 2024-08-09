import { InGamutFn, cartesianColorScale } from './cartesianColorScale';
import { ColorInMode, Mode } from '../types/colors';

export const findOppositeColor = <M extends Mode>(
  color: ColorInMode<M>,
  origin: ColorInMode<M>,
  inGamut: InGamutFn<M>,
): ColorInMode<M> => {
  // `cartesianColorScale` is used to interpolate colors between current point and the origin.
  const scale = cartesianColorScale([color, origin]);

  // To find the opposite color we need to extend this scale using `stretch`.
  const gamutStretchedScale = scale.stretch(inGamut);

  // To use resulting scale we first need to find current color on it using `invert`.
  const closestPointOnScale = gamutStretchedScale.invert(color);

  // And now we can just pick the color on the opposite side of the scale, equally distant from gamut edge.
  return gamutStretchedScale(1 - closestPointOnScale);
};
