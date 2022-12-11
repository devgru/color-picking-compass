import findClosestColor from './findClosestColor.js';

export default function findOppositeColor(currentColor, scale, deltaFn) {
  return scale(1 - findClosestColor(currentColor, scale, deltaFn));
}
