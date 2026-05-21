import { useNavigate } from 'react-router-dom'

export default function Screen08Agradecimiento() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      {/* Main text */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: 600,
          fontSize: 96,
          lineHeight: '1.2',
          width: 722,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -60%)',
        }}
      >
        <p>Pantalla de despedida</p>
        <p style={{ marginTop: 40 }}>Con QR para descargar la imagen</p>
      </div>

      {/* QR placeholder */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, 80px)',
          width: 400,
          height: 400,
          background: 'white',
          borderRadius: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
            {/* Simple QR grid placeholder */}
            <rect x="10" y="10" width="30" height="30" rx="4" fill="#3d1eed" />
            <rect x="60" y="10" width="30" height="30" rx="4" fill="#3d1eed" />
            <rect x="10" y="60" width="30" height="30" rx="4" fill="#3d1eed" />
            <rect x="15" y="15" width="20" height="20" rx="2" fill="white" />
            <rect x="65" y="15" width="20" height="20" rx="2" fill="white" />
            <rect x="15" y="65" width="20" height="20" rx="2" fill="white" />
            <rect x="20" y="20" width="10" height="10" rx="1" fill="#3d1eed" />
            <rect x="70" y="20" width="10" height="10" rx="1" fill="#3d1eed" />
            <rect x="20" y="70" width="10" height="10" rx="1" fill="#3d1eed" />
            <rect x="60" y="60" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="72" y="60" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="60" y="72" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="72" y="72" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="46" y="10" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="46" y="22" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="46" y="34" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="10" y="46" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="22" y="46" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="34" y="46" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="46" y="46" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="60" y="46" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="72" y="46" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="84" y="46" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="84" y="10" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="84" y="22" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="84" y="60" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="84" y="72" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="84" y="84" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="10" y="84" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="22" y="84" width="8" height="8" rx="1" fill="#3d1eed" />
            <rect x="34" y="84" width="8" height="8" rx="1" fill="#3d1eed" />
          </svg>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 14, color: '#3d1eed', marginTop: 8 }}>
            Escanea para descargar
          </p>
        </div>
      </div>

      {/* Finalizar button */}
      <button
        onClick={() => navigate('/bienvenida')}
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
        Finalizar
      </button>
    </div>
  )
}
