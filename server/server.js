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
  const scriptPath = path.join(tempDir, 'print-image.ps1')

  const script = `
param(
  [Parameter(Mandatory = $true)][string]$ImagePath,
  [Parameter(Mandatory = $false)][string]$PrinterName
)

Add-Type -AssemblyName System.Drawing

$document = New-Object System.Drawing.Printing.PrintDocument
$document.DocumentName = 'Adidas Try-On'
$document.OriginAtMargins = $false
$document.DefaultPageSettings.Margins = New-Object System.Drawing.Printing.Margins(0, 0, 0, 0)
$document.DefaultPageSettings.Landscape = $false
$document.DefaultPageSettings.PaperSize = New-Object System.Drawing.Printing.PaperSize('4x6', 400, 600)

if ($PrinterName) {
  $document.PrinterSettings.PrinterName = $PrinterName
}

if (-not $document.PrinterSettings.IsValid) {
  throw "No se encontro la impresora: $PrinterName"
}

$paperSize = $null
foreach ($paper in $document.PrinterSettings.PaperSizes) {
  $isFourBySix = (
    (($paper.Width -ge 390 -and $paper.Width -le 410) -and ($paper.Height -ge 590 -and $paper.Height -le 610)) -or
    (($paper.Width -ge 590 -and $paper.Width -le 610) -and ($paper.Height -ge 390 -and $paper.Height -le 410))
  )

  if ($isFourBySix) {
    $paperSize = $paper
    break
  }
}

if ($paperSize) {
  $document.DefaultPageSettings.PaperSize = $paperSize
}

$image = [System.Drawing.Image]::FromFile($ImagePath)

$handler = [System.Drawing.Printing.PrintPageEventHandler]{
  param($sender, $event)

  $event.Graphics.Clear([System.Drawing.Color]::White)
  $event.Graphics.PageUnit = [System.Drawing.GraphicsUnit]::Display
  $event.Graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $event.Graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $event.Graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $event.Graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

  $paperWidth = [single]$event.PageSettings.PaperSize.Width
  $paperHeight = [single]$event.PageSettings.PaperSize.Height

  if ($paperWidth -gt $paperHeight) {
    $temp = $paperWidth
    $paperWidth = $paperHeight
    $paperHeight = $temp
  }

  $left = -1 * [single]$event.PageSettings.HardMarginX
  $top = -1 * [single]$event.PageSettings.HardMarginY
  $bounds = New-Object System.Drawing.RectangleF -ArgumentList $left, $top, $paperWidth, $paperHeight

  $imageRatio = $image.Width / $image.Height
  $pageRatio = $bounds.Width / $bounds.Height

  if ($imageRatio -gt $pageRatio) {
    $drawHeight = $bounds.Height
    $drawWidth = [single]($drawHeight * $imageRatio)
  } else {
    $drawWidth = $bounds.Width
    $drawHeight = [single]($drawWidth / $imageRatio)
  }

  $x = [single]($bounds.X + (($bounds.Width - $drawWidth) / 2))
  $y = [single]($bounds.Y + (($bounds.Height - $drawHeight) / 2))

  $event.Graphics.DrawImage($image, $x, $y, $drawWidth, $drawHeight)
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
