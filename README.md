# Color Picking Compass

> Work in progress pet project

Color Picking Compass is a tool designed to explore the metaphor of the drawing compass, as it is used to draw
geometrically defined complex shapes starting with just a couple of dots on paper.

When applied to color spaces, this leads us to an approach of building palettes and schemes with a minimal input and
relying on common knowledge of color spaces properties.

### WIP

The project is under development and is getting occasional updates.

### API

#### Color scale

```typescript
colorScale(
  colorPair: [Color, Color],
  colorModel: ((Color) => Color) | undefined
) => (n: number) => Color

colorScale(
  colorPair: [string, string],
  colorModel: (string) => Color
) => (n: number) => Color
```

Constructs a new color scale that interpolates between a pair of colors.

Color scale accepts a number (normally
between 0 and 1) and returns a `Color`.

- `colorPair` is an array of colors. If a `colorModel` is not provided, `colorPair` should contain objects with a consistent shape (
  i.e. representing colors in one color space). Otherwise, you can use any supported color representation, including
  string;
- `colorModel` is an optional converter function, e.g. `culori.rgb` or any
  other [supported color space](https://culorijs.org/color-spaces/). It is applied to each color in the `colorPair` and defines
  the color space in which the scale operates.

Color scale internally uses [D3 linear scale](https://d3js.org/d3-scale/linear). The important nuance is
that `scale`'s return values are new objects, while D3 linear scale returns the same object on each call.

```javascript

const scale = colorScale(['#ff0000', '#0000ff'], culori.oklab);

const midpoint = scale(0.5);
// { mode: "oklab", l: 0.5399845394999472, a: 0.0962030384486051, b: -0.0928409245738201 }

```

### Example

Run `bun prepack ; bun example.ts` and check the output. It demonstrates how to use `color-picking-compass` by composing
some of provided functions.

## License

MIT © [Dima Semyushkin](https://devg.ru)
