import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgBg = 'https://www.figma.com/api/mcp/asset/f10ed406-1d39-43d8-8d8b-694b3187a437'
const imgMask = 'https://www.figma.com/api/mcp/asset/4bde7a33-873f-4cad-a3c0-74a357ceac89'

export default function Screen05Countdown() {
  const navigate = useNavigate()
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count <= 0) {
      navigate('/espera')
      return
    }
    const t = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count, navigate])

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
          fontSize: 48,
          whiteSpace: 'nowrap',
          left: '50%',
          top: 220,
          transform: 'translateX(-50%)',
        }}
      >
        ¡SONRÍE Y NO TE MUEVAS!
      </div>

      {/* Countdown number */}
      <div
        className="absolute text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 800,
          fontSize: 700,
          color: 'rgba(255,255,255,0.6)',
          textShadow: '0px 4px 60px rgba(0,0,0,0.5)',
          lineHeight: 1,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -55%)',
          userSelect: 'none',
        }}
      >
        {count > 0 ? count : ''}
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
    </div>
  )
}
