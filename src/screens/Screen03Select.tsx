import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const jerseys = [
  {
    id: 0,
    src: 'https://www.figma.com/api/mcp/asset/11cdee6f-edf0-4d05-a859-08baf10083d4',
    label: 'Retro Hombre',
  },
  {
    id: 1,
    src: 'https://www.figma.com/api/mcp/asset/ba8ddda0-c833-4527-9da9-b48fa3c2fe50',
    label: 'Retro Mujer',
  },
  {
    id: 2,
    src: 'https://www.figma.com/api/mcp/asset/ada4af37-c40e-4303-b634-832633b2f1c0',
    label: 'Local Mujer',
  },
  {
    id: 3,
    src: 'https://www.figma.com/api/mcp/asset/dddc51a4-4a22-4950-a353-235190e91c4d',
    label: 'Local Hombre',
  },
]

export default function Screen03Select() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(0)

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      {/* Title */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 48,
          lineHeight: '1.2',
          width: 596,
          left: '50%',
          top: 100,
          transform: 'translateX(-50%)',
        }}
      >
        SELECCIONA TU JERSEY FAVORITA
      </div>

      {/* Subtitle */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 36,
          width: 975,
          left: '50%',
          top: 300,
          transform: 'translateX(-50%)',
        }}
      >
        PONTE FRESCO Y SIN CHAMARRA
      </div>

      {/* Jersey grid */}
      <div
        className="absolute"
        style={{ left: 96, top: 403, width: 887, height: 1120 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 17, height: '100%' }}>
          {jerseys.map((jersey) => (
            <div
              key={jersey.id}
              onClick={() => setSelected(jersey.id)}
              style={{
                borderRadius: 64,
                overflow: 'hidden',
                cursor: 'pointer',
                border: selected === jersey.id ? '6px solid white' : '6px solid transparent',
                transition: 'border-color 0.2s',
                position: 'relative',
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
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
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
