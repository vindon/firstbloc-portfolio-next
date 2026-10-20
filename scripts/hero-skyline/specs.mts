import type { Envelope, SkylineSpec } from './layout.mts';

type Peak = readonly [centre: number, height: number, spread: number];

/** A flat `base` height with smooth bumps of `height` modules at each peak's `centre`. */
const gaussianEnvelope =
  (base: number, peaks: readonly Peak[]): Envelope =>
  (u) =>
    base +
    peaks.reduce(
      (sum, [centre, height, spread]) => sum + height * Math.exp(-Math.pow((u - centre) / spread, 2)),
      0,
    );

/** Shared by all three breakpoints so they are recognisably the same city at different sizes. */
const SHARED = {
  seed: 57,
  openPlotChance: [0.5, 0.4, 0.2],
  maxWidth: 4,
  maxHeight: 3,
} as const;

export type SkylineFile = {
  /** File name inside app/hero-skyline, referenced from app/globals.css. */
  readonly file: string;
  readonly spec: SkylineSpec;
};

/**
 * One composition per breakpoint, not a crop of one image: the desktop layout would push its drop
 * cubes into the copy at narrower widths. Sizes match the aspect ratios in `.hero-skyline`.
 *
 * Small cluster on the left, tallest towers on the right, low in the middle where the copy sits.
 */
export const SKYLINES: readonly SkylineFile[] = [
  {
    file: 'skyline-desktop.svg',
    spec: {
      ...SHARED,
      width: 1600,
      height: 900,
      module: 50,
      halfSpan: 22,
      rows: 4,
      envelope: gaussianEnvelope(1.1, [
        [-17, 1.2, 2.4],
        [-11, 1.8, 2.2],
        [10.5, 1.0, 2.0],
        [15.5, 2.4, 2.8],
      ]),
      landmarks: [
        { u: 16, v: 0, w: 3, d: 2, h: 3 },
        { u: -12, v: 0, w: 2, d: 2, h: 2 },
      ],
      lots: [
        { u: -15, v: 3, drops: [4.4] },
        { u: 13, v: 3, drops: [2.8] },
        { u: 0, v: 2, drops: [1.3] },
      ],
    },
  },
  {
    file: 'skyline-tablet.svg',
    spec: {
      ...SHARED,
      width: 900,
      height: 1000,
      module: 40,
      halfSpan: 13,
      rows: 4,
      envelope: gaussianEnvelope(1.1, [
        [-12, 1.6, 2.4],
        [-6, 1.0, 2],
        [5, 0.5, 2],
        [11.5, 2.0, 2.6],
      ]),
      landmarks: [
        { u: 12, v: 0, w: 2, d: 2, h: 3 },
        { u: -8, v: 0, w: 2, d: 2, h: 2 },
      ],
      lots: [
        { u: -11, v: 3, drops: [3.6] },
        { u: 11, v: 3, drops: [2.2] },
        { u: 0, v: 2, drops: [1.3] },
      ],
    },
  },
  {
    file: 'skyline-mobile.svg',
    spec: {
      ...SHARED,
      width: 480,
      height: 900,
      module: 32,
      halfSpan: 10,
      rows: 4,
      envelope: gaussianEnvelope(1.1, [
        [-7.5, 1.4, 1.8],
        [-3, 1.0, 1.6],
        [2, 0.5, 2],
        [7, 2.0, 1.8],
      ]),
      landmarks: [
        { u: 8, v: 0, w: 2, d: 2, h: 3 },
        { u: -6, v: 0, w: 2, d: 2, h: 2 },
      ],
      lots: [
        { u: -5, v: 3, drops: [2.8] },
        { u: 5, v: 3, drops: [1.8] },
        { u: 0, v: 2, drops: [1.2] },
      ],
    },
  },
];
