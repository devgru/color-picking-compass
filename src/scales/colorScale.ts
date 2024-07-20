import { scaleLinear } from 'd3-scale';
import { interpolateHue, interpolateObject } from 'd3-interpolate';
import { ColorInMode, ColorPair, DiffFn, Mode } from "../types/colors";

const interpolateColor = <M extends Mode>(
  a: ColorInMode<M>,
  b: ColorInMode<M>,
) => {
  const base = interpolateObject(a, b);
  if ('h' in a && 'h' in b) {
    const hue = interpolateHue(a.h, b.h);
    return (n: number) => ({ ...base(n), h: hue(n) });
  }
  return base;
};

export interface ColorScale<M extends Mode> {
  (n: number): ColorInMode<M>;

  consume: (diffFn: DiffFn<M>, maxDiff: number) => ColorInMode<M>[];
}

export const colorScale = <M extends Mode>(
  colors: ColorPair<M>,
  optimizeHueTraversal = true,
): ColorScale<M> => {
  type MappedColor = ColorInMode<M>;

  const scale = scaleLinear<MappedColor>()
    .range(colors)
    .interpolate(optimizeHueTraversal ? interpolateColor : interpolateObject);

  const instance = (n: number): MappedColor => ({ ...scale(n) });

  instance.consume = (diffFn: DiffFn<M>, maxDiff: number): MappedColor[] => {
    let n = 0;
    let delta = 1 / 32;
    const colors: MappedColor[] = [instance(n)];

    let prevColor: MappedColor = colors[0];

    while (true) {
      if (diffFn(prevColor, instance(n + delta * 2)) <= maxDiff) {
        if (n + delta > 1) {
          colors.push(instance(1));
          return colors;
        }
        delta *= 2;
        continue;
      }

      const proposedColor: MappedColor = instance(n + delta);
      const diff: number = diffFn(prevColor, proposedColor);
      if (diff > maxDiff) {
        delta /= 2;
        continue;
      }
      if (n >= 1) {
        if (diffFn(prevColor, instance(1)) > 0) {
          colors.push(instance(1));
        }
        return colors;
      }
      prevColor = proposedColor;
      colors.push(proposedColor);
      n += delta;
    }
  };

  return instance;
};
