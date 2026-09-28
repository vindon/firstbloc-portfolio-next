export type FaceKind = 'top' | 'left' | 'right';

/** Colour stops from the start of a ramp to its end, as `#RRGGBB`. */
export type Ramp = readonly string[];

export type Palette = Readonly<Record<FaceKind, Ramp>>;

/**
 * The block pigments: a light-catching top, a saturated right face and a deep left face that warms
 * towards the base. Each is a ramp (base, mid, highlight), not one flat hex, so a block reads as lit
 * material. Keep in step with the accent tokens in app/globals.css.
 */
export const BLOCK_PALETTE: Palette = {
  top: ['#FFDDC2', '#FFB27A', '#FF8A4C'],
  right: ['#FF7A3D', '#FF4800', '#C93700'],
  left: ['#B23000', '#E8560F', '#FF8A4C'],
};

const channels = (hex: string): [number, number, number] => [
  Number.parseInt(hex.slice(1, 3), 16),
  Number.parseInt(hex.slice(3, 5), 16),
  Number.parseInt(hex.slice(5, 7), 16),
];

const toHex = (rgb: readonly number[]): string =>
  '#' +
  rgb
    .map((channel) =>
      Math.round(Math.max(0, Math.min(255, channel))).toString(16).padStart(2, '0'),
    )
    .join('');

/** The colour at position `t` (clamped to 0..1) along a ramp, blended linearly between stops. */
export function rampColor(ramp: Ramp, t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const segments = ramp.length - 1;
  const index = Math.min(segments - 1, Math.floor(clamped * segments));
  const fraction = clamped * segments - index;
  const from = channels(ramp[index]);
  const to = channels(ramp[index + 1]);
  return toHex(from.map((channel, i) => channel + (to[i] - channel) * fraction));
}
