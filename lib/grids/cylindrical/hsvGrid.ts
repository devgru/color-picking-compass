import { Hsv } from 'culori';
import { hsDisc } from './hsDisc';

export const hsvGrid = (step: number = 1): Hsv[] => {
  const points = [];

  for (let v = 0; v <= 1; v += step) {
    for (const { h, s } of hsDisc(step)) {
      points.push({ mode: 'hsv', h, s, v });
    }
  }
  return points;
};
