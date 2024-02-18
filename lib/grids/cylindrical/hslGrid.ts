import { Hsl } from 'culori';
import { hsDisc } from './hsDisc';

export const hslGrid = (step: number = 1): Hsl[] => {
  const points: Hsl[] = [];

  for (let l = 0; l <= 1; l += step) {
    for (const { h, s } of hsDisc(step)) {
      points.push({ mode: 'hsl', h, s, l });
    }
  }
  return points;
};
