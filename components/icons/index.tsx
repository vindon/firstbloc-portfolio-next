import type { ReactNode } from 'react';

export const productIcons: Record<string, ReactNode> = {
  pulseguard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4.5 6v5.2c0 5 3.2 8.6 7.5 9.8 4.3-1.2 7.5-4.8 7.5-9.8V6z" />
      <line x1="12" y1="10" x2="12" y2="13.5" />
      <circle cx="12" cy="16" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  'call-intelligence': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5.5 5.5L15 14l5 2v3a2 2 0 0 1-2 2C10 21 3 14 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  signalharvest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12V6.5" />
      <path d="M8.5 12a3.5 3.5 0 0 1 7 0" />
      <path d="M5.5 12a6.5 6.5 0 0 1 13 0" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  ),
  cfpb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <line x1="9.5" y1="12.5" x2="15" y2="12.5" />
      <line x1="9.5" y1="16" x2="15" y2="16" />
    </svg>
  ),
  'rag-portfolio': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 3.5 8l8.5 5 8.5-5z" />
      <path d="M3.5 12l8.5 5 8.5-5" />
      <path d="M3.5 16l8.5 5 8.5-5" />
    </svg>
  ),
  'shanti-news': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="14" rx="1.5" />
      <line x1="7" y1="9" x2="17" y2="9" />
      <line x1="7" y1="12.5" x2="17" y2="12.5" />
      <line x1="7" y1="16" x2="13" y2="16" />
    </svg>
  ),
  'founder-research': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.2" y1="15.2" x2="20" y2="20" />
    </svg>
  ),
  clearspend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="6" width="17" height="13" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M14.5 14.5h3.5" />
    </svg>
  ),
};

export const solutionIcons: Record<string, ReactNode> = {
  strategy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.2 13 13l-3.8 1.8L11 11z" />
    </svg>
  ),
  product: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.2" />
      <g>
        <line x1="12" y1="6.5" x2="12" y2="4.5" />
        <line x1="12" y1="19.5" x2="12" y2="17.5" />
        <line x1="6.5" y1="12" x2="4.5" y2="12" />
        <line x1="19.5" y1="12" x2="17.5" y2="12" />
        <line x1="8.4" y1="8.4" x2="7" y2="7" />
        <line x1="17" y1="17" x2="15.6" y2="15.6" />
        <line x1="15.6" y1="8.4" x2="17" y2="7" />
        <line x1="7" y1="17" x2="8.4" y2="15.6" />
      </g>
    </svg>
  ),
  contract: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="11.5" rx="1.6" />
      <path d="M9 8V6.2A2.2 2.2 0 0 1 11.2 4h1.6A2.2 2.2 0 0 1 15 6.2V8" />
      <line x1="4" y1="13.5" x2="20" y2="13.5" />
    </svg>
  ),
};
