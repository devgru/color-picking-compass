import { scaleLinear } from 'd3-scale';
import { interpolateObject } from 'd3-interpolate';

export const colorScale = (a, b, colorModel) =>
  scaleLinear()
    .range([colorModel(a), colorModel(b)])
    .interpolate(interpolateObject);
