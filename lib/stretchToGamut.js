import colorScale from './colorScale.js';

const SCALE_EPSILON = 2 ** -10;

export default function stretchToGamut(scale, fitsGamut) {
  function bisectGamutEdge(current, step) {
    const interpolated = scale(current + step);
    if (Math.abs(step) <= SCALE_EPSILON) {
      return { ...scale(current) };
    }
    if (fitsGamut(interpolated)) {
      return bisectGamutEdge(current + step, step * 2);
    } else {
      return bisectGamutEdge(current, step / 2);
    }
  }

  const currentColorEdge = bisectGamutEdge(0.5, -1);
  const oppositeColorEdge = bisectGamutEdge(0.5, +1);

  return colorScale(currentColorEdge, oppositeColorEdge);
}
