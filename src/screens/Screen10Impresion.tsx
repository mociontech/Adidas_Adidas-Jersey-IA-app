import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'

export default function Screen10Impresion() {
  const navigate = useNavigate()
  const { generatedImage, resetExperience } = useTryOn()
  const [status, setStatus] = useState<'printing' | 'done' | 'error'>('printing')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!generatedImage) return

    fetch('/api/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageDataUrl: generatedImage }),
    })
      .then(async (res) => {
        const data = (await res.json()) as { error?: string }
        if (!res.ok) throw new Error(data.error ?? 'Error al imprimir.')
        setStatus('done')
      })
      .catch((err) => {
        setStatus('error')
        setErrorMsg(err instanceof Error ? err.message : 'No fue posible imprimir.')
      })
  }, [generatedImage])

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
          top: 685,
          transform: 'translateX(-50%)',
        }}
      >
        ¡Gracias por participar!
      </div>

      {/* Status message */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: 600,
          fontSize: 75,
          lineHeight: '1.15',
          width: 838,
          left: '50%',
          top: 1010,
          transform: 'translateX(-50%)',
        }}
      >
        {status === 'printing' && 'Tu foto se está imprimiendo'}
        {status === 'done' && 'Tu foto fue enviada a imprimir'}
        {status === 'error' && (errorMsg ?? 'No fue posible imprimir la imagen')}
      </div>

      {/* Loading dots while printing */}
      {status === 'printing' && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 1360,
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 20,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.7)',
                animation: `pulse 1.2s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      )}

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

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
