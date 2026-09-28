import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { layoutSkyline, type Building, type SkylineSpec } from './layout.mts';
import { rampColor } from './palette.mts';
import { createRandom } from './random.mts';
import { renderSkyline } from './render.mts';
import { SKYLINES } from './specs.mts';

const ASSET_DIR = path.resolve(__dirname, '../../app/hero-skyline');

const layoutOf = (spec: SkylineSpec): Building[] =>
  layoutSkyline(spec, createRandom(spec.seed));

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
    const cells = buildings.flatMap(({ x, y, w, d }) =>
      Array.from({ length: w * d }, (_, i) => `${x + (i % w)},${y + Math.floor(i / w)}`),
    );
    expect(new Set(cells).size).toBe(cells.length);
  });

  it('keeps every building inside the grid', () => {
    for (const { x, y, w, d } of buildings) {
      for (const [cx, cy] of [
        [x, y],
        [x + w - 1, y + d - 1],
      ]) {
        expect(cx + cy).toBeGreaterThanOrEqual(0);
        expect(cx + cy).toBeLessThan(spec.rows);
        expect(Math.abs(cx - cy)).toBeLessThanOrEqual(spec.halfSpan);
      }
    }
  });

  it('builds the whole front row, so nothing floats above the bottom edge', () => {
    const covered = new Set(
      buildings.flatMap(({ x, y, w, d }) =>
        Array.from({ length: w * d }, (_, i) => `${x + (i % w)},${y + Math.floor(i / w)}`),
      ),
    );
    const frontRow = spec.rows - 1;
    for (let u = -spec.halfSpan; u <= spec.halfSpan; u++) {
      if (Math.abs((u + frontRow) % 2) === 1) continue;
      const x = (frontRow + u) / 2;
      const y = (frontRow - u) / 2;
      expect(covered.has(`${x},${y}`), `front-row cell u=${u} is empty`).toBe(true);
    }
  });

  it('respects the height cap, except for hand-placed landmarks', () => {
    const tallestLandmark = Math.max(0, ...spec.landmarks.map((landmark) => landmark.h));
    const cap = Math.max(spec.maxHeight, tallestLandmark);
    expect(buildings.filter(({ lot }) => !lot).every(({ h }) => h <= cap)).toBe(true);
  });

  it('gives every lot a ghost block and every drop a positive height', () => {
    expect(buildings.filter(({ lot }) => lot)).toHaveLength(spec.lots.length);
    for (const lot of spec.lots) {
      expect(lot.drops.length).toBeGreaterThan(0);
      expect(lot.drops.every((drop) => drop > 0)).toBe(true);
    }
  });
});
