import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'

export default function Screen08Agradecimiento() {
  const navigate = useNavigate()
  const { generatedImage } = useTryOn()

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      {/* Title */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: 600,
          fontSize: 88,
          lineHeight: '1.15',
          width: 820,
          left: '50%',
          top: 160,
          transform: 'translateX(-50%)',
        }}
      >
        ¡Tu foto está lista!
      </div>

      {/* Generated image preview */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 420,
          transform: 'translateX(-50%)',
          width: 520,
          height: 740,
          borderRadius: 36,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.15)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}
      >
        {generatedImage ? (
          <img
            src={generatedImage}
            alt="Foto generada"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontSize: 28,
              color: 'rgba(255,255,255,0.6)',
              textAlign: 'center',
              padding: 40,
            }}
          >
            Vista previa de tu foto
          </div>
        )}
      </div>

      {/* CTA label */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 600,
          fontSize: 38,
          width: 820,
          left: '50%',
          top: 1200,
          transform: 'translateX(-50%)',
        }}
      >
        ¿Cómo quieres tu foto?
      </div>

      {/* Foto digital button */}
      <button
        onClick={() => navigate('/qr')}
        style={{
          position: 'absolute',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 42,
          background: 'transparent',
          color: 'white',
          width: 855,
          height: 120,
          left: '50%',
          top: 1330,
          transform: 'translateX(-50%)',
          border: '2.5px solid rgba(255,255,255,0.7)',
          borderRadius: 24,
          cursor: 'pointer',
        }}
      >
        Foto digital
      </button>

      {/* Imprimir button */}
      <button
        onClick={() => navigate('/ticket')}
        style={{
          position: 'absolute',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 42,
          background: '#06adbf',
          color: 'white',
          width: 855,
          height: 120,
          left: '50%',
          top: 1480,
          transform: 'translateX(-50%)',
          border: 'none',
          borderRadius: 24,
          cursor: 'pointer',
        }}
      >
        Imprimir
      </button>
    </div>
  )
}
