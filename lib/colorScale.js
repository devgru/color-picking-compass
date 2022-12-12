import { scaleLinear } from 'd3-scale';
import { interpolateObject } from 'd3-interpolate';

export default function colorScale(a, b) {
  return scaleLinear().range([a, b]).interpolate(interpolateObject);
}
