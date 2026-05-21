import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Screen02Registro() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')

  const handleSubmit = () => {
    if (nombre.trim() && correo.trim()) {
      navigate('/select')
    }
  }

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      {/* Title */}
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: 600,
          fontSize: 96,
          lineHeight: '1.15',
          width: 520,
          left: '50%',
          top: 150,
          transform: 'translateX(-50%)',
        }}
      >
        Pantalla de registro
      </div>

      {/* Nombre input */}
      <div
        className="absolute flex items-center"
        style={{
          width: 855,
          height: 110,
          left: '50%',
          top: 561,
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.15)',
          border: '1.5px solid white',
          borderRadius: 24,
          padding: '0 36px',
          gap: 20,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="rgba(255,255,255,0.5)" />
        </svg>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          style={{
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: 40,
            color: 'white',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            flex: 1,
          }}
          className="placeholder-white/50"
        />
      </div>

      {/* Correo input */}
      <div
        className="absolute flex items-center"
        style={{
          width: 855,
          height: 110,
          left: '50%',
          top: 703,
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.15)',
          border: '1.5px solid white',
          borderRadius: 24,
          padding: '0 36px',
          gap: 20,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="rgba(255,255,255,0.5)" />
        </svg>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          style={{
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: 40,
            color: 'white',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            flex: 1,
          }}
          className="placeholder-white/50"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="absolute flex items-center justify-center text-white rounded-3xl cursor-pointer"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 50,
          background: '#06adbf',
          width: 855,
          height: 133,
          left: '50%',
          top: 888,
          transform: 'translateX(-50%)',
          border: 'none',
        }}
      >
        Comenzar
      </button>
    </div>
  )
}
