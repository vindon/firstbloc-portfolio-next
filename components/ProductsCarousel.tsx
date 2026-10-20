'use client';

import { useEffect, useRef, useState } from 'react';
import { products } from '@/lib/products';
import { clampIndex, computeActiveIndex, computeScrollTarget } from '@/lib/carousel';
import ProductCard from './ProductCard';

export default function ProductsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ratiosRef = useRef<number[]>(new Array(products.length).fill(0));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateActiveIndex = () => {
      const trackEl = trackRef.current;
      if (!trackEl) return;

      const maxScroll = trackEl.scrollWidth - trackEl.clientWidth;
      setActiveIndex(computeActiveIndex(ratiosRef.current, trackEl.scrollLeft, maxScroll));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.findIndex((el) => el === entry.target);
          if (index !== -1) {
            ratiosRef.current[index] = entry.intersectionRatio;
          }
        });
        updateActiveIndex();
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    // The scroll listener is required. At the maximum scroll position, both card 4 and
    // card 5 are simultaneously visible in the viewport with identical intersection
    // ratios (both 100% visible). The IntersectionObserver fires during the smooth
    // scroll animation as thresholds cross, but the ratio-tiebreak logic consistently
    // favors card 4 (lower index) due to how ratios stabilize during animation. When
    // the smooth scroll completes and settles at max scroll, the observer no longer
    // fires (no threshold changes), leaving the carousel stuck at index 4. The scroll
    // listener ensures updateActiveIndex() checks the final scroll position via the
    // explicit boundary detection (scrollLeft >= maxScroll - 1 → force index 5).
    const handleScroll = () => {
      updateActiveIndex();
    };

    track.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const clampedIndex = clampIndex(index, products.length);
    const track = trackRef.current;
    const card = cardRefs.current[clampedIndex];
    if (!card || !track) return;

    const firstCard = cardRefs.current[0];
    const secondCard = cardRefs.current[1];
    const cardStep = firstCard && secondCard ? secondCard.offsetLeft - firstCard.offsetLeft : card.offsetWidth;

    const target = computeScrollTarget({
      cardOffsetLeft: card.offsetLeft,
      cardOffsetWidth: card.offsetWidth,
      trackOffsetLeft: track.offsetLeft,
      trackClientWidth: track.clientWidth,
      trackScrollLeft: track.scrollLeft,
      maxScroll: track.scrollWidth - track.clientWidth,
      clampedIndex,
      activeIndex,
      cardStep,
    });

    track.scrollTo({ left: target, behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  };

  return (
    <section id="products">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="kicker">Products</p>
          <h2>Six systems. Six real problems. Built to ship.</h2>
          <p>Every product here started from a specific operational gap I saw firsthand in telecom CX or financial services.</p>
        </div>

        <div className="carousel-outer">
          <div
            className="carousel-track"
            ref={trackRef}
            role="region"
            aria-label="Products carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {products.map((product, i) => (
              <div
                className="carousel-card-wrap reveal"
                key={product.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-arrow"
              aria-label="Previous product"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="carousel-dots">
              {products.map((product, i) => (
                <button
                  type="button"
                  key={product.id}
                  className={`carousel-dot${i === activeIndex ? ' active' : ''}`}
                  aria-label={`Go to ${product.title}`}
                  aria-current={i === activeIndex}
                  onClick={() => scrollToIndex(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="carousel-arrow"
              aria-label="Next product"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === products.length - 1}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
