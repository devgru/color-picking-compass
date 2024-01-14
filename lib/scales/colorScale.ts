import { scaleLinear } from 'd3-scale';
import { interpolateObject } from 'd3-interpolate';
import { Color, Mode } from 'culori';
import { FindColorByMode } from 'culori/src/common';
import { ConvertFn } from 'culori/src/converter';
import { ColorScale } from '../types';

export const colorScale = <M extends Mode>(
  a: Color,
  b: Color,
  colorModel: ConvertFn<M>,
): ColorScale<M> => {
  const scale = scaleLinear<FindColorByMode<M>, FindColorByMode<M>>()
    .range([colorModel(a), colorModel(b)])
    .interpolate(interpolateObject);
  return (n: number) => ({ ...scale(n) });
};
