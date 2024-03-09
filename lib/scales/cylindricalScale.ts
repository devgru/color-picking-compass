import { fromLch } from '../polar/fromLch';
import { ColorScale, Itp, ItpColorScale } from '../types';
import { toLch } from '../polar/toLch';
import { colorScale } from './colorScale';
import { DiffFn } from 'culori/src/difference';

export const cylindricalScale = (
  colors: Itp[],
  avoidHueOptimization = false,
): ItpColorScale => {
  const lchScale: ColorScale<'lch'> = colorScale(
    colors.map(toLch),
    Object,
    avoidHueOptimization,
  );
  const instance = (n: number) => fromLch(lchScale(n));
  instance.invert = (color: Itp) => lchScale.invert(toLch(color));
  instance.consume = (diffFn: DiffFn, maxDiff: number) =>
    lchScale.consume(diffFn, maxDiff).map(fromLch);
  return instance;
};
