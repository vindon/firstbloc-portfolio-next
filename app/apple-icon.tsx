import { ImageResponse } from 'next/og';
import BrandPrism from '@/lib/brandPrism';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1F1F1F',
        }}
      >
        <BrandPrism size={112} />
      </div>
    ),
    { ...size }
  );
}
