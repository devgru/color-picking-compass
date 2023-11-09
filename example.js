import { displayable, formatHex, oklab, p3, rgb } from 'culori';
import { okLabDelta, findOpposite } from './index.js';

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
  const oppositeColor = findOpposite(color, displayable);

  console.log(
    formatHex(color),
    '→',
    formatHex(oppositeColor),
    'delta',
    okLabDelta(oklab(color), oklab(oppositeColor)),
  );
});
