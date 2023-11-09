import { convertRgbToLab, convertOklabToRgb } from 'culori';
import DeltaE from 'delta-e';

const { getDeltaE00 } = DeltaE;

const deltaCache = new Map();

export function okLabDelta(oklab1, oklab2) {
  const k1 = key(oklab1);
  const k2 = key(oklab2);
  const deltaKey = k1 + k2;
  const reverseKey = k2 + k1;
  let delta;
  if (!deltaCache.has(deltaKey) && !deltaCache.has(reverseKey)) {
    delta = getDeltaE00(toLab(oklab1), toLab(oklab2));
    deltaCache.set(deltaKey, delta);
  } else {
    delta = deltaCache.get(deltaKey);
  }
  return delta;
}

function toLab(oklab) {
  const { l, a, b } = convertRgbToLab(convertOklabToRgb(oklab));
  return {
    L: l,
    A: a,
    B: b,
  };
}

function key({ l, a, b }) {
  return `${l}-${a}-${b}`;
}
