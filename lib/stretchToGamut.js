import { scaleLinear } from 'd3-scale';
import { interpolateObject } from 'd3-interpolate';

const SCALE_EPSILON = 1 / 1024;

export default function stretchToGamut(scale, convertToColor) {
  function bisectGamutEdge(init, step) {
    const interpolated = scale(init + step);
    if (convertToColor(interpolated).displayable()) {
      if (step <= SCALE_EPSILON) {
        return { ...interpolated };
      }
      return bisectGamutEdge(init + step, step * 2);
    } else {
      return bisectGamutEdge(init, step / 2);
    }
  }

  const currentColorEdge = bisectGamutEdge(0.5, -1);
  const oppositeColorEdge = bisectGamutEdge(0.5, +1);
  return scaleLinear()
    .range([currentColorEdge, oppositeColorEdge])
    .interpolate(interpolateObject);
}
