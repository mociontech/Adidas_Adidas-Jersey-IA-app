import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'
import { jerseysByGender, type Gender } from '../data/jerseys'

const arrowLeft = 'https://www.figma.com/api/mcp/asset/14142434-404b-45ea-9b9e-f1280c107326'
const arrowRight = 'https://www.figma.com/api/mcp/asset/6fbb35a4-bf92-4183-90c2-447ed712547f'

export default function Screen03Select() {
  const navigate = useNavigate()
  const { selectedJersey, selectJersey } = useTryOn()
  const [gender, setGender] = useState<Gender>('caballero')

  const options = jerseysByGender(gender)
  const genderLabel = gender === 'caballero' ? 'Caballero' : 'Dama'

  const toggleGender = (_dir: 'prev' | 'next') => {
    setGender((g) => {
      const next = g === 'caballero' ? 'dama' : 'caballero'
      // Clear selection when switching gender
      selectJersey(jerseysByGender(next)[0].id)
      return next
    })
    // If selected jersey is from the other gender, reset
    if (selectedJersey && selectedJersey.gender !== gender) {
      selectJersey(options[0].id)
    }
  }

  const canContinue = selectedJersey !== null

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
          top: 130,
          transform: 'translateX(-50%)',
        }}
      >
        Pantalla de personalización
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
          top: 285,
          transform: 'translateX(-50%)',
        }}
      >
        PONTE FRESCO Y SIN CHAMARRA
      </div>

      {/* Step 1: Género */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 44,
          width: 975,
          left: '50%',
          top: 420,
          transform: 'translateX(-50%)',
        }}
      >
        1. Selecciona tu Género
      </div>

      {/* Gender toggle */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 545,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 48,
        }}
      >
        <button
          onClick={() => toggleGender('prev')}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={arrowLeft} alt="anterior" style={{ width: 48, height: 48 }} />
        </button>

        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 56,
            color: 'white',
            minWidth: 280,
            textAlign: 'center',
          }}
        >
          {genderLabel}
        </span>

        <button
          onClick={() => toggleGender('next')}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={arrowRight} alt="siguiente" style={{ width: 48, height: 48 }} />
        </button>
      </div>

      {/* Step 2: Jersey */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 44,
          width: 975,
          left: '50%',
          top: 730,
          transform: 'translateX(-50%)',
        }}
      >
        2. Escoje tu jersey favorita
      </div>

      {/* Jersey options — 3 cards */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 860,
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 17,
          width: 904,
        }}
      >
        {options.map((jersey) => (
          <button
            key={jersey.id}
            onClick={() => selectJersey(jersey.id)}
            style={{
              flex: 1,
              height: 359,
              borderRadius: 20,
              overflow: 'hidden',
              cursor: 'pointer',
              border:
                selectedJersey?.id === jersey.id
                  ? '5px solid white'
                  : '5px solid transparent',
              transition: 'border-color 0.2s',
              position: 'relative',
              background: '#d9d9d9',
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
                bottom: 0,
                left: 0,
                right: 0,
                padding: '12px 8px',
                background: 'rgba(0,0,0,0.55)',
                color: selectedJersey?.id === jersey.id ? '#06adbf' : 'white',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 22,
                textAlign: 'center',
                transition: 'color 0.2s',
              }}
            >
              Opción {jersey.option}
            </div>
          </button>
        ))}
      </div>

      {/* Siguiente button */}
      <button
        onClick={() => {
          if (canContinue) navigate('/foto')
        }}
        style={{
          position: 'absolute',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 50,
          background: canContinue ? '#06adbf' : 'rgba(6,173,191,0.45)',
          color: 'white',
          width: 855,
          height: 133,
          left: '50%',
          top: 1466,
          transform: 'translateX(-50%)',
          border: 'none',
          borderRadius: 24,
          cursor: canContinue ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s',
        }}
      >
        Siguiente
      </button>
    </div>
  )
}
