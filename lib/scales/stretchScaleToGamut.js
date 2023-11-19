import { colorScale } from './colorScale.js';

const STEP_EPSILON = 2 ** -20;

export const stretchScaleToGamut = (scale, fitsGamut, colorModel) => {
  const bisectGamutEdge = (current, step) => {
    const interpolated = scale(current + step);
    if (Math.abs(step) <= STEP_EPSILON) {
      return { ...scale(current) };
    }
    if (fitsGamut(interpolated)) {
      return bisectGamutEdge(current + step, step * 2);
    } else {
      return bisectGamutEdge(current, step / 2);
    }
  };

  const currentColorEdge = bisectGamutEdge(0.5, -1);
  const oppositeColorEdge = bisectGamutEdge(0.5, +1);

  return colorScale(currentColorEdge, oppositeColorEdge, colorModel);
};
