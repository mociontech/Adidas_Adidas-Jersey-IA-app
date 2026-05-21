import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'
import { jerseys } from '../data/jerseys'

export default function Screen03Select() {
  const navigate = useNavigate()
  const { selectedJersey, selectJersey } = useTryOn()

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 48,
          lineHeight: '1.2',
          width: 700,
          left: '50%',
          top: 100,
          transform: 'translateX(-50%)',
        }}
      >
        SELECCIONA TU JERSEY FAVORITA
      </div>

      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 32,
          width: 900,
          left: '50%',
          top: 270,
          transform: 'translateX(-50%)',
        }}
      >
        Escoge la camiseta que quieres ver puesta sobre tu foto.
      </div>

      <div
        className="absolute"
        style={{ left: 96, top: 403, width: 887, height: 1120 }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 17,
            height: '100%',
          }}
        >
          {jerseys.map((jersey) => (
            <button
              key={jersey.id}
              onClick={() => selectJersey(jersey.id)}
              style={{
                borderRadius: 64,
                overflow: 'hidden',
                cursor: 'pointer',
                border:
                  selectedJersey?.id === jersey.id
                    ? '6px solid white'
                    : '6px solid transparent',
                transition: 'border-color 0.2s',
                position: 'relative',
                background: 'transparent',
                padding: 0,
              }}
            >
              <img
                src={jersey.src}
                alt={jersey.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  bottom: 20,
                  padding: '12px 16px',
                  borderRadius: 20,
                  background: 'rgba(0,0,0,0.55)',
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 24,
                  textAlign: 'center',
                }}
              >
                {jersey.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate('/foto')}
        className="absolute flex items-center justify-center text-white rounded-3xl cursor-pointer"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 50,
          background: '#06adbf',
          width: 855,
          height: 133,
          left: '50%',
          top: 1626,
          transform: 'translateX(-50%)',
          border: 'none',
        }}
      >
        Siguiente
      </button>
    </div>
  )
}
