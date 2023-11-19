const DIFF_EPSILON = 1 / 1024;
const MIN_DELTA = 1;

export const findClosestPointOnScale = (currentColor, scale, deltaEFn) => {
  const bisectColorOnScale = (l, r) => {
    const diff = r - l;
    if (diff <= DIFF_EPSILON) {
      return l;
    }

    const mid = (l + r) / 2;
    const lDelta = deltaEFn(currentColor, scale(l));
    const rDelta = deltaEFn(currentColor, scale(r));
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
  };

  return bisectColorOnScale(0, 1);
};
