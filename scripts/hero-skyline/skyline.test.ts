import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { cellAt, layoutSkyline, type Building, type SkylineSpec } from './layout.mts';
import { rampColor } from './palette.mts';
import { createRandom } from './random.mts';
import { renderSkyline } from './render.mts';
import { SKYLINES } from './specs.mts';

const ASSET_DIR = path.resolve(__dirname, '../../app/hero-skyline');

const layoutOf = (spec: SkylineSpec): Building[] =>
  layoutSkyline(spec, createRandom(spec.seed));

/** Every grid cell a set of buildings covers, as [x, y]. */
const cellsOf = (buildings: readonly Building[]): [x: number, y: number][] =>
  buildings.flatMap(({ x, y, w, d }) =>
    Array.from({ length: w * d }, (_, i): [number, number] => [x + (i % w), y + Math.floor(i / w)]),
  );

const keyOf = ([x, y]: readonly [number, number]): string => `${x},${y}`;

describe('createRandom', () => {
  it('repeats the same sequence for the same seed', () => {
    const a = createRandom(57);
    const b = createRandom(57);
    expect(Array.from({ length: 5 }, a)).toEqual(Array.from({ length: 5 }, b));
  });

  it('differs between seeds and stays in [0, 1)', () => {
    const values = Array.from({ length: 1000 }, createRandom(1));
    expect(values.every((value) => value >= 0 && value < 1)).toBe(true);
    expect(values.slice(0, 5)).not.toEqual(Array.from({ length: 5 }, createRandom(2)));
  });
});

describe('rampColor', () => {
  const ramp = ['#000000', '#FF0000', '#FFFFFF'] as const;

  it('returns the end stops at 0 and 1', () => {
    expect(rampColor(ramp, 0)).toBe('#000000');
    expect(rampColor(ramp, 1)).toBe('#ffffff');
  });

  it('clamps out-of-range positions instead of extrapolating', () => {
    expect(rampColor(ramp, -3)).toBe(rampColor(ramp, 0));
    expect(rampColor(ramp, 9)).toBe(rampColor(ramp, 1));
  });

  it('blends between stops', () => {
    expect(rampColor(ramp, 0.25)).toBe('#800000');
  });
});

describe.each(SKYLINES)('$file', ({ file, spec }) => {
  const buildings = layoutOf(spec);

  it('is exactly what the committed asset contains', () => {
    const committed = readFileSync(path.join(ASSET_DIR, file), 'utf8');
    expect(
      renderSkyline(spec) === committed,
      `${file} is out of date with scripts/hero-skyline. Run \`npm run hero:generate\` and commit the result.`,
    ).toBe(true);
  });

  it('renders deterministically', () => {
    expect(renderSkyline(spec)).toBe(renderSkyline(spec));
  });

  it('renders a plain SVG with no invalid numbers', () => {
    const svg = renderSkyline(spec);
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true);
    expect(svg.endsWith('</svg>')).toBe(true);
    expect(svg).not.toMatch(/NaN|undefined|Infinity/);
  });

  it('never overlaps two buildings', () => {
    const keys = cellsOf(buildings).map(keyOf);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('keeps every cell of every building inside the grid', () => {
    for (const [x, y] of cellsOf(buildings)) {
      const row = x + y;
      const column = x - y;
      expect(row, `cell ${x},${y} row`).toBeGreaterThanOrEqual(0);
      expect(row, `cell ${x},${y} row`).toBeLessThan(spec.rows);
      expect(Math.abs(column), `cell ${x},${y} column`).toBeLessThanOrEqual(spec.halfSpan);
    }
  });

  it('builds the whole front row, so nothing floats above the bottom edge', () => {
    const covered = new Set(cellsOf(buildings).map(keyOf));
    const frontRow = spec.rows - 1;
    for (let u = -spec.halfSpan; u <= spec.halfSpan; u++) {
      if (Math.abs((u + frontRow) % 2) === 1) continue;
      expect(covered.has(keyOf(cellAt(u, frontRow))), `front-row cell u=${u} is empty`).toBe(true);
    }
  });

  it('respects the height cap, except for hand-placed landmarks', () => {
    const tallestLandmark = Math.max(0, ...spec.landmarks.map((landmark) => landmark.h));
    const cap = Math.max(spec.maxHeight, tallestLandmark);
    expect(buildings.filter(({ lot }) => !lot).every(({ h }) => h <= cap)).toBe(true);
  });

  it('places every landmark exactly as specified', () => {
    for (const { u, v, w, d, h } of spec.landmarks) {
      const [x, y] = cellAt(u, v);
      expect(buildings, `landmark u=${u}, v=${v}`).toContainEqual(
        expect.objectContaining({ x, y, w, d, h, lot: false }),
      );
    }
  });

  it('gives every lot a ghost block on the grid, and every drop a positive height', () => {
    const lots = buildings.filter(({ lot }) => lot);
    expect(lots).toHaveLength(spec.lots.length);
    for (const { x, y } of lots) {
      expect(Number.isInteger(x) && Number.isInteger(y)).toBe(true);
    }
    for (const lot of spec.lots) {
      expect(lot.drops.length).toBeGreaterThan(0);
      expect(lot.drops.every((drop) => drop > 0)).toBe(true);
    }
  });
});

describe('spec validation', () => {
  const base = SKYLINES[0].spec;
  const layout = (spec: SkylineSpec): Building[] => layoutOf(spec);

  it('rejects a lot that is off the grid lattice (u + v odd)', () => {
    expect(() => layout({ ...base, lots: [{ u: 1, v: 0, drops: [1] }] })).toThrow(
      /Lot at u=1, v=0 is not a free grid cell/,
    );
  });

  it('rejects a lot outside the grid or on top of another lot', () => {
    expect(() => layout({ ...base, lots: [{ u: 0, v: base.rows, drops: [1] }] })).toThrow(
      /not a free grid cell/,
    );
    expect(() =>
      layout({
        ...base,
        lots: [
          { u: 0, v: 2, drops: [1] },
          { u: 0, v: 2, drops: [1] },
        ],
      }),
    ).toThrow(/not a free grid cell/);
  });

  it('rejects a landmark that cannot be placed instead of silently dropping it', () => {
    expect(() =>
      layout({ ...base, lots: [], landmarks: [{ u: 1, v: 0, w: 2, d: 2, h: 2 }] }),
    ).toThrow(/Landmark at u=1, v=0 .* does not fit/);
    expect(() =>
      layout({
        ...base,
        lots: [{ u: 0, v: 2, drops: [1] }],
        landmarks: [{ u: 0, v: 2, w: 1, d: 1, h: 2 }],
      }),
    ).toThrow(/does not fit/);
  });

  it('rejects openPlotChance that does not cover every back row', () => {
    expect(() => layout({ ...base, openPlotChance: [0.5] })).toThrow(/openPlotChance needs one entry/);
  });
});
