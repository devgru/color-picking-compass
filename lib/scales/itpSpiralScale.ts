import { ColorScale, DiffFn, Itp } from '../types';
import { toLch } from '../polar/toLch';
import { fromLch } from '../polar/fromLch';
import { colorScale } from './colorScale';

export const itpSpiralScale = (
  colors: Itp[],
  optimizeHueTraversal = true,
): ColorScale<'itp'> => {
  const scale = colorScale(colors.map(toLch), optimizeHueTraversal);

  const instance = (n: number) => fromLch(scale(n));

  instance.consume = (diffFn: DiffFn, maxDiff: number): Itp[] =>
    scale.consume(diffFn, maxDiff).map(fromLch);

  return instance;
};
