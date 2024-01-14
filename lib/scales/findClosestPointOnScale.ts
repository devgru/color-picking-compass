import { Mode } from 'culori';
import { ColorScale } from '../types';
import { FindColorByMode } from 'culori/src/common';

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

export const findClosestPointOnScale = <M extends Mode>(
  currentColor: FindColorByMode<M>,
  scale: ColorScale<M>,
) => {
  const bisectColorOnScale = (l: number, r: number): number => {
    const diff = r - l;
    if (diff <= DIFF_EPSILON) {
      return l;
    }

    const mid = (l + r) / 2;
    const lDistance = distance(currentColor, scale(l));
    const rDistance = distance(currentColor, scale(r));
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
