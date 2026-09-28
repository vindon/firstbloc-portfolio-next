import type { Box } from './isometric.mts';
import type { Random } from './random.mts';

/** Target building height (in modules) at horizontal grid position `u`. */
export type Envelope = (u: number) => number;

/** A hand-placed building. `u` is the horizontal grid position, `v` the row (0 = furthest back). */
export type Landmark = {
  readonly u: number;
  readonly v: number;
  readonly w: number;
  readonly d: number;
  readonly h: number;
};

/** An unbuilt plot (drawn as a dashed ghost block), with the cubes that will drop into it. */
export type Lot = {
  readonly u: number;
  readonly v: number;
  /** Height above the lot, in modules, of each cube hovering over it. */
  readonly drops: readonly number[];
};

export type SkylineSpec = {
  readonly width: number;
  readonly height: number;
  /** Pixels per grid module. Every block is a whole number of modules. */
  readonly module: number;
  /** Columns run from -halfSpan to +halfSpan along the horizontal axis. */
  readonly halfSpan: number;
  /** Rows of blocks receding from the viewer. */
  readonly rows: number;
  readonly seed: number;
  /** Chance a cell is left as an open plot, by row. The front row is always built, so nothing floats. */
  readonly openPlotChance: readonly number[];
  /** Widest a generated building may be, in modules. */
  readonly maxWidth: number;
  /** Tallest a generated building may be, in modules. */
  readonly maxHeight: number;
  readonly envelope: Envelope;
  readonly landmarks: readonly Landmark[];
  readonly lots: readonly Lot[];
};

export type Building = Box & {
  /** True for an unbuilt plot rather than a finished building. */
  readonly lot: boolean;
  /** Per-building shift along the colour ramp. */
  readonly tint: number;
};

type Footprint = Omit<Box, 'z'> & { readonly lot: boolean };

/** The grid cell under horizontal position `u` in row `v`. Integer only when `u + v` is even. */
export const cellAt = (u: number, v: number): readonly [x: number, y: number] => [
  (v + u) / 2,
  (v - u) / 2,
];

/**
 * Packs buildings onto an occupancy grid, back to front, so nothing overlaps and every edge lands on
 * the same lattice. Heights follow the envelope, with variation. Landmarks and lots are placed first.
 *
 * The order in which `random` is consumed is part of the output: changing it changes the skyline.
 */
export function layoutSkyline(spec: SkylineSpec, random: Random): Building[] {
  const { rows, halfSpan, envelope, maxWidth, maxHeight, openPlotChance } = spec;
  if (openPlotChance.length < rows - 1) {
    throw new RangeError(
      `openPlotChance needs one entry per back row (${rows - 1} for rows: ${rows}), got ${openPlotChance.length}.`,
    );
  }

  const occupied = new Set<string>();
  const key = (x: number, y: number): string => `${x},${y}`;
  const inRegion = (x: number, y: number): boolean => {
    const row = x + y;
    const column = x - y;
    return row >= 0 && row < rows && column >= -halfSpan && column <= halfSpan;
  };
  const isFree = (x: number, y: number): boolean => inRegion(x, y) && !occupied.has(key(x, y));
  const fits = (x: number, y: number, w: number, d: number): boolean => {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < d; j++) {
        if (!isFree(x + i, y + j)) return false;
      }
    }
    return true;
  };
  const claim = (x: number, y: number, w: number, d: number): void => {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < d; j++) occupied.add(key(x + i, y + j));
    }
  };

  const placed: Footprint[] = [];

  // Lots and landmarks are hand-placed, so a bad one is a mistake in specs.mts. Fail loudly instead of
  // quietly dropping it or drawing it on the wrong part of the grid.
  for (const lot of spec.lots) {
    const [x, y] = cellAt(lot.u, lot.v);
    if (!Number.isInteger(x) || !Number.isInteger(y) || !isFree(x, y)) {
      throw new Error(
        `Lot at u=${lot.u}, v=${lot.v} is not a free grid cell (u + v must be even, inside the grid, and not already taken).`,
      );
    }
    occupied.add(key(x, y));
    placed.push({ x, y, w: 1, d: 1, h: 1, lot: true });
  }

  for (const { u, v, w, d, h } of spec.landmarks) {
    const [x, y] = cellAt(u, v);
    if (!Number.isInteger(x) || !Number.isInteger(y) || !fits(x, y, w, d)) {
      throw new Error(
        `Landmark at u=${u}, v=${v} (${w} × ${d}) does not fit (u + v must be even, and every cell must be inside the grid and free).`,
      );
    }
    claim(x, y, w, d);
    placed.push({ x, y, w, d, h, lot: false });
  }

  for (let v = 0; v < rows; v++) {
    for (let u = -halfSpan; u <= halfSpan; u++) {
      // Cells only exist where u + v is even; the % dance keeps negative u correct.
      if ((((u + v) % 2) + 2) % 2 !== 0) continue;
      const [x, y] = cellAt(u, v);
      if (occupied.has(key(x, y))) continue;

      if (v < rows - 1 && random() < openPlotChance[v]) {
        // An open plot, one or two cells wide.
        const run = 1 + Math.floor(random() * 2);
        for (let r = 0; r < run; r++) {
          if (inRegion(x + r, y - r)) occupied.add(key(x + r, y - r));
        }
        continue;
      }

      const big = envelope(u) > 3.2;
      let w = big
        ? 2 + Math.floor(random() * (maxWidth - 1))
        : 1 + Math.floor(random() * maxWidth);
      let d = big ? 2 + Math.floor(random() * 2) : 1 + Math.floor(random() * 2);
      while (!fits(x, y, w, d)) {
        if (w >= d && w > 1) w--;
        else if (d > 1) d--;
        else break;
      }
      claim(x, y, w, d);

      const target = Math.round(envelope(u + (w - d) / 2));
      const roll = random();
      const varied =
        roll < 0.5 ? target : roll < 0.78 ? target - 1 : target + (random() < 0.5 ? 1 : 0);
      // A footprint only carries so much height, which keeps slender towers believable.
      const slenderLimit = 1 + 2 * Math.min(w, d) + (w * d >= 4 ? 1 : 0);
      const h = Math.max(1, Math.min(target + 1, slenderLimit, varied, maxHeight));
      placed.push({ x, y, w, d, h, lot: false });
    }
  }

  // Back to front, so nearer blocks paint over farther ones.
  placed.sort((a, b) => a.x + a.y - (b.x + b.y) || a.x - b.x);
  return placed.map((footprint) => ({
    ...footprint,
    z: 0,
    tint: (random() - 0.5) * 0.16,
  }));
}
