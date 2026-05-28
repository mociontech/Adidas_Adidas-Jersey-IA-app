import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Screen01Bienvenida from './screens/Screen01Bienvenida'
import Screen02Registro from './screens/Screen02Registro'
import Screen03Select from './screens/Screen03Select'
import Screen04TomaDeFoto from './screens/Screen04TomaDeFoto'
import Screen06EnEspera from './screens/Screen06EnEspera'
import Screen07ImagenGenerada from './screens/Screen07ImagenGenerada'
import Screen08Agradecimiento from './screens/Screen08Agradecimiento'
import Screen09Ticket from './screens/Screen09Ticket'
import Screen10Impresion from './screens/Screen10Impresion'
import Screen11QR from './screens/Screen11QR'

const CANVAS_W = 1080
const CANVAS_H = 1920

function ScaledCanvas({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function resize() {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const s = Math.min(vw / CANVAS_W, vh / CANVAS_H)
      setScale(s)
      setOffset({
        x: (vw - CANVAS_W * s) / 2,
        y: (vh - CANVAS_H * s) / 2,
      })
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div
        className="app-canvas"
        style={{
          transform: `scale(${scale})`,
          left: offset.x,
          top: offset.y,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScaledCanvas>
        <Routes>
          <Route path="/" element={<Navigate to="/bienvenida" replace />} />
          <Route path="/bienvenida" element={<Screen01Bienvenida />} />
          <Route path="/registro" element={<Screen02Registro />} />
          <Route path="/select" element={<Screen03Select />} />
          <Route path="/foto" element={<Screen04TomaDeFoto />} />
          <Route path="/countdown" element={<Navigate to="/foto" replace />} />
          <Route path="/espera" element={<Screen06EnEspera />} />
          <Route path="/resultado" element={<Screen07ImagenGenerada />} />
          <Route path="/gracias" element={<Screen08Agradecimiento />} />
          <Route path="/ticket" element={<Screen09Ticket />} />
          <Route path="/impresion" element={<Screen10Impresion />} />
          <Route path="/qr" element={<Screen11QR />} />
        </Routes>
      </ScaledCanvas>
    </BrowserRouter>
  )
}
