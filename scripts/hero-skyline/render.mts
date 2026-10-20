import { COS_30, drawBox, type Box } from './isometric.mts';
import { BLOCK_PALETTE } from './palette.mts';
import { layoutSkyline, type Building, type SkylineSpec } from './layout.mts';
import { createRandom } from './random.mts';

/** Back-row buildings this much lighter, so the far row recedes. Tall towers keep full colour. */
const BACK_ROW_HAZE = 0.16;
const HAZE_BELOW_HEIGHT = 4;

/** Faint isometric dot grid behind the blocks, the "drawing board" the city is planned on. */
const DOT_GRID_DEFS =
  '<defs><pattern id="dg" width="32" height="18.475" patternUnits="userSpaceOnUse">' +
  '<circle cx="0" cy="0" r="1" fill="#1F1F1F" fill-opacity=".12"/>' +
  '<circle cx="16" cy="9.24" r="1" fill="#1F1F1F" fill-opacity=".12"/>' +
  '</pattern></defs>';

const UNIT_CUBE = { x: 0, y: 0, z: 0, w: 1, d: 1, h: 1 } as const satisfies Box;

/** Renders one breakpoint's skyline as a standalone, script-free SVG document. */
export function renderSkyline(spec: SkylineSpec): string {
  const { width, height, module: s, rows } = spec;
  const random = createRandom(spec.seed);
  const buildings = layoutSkyline(spec, random);

  // Grid origin: the front row's lower corner sits just past the bottom edge, so it reads as cropped.
  const originY = height + 24 - (rows - 1 + 2) * 0.5 * s;
  const origin = { x: width / 2, y: originY, s };

  const tallest = Math.max(...buildings.map((building) => building.h));
  const yRange = [originY - tallest * s, originY + (rows + 1) * 0.5 * s] as const;

  const parts: string[] = [`<rect width="${width}" height="${height}" fill="url(#dg)"/>`];

  for (const building of buildings) {
    parts.push(...drawBuilding(building, origin, yRange));
  }

  // Cubes dropping into the lots: same module, on the lot's centre line, with a dashed guide.
  for (const lot of spec.lots) {
    const centreX = width / 2 + lot.u * COS_30 * s;
    const lotTopY = originY + (lot.v + 1) * 0.5 * s - 1 * s;
    parts.push(
      `<line x1="${centreX}" y1="${lotTopY - 6}" x2="${centreX}" y2="${lotTopY - Math.max(...lot.drops) * s}" stroke="rgba(201,55,0,.5)" stroke-width="1.2" stroke-dasharray="3 5"/>`,
    );
    for (const drop of lot.drops) {
      const cubeY = lotTopY - drop * s - 0.5 * s;
      parts.push(
        ...drawBox({ x: centreX, y: cubeY, s }, UNIT_CUBE, {
          mode: 'solid',
          palette: BLOCK_PALETTE,
          tint: 0,
          seam: 0.18,
        }),
      );
    }
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice">` +
    `${DOT_GRID_DEFS}${parts.join('\n')}</svg>`
  );
}

function drawBuilding(
  building: Building,
  origin: { readonly x: number; readonly y: number; readonly s: number },
  yRange: readonly [min: number, max: number],
): string[] {
  if (building.lot) return drawBox(origin, building, { mode: 'ghost' });

  const receding = building.x + building.y < 1 && building.h < HAZE_BELOW_HEIGHT;
  return drawBox(origin, building, {
    mode: 'solid',
    palette: BLOCK_PALETTE,
    tint: receding ? building.tint + BACK_ROW_HAZE : building.tint,
    seam: 0.07,
    yRange,
  });
}
