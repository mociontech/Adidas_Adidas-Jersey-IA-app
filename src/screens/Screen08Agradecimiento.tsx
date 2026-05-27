import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'

export default function Screen08Agradecimiento() {
  const navigate = useNavigate()
  const { generatedImage, registration, resetTryOn } = useTryOn()
  const [printStatus, setPrintStatus] = useState<'idle' | 'printing' | 'done' | 'error'>('idle')
  const [printError, setPrintError] = useState<string | null>(null)

  const handlePrint = async () => {
    if (!generatedImage) {
      return
    }

    setPrintStatus('printing')
    setPrintError(null)

    try {
      const response = await fetch('/api/print', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageDataUrl: generatedImage,
        }),
      })

      const payload = (await response.json()) as {
        error?: string
      }

      if (!response.ok) {
        throw new Error(payload.error ?? 'No fue posible imprimir la imagen.')
      }

      setPrintStatus('done')
    } catch (error) {
      setPrintStatus('error')
      setPrintError(
        error instanceof Error
          ? error.message
          : 'No fue posible imprimir la imagen.',
      )
    }
  }

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
          ? `${registration.nombre}, tu imagen generada esta lista para imprimir.`
          : 'Tu imagen generada esta lista para imprimir.'}
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
        <button
          onClick={handlePrint}
          disabled={printStatus === 'printing'}
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
            opacity: printStatus === 'printing' ? 0.65 : 1,
            cursor: printStatus === 'printing' ? 'wait' : 'pointer',
          }}
        >
          {printStatus === 'printing'
            ? 'Imprimiendo...'
            : printStatus === 'done'
              ? 'Imprimir otra copia'
              : 'Imprimir imagen'}
        </button>
      ) : null}

      {printStatus === 'done' || printStatus === 'error' ? (
        <div
          className="absolute text-white text-center"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            fontSize: 26,
            lineHeight: 1.35,
            width: 800,
            left: '50%',
            top: 1595,
            transform: 'translateX(-50%)',
            opacity: 0.92,
          }}
        >
          {printStatus === 'done'
            ? 'La imagen fue enviada a la impresora.'
            : printError}
        </div>
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
        Foto Digital
      </button>
    </div>
  )
}
