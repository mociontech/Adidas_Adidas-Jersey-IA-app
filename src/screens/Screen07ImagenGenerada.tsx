import { useNavigate } from 'react-router-dom'

const imgBg = 'https://www.figma.com/api/mcp/asset/1b12c0a1-2a80-40f2-940e-9898d3000bb6'
const imgMask = 'https://www.figma.com/api/mcp/asset/8c5e24d1-6a1d-4467-a962-74a5278a51b7'

export default function Screen07ImagenGenerada() {
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

      {/* Title */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 40,
          whiteSpace: 'nowrap',
          left: '50%',
          top: 230,
          transform: 'translateX(-50%)',
        }}
      >
        Pantalla de imagen generada
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

      {/* Action buttons */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 80,
          alignItems: 'center',
        }}
      >
        {/* REPETIR button */}
        <button
          onClick={() => navigate('/foto')}
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" fill="#1B1B1B" />
          </svg>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 20, color: 'white', marginTop: 12, position: 'absolute', bottom: -36 }}>
            REPETIR
          </span>
        </button>

        {/* SIGUIENTE button */}
        <button
          onClick={() => navigate('/gracias')}
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: '#06adbf',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="white" />
          </svg>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 20, color: 'white', position: 'absolute', bottom: -36 }}>
            SIGUIENTE
          </span>
        </button>
      </div>
    </div>
  )
}
