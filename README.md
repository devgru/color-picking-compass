# Color Picking Compass

> Work in progress pet project

Color Picking Compass is a tool designed to explore the metaphor of the drawing compass, as it is used to draw
geometrically defined complex shapes starting with just a couple of dots on paper.

When applied to color spaces, this leads us to an approach of building palettes and schemes with a minimal input and
relying on common knowledge of color spaces properties.

Color Picking Compass is built with [Culori](https://culorijs.org/) in mind, is compatible with its color representation format (plain objects with numeric properties).

## WIP

The project is under development and is getting occasional updates.

## Implementation details

All color scale constructors internally use [D3 linear scale](https://d3js.org/d3-scale/linear) and [D3 object interpolation](https://d3js.org/d3-interpolate/value#interpolateObject). The important nuance is
that `colorScale`'s return values are new objects on each call, while D3 object interpolation reuses a single object on each call.

```typescript
// returns a representation of a color between the two colors
colorScale(0.5)

// false, `colorScale` returns a new object on each call
colorScale(0.5) === colorScale(0.5)
```

## API

Library API provides several color scale constructors. Every color scale is a function that accepts a number (usually between 0 and 1) and returns a `Color` (a plain object, as defined in [culori API](https://culorijs.org/api/)).

### Color scale

Color scale is a function that accepts a number (normally between 0 and 1) and returns a `Color`.

```typescript
import { colorScale } from "color-picking-compass";

// constructed as follows:
// (colorPair: [Color, Color], optimizeHueTraversal: boolean) => (n: number) => Color

```

Constructs a new color scale that interpolates between a pair of colors using computed cylindrical coordinates (hue, chromaticity).

- `colorPair` is an array of colors. `colorPair` should contain objects with a consistent shape (i.e. representing colors in one color space);
- `optimizeHueTraversal` is an optional flag that changes the approach to hue interpolation (if applicable, i.e. if color space uses color space defined in cylindrical coordinates). Normally, scale optimizes hue interpolation, i.e. shortcutting between 0 and 360°. If you want to avoid this behavior, set the flag to `false`.

Color scale can produce an array of colors separated by no less than a specified delta E value using `consume` function:

```typescript
import { differenceCiede2000 } from "culori";

// returns an array of colors offset by at least delta E of 10
colorScale.consume(differenceCiede2000(), 10)
```

### Cartesian color scale

Cartesian color scale is a color scale that is defined by a color pair, in which each color is defined by a set of coordinates in a cartesian color space.

```typescript
import { cartesianColorScale } from "color-picking-compass";

// constructed as follows:
// (colorPair: [Color, Color]) => (n: number) => Color

```

Constructs a new color scale that interpolates between a pair of colors.

- `colorPair` is an array of colors. `colorPair` should contain objects with a consistent shape (i.e. representing colors in one color space);

```typescript
import { oklab } from "culori";
import { cartesianColorScale } from "color-picking-compass";

const scale = cartesianColorScale([
  oklab('#ff0000'),
  oklab('#0000ff')
]);

const midpoint = scale(0.5);
// { mode: "oklab", l: 0.54, a: 0.1, b: -0.09 }
```

As some color difference formulas are defined as Euclidean distances, we might utilize this property to optimize scale consumption. The library provides `consumeWithNaturalMetric` that does just that:

```typescript
import { lab, itp, differenceCie76, differenceItp } from "culori";
import { cartesianColorScale } from "color-picking-compass";

const scale = cartesianColorScale([
  lab('#ff0000'),
  lab('#0000ff')
]);

// will calculate delta E for each step
scale.consume(differenceCie76(), 5)

// will calculate delta E once for the whole scale
scale.consumeWithNaturalMetric(differenceCie76(), 5)

// same optimization is available for ICtCp:
const scaleItp = cartesianColorScale([
  itp('#ff0000'),
  itp('#0000ff')
])
scaleItp.consumeWithNaturalMetric(differenceItp(), 5);
```

### ICtCp (ITP) cylindrical color scale

A special case of the cylindrical color scale that operates in ICtCp (ITP) color space. There is no name or standard for this approach, it is related to ICtCp as LCH relates to LAB or OKLCH relates to OKLAB, by converting cartesian coordinates to cylindrical ones, including T (`tritan`) component coefficient of 0.5.

```typescript
import { itpCylindricalColorScale } from "color-picking-compass";

// constructed as follows:
// (colorPair: [Itp, Itp], optimizeHueTraversal: boolean) => (n: number) => Itp
```

Constructs a new color scale that interpolates between a pair of colors using computed cylindrical coordinates (intensity, hue, chromaticity).

- `colorPair` is an array of colors in ICtCp (ITP) model, convert other representations using `culori.itp` if needed;
- `optimizeHueTraversal` is an optional flag that changes the approach to hue interpolation. Normally, scale optimizes hue interpolation, i.e. shortcutting between 0 and 360°. If you want to avoid this behavior, set the flag to `false`.

```typescript
import { formatHex, itp } from "culori";
import { itpCylindricalColorScale } from "color-picking-compass";

const scale = itpCylindricalColorScale(['#ff0000', '#0000ff'].map(itp));

const midpoint = formatHex(scale(0.5)); // #cd00ff
```

## Example

Run `bun prepack ; bun example.ts` and check the output. It demonstrates how to use `color-picking-compass` by composing
some of provided functions.

## License

MIT © [Dima Semyushkin](https://devg.ru)
