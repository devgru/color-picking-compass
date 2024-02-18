import { P3 } from 'culori';

export const p3Grid = (step: number = 1): P3[] => {
  const points: P3[] = [];

  for (let b = 0; b <= 1; b += step) {
    for (let g = 0; g <= 1; g += step) {
      for (let r = 0; r <= 1; r += step) {
        points.push({ mode: 'p3', r, g, b });
      }
    }
  }
  return points;
};
