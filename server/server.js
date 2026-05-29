import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
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

app.use(express.json({ limit: '25mb' }))

async function printImageOnWindows(imageBuffer, printerName) {
  if (process.platform !== 'win32') {
    throw new Error('La impresion directa solo esta configurada para Windows.')
  }

const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'adidas-print-'))
const imagePath = path.join(tempDir, 'try-on.png')
const preparedImagePath = path.join(tempDir, 'try-on-print.png')
const scriptPath = path.join(tempDir, 'print-image.ps1')
const debugPrintPath = path.join(projectRoot, 'tmp-print-preview.png')

  const script = `
param(
  [Parameter(Mandatory = $true)][string]$ImagePath,
  [Parameter(Mandatory = $true)][string]$PreparedImagePath,
  [Parameter(Mandatory = $true)][string]$DebugPrintPath,
  [Parameter(Mandatory = $false)][string]$PrinterName
)

Add-Type -AssemblyName System.Drawing

$source = [System.Drawing.Image]::FromFile($ImagePath)
$portraitWidth = 1240
$portraitHeight = 1844
$safeScale = 0.97
$portraitCanvas = New-Object System.Drawing.Bitmap($portraitWidth, $portraitHeight)
$portraitCanvas.SetResolution(300, 300)
$portraitGraphics = [System.Drawing.Graphics]::FromImage($portraitCanvas)
$portraitGraphics.Clear([System.Drawing.Color]::Black)
$portraitGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$portraitGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$portraitGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$portraitGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$sourceRatio = $source.Width / $source.Height
$portraitRatio = $portraitWidth / $portraitHeight

if ($sourceRatio -gt $portraitRatio) {
  $drawWidth = $portraitWidth
  $drawHeight = [int]($drawWidth / $sourceRatio)
} else {
  $drawHeight = $portraitHeight
  $drawWidth = [int]($drawHeight * $sourceRatio)
}

$drawWidth = [int]($drawWidth * $safeScale)
$drawHeight = [int]($drawHeight * $safeScale)
$drawX = [int](($portraitWidth - $drawWidth) / 2)
$drawY = [int](($portraitHeight - $drawHeight) / 2)
$portraitGraphics.DrawImage($source, $drawX, $drawY, $drawWidth, $drawHeight)
$portraitGraphics.Dispose()
$source.Dispose()

$portraitCanvas.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)
$portraitCanvas.Save($PreparedImagePath, [System.Drawing.Imaging.ImageFormat]::Png)
$portraitCanvas.Save($DebugPrintPath, [System.Drawing.Imaging.ImageFormat]::Png)
$portraitCanvas.Dispose()

$document = New-Object System.Drawing.Printing.PrintDocument
$document.DocumentName = 'Adidas Try-On'
$document.OriginAtMargins = $false
$document.DefaultPageSettings.Margins = New-Object System.Drawing.Printing.Margins(0, 0, 0, 0)
$document.DefaultPageSettings.Landscape = $true
$document.DefaultPageSettings.PaperSize = New-Object System.Drawing.Printing.PaperSize('6x4', 600, 400)

if ($PrinterName) {
  $document.PrinterSettings.PrinterName = $PrinterName
}

if (-not $document.PrinterSettings.IsValid) {
  throw "No se encontro la impresora: $PrinterName"
}

$paperSize = $null
foreach ($paper in $document.PrinterSettings.PaperSizes) {
  $isSixByFour = (
    (($paper.Width -ge 590 -and $paper.Width -le 630) -and ($paper.Height -ge 390 -and $paper.Height -le 430)) -or
    (($paper.Width -ge 390 -and $paper.Width -le 430) -and ($paper.Height -ge 590 -and $paper.Height -le 630))
  )

  if ($isSixByFour) {
    $paperSize = $paper
    break
  }
}

if ($paperSize) {
  $document.DefaultPageSettings.PaperSize = $paperSize
}

$image = [System.Drawing.Image]::FromFile($PreparedImagePath)

$handler = [System.Drawing.Printing.PrintPageEventHandler]{
  param($sender, $event)

  $event.Graphics.Clear([System.Drawing.Color]::White)
  $event.Graphics.PageUnit = [System.Drawing.GraphicsUnit]::Display
  $event.Graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $event.Graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $event.Graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $event.Graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

  $x = -1 * [single]$event.PageSettings.HardMarginX
  $y = -1 * [single]$event.PageSettings.HardMarginY
  $event.Graphics.DrawImage($image, $x, $y, [single]$image.Width, [single]$image.Height)
  $event.HasMorePages = $false
}

$document.add_PrintPage($handler)

try {
  $document.Print()
} finally {
  $document.remove_PrintPage($handler)
  $image.Dispose()
  $document.Dispose()
}
`

  try {
    await fs.writeFile(imagePath, imageBuffer)
    await fs.writeFile(scriptPath, script)

    await new Promise((resolve, reject) => {
      const child = spawn(
        'powershell.exe',
        [
          '-NoProfile',
          '-ExecutionPolicy',
          'Bypass',
          '-File',
          scriptPath,
          imagePath,
          preparedImagePath,
          debugPrintPath,
          printerName,
        ],
        { windowsHide: true },
      )

      let stderr = ''

      child.stderr.on('data', (chunk) => {
        stderr += chunk.toString()
      })

      child.on('error', reject)
      child.on('close', (code) => {
        if (code === 0) {
          resolve()
          return
        }

        reject(
          new Error(
            stderr.trim() ||
              `PowerShell termino con codigo de salida ${code}.`,
          ),
        )
      })
    })
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true })
  }
}

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    hasApiKey: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.OPENAI_IMAGE_MODEL ?? 'gpt-image-2',
  })
})

app.post('/api/print', express.json({ limit: '25mb' }), async (request, response) => {
  try {
    const imageDataUrl = String(request.body.imageDataUrl ?? '')
    const match = imageDataUrl.match(/^data:image\/png;base64,([A-Za-z0-9+/=]+)$/)

    if (!match) {
      response.status(400).json({
        error: 'No se recibio una imagen PNG valida para imprimir.',
      })
      return
    }

    const printerName = process.env.PRINTER_NAME || 'Canon SELPHY CP1500'
    const imageBuffer = Buffer.from(match[1], 'base64')

    await printImageOnWindows(imageBuffer, printerName)

    response.json({
      ok: true,
      printerName,
    })
  } catch (error) {
    console.error('Print failed:', error)
    response.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'No fue posible mandar la imagen a imprimir.',
    })
  }
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

    let jerseyArrayBuffer
    let jerseyMimeType = 'image/png'

    if (jerseyUrl.startsWith('/')) {
      // Local file in public folder
      const localPath = path.join(projectRoot, 'public', jerseyUrl)
      const fileBuffer = await fs.readFile(localPath)
      jerseyArrayBuffer = fileBuffer.buffer.slice(
        fileBuffer.byteOffset,
        fileBuffer.byteOffset + fileBuffer.byteLength,
      )
    } else {
      const jerseyResponse = await fetch(jerseyUrl)
      if (!jerseyResponse.ok) {
        response.status(502).json({
          error: 'No fue posible descargar la referencia del jersey.',
        })
        return
      }
      jerseyArrayBuffer = await jerseyResponse.arrayBuffer()
      jerseyMimeType = jerseyResponse.headers.get('content-type') || 'image/png'
    }

    const photoMimeType = request.file.mimetype || 'image/png'
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
      'Create a premium football video-game style virtual try-on using the two reference images.',
      'The final image must look like a stylized 3D character render from a modern football video game, not live-action footage.',
      'Use a high-end metahuman-style athlete look with visible CG skin shading, game-engine lighting, 3D mesh surface quality, expressive game-character eyes, rendered hair, and polished sports-game materials.',
      'Preserve the person identity and facial likeness very closely. Keep the same face shape, eye spacing, nose shape, mouth shape, smile, jawline, eyebrows, hairline, hairstyle, facial hair, age, and distinctive facial features from the first image.',
      'The face should be converted into a stylized 3D game avatar version of the same person, not redesigned as a different person. Apply a game-character skin shader, clean surface detail, no photo noise, rendered eyebrows, rendered hair strands, and clearly CG eyes while keeping the original facial proportions.',
      'Avoid a live-action face or documentary capture look. The result should feel like the person was created inside a next-generation football game character creator.',
      'The image should feel like a playable football game character portrait or cover render with cinematic stadium lighting and a heroic match-day presentation.',
      'The first image is the person photo and must remain the base for identity, face, hairstyle, pose, body proportions, skin tone, hands, and camera angle.',
      'Transform the background into a cinematic Mexican football stadium scene with green pitch tones, dramatic arena lights, crowd atmosphere, and a premium match-day environment.',
      'The stadium should feel inspired by football in Mexico, but do not add readable text, invented sponsor logos, or fake team branding in the background.',
      'Transform the scene and finish into a stylized 3D football video game render with physically based game materials, ambient occlusion, rim lighting, depth of field, and idealized athletic proportions, but keep the person recognizable and make the selected jersey the main visual focus.',
      'Replace only the visible upper-body garment with the soccer jersey from the second image.',
      'The selected jersey reference is mandatory and must be followed faithfully.',
      'Preserve the Adidas logo with high fidelity. Do not warp, redraw, replace, mirror, misspell, blur, stylize beyond recognition, or distort the Adidas logo.',
      'Preserve the Mexico national team crest with high fidelity. Do not warp, redraw, replace, mirror, misspell, blur, stylize beyond recognition, or distort the crest.',
      'Preserve the selected jersey design as much as possible, including exact color blocking, pattern, stripes, sleeve trim, collar shape, logos, crest placement, Adidas logo placement, fabric panels, proportions, and overall silhouette.',
      'The jersey must match the style selected by the user, not a generic Mexico jersey and not a different Adidas design.',
      'Make the garment fit naturally over the torso with stylized 3D fabric folds, stitching, shadows, woven fabric texture, and game-render material detail.',
      'Do not add hats, scarves, extra accessories, sponsor text, invented logos, alternate team crests, or extra typography.',
      `Selected jersey: ${jerseyLabel || 'Adidas jersey'}.`,
      jerseyPromptHint ? `Fit guidance: ${jerseyPromptHint}.` : '',
      'Output a polished stylized 3D metahuman-style football portrait suitable for a premium branded fan activation.',
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
