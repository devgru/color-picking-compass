import { Rgb } from 'culori';

export const sRgbGrid = (step: number = 1): Rgb[] => {
  const points: Rgb[] = [];

  for (let b = 0; b <= 1; b += step) {
    for (let g = 0; g <= 1; g += step) {
      for (let r = 0; r <= 1; r += step) {
        points.push({ mode: 'rgb', r, g, b });
      }
    }
  }
  return points;
};
