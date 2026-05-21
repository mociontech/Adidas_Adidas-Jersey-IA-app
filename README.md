# Adidas Jersey IA — Filtro de Ropa

Aplicación kiosk interactiva para experiencias en tienda Adidas. Permite al usuario seleccionar su jersey favorito de la Selección Mexicana y tomarse una foto con él mediante inteligencia artificial.

## Flujo de pantallas

```
01 Bienvenida → 02 Registro → 03 Selección de Jersey → 04 Toma de Foto
      → 05 Countdown → 06 En Espera → 07 Imagen Generada → 08 Agradecimiento
```

| # | Pantalla | Descripción |
|---|----------|-------------|
| 01 | Bienvenida | Pantalla de entrada con CTA "Comenzar" |
| 02 | Registro | Formulario de nombre y correo |
| 03 | Selección | Grid de 4 jerseys para elegir |
| 04 | Toma de Foto | Vista de cámara con encuadre |
| 05 | Countdown | Conteo regresivo 3→2→1 animado |
| 06 | En Espera | Pantalla de procesamiento IA |
| 07 | Imagen Generada | Resultado con opciones Repetir / Siguiente |
| 08 | Agradecimiento | QR para descargar la imagen |

## Stack tecnológico

- **React 19** + **TypeScript**
- **Vite 8** — build tool y dev server
- **Tailwind CSS 3** — estilos utilitarios
- **React Router v6** — navegación entre pantallas
- **Fuentes:** Be Vietnam Pro + Montserrat (Google Fonts)

## Canvas

La app está diseñada en un canvas fijo de **1080 × 1920 px** (portrait, Android kiosk) que se escala automáticamente con CSS transform a cualquier resolución de pantalla.

## Instalación

```bash
npm install
npm run dev
```

La app corre en `http://localhost:5173`

## Build y Deploy

```bash
# Build de producción
npm run build

# Deploy a GitHub Pages
npm run deploy
```

La app se publica en: `https://mociontech.github.io/Adidas_FiltroRopa/`

## Estructura del proyecto

```
src/
├── App.tsx                        # Router + ScaledCanvas (escala viewport)
├── index.css                      # Tailwind base + estilos globales
└── screens/
    ├── Screen01Bienvenida.tsx
    ├── Screen02Registro.tsx
    ├── Screen03Select.tsx
    ├── Screen04TomaDeFoto.tsx
    ├── Screen05Countdown.tsx
    ├── Screen06EnEspera.tsx
    ├── Screen07ImagenGenerada.tsx
    └── Screen08Agradecimiento.tsx
```

## Diseño

Basado en el diseño de Figma: [Techshare — Pantallas](https://www.figma.com/design/nqql1D7xNsvwSJ2GBGGJ7F/Techshare---Pantallas)
