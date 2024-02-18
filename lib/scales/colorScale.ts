import { scaleLinear } from 'd3-scale';
import { interpolateObject } from 'd3-interpolate';
import { Mode } from 'culori';
import { FindColorByMode } from 'culori/src/common';
import { ConvertFn } from 'culori/src/converter';
import { ColorOrString, ColorScale, InGamutFn } from '../types';

const STEP_EPSILON = 2 ** -20;
const DIFF_EPSILON = 2 ** -10;

const distance = <M extends Mode>(
  a: FindColorByMode<M>,
  b: FindColorByMode<M>,
): number =>
  Math.sqrt(
    Object.entries(a)
      .filter(([, v]) => typeof v === 'number')
      .reduce((acc: number, [k]: [string, number]) => {
        const diff = a[k] - b[k];
        return acc + diff ** 2;
      }, 0),
  );

export const colorScale = <M extends Mode>(
  colors: ColorOrString[],
  colorModel: ConvertFn<M> = Object,
): ColorScale<M> => {
  const scale = scaleLinear<FindColorByMode<M>>()
    .range(colors.map(c => colorModel(c)))
    .interpolate(interpolateObject);
  const builtColorScale = (n: number) => ({ ...scale(n) });

  builtColorScale.stretchToGamut = (inGamut: InGamutFn): ColorScale<M> => {
    const bisectGamutEdge = (
      current: number,
      step: number,
    ): FindColorByMode<M> => {
      const extent = builtColorScale(current + step);
      if (inGamut(extent)) {
        if (Math.abs(step) <= STEP_EPSILON) {
          return extent;
        }
        return bisectGamutEdge(current + step, step * 2);
      } else {
        return bisectGamutEdge(current, step / 2);
      }
    };

    const currentColorEdge = bisectGamutEdge(0.5, -1);
    const oppositeColorEdge = bisectGamutEdge(0.5, 1);

    return colorScale([currentColorEdge, oppositeColorEdge], colorModel);
  };

  builtColorScale.invert = (currentColor: ColorOrString): number => {
    const mappedColor: FindColorByMode<M> = colorModel(currentColor);
    const bisectColorOnScale = (l: number, r: number): number => {
      const mid = (l + r) / 2;
      const diff = r - l;
      if (diff <= DIFF_EPSILON) {
        if (mid < 0.5) {
          return l;
        }
        return r;
      }

      const lDistance = distance(mappedColor, scale(l));
      const rDistance = distance(mappedColor, scale(r));
      if (lDistance < rDistance) {
        return bisectColorOnScale(l, mid);
      } else if (lDistance === rDistance) {
        return mid;
      } else {
        return bisectColorOnScale(mid, r);
      }
    };

    return bisectColorOnScale(0, 1);
  };

  return builtColorScale;
};
