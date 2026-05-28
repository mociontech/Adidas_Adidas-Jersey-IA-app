import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'

const imgQR = 'https://www.figma.com/api/mcp/asset/c1cb4fc2-9906-4215-b450-a00742c2ea2d'

export default function Screen11QR() {
  const navigate = useNavigate()
  const { resetExperience } = useTryOn()

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      {/* Logo placeholder */}
      <div
        className="absolute text-white text-center uppercase"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 118,
          left: '50%',
          top: 120,
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}
      >
        Logo
      </div>

      {/* Thanks headline */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: 700,
          fontStyle: 'italic',
          fontSize: 130,
          lineHeight: '108px',
          width: 833,
          left: '50%',
          top: 532,
          transform: 'translateX(-50%)',
        }}
      >
        ¡Gracias por participar!
      </div>

      {/* QR code */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 870,
          transform: 'translateX(-50%)',
          width: 383,
          height: 401,
          background: '#d9d9d9',
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={imgQR}
          alt="Código QR"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Scan instruction */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 600,
          fontSize: 36,
          width: 700,
          left: '50%',
          top: 1310,
          transform: 'translateX(-50%)',
          opacity: 0.85,
        }}
      >
        Escanea para descargar tu foto digital
      </div>

      {/* Finalizar button */}
      <button
        onClick={() => {
          resetExperience()
          navigate('/bienvenida')
        }}
        style={{
          position: 'absolute',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 50,
          background: '#06adbf',
          color: 'white',
          width: 855,
          height: 133,
          left: '50%',
          top: 1674,
          transform: 'translateX(-50%)',
          border: 'none',
          borderRadius: 24,
          cursor: 'pointer',
        }}
      >
        Finalizar
      </button>
    </div>
  )
}
