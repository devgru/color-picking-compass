import { P3 } from 'culori';

export const p3MonochromeLine = (step: number = 1): P3[] => {
  const points: P3[] = [];

  for (let l = 0; l <= 1; l += step) {
    points.push({ mode: 'p3', r: l, g: l, b: l });
  }

  return points;
};
