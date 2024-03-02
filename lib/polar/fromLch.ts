import { Lch } from 'culori';
import { Itp } from '../types';

export const fromLch = ({ l, c, h }: Lch): Itp => {
  const hRad = (h * Math.PI) / 180;
  const t = -2 * c * Math.sin(hRad);
  const p = c * Math.cos(hRad);

  return {
    mode: 'itp',
    i: l,
    t,
    p,
  };
};
