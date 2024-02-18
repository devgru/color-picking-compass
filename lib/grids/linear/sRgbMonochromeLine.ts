import { Rgb } from 'culori';

export const sRgbMonochromeLine = (step: number = 1): Rgb[] => {
  const points: Rgb[] = [];

  for (let l = 0; l <= 1; l += step) {
    points.push({ mode: 'rgb', r: l, g: l, b: l });
  }

  return points;
};
