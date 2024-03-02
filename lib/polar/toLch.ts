import { Lch } from 'culori';
import { Itp } from '../types';

const normalizeHue = (hue: number) => ((hue = hue % 360) < 0 ? hue + 360 : hue);

export const toLch = ({ i, t, p }: Itp): Lch => {
  const halfT = t / 2;
  const c = Math.sqrt(halfT ** 2 + p ** 2);
  const h = normalizeHue((Math.atan2(-halfT, p) * 180) / Math.PI);

  return {
    mode: 'lch',
    l: i,
    c,
    h,
  };
};
