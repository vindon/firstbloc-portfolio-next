import { ImageResponse } from 'next/og';
import { isComingSoon } from '@/lib/site';

export const alt = 'firstbloc — Enterprise AI Strategy, Agentic Systems & CX Automation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// This gradient literal must stay in sync with --gradient-warm in
// app/globals.css by hand — this file renders through a separate
// Satori/next-og pipeline that has no access to the site's CSS.
const gradientWarm = 'linear-gradient(160deg, #FFF8F0 0%, #FFFFFF 55%, #FDEEE4 100%)';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: gradientWarm,
        }}
      >
        <div style={{ display: 'flex', fontSize: 32, fontWeight: 800, color: '#1F1F1F', letterSpacing: -1.5 }}>
          firstbloc
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 800,
            color: '#1F1F1F',
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.1,
          }}
        >
          {isComingSoon ? 'New site launching soon.' : 'Bridging Enterprise Reality with Production AI Systems.'}
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#5B564C', marginTop: 24, maxWidth: 900 }}>
          Vinoth Nataraj — Enterprise AI Strategy, Agentic Systems &amp; CX Automation
        </div>
      </div>
    ),
    { ...size }
  );
}
