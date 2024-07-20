import { Color as CuloriColor, Mode as CuloriMode } from 'culori';

export type Itp = {
  mode: 'itp';
  i: number;
  t: number;
  p: number;
  alpha?: number;
};

export type Color = CuloriColor | Itp;

export type Mode = CuloriMode | 'itp';

export type DiffFn<M extends Mode> = (
  colorA: ColorInMode<M>,
  colorB: ColorInMode<M>,
) => number;

export type ColorInMode<M extends Mode, C extends Color = Color> = C extends {
  mode: M;
}
  ? C
  : never;

export type ColorPair<M extends Mode> = [ColorInMode<M>, ColorInMode<M>];
