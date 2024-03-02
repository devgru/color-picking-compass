import { fromLch } from '../polar/fromLch';
import { ColorScale, Itp, ItpColorScale } from '../types';
import { toLch } from '../polar/toLch';
import { colorScale } from './colorScale';

export const cylindricalScale = (
  colors: Itp[],
  avoidHueOptimization = false,
): ItpColorScale => {
  const scale: ColorScale<'lch'> = colorScale(
    colors.map(toLch),
    Object,
    avoidHueOptimization,
  );
  const hciScale = (n: number) => fromLch(scale(n));
  hciScale.invert = (color: Itp) => scale.invert(toLch(color));
  return hciScale;
};
