import { lab } from 'culori';

const deltaECache = new Map();

const toLab = labColor => {
  const { l, a, b } = labColor;
  return {
    L: l,
    A: a,
    B: b,
  };
};

const toCacheKey = ({ l, a, b }) => `${l}-${a}-${b}`;

export const cachedDeltaE = deltaEFn => (color1, color2) => {
  const lab1 = lab(color1);
  const lab2 = lab(color2);
  const k1 = toCacheKey(lab1);
  const k2 = toCacheKey(lab2);
  const deltaKey = `${k1}${k2}`;
  if (deltaECache.has(deltaKey)) {
    return deltaECache.get(deltaKey);
  }

  const deltaE = deltaEFn(toLab(lab1), toLab(lab2));

  deltaECache.set(deltaKey, deltaE);
  const reverseKey = `${k2}${k1}`;
  deltaECache.set(reverseKey, deltaE);

  return deltaE;
};
