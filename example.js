import { displayable, formatHex, oklab, p3, rgb } from 'culori';
import {
  colorScale,
  okLabDelta,
  stretchToGamut,
  findClosestPointOnScale,
} from './index.js';

const ORIGIN = oklab({ l: 0.5, a: 0, b: 0 });

function findOpposite(color, midpoint = ORIGIN) {
  const okLabColor = oklab(color);
  // `colorScale` is used to interpolate colors between current point and the origin, 50% gray point.
  const scale = colorScale(okLabColor, midpoint);
  // To find the opposite color we need to extend this scale, `stretchToGamut` is used for this.
  const gamutWideScale = stretchToGamut(scale, displayable);
  // To use resulting scale we first need to find current color on it, `closestPointOnScale` helps with this.
  const closestPointOnScale = findClosestPointOnScale(
    okLabColor,
    gamutWideScale,
    okLabDelta,
  );
  // And now we can just pick the color on the opposite side of the scale, equally distant from gamut edge.
  return gamutWideScale(1 - closestPointOnScale);
}

// After first run,
// try replacing `displayable` with `inP3` to increase gamut.
// You'll have to also replace `formatHex` with `formatCss`,
// as result won't fit in RGB, represented by hex.
function inP3(color) {
  let { r, b, g } = p3(color);
  return r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1;
}

const primaryColors = [
  rgb('rgb(0, 0, 0)'),
  rgb('rgb(255, 0, 0)'),
  rgb('rgb(255, 255, 0)'),
  rgb('rgb(0, 255, 0)'),
  rgb('rgb(0, 255, 255)'),
  rgb('rgb(0, 0, 255)'),
  rgb('rgb(255, 0, 255)'),
  rgb('rgb(255, 255, 255)'),
];

console.log('Trying to find "opposite" colors for each primary:');
primaryColors.forEach(color => {
  const oppositeColor = findOpposite(color);

  console.log(
    formatHex(color),
    '→',
    formatHex(oppositeColor),
    'delta',
    okLabDelta(oklab(color), oklab(oppositeColor)),
  );
});
