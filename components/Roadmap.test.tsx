import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Roadmap from './Roadmap';

describe('Roadmap', () => {
  it('renders the three kanban columns', () => {
    render(<Roadmap />);
    expect(screen.getByRole('heading', { level: 1, name: 'Roadmap' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Shipped/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Building/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Planned/ })).toBeInTheDocument();
  });

  it('places a production-grade product in Shipped and the exploration product in Planned', () => {
    render(<Roadmap />);
    expect(screen.getByRole('heading', { name: 'PulseGuard AI' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Founder Research Intelligence Engine' })).toBeInTheDocument();
  });
});
