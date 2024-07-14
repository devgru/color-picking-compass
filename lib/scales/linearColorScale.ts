import {
  ColorOrString,
  ConvertFn,
  DiffFn,
  ColorInMode,
  InGamutFn,
  LinearColorScale,
  Mode,
} from '../types';
import { colorScale } from './colorScale';

const STEP_EPSILON = 2 ** -20;
const DIFF_EPSILON = 2 ** -10;

const distance = <M extends Mode>(
  a: ColorInMode<M>,
  b: ColorInMode<M>,
): number =>
  Math.sqrt(
    Object.entries(a)
      .filter(([, v]) => typeof v === 'number')
      .reduce((acc: number, [k]: [string, number]) => {
        const diff = a[k] - b[k];
        return acc + diff ** 2;
      }, 0),
  );

export const linearColorScale = <M extends Mode>(
  colors: ColorOrString[],
  colorModel: ConvertFn<M> = Object,
): LinearColorScale<M> => {
  type MappedColor = ColorInMode<M>;
  const colorsRange = colors.map(c => colorModel(c));
  if (Object.hasOwn(colorsRange[0], 'h')) {
    throw new Error(
      'Using linearColorScale for cylindrical color models is not allowed. Use cylindrical',
    );
  }

  const scale = colorScale<M>(colorsRange, true);
  const instance = (n: number) => ({ ...scale(n) });

  instance.stretchToGamut = (inGamut: InGamutFn): LinearColorScale<M> => {
    const bisectGamutEdge = (current: number, step: number): MappedColor => {
      const extent = instance(current + step);
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

    return linearColorScale([currentColorEdge, oppositeColorEdge], colorModel);
  };

  instance.invert = (currentColor: ColorOrString): number => {
    const mappedColor: MappedColor = colorModel(currentColor);
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

  instance.consume = scale.consume;

  instance.consumeWithNaturalMetric = (
    diffFn: DiffFn,
    maxDiff: number,
  ): MappedColor[] => {
    const fullDiff = diffFn(instance(0), instance(1));
    const steps = Math.ceil(fullDiff / maxDiff);
    let step = 0;
    const colors: MappedColor[] = [];
    while (step <= steps) {
      colors.push(instance(step / steps));
      step++;
    }
    return colors;
  };

  return instance;
};
