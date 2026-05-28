import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'


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

export default function Screen05Countdown() {
  const navigate = useNavigate()
  const { generateTryOn, selectedJersey } = useTryOn()
  const videoRef = useRef<HTMLVideoElement>(null)
  const captureStartedRef = useRef(false)
  const [count, setCount] = useState(3)
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

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

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
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

    void startCamera()

    return () => {
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [navigate, selectedJersey])

  useEffect(() => {
    if (!cameraReady || cameraError) {
      return
    }

    if (count <= 0 && !captureStartedRef.current) {
      captureStartedRef.current = true

      if (!videoRef.current) {
        setCameraError('No se pudo capturar la imagen.')
        return
      }

      const photoDataUrl = captureVideoFrame(videoRef.current)
      void generateTryOn(photoDataUrl)
      navigate('/espera', { replace: true })
      return
    }

    const timeoutId = window.setTimeout(() => {
      setCount((currentCount) => currentCount - 1)
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [cameraError, cameraReady, count, generateTryOn, navigate])

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
            'linear-gradient(to bottom, rgba(0,0,0,0.82), rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.5))',
          pointerEvents: 'none',
        }}
      />

      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 48,
          whiteSpace: 'nowrap',
          left: '50%',
          top: 220,
          transform: 'translateX(-50%)',
        }}
      >
        Sonrie y no te muevas
      </div>

      {cameraError ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 760,
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
      ) : (
        <div
          className="absolute text-center"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            fontSize: 700,
            color: 'rgba(255,255,255,0.75)',
            textShadow: '0px 4px 60px rgba(0,0,0,0.5)',
            lineHeight: 1,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -55%)',
            userSelect: 'none',
          }}
        >
          {count > 0 ? count : ''}
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
    </div>
  )
}
