import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the headline and proof badge', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Bridging Enterprise Reality with Production AI Systems/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/6 multi-agent, production-grade AI systems shipped/)
    ).toBeInTheDocument();
  });

  it('renders the skyline as decorative art hidden from assistive tech', () => {
    const { container } = render(<Hero />);
    const skyline = container.querySelector('.hero-skyline');
    expect(skyline).toBeInTheDocument();
    expect(skyline).toHaveAttribute('aria-hidden', 'true');
    // Pure CSS background: no image element, so nothing to alt-text or announce.
    expect(skyline).toBeEmptyDOMElement();
  });
});
