import { scaleLinear } from 'd3-scale';
import { interpolateObject } from 'd3-interpolate';

export default function okLabScale(a, b) {
  return scaleLinear().range([a, b]).interpolate(interpolateObject);
}
