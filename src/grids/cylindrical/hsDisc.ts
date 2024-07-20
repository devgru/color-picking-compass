export type HSPoint = {
  h: number;
  s: number;
};

export const hsDisc = (step: number = 1): HSPoint[] => {
  const points: HSPoint[] = [{ h: 0, s: 0 }];

  let hexNumber = 6;
  for (let s = step; s <= 1; s += step) {
    for (let h = 0; h <= hexNumber; h += 1) {
      points.push({ h: (h * 360) / hexNumber, s });
    }
    hexNumber += 6;
  }
  return points;
};
