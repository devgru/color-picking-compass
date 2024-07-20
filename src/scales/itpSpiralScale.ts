import { Lch } from 'culori';

import { toLch } from '../polar/toLch';
import { fromLch } from '../polar/fromLch';
import { ColorScale, colorScale } from './colorScale';
import { DiffFn, Itp } from '../types/colors';

export const itpSpiralScale = (
  [c1, c2]: [Itp, Itp],
  optimizeHueTraversal = true,
): ColorScale<'itp'> => {
  const scale: ColorScale<'lch'> = colorScale(
    [toLch(c1), toLch(c2)],
    optimizeHueTraversal,
  );

  const instance = (n: number) => fromLch(scale(n));

  instance.consume = (diffFn: DiffFn<'itp'>, maxDiff: number): Itp[] =>
    scale
      .consume((c1: Lch, c2: Lch) => diffFn(fromLch(c1), fromLch(c2)), maxDiff)
      .map(fromLch);

  return instance;
};
