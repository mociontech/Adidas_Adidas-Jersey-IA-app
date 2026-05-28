import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'

const btnBack = '/elementos/Btn_Back.png'

function captureVideoFrame(video: HTMLVideoElement) {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth || 1080
  canvas.height = video.videoHeight || 1920

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('No se pudo preparar la captura de la foto.')
  }

  context.translate(canvas.width, 0)
  context.scale(-1, 1)
  context.drawImage(video, 0, 0, canvas.width, canvas.height)

  return canvas.toDataURL('image/png')
}

export default function Screen04TomaDeFoto() {
  const navigate = useNavigate()
  const { generateTryOn, selectedJersey, resetTryOn } = useTryOn()
  const videoRef = useRef<HTMLVideoElement>(null)
  const captureStartedRef = useRef(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!selectedJersey) {
      navigate('/select', { replace: true })
      return
    }

    let stream: MediaStream | null = null

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1080 },
            height: { ideal: 1920 },
          },
          audio: false,
        })

        const video = videoRef.current

        if (video) {
          video.srcObject = stream

          try {
            await video.play()
          } catch (error) {
            if (
              !(error instanceof DOMException && error.name === 'AbortError')
            ) {
              throw error
            }
          }

          setCameraReady(true)
        }
      } catch (error) {
        setCameraError(
          error instanceof Error
            ? error.message
            : 'No fue posible acceder a la camara.',
        )
      }
    }

    resetTryOn()
    captureStartedRef.current = false
    void startCamera()

    return () => {
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [navigate, resetTryOn, selectedJersey])

  useEffect(() => {
    if (countdown === null || cameraError || isSubmitting) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1)
        return
      }

      const video = videoRef.current

      if (!video || captureStartedRef.current) {
        return
      }

      captureStartedRef.current = true
      setIsSubmitting(true)

      try {
        const photoDataUrl = captureVideoFrame(video)
        const generationPromise = generateTryOn(photoDataUrl)
        navigate('/espera', { replace: true })
        void generationPromise
      } catch (error) {
        setCameraError(
          error instanceof Error
            ? error.message
            : 'No se pudo capturar la imagen.',
        )
        setIsSubmitting(false)
        setCountdown(null)
        captureStartedRef.current = false
      }
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [cameraError, countdown, generateTryOn, isSubmitting, navigate])

  const startCountdown = () => {
    if (!cameraReady || cameraError || isSubmitting || countdown !== null) {
      return
    }

    captureStartedRef.current = false
    setCountdown(5)
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        style={{
          position: 'absolute',
          width: 1080,
          height: 1920,
          inset: 0,
          objectFit: 'cover',
          transform: 'scaleX(-1)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.82), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.55))',
          pointerEvents: 'none',
        }}
      />

      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 48,
          width: 780,
          left: '50%',
          top: 150,
          transform: 'translateX(-50%)',
        }}
      >
        Preparate para la foto
      </div>

      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: 500,
          fontSize: 28,
          width: 820,
          left: '50%',
          top: 250,
          transform: 'translateX(-50%)',
          lineHeight: 1.4,
        }}
      >
        Ubicate dentro del marco, con buena luz y el torso visible para que el
        try-on quede mejor.
      </div>

      <button
        onClick={() => navigate('/select')}
        disabled={isSubmitting}
        aria-label="Volver a seleccionar jersey"
        style={{
          position: 'absolute',
          left: 118,
          bottom: 164,
          width: 112,
          height: 112,
          padding: 0,
          border: 'none',
          background: 'transparent',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.45 : 1,
          zIndex: 4,
        }}
      >
        <img
          src={btnBack}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
      </button>

      {!cameraError && countdown !== null && (
        <div
          className="absolute text-center"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            fontSize: 620,
            color: 'rgba(255,255,255,0.72)',
            textShadow: '0px 4px 60px rgba(0,0,0,0.5)',
            lineHeight: 1,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -52%)',
            userSelect: 'none',
          }}
        >
          {countdown > 0 ? countdown : ''}
        </div>
      )}

      {selectedJersey && (
        <div
          style={{
            position: 'absolute',
            left: 90,
            top: 340,
            width: 220,
            borderRadius: 28,
            overflow: 'hidden',
            border: '4px solid rgba(255,255,255,0.9)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          }}
        >
          <img
            src={selectedJersey.src}
            alt={selectedJersey.label}
            style={{ width: '100%', display: 'block' }}
          />
          <div
            style={{
              padding: 16,
              background: 'rgba(6,173,191,0.92)',
              color: 'white',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: 22,
              textAlign: 'center',
            }}
          >
            {selectedJersey.label}
          </div>
        </div>
      )}

      {cameraError && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 820,
            borderRadius: 32,
            background: 'rgba(0,0,0,0.72)',
            color: 'white',
            padding: 36,
            textAlign: 'center',
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: 28,
            lineHeight: 1.5,
          }}
        >
          {cameraError}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '10px solid #3d1eed',
          borderRadius: 40,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <button
        onClick={startCountdown}
        disabled={
          Boolean(cameraError) || !cameraReady || isSubmitting || countdown !== null
        }
        style={{
          position: 'absolute',
          bottom: 120,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'white',
          border: '10px solid rgba(255,255,255,0.35)',
          cursor:
            cameraError || !cameraReady || isSubmitting || countdown !== null
              ? 'not-allowed'
              : 'pointer',
          outline: 'none',
          opacity:
            cameraError || !cameraReady || isSubmitting || countdown !== null
              ? 0.4
              : 1,
        }}
      />
    </div>
  )
}
