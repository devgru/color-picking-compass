# Color Picking Compass

> Work in progress pet project

Color Picking Compass is a tool designed to explore the metaphor of the drawing compass, as it is used to draw
geometrically defined complex shapes starting with just a couple of dots on paper.

When applied to color spaces, this leads us to an approach of building palettes and schemes with a minimal input and
relying on common knowledge of color spaces properties.

## WIP

The project is under development and is getting occasional updates.

## API

### Color scales

Color scale is a function that accepts a number (normally between 0 and 1) and returns a `Color`.

Color scale internally uses [D3 linear scale](https://d3js.org/d3-scale/linear). The important nuance is
that `scale`'s return values are new objects, while D3 linear scale returns the same object on each call.

```typescript
import { differenceCiede2000 } from "culori";

// returns a representation of a color between the two colors
colorScale(0.5)

// returns an array of colors offset by at least delta E of 10
colorScale.consume(differenceCiede2000(), 10)
```

#### Linear color scale

```typescript
import { linearColorScale } from "color-picking-compass";

linearColorScale(
  colorPair: [Color, Color],
  colorModel: ((Color) => Color) = Object,
  optimizeHueTraversal: boolean = false
) => (n: number) => Color

linearColorScale(
  colorPair: [string, string],
  colorModel: (string) => Color,
  optimizeHueTraversal: boolean = false
) => (n: number) => Color
```

Constructs a new linear color scale that interpolates between a pair of colors.

- `colorPair` is an array of colors. If a `colorModel` is not provided, `colorPair` should contain objects with a consistent shape (
  i.e. representing colors in one color space). Otherwise, you can use any supported color representation, including
  string;
- `colorModel` is an optional converter function, e.g. `culori.rgb` or any
  other [supported color space](https://culorijs.org/color-spaces/). It is applied to each color in the `colorPair` and defines
  the color space in which the scale operates.

```typescript
import { oklab } from "culori";
import { linearColorScale } from "color-picking-compass";

const scale = linearColorScale(['#ff0000', '#0000ff'], oklab);

const midpoint = scale(0.5);
// { mode: "oklab", l: 0.54, a: 0.1, b: -0.09 }
```

As some color difference formulas are defined as euclidean distances, we might utilize this to optimize scale consumption:

```typescript
import { lab, itp, differenceCie76, differenceItp } from "culori";
import { linearColorScale } from "color-picking-compass";

const scale = linearColorScale(['#ff0000', '#0000ff'], lab)
scale.consume(differenceCie76(), 5) // will calculate delta E for each step
scale.consumeWithNaturalMetric(differenceCie76(), 5) // will calculate delta E once for the whole scale

// same optimization is available for ICtCp:
const scaleItp = linearColorScale(['#ff0000', '#0000ff'], itp)
scaleItp.consumeWithNaturalMetric(differenceItp(), 5);
```

#### ICtCp spiral scale

A special case of the spiral scale that operates in polar coordinates on top of the ICtCp color space.

Constructs a new spiral color scale that interpolates between a pair of colors using polar coordinates (hue, chromaticity).

```typescript
import { itpSpiralScale } from "color-picking-compass";

itpSpiralScale(
  colorPair: [Itp, Itp],
  optimizeHueTraversal: boolean = true
) => (n: number) => Itp
```

- `colorPair` is an array of colors in ICtCp model, convert other representations using `culori.itp` if needed;
- `optimizeHueTraversal` is an optional flag that changes the approach to hue interpolation. Normally, scale optimizes hue interpolation, e.g. shortcutting between 0 and 360°. If you want to avoid this behavior, set the flag to `false`.


```typescript
import { formatHex, itp } from "culori";
import { itpSpiralScale } from "color-picking-compass";

const scale = itpSpiralScale(['#ff0000', '#0000ff'].map(itp));

const midpoint = formatHex(scale(0.5)); // #cd00ff
```

## Example

Run `bun prepack ; bun example.ts` and check the output. It demonstrates how to use `color-picking-compass` by composing
some of provided functions.

## License

MIT © [Dima Semyushkin](https://devg.ru)
