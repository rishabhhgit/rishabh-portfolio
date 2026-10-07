import { ImageResponse } from 'next/og';

export const alt = 'Rishabh Jain — UI/UX Designer & Product Designer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#080809',
          color: '#ffffff',
          backgroundImage:
            'radial-gradient(circle at 85% -20%, rgba(16,185,129,0.16), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#04120c',
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            RJ
          </div>
          <span style={{ fontSize: 24, color: '#a1a1aa', letterSpacing: 5 }}>
            RISHABH JAIN
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -2,
            }}
          >
            Designing interfaces for
            <br />
            complex digital products.
          </span>
          <span style={{ display: 'flex', fontSize: 25, color: '#10b981' }}>
            UI/UX Designer · Product Designer · Creative Developer
          </span>
        </div>
      </div>
    ),
    size,
  );
}
