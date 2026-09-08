import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyStack from './MyStack';

describe('MyStack', () => {
  it('renders the page head and stack categories', () => {
    render(<MyStack />);
    expect(screen.getByRole('heading', { level: 1, name: 'My Stack' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AI & Agents' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Infra & Delivery' })).toBeInTheDocument();
  });

  it('renders a deploy entry for every real product with a live or building demo', () => {
    render(<MyStack />);
    expect(screen.getByRole('heading', { name: 'PulseGuard AI' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Telecom Call Intelligence' })).toBeInTheDocument();
    // Founder Research Intelligence Engine has nothing deployed anywhere yet.
    expect(screen.queryByRole('heading', { name: 'Founder Research Intelligence Engine' })).not.toBeInTheDocument();
  });
});
