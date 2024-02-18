import { Okhsl } from 'culori';
import { hsDisc } from './hsDisc';

export const okHslGrid = (step: number = 1): Okhsl[] => {
  const points: Okhsl[] = [];

  for (let l = 0; l <= 1; l += step) {
    for (const { h, s } of hsDisc(step)) {
      points.push({ mode: 'okhsl', h, s, l });
    }
  }
  return points;
};
