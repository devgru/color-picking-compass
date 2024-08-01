import { ColorScale, colorScale } from './colorScale';
import { ColorInMode, DiffFn, Mode } from '../types/colors';

export type InGamutFn<M extends Mode> = (color: ColorInMode<M>) => boolean;

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

export interface CartesianColorScale<M extends Mode> extends ColorScale<M> {
  stretchToGamut: (inGamut: InGamutFn<M>) => CartesianColorScale<M>;
  invert: (color: ColorInMode<M>) => number;
  consumeWithNaturalMetric: (
    diffFn: DiffFn<M>,
    maxDiff: number,
  ) => ColorInMode<M>[];
}

export const cartesianColorScale = <M extends Mode>(
  colors: [ColorInMode<M>, ColorInMode<M>],
): CartesianColorScale<M> => {
  if (Object.hasOwn(colors[0], 'h')) {
    throw new Error(
      'Using cartesianColorScale for cylindrical color models is not allowed.',
    );
  }

  const scale = colorScale<M>(colors, false);
  const instance = (n: number) => ({ ...scale(n) });

  instance.stretchToGamut = (inGamut: InGamutFn<M>): CartesianColorScale<M> => {
    const bisectGamutEdge = (current: number, step: number): ColorInMode<M> => {
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

    return cartesianColorScale([currentColorEdge, oppositeColorEdge]);
  };

  instance.invert = (color: ColorInMode<M>): number => {
    const bisectColorOnScale = (l: number, r: number): number => {
      const mid = (l + r) / 2;
      const diff = r - l;
      if (diff <= DIFF_EPSILON) {
        if (mid < 0.5) {
          return l;
        }
        return r;
      }

      const lDistance = distance(color, scale(l));
      const rDistance = distance(color, scale(r));
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
    diffFn: DiffFn<M>,
    maxDiff: number,
  ): ColorInMode<M>[] => {
    const fullDiff = diffFn(instance(0), instance(1));
    const steps = Math.ceil(fullDiff / maxDiff);
    let step = 0;
    const colors: ColorInMode<M>[] = [];
    while (step <= steps) {
      colors.push(instance(step / steps));
      step++;
    }
    return colors;
  };

  return instance;
};
