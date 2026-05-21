import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'

export default function Screen06EnEspera() {
  const navigate = useNavigate()
  const { error, generatedImage, status } = useTryOn()

  useEffect(() => {
    if (generatedImage && status === 'done') {
      navigate('/resultado', { replace: true })
    }
  }, [generatedImage, navigate, status])

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 903,
          minHeight: 1240,
          background: 'rgba(217,217,217,0.2)',
          borderRadius: 68,
          padding: '160px 60px',
        }}
      >
        <div
          className="text-white text-center"
          style={{
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontWeight: 600,
            fontSize: 88,
            lineHeight: '1.15',
          }}
        >
          {status === 'error'
            ? 'No pudimos generar tu fotografia'
            : 'Estamos generando tu try-on'}
        </div>

        <div
          className="text-white text-center"
          style={{
            marginTop: 48,
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: 28,
            lineHeight: 1.5,
            opacity: 0.92,
          }}
        >
          {status === 'error'
            ? error
            : 'OpenAI esta usando tu foto y la referencia del jersey para crear una version realista de la camiseta puesta sobre ti.'}
        </div>

        {status !== 'error' && (
          <div
            style={{
              marginTop: 64,
              display: 'flex',
              justifyContent: 'center',
              gap: 20,
            }}
          >
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.7)',
                  animation: `pulse 1.2s ease-in-out ${index * 0.3}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {status === 'error' && (
          <button
            onClick={() => navigate('/foto')}
            style={{
              marginTop: 64,
              width: '100%',
              height: 120,
              borderRadius: 32,
              border: 'none',
              background: '#06adbf',
              color: 'white',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 42,
              fontWeight: 700,
            }}
          >
            Intentar de nuevo
          </button>
        )}
      </div>

      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 42,
          lineHeight: '1.3',
          left: '50%',
          top: 1498,
          transform: 'translateX(-50%)',
          width: 900,
        }}
      >
        {status === 'error'
          ? 'Vuelve a tomar la foto o revisa la configuracion de OpenAI.'
          : 'Esto puede tardar varios segundos dependiendo de la complejidad de la imagen.'}
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
