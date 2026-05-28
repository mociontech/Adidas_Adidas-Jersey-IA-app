import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'


export default function Screen07ImagenGenerada() {
  const navigate = useNavigate()
  const { generatedImage, resetTryOn, selectedJersey } = useTryOn()

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, #10122f 0%, #1b1e4d 28%, #eef0ff 28%, #eef0ff 100%)',
        }}
      />

      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 42,
          width: 820,
          left: '50%',
          top: 160,
          transform: 'translateX(-50%)',
        }}
      >
        Tu foto con try-on esta lista
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 330,
          transform: 'translateX(-50%)',
          width: 820,
          height: 1140,
          borderRadius: 48,
          overflow: 'hidden',
          background: '#d9d9d9',
          boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
        }}
      >
        {generatedImage ? (
          <img
            src={generatedImage}
            alt="Resultado del try-on"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
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
              fontSize: 36,
              color: '#1b1b1b',
              padding: 40,
              textAlign: 'center',
            }}
          >
            La imagen generada aparecera aqui.
          </div>
        )}
      </div>

      {selectedJersey && (
        <div
          className="absolute text-center"
          style={{
            left: '50%',
            top: 1508,
            transform: 'translateX(-50%)',
            color: '#1f2459',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 30,
          }}
        >
          Jersey aplicado: {selectedJersey.label}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '10px solid #3d1eed',
          borderRadius: 40,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 170,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 36,
        }}
      >
        <button
          onClick={() => {
            resetTryOn()
            navigate('/foto')
          }}
          style={{
            width: 390,
            height: 120,
            borderRadius: 32,
            background: 'white',
            border: '3px solid #1f2459',
            color: '#1f2459',
            cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          Repetir foto
        </button>

        <button
          onClick={() => navigate('/gracias')}
          style={{
            width: 390,
            height: 120,
            borderRadius: 32,
            background: '#06adbf',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
