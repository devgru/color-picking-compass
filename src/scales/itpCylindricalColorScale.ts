import { Lch } from 'culori';

import { itpToLch } from '../cylindrical/itpToLch';
import { itpFromLch } from '../cylindrical/itpFromLch';
import { ColorScale, colorScale } from './colorScale';
import { DiffFn, Itp } from '../types/colors';

export const itpCylindricalColorScale = (
  [c1, c2]: [Itp, Itp],
  optimizeHueTraversal = true,
): ColorScale<'itp'> => {
  const scale: ColorScale<'lch'> = colorScale(
    [itpToLch(c1), itpToLch(c2)],
    optimizeHueTraversal,
  );

  const instance = (n: number) => itpFromLch(scale(n));

  instance.consume = (diffFn: DiffFn<'itp'>, maxDiff: number): Itp[] =>
    scale
      .consume(
        (c1: Lch, c2: Lch) => diffFn(itpFromLch(c1), itpFromLch(c2)),
        maxDiff,
      )
      .map(itpFromLch);

  return instance;
};
