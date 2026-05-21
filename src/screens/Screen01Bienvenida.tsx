import { useNavigate } from 'react-router-dom'

export default function Screen01Bienvenida() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      {/* Title */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: 600,
          fontSize: 96,
          lineHeight: '1.15',
          width: 593,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -60%)',
        }}
      >
        Pantalla de bienvenida
      </div>

      {/* Button */}
      <button
        onClick={() => navigate('/registro')}
        className="absolute flex items-center justify-center text-white rounded-3xl cursor-pointer"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 50,
          background: '#06adbf',
          width: 855,
          height: 133,
          left: '50%',
          top: 1550,
          transform: 'translateX(-50%)',
          border: 'none',
        }}
      >
        Comenzar
      </button>
    </div>
  )
}
