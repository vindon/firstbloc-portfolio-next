import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FieldNotes from './FieldNotes';
import { fieldNotes } from '@/lib/fieldnotes';

describe('FieldNotes', () => {
  it('renders the page head', () => {
    render(<FieldNotes />);
    expect(screen.getByRole('heading', { level: 1, name: 'Field Notes' })).toBeInTheDocument();
  });

  it('renders every note with its project, title, and all four sections', () => {
    render(<FieldNotes />);
    for (const note of fieldNotes) {
      expect(screen.getByText(note.project)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: note.title })).toBeInTheDocument();
    }
    expect(screen.getAllByText('What happened').length).toBe(fieldNotes.length);
    expect(screen.getAllByText('Why').length).toBe(fieldNotes.length);
    expect(screen.getAllByText('The fix').length).toBe(fieldNotes.length);
    expect(screen.getAllByText('Lesson').length).toBe(fieldNotes.length);
  });
});
