import { lab } from 'd3-color';
import DeltaE from 'delta-e';
import okLabToRgb from './okLab2RgbColor.js';

const { getDeltaE00 } = DeltaE;

const deltaCache = new Map();

export default function okLabDelta(oklab1, oklab2) {
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
  const { l, a, b } = lab(okLabToRgb(oklab));
  return {
    L: l,
    A: a,
    B: b,
  };
}

function key({ l, a, b }) {
  return `${l}-${a}-${b}`;
}
