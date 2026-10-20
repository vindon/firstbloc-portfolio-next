'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

type Status = 'checking' | 'undecided' | 'accepted' | 'declined';

const STORAGE_KEY = 'firstbloc-cookie-consent';
const beaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

// Browsers throw on any localStorage access when site data is blocked
// (SecurityError) and on writes when storage is full (QuotaExceededError).
// Both are routine for visitors, so a failed read means "no stored choice"
// and a failed write only means the choice lasts until the page closes.
function readStoredChoice(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeChoice(value: 'accepted' | 'declined') {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // The in-memory status below still applies this session.
  }
}

export default function CookieConsent() {
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    // Reading localStorage can only happen client-side, and the value must
    // stay out of the initial render (server and client's first pass both
    // render as 'checking') or React throws a hydration mismatch — so this
    // genuinely needs an effect, not a lazy useState initializer or
    // useSyncExternalStore (whose same-tab writes don't fire the storage
    // event needed to pick up this component's own `choose()`).
    const stored = readStoredChoice();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(stored === 'accepted' || stored === 'declined' ? stored : 'undecided');
  }, []);

  const choose = (value: 'accepted' | 'declined') => {
    storeChoice(value);
    setStatus(value);
  };

  if (!beaconToken) return null;

  return (
    <>
      {status === 'accepted' && (
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: beaconToken })}
          strategy="afterInteractive"
        />
      )}
      {status === 'undecided' && (
        <div className="cookie-banner" role="region" aria-label="Cookie notice">
          <p className="cookie-banner-text">
            This site uses Cloudflare Web Analytics to understand traffic — it&apos;s cookieless and
            doesn&apos;t collect any personal data. You can opt out below.
          </p>
          <div className="cookie-banner-actions">
            <button type="button" className="btn-ghost cookie-btn" onClick={() => choose('declined')}>
              Decline
            </button>
            <button type="button" className="btn-primary cookie-btn" onClick={() => choose('accepted')}>
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
