import { rgb } from 'd3-color';
import { color2OkLab } from './index.js';
import findOppositeColor from './lib/findOppositeColor.js';
import okLabToRgb from './lib/oklab/okLab2RgbColor.js';
import okLab from './lib/oklab/okLab.js';
import stretchToGamut from './lib/stretchToGamut.js';
import okLabScale from './lib/oklab/okLabScale.js';
import okLabDelta from './lib/oklab/okLabDelta.js';

const ORIGIN = okLab(50, 0, 0);

function findOpposite(rgbColor, midpoint = ORIGIN) {
  const okLabColor = color2OkLab(rgbColor);
  const scale = okLabScale(okLabColor, midpoint);
  const gamutWideScale = stretchToGamut(scale, okLabToRgb);
  const okLabOppositeColor = findOppositeColor(
    okLabColor,
    gamutWideScale,
    okLabDelta,
  );
  return okLabToRgb(okLabOppositeColor);
}

const primaryColors = [
  rgb(0, 0, 0),
  rgb(255, 0, 0),
  rgb(255, 255, 0),
  rgb(0, 255, 0),
  rgb(0, 255, 255),
  rgb(0, 0, 255),
  rgb(255, 0, 255),
  rgb(255, 255, 255),
];

primaryColors.forEach(color => {
  const oppositeColor = findOpposite(color);

  console.log(
    color.hex(),
    oppositeColor.hex(),
    okLabDelta(color2OkLab(color), color2OkLab(oppositeColor)),
  );
});
