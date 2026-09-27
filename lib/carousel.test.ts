import { describe, it, expect } from 'vitest';
import { clampIndex, computeActiveIndex, computeScrollTarget } from './carousel';

describe('computeActiveIndex', () => {
  it('forces index 0 at the scroll start regardless of ratios', () => {
    expect(computeActiveIndex([0, 1, 1], 0, 200)).toBe(0);
  });

  it('forces the last index at the scroll end regardless of ratios', () => {
    expect(computeActiveIndex([1, 1, 0], 200, 200)).toBe(2);
  });

  it('picks the index with the highest ratio in the interior', () => {
    expect(computeActiveIndex([0.2, 0.9, 0.4], 50, 200)).toBe(1);
  });

  it('breaks ties in favor of the lower index', () => {
    expect(computeActiveIndex([0.5, 0.5, 0], 50, 200)).toBe(0);
  });

  it('stays stuck at the last card once scroll settles at max scroll', () => {
    // Regression: both the second-to-last and last card can report identical
    // ratios once the smooth scroll animation settles, which used to leave
    // the carousel stuck one card short of the end.
    expect(computeActiveIndex([0, 0, 1, 1], 199, 200)).toBe(3);
  });
});

describe('clampIndex', () => {
  it('clamps below zero up to zero', () => {
    expect(clampIndex(-3, 5)).toBe(0);
  });

  it('clamps above the last index down to the last index', () => {
    expect(clampIndex(99, 5)).toBe(4);
  });

  it('passes through an in-range index unchanged', () => {
    expect(clampIndex(2, 5)).toBe(2);
  });
});

describe('computeScrollTarget', () => {
  const base = {
    cardOffsetLeft: 320,
    cardOffsetWidth: 280,
    trackOffsetLeft: 0,
    trackClientWidth: 600,
    trackScrollLeft: 0,
    maxScroll: 900,
    clampedIndex: 2,
    activeIndex: 1,
    cardStep: 300,
  };

  it('centers the target card within the visible track', () => {
    const target = computeScrollTarget(base);
    // rawTarget = 320 - 0 - (600 - 280) / 2 = 160
    expect(target).toBe(160);
  });

  it('clamps the target to maxScroll', () => {
    const target = computeScrollTarget({ ...base, cardOffsetLeft: 2000 });
    expect(target).toBe(900);
  });

  it('clamps the target to zero', () => {
    // rawTarget = 50 - 0 - (600 - 280) / 2 = -110 -> clamps to 0.
    // trackScrollLeft is kept away from 0 so this doesn't also trip the
    // step-fallback branch (covered separately below).
    const target = computeScrollTarget({ ...base, cardOffsetLeft: 50, trackScrollLeft: 50 });
    expect(target).toBe(0);
  });

  it('steps by one card width when the centered target would be a no-op going forward', () => {
    // Regression: at the fully-scrolled-right end, a card's own centered
    // position can fall past maxScroll and clamp back to where we already
    // are, making "next" a no-op.
    const target = computeScrollTarget({
      ...base,
      trackScrollLeft: 900,
      maxScroll: 900,
      cardOffsetLeft: 2000, // clamps to 900, same as current scrollLeft -> would be a no-op
      clampedIndex: 3,
      activeIndex: 2,
    });
    expect(target).toBe(900); // clamped: 900 + cardStep would overshoot maxScroll
  });

  it('steps by one card width in the requested direction when going backward', () => {
    const target = computeScrollTarget({
      ...base,
      trackScrollLeft: 300,
      maxScroll: 900,
      cardOffsetLeft: 460, // rawTarget = 460 - 0 - 160 = 300, same as current scrollLeft -> would be a no-op
      clampedIndex: 0,
      activeIndex: 1,
    });
    expect(target).toBe(0); // 300 - cardStep(300)
  });
});
