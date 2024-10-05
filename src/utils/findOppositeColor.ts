import { cartesianColorScale, InGamutFn } from '../scales/cartesianColorScale';
import { ColorInMode, Mode } from '../types/colors';
import { colorScale } from '../scales/colorScale';

export const findOppositeColor = <M extends Mode>(
  pickedColor: ColorInMode<M>,
  origin: ColorInMode<M>,
  inGamut: InGamutFn<M>,
): ColorInMode<M> => {
  // `cartesianColorScale` is used to represent an interval between two colors
  const scale = cartesianColorScale([pickedColor, origin]);

  // we `stretch` the scale to reach gamut edges
  const edgeToOppositeEdgeScale = scale.stretch(inGamut);

  // with the stretched scale we can compute the position of the picked color in the relation to the edge and the origin
  // first, we get the color at the edge of the gamut
  const edge = edgeToOppositeEdgeScale(0);

  // then we create a new scale between the edge and the origin
  const edgeToOrigin = cartesianColorScale([edge, origin]);

  // we call `invert` on the scale to find the position of the picked color in the relation to the edge and the origin
  const closestPointOnScale = edgeToOrigin.invert(pickedColor);

  // to compute the opposite color, we need to find the color with the similar offset from the edge
  const oppositeEdge = edgeToOppositeEdgeScale(1);

  // we create a new scale between the opposite edge and the origin
  const oppositeEdgeToOrigin = colorScale([oppositeEdge, origin]);

  // we return the color, offset from the opposite edge
  return oppositeEdgeToOrigin(closestPointOnScale);
};
