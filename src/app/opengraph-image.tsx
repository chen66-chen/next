import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const dynamic = 'force-static'

export const alt = '小臣 (Blog)'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to right, #516580, #213954, #23232c)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.4)',
          padding: '40px 60px',
          borderRadius: '20px',
        }}>
          <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 16 }}>
            小臣
          </div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>
            Blog
          </div>
          <div style={{ fontSize: 32, opacity: 0.8 }}>
            多种风格的完美融合
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
