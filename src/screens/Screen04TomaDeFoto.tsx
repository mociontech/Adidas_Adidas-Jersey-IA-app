import { useNavigate } from 'react-router-dom'

const imgBg = 'https://www.figma.com/api/mcp/asset/29caec51-8af9-4ed6-92c7-bedd6db4d343'
const imgMask = 'https://www.figma.com/api/mcp/asset/078d226a-66e1-4b8d-bc25-c85c5ccf0f4b'

export default function Screen04TomaDeFoto() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Background photo */}
      <img
        src={imgBg}
        alt=""
        style={{
          position: 'absolute',
          width: 1281,
          height: 1920,
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          width: 1204,
          height: 1495,
          background: 'linear-gradient(to bottom, black, rgba(217,217,217,0))',
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />

      {/* Title text */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 48,
          whiteSpace: 'nowrap',
          left: '50%',
          top: 220,
          transform: 'translateX(-50%)',
        }}
      >
        ¡PREPÁRATE PARA LA FOTO!
      </div>

      {/* Frame mask overlay */}
      <img
        src={imgMask}
        alt=""
        style={{
          position: 'absolute',
          width: 1080,
          height: 1920,
          left: 0,
          top: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Tap to take photo */}
      <button
        onClick={() => navigate('/countdown')}
        style={{
          position: 'absolute',
          bottom: 120,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'white',
          border: '8px solid rgba(255,255,255,0.5)',
          cursor: 'pointer',
          outline: 'none',
        }}
      />
    </div>
  )
}
