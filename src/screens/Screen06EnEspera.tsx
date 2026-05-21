import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Screen06EnEspera() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/resultado'), 4000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      {/* Frosted glass card */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 903,
          height: 1740,
          background: 'rgba(217,217,217,0.2)',
          borderRadius: 68,
        }}
      />

      {/* Main message */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: 600,
          fontSize: 96,
          lineHeight: '1.2',
          width: 815,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -60%)',
        }}
      >
        En espera de procesamiento de fotografía
      </div>

      {/* Loading dots */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, 40px)',
          display: 'flex',
          gap: 20,
        }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.7)',
              animation: `pulse 1.2s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Bottom reminder */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 48,
          lineHeight: '1.3',
          left: '50%',
          top: 1498,
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}
      >
        <div>NO TE OLVIDES DE RECOGER</div>
        <div>TU FOTO EN CAJA</div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
