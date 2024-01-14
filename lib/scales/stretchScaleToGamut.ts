import { Mode } from 'culori';
import { ConvertFn } from 'culori/src/converter';
import { FindColorByMode } from 'culori/src/common';
import { colorScale } from './colorScale';
import { ColorScale, InGamutFn } from '../types';

const STEP_EPSILON = 2 ** -20;

export const stretchScaleToGamut = <M extends Mode>(
  scale: ColorScale<M>,
  inGamut: InGamutFn,
  colorModel: ConvertFn<M>,
): ColorScale<M> => {
  const bisectGamutEdge = (
    current: number,
    step: number,
  ): FindColorByMode<M> => {
    const interpolated = scale(current + step);
    if (inGamut(interpolated)) {
      if (Math.abs(step) <= STEP_EPSILON) {
        return scale(current);
      }
      return bisectGamutEdge(current + step, step * 2);
    } else {
      return bisectGamutEdge(current, step / 2);
    }
  };

  const currentColorEdge = bisectGamutEdge(0.5, -1);
  const oppositeColorEdge = bisectGamutEdge(0.5, 1);

  return colorScale(currentColorEdge, oppositeColorEdge, colorModel);
};
