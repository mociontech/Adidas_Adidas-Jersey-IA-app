import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '✓']

export default function Screen09Ticket() {
  const navigate = useNavigate()
  const [digits, setDigits] = useState<string[]>([])

  const handleKey = (key: string) => {
    if (key === '⌫') {
      setDigits((d) => d.slice(0, -1))
    } else if (key === '✓') {
      if (digits.length === 4) navigate('/impresion')
    } else if (digits.length < 4) {
      setDigits((d) => [...d, key])
    }
  }

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
          width: 838,
          left: '50%',
          top: 194,
          transform: 'translateX(-50%)',
        }}
      >
        Inserta los últimos 4 dígitos de tu ticket
      </div>

      {/* Digit boxes */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 789,
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 19,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 181,
              height: 274,
              borderRadius: 46,
              background: digits[i]
                ? 'rgba(255,255,255,0.35)'
                : 'rgba(217,217,217,0.2)',
              border: digits[i]
                ? '3px solid rgba(255,255,255,0.8)'
                : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 100,
                color: 'white',
              }}
            >
              {digits[i] ?? ''}
            </span>
          </div>
        ))}
      </div>

      {/* Numeric keypad */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 1130,
          transform: 'translateX(-50%)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          width: 700,
        }}
      >
        {DIGITS.map((key) => {
          const isConfirm = key === '✓'
          const isDelete = key === '⌫'
          const isDisabled = isConfirm && digits.length < 4

          return (
            <button
              key={key}
              onClick={() => handleKey(key)}
              disabled={isDisabled}
              style={{
                height: 120,
                borderRadius: 20,
                border: 'none',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: isConfirm || isDelete ? 40 : 60,
                background: isConfirm
                  ? isDisabled
                    ? 'rgba(6,173,191,0.35)'
                    : '#06adbf'
                  : isDelete
                    ? 'rgba(255,255,255,0.15)'
                    : 'rgba(255,255,255,0.9)',
                color: isConfirm || isDelete ? 'white' : '#1b1b1b',
                transition: 'background 0.15s',
              }}
            >
              {key}
            </button>
          )
        })}
      </div>

      {/* Continuar button */}
      <button
        onClick={() => { if (digits.length === 4) navigate('/impresion') }}
        style={{
          position: 'absolute',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 50,
          background: digits.length === 4 ? '#06adbf' : 'rgba(6,173,191,0.4)',
          color: 'white',
          width: 855,
          height: 133,
          left: '50%',
          top: 1674,
          transform: 'translateX(-50%)',
          border: 'none',
          borderRadius: 24,
          cursor: digits.length === 4 ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s',
        }}
      >
        Continuar
      </button>
    </div>
  )
}
