/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { jerseys, type JerseyOption } from '../data/jerseys'

type Registration = {
  nombre: string
  correo: string
}

type TryOnStatus = 'idle' | 'processing' | 'done' | 'error'

type TryOnContextValue = {
  registration: Registration
  saveRegistration: (registration: Registration) => void
  selectedJersey: JerseyOption | null
  selectJersey: (jerseyId: number) => void
  capturedPhoto: string | null
  generatedImage: string | null
  status: TryOnStatus
  error: string | null
  setCapturedPhoto: (photo: string | null) => void
  generateTryOn: (photoDataUrl: string) => Promise<void>
  resetTryOn: () => void
  resetExperience: () => void
}

const TryOnContext = createContext<TryOnContextValue | undefined>(undefined)

export function TryOnProvider({ children }: { children: ReactNode }) {
  const [registration, setRegistration] = useState<Registration>({
    nombre: '',
    correo: '',
  })
  const [selectedJerseyId, setSelectedJerseyId] = useState<number | null>(0)
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [status, setStatus] = useState<TryOnStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const selectedJersey = useMemo(
    () => jerseys.find((jersey) => jersey.id === selectedJerseyId) ?? null,
    [selectedJerseyId],
  )

  const value = useMemo<TryOnContextValue>(
    () => ({
      registration,
      saveRegistration: setRegistration,
      selectedJersey,
      selectJersey: setSelectedJerseyId,
      capturedPhoto,
      generatedImage,
      status,
      error,
      setCapturedPhoto,
      async generateTryOn(photoDataUrl: string) {
        if (!selectedJersey) {
          throw new Error('Selecciona un jersey antes de generar la imagen.')
        }

        setCapturedPhoto(photoDataUrl)
        setGeneratedImage(null)
        setError(null)
        setStatus('processing')

        try {
          const photoBlob = await fetch(photoDataUrl).then((response) =>
            response.blob(),
          )
          const formData = new FormData()
          formData.append('photo', photoBlob, 'photo.png')
          formData.append('jerseyUrl', selectedJersey.src)
          formData.append('jerseyLabel', selectedJersey.label)
          formData.append('jerseyPromptHint', selectedJersey.promptHint)

          const response = await fetch('/api/try-on', {
            method: 'POST',
            body: formData,
          })

          const payload = (await response.json()) as {
            error?: string
            imageDataUrl?: string
          }

          if (!response.ok || !payload.imageDataUrl) {
            throw new Error(
              payload.error ??
                'No fue posible generar la imagen con OpenAI en este momento.',
            )
          }

          setGeneratedImage(payload.imageDataUrl)
          setStatus('done')
        } catch (caughtError) {
          setStatus('error')
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : 'Ocurrio un error inesperado al generar la imagen.',
          )
        }
      },
      resetTryOn() {
        setCapturedPhoto(null)
        setGeneratedImage(null)
        setStatus('idle')
        setError(null)
      },
      resetExperience() {
        setRegistration({
          nombre: '',
          correo: '',
        })
        setSelectedJerseyId(0)
        setCapturedPhoto(null)
        setGeneratedImage(null)
        setStatus('idle')
        setError(null)
      },
    }),
    [capturedPhoto, error, generatedImage, registration, selectedJersey, status],
  )

  return (
    <TryOnContext.Provider value={value}>{children}</TryOnContext.Provider>
  )
}

export function useTryOn() {
  const context = useContext(TryOnContext)

  if (!context) {
    throw new Error('useTryOn must be used within a TryOnProvider.')
  }

  return context
}
