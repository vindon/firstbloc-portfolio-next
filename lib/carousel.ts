// Multi-threshold + max-ratio-wins: at desktop widths, two cards can be
// simultaneously visible, so a single threshold can fire on more than one
// card in the same viewport. Tracking each card's latest ratio and picking
// the highest keeps the active index correct regardless of how many cards
// are visible at once. Scroll-boundary detection is checked first (forces
// index 0/last at the true start/end) since ratio ties are unavoidable
// there at wide viewports; ratio-tiebreak handles interior positions. Ties
// (equal ratios) favor the lower index, which in practice means the
// leading/most-progressed card wins.
export function computeActiveIndex(ratios: number[], scrollLeft: number, maxScroll: number): number {
  if (scrollLeft <= 1) return 0;
  if (scrollLeft >= maxScroll - 1) return ratios.length - 1;

  let maxIndex = 0;
  let maxRatio = -1;
  ratios.forEach((ratio, i) => {
    if (ratio > maxRatio) {
      maxRatio = ratio;
      maxIndex = i;
    }
  });
  return maxIndex;
}

export function clampIndex(index: number, length: number): number {
  return Math.max(0, Math.min(index, length - 1));
}

export type ScrollTargetInput = {
  cardOffsetLeft: number;
  cardOffsetWidth: number;
  trackOffsetLeft: number;
  trackClientWidth: number;
  trackScrollLeft: number;
  maxScroll: number;
  clampedIndex: number;
  activeIndex: number;
  /** Distance between two adjacent cards' offsetLeft, used by the step fallback below. */
  cardStep: number;
};

export function computeScrollTarget(input: ScrollTargetInput): number {
  const {
    cardOffsetLeft,
    cardOffsetWidth,
    trackOffsetLeft,
    trackClientWidth,
    trackScrollLeft,
    maxScroll,
    clampedIndex,
    activeIndex,
    cardStep,
  } = input;

  // Cards are centered (scroll-snap-align: center), so the scroll target is
  // the card's offset minus half the leftover space between the card and
  // the track's visible width - not a flush-left offset.
  const rawTarget = cardOffsetLeft - trackOffsetLeft - (trackClientWidth - cardOffsetWidth) / 2;
  const clampedTarget = Math.max(0, Math.min(rawTarget, maxScroll));

  // At either end of the track, more than one card can be fully visible at
  // once, so a card's own "flush-left" scroll position can fall past what's
  // actually scrollable and clamp back onto wherever we already are — e.g.
  // clicking "prev" from the fully-scrolled-right state was a no-op, because
  // the target card's true offset exceeded maxScroll and clamped straight
  // back to the current position. When the clamped target doesn't move us
  // but the caller asked for a different index, step by one card-width in
  // the requested direction instead, so navigation always makes visible
  // progress.
  if (Math.abs(clampedTarget - trackScrollLeft) < 2 && clampedIndex !== activeIndex) {
    const direction = clampedIndex > activeIndex ? 1 : -1;
    return Math.max(0, Math.min(trackScrollLeft + direction * cardStep, maxScroll));
  }

  return clampedTarget;
}
