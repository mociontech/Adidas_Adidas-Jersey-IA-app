import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'

export default function Screen08Agradecimiento() {
  const navigate = useNavigate()
  const { generatedImage, registration, resetTryOn } = useTryOn()

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: 600,
          fontSize: 88,
          lineHeight: '1.15',
          width: 820,
          left: '50%',
          top: 180,
          transform: 'translateX(-50%)',
        }}
      >
        Gracias por vivir el try-on
      </div>

      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 500,
          fontSize: 28,
          lineHeight: 1.5,
          width: 820,
          left: '50%',
          top: 420,
          transform: 'translateX(-50%)',
        }}
      >
        {registration.nombre
          ? `${registration.nombre}, ya puedes descargar tu imagen generada.`
          : 'Ya puedes descargar tu imagen generada.'}
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 620,
          transform: 'translateX(-50%)',
          width: 520,
          height: 740,
          borderRadius: 36,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.18)',
          border: '2px solid rgba(255,255,255,0.32)',
        }}
      >
        {generatedImage ? (
          <img
            src={generatedImage}
            alt="Foto generada"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : null}
      </div>

      {generatedImage ? (
        <a
          href={generatedImage}
          download="adidas-tryon.png"
          className="absolute flex items-center justify-center text-white rounded-3xl cursor-pointer"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 40,
            background: '#06adbf',
            width: 855,
            height: 133,
            left: '50%',
            top: 1450,
            transform: 'translateX(-50%)',
            border: 'none',
            textDecoration: 'none',
          }}
        >
          Descargar imagen
        </a>
      ) : null}

      <button
        onClick={() => {
          resetTryOn()
          navigate('/bienvenida')
        }}
        className="absolute flex items-center justify-center text-white rounded-3xl cursor-pointer"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 42,
          background: 'transparent',
          width: 855,
          height: 110,
          left: '50%',
          top: 1626,
          transform: 'translateX(-50%)',
          border: '2px solid rgba(255,255,255,0.7)',
        }}
      >
        Finalizar
      </button>
    </div>
  )
}
