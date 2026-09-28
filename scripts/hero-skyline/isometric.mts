import { rampColor, type FaceKind, type Palette } from './palette.mts';

/** cos(30°), the horizontal foreshortening of an isometric axis. */
export const COS_30 = 0.8660254;

export type Point = readonly [x: number, y: number];
type Vec3 = readonly [x: number, y: number, z: number];

/** Where grid (0, 0, 0) lands on screen, and how many pixels one module is. */
export type Origin = { readonly x: number; readonly y: number; readonly s: number };

/** An axis-aligned block on the grid: corner (x, y, z) and size w × d × h, all in modules. */
export type Box = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly w: number;
  readonly d: number;
  readonly h: number;
};

export type SolidStyle = {
  readonly mode: 'solid';
  readonly palette: Palette;
  /** Shifts the whole block along its ramp, so neighbours stay distinguishable. */
  readonly tint: number;
  /** How far along the ramp the seams between facade cells sit from the cell colour. */
  readonly seam: number;
  /** Screen-y span the ramp is spread over. Defaults to the block's own extent. */
  readonly yRange?: readonly [min: number, max: number];
};

/** A planned, not-yet-built block: pale fill and a dashed outline. */
export type GhostStyle = { readonly mode: 'ghost' };

export type BlockStyle = SolidStyle | GhostStyle;

const GHOST_FILL: Readonly<Record<FaceKind, string>> = {
  top: '#FFFFFF',
  right: '#FFF1E5',
  left: '#FFE6D2',
};

export const project = (o: Origin, x: number, y: number, z: number): Point => [
  o.x + (x - y) * COS_30 * o.s,
  o.y + (x + y) * 0.5 * o.s - z * o.s,
];

const formatPoints = (points: readonly Point[]): string =>
  points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

function polygon(
  corners: readonly Point[],
  fill: string,
  stroke: string,
  strokeWidth: string,
  dash?: string,
): string {
  const dashAttribute = dash ? ` stroke-dasharray="${dash}"` : '';
  return `<polygon points="${formatPoints(corners)}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round"${dashAttribute}/>`;
}

/**
 * One visible face of a block, cut into unit cells (one per module) so every facade reads as stacked
 * blocks on the same grid. `u` and `v` are the face's two edge vectors from corner `origin3`.
 */
function drawFace(
  o: Origin,
  kind: FaceKind,
  origin3: Vec3,
  u: Vec3,
  v: Vec3,
  style: BlockStyle,
  yRange: readonly [min: number, max: number],
): string[] {
  const columns = Math.max(1, Math.round(Math.hypot(...u)));
  const rows = Math.max(1, Math.round(Math.hypot(...v)));
  const at = (a: number, b: number): Point =>
    project(
      o,
      origin3[0] + u[0] * a + v[0] * b,
      origin3[1] + u[1] * a + v[1] * b,
      origin3[2] + u[2] * a + v[2] * b,
    );

  const cells: string[] = [];
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      const u0 = i / columns;
      const v0 = j / rows;
      const u1 = (i + 1) / columns;
      const v1 = (j + 1) / rows;
      const corners = [at(u0, v0), at(u1, v0), at(u1, v1), at(u0, v1)] as const;

      if (style.mode === 'ghost') {
        cells.push(polygon(corners, GHOST_FILL[kind], 'rgba(31,31,31,0.5)', '1', '4 4'));
        continue;
      }
      const middleY = (corners[0][1] + corners[2][1]) / 2;
      const t = (middleY - yRange[0]) / (yRange[1] - yRange[0]) + style.tint;
      cells.push(
        polygon(
          corners,
          rampColor(style.palette[kind], t),
          rampColor(style.palette[kind], t + style.seam),
          '0.7',
        ),
      );
    }
  }
  return cells;
}

/** The three faces a viewer can see (left, right, top), back to front, plus a highlight on solids. */
export function drawBox(o: Origin, box: Box, style: BlockStyle): string[] {
  const { x, y, z, w, d, h } = box;
  const yRange =
    style.mode === 'solid' && style.yRange
      ? style.yRange
      : ([project(o, x, y, z + h)[1], project(o, x + w, y + d, z)[1]] as const);

  const parts = [
    ...drawFace(o, 'left', [x, y + d, z + h], [w, 0, 0], [0, 0, -h], style, yRange),
    ...drawFace(o, 'right', [x + w, y, z + h], [0, d, 0], [0, 0, -h], style, yRange),
    ...drawFace(o, 'top', [x, y, z + h], [w, 0, 0], [0, d, 0], style, yRange),
  ];
  if (style.mode === 'solid') {
    const ridge = [
      project(o, x, y + d, z + h),
      project(o, x + w, y + d, z + h),
      project(o, x + w, y, z + h),
    ];
    parts.push(
      `<polyline points="${formatPoints(ridge)}" fill="none" stroke="rgba(255,244,232,.7)" stroke-width="1.1" stroke-linejoin="round"/>`,
    );
  }
  return parts;
}
