import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// next/script remembers every src it has loaded for the life of the process,
// so whether a beacon <script> appears would depend on test order. A plain
// <script> stand-in makes "the beacon is (or is not) rendered" deterministic.
vi.mock('next/script', () => ({
  default: (props: { src: string }) => <script data-testid="beacon" src={props.src} />,
}));

async function loadComponent() {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_CF_BEACON_TOKEN', 'test-token');
  const mod = await import('./CookieConsent');
  return mod.default;
}

// Browsers throw on localStorage access when site data is blocked
// (SecurityError) or storage is full (QuotaExceededError). The banner must
// keep working instead of taking the page down with it.
describe('CookieConsent when browser storage throws', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('shows the banner instead of crashing when reading the stored choice fails', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Access is denied', 'SecurityError');
    });
    const CookieConsent = await loadComponent();
    render(<CookieConsent />);

    expect(await screen.findByRole('region', { name: /cookie notice/i })).toBeInTheDocument();
  });

  it('still hides the banner and loads the beacon when saving an accepted choice fails', async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError');
    });
    const CookieConsent = await loadComponent();
    render(<CookieConsent />);

    await user.click(await screen.findByRole('button', { name: 'Accept' }));

    expect(screen.queryByRole('region', { name: /cookie notice/i })).not.toBeInTheDocument();
    expect(screen.getByTestId('beacon')).toHaveAttribute('src', expect.stringContaining('cloudflareinsights'));
  });

  it('still hides the banner without loading the beacon when saving a declined choice fails', async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError');
    });
    const CookieConsent = await loadComponent();
    render(<CookieConsent />);

    await user.click(await screen.findByRole('button', { name: 'Decline' }));

    expect(screen.queryByRole('region', { name: /cookie notice/i })).not.toBeInTheDocument();
    expect(screen.queryByTestId('beacon')).not.toBeInTheDocument();
  });
});
