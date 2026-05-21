import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import OpenAI, { toFile } from 'openai'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
})

const app = express()
const port = Number(process.env.PORT ?? 3001)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID || undefined,
})

app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    hasApiKey: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.OPENAI_IMAGE_MODEL ?? 'gpt-image-2',
  })
})

app.post('/api/try-on', upload.single('photo'), async (request, response) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      response.status(500).json({
        error: 'Falta configurar OPENAI_API_KEY en el archivo .env.',
      })
      return
    }

    if (!request.file?.buffer) {
      response.status(400).json({
        error: 'Debes enviar una foto para generar el try-on.',
      })
      return
    }

    const jerseyUrl = String(request.body.jerseyUrl ?? '').trim()
    const jerseyLabel = String(request.body.jerseyLabel ?? '').trim()
    const jerseyPromptHint = String(request.body.jerseyPromptHint ?? '').trim()

    if (!jerseyUrl) {
      response.status(400).json({
        error: 'No se recibio la referencia del jersey seleccionado.',
      })
      return
    }

    const jerseyResponse = await fetch(jerseyUrl)

    if (!jerseyResponse.ok) {
      response.status(502).json({
        error: 'No fue posible descargar la referencia del jersey.',
      })
      return
    }

    const jerseyArrayBuffer = await jerseyResponse.arrayBuffer()
    const photoMimeType = request.file.mimetype || 'image/png'
    const jerseyMimeType = jerseyResponse.headers.get('content-type') || 'image/png'
    const photoFile = await toFile(
      Buffer.from(request.file.buffer),
      request.file.originalname || 'photo.png',
      {
        type: photoMimeType,
      },
    )
    const jerseyFile = await toFile(
      Buffer.from(jerseyArrayBuffer),
      `${jerseyLabel || 'jersey'}.png`,
      {
        type: jerseyMimeType,
      },
    )

    const prompt = [
      'Create a realistic virtual try-on edit using the two reference images.',
      'The first image is the person photo and must remain the base composition.',
      'Replace only the visible upper-body garment with the soccer jersey from the second image.',
      'Preserve the person identity, face, hairstyle, pose, body proportions, skin tone, pants, hands, background, camera angle, and lighting.',
      'Match the jersey design faithfully, including color blocking, stripes, logos, collar, and overall silhouette.',
      'Make the garment fit naturally over the torso with realistic fabric folds and shadows.',
      'Do not add hats, scarves, extra accessories, or text.',
      `Selected jersey: ${jerseyLabel || 'Adidas jersey'}.`,
      jerseyPromptHint ? `Fit guidance: ${jerseyPromptHint}.` : '',
      'Output a polished, photorealistic portrait suitable for a branded fan activation.',
    ]
      .filter(Boolean)
      .join(' ')

    const result = await openai.images.edit({
      model: process.env.OPENAI_IMAGE_MODEL ?? 'gpt-image-2',
      image: [photoFile, jerseyFile],
      prompt,
      size: '1024x1536',
      quality: 'high',
      output_format: 'png',
    })

    const imageBase64 = result.data?.[0]?.b64_json

    if (!imageBase64) {
      throw new Error('La API no devolvio una imagen valida.')
    }

    response.json({
      imageDataUrl: `data:image/png;base64,${imageBase64}`,
    })
  } catch (error) {
    console.error('Try-on generation failed:', error)
    response.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'No fue posible completar la generacion de imagen.',
    })
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir))

  app.get('*', (_request, response) => {
    response.sendFile(path.join(distDir, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
