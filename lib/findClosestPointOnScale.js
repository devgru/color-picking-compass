const DIFF_EPSILON = 1 / 1024;
const MIN_DELTA = 1;

export default function findClosestPointOnScale(currentColor, scale, deltaFn) {
  function bisectColorOnScale(l, r) {
    const diff = r - l;
    if (diff <= DIFF_EPSILON) {
      return l;
    }

    const mid = (l + r) / 2;
    const lDelta = deltaFn(currentColor, scale(l));
    const rDelta = deltaFn(currentColor, scale(r));
    if (lDelta < rDelta) {
      if (lDelta < MIN_DELTA) {
        return l;
      }
      return bisectColorOnScale(l, mid);
    } else {
      if (rDelta < MIN_DELTA) {
        return r;
      }
      return bisectColorOnScale(mid, r);
    }
  }

  return bisectColorOnScale(0, 1);
}
