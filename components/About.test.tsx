import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders the section heading', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', { name: /Enterprise Rigor Meets Applied Agentic Engineering/ })
    ).toBeInTheDocument();
  });
});
