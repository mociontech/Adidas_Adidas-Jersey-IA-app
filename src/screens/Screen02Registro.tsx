import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTryOn } from '../context/TryOnContext'
import TouchKeyboard from '../components/TouchKeyboard'

type ActiveField = 'nombre' | 'correo'

export default function Screen02Registro() {
  const navigate = useNavigate()
  const { registration, saveRegistration } = useTryOn()
  const [nombre, setNombre] = useState(registration.nombre)
  const [correo, setCorreo] = useState(registration.correo)
  const [activeField, setActiveField] = useState<ActiveField>('nombre')

  const handleSubmit = () => {
    if (nombre.trim() && correo.trim()) {
      saveRegistration({
        nombre: nombre.trim(),
        correo: correo.trim(),
      })
      navigate('/select')
    }
  }

  return (
    <div className="relative w-full h-full bg-[#3d1eed]">
      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: 600,
          fontSize: 96,
          lineHeight: '1.15',
          width: 640,
          left: '50%',
          top: 150,
          transform: 'translateX(-50%)',
        }}
      >
        Registra tus datos
      </div>

      <div
        className="absolute text-white text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 500,
          fontSize: 28,
          width: 760,
          left: '50%',
          top: 360,
          transform: 'translateX(-50%)',
          opacity: 0.9,
        }}
      >
        Usaremos esta informacion para personalizar la experiencia del try-on.
      </div>

      <div
        className="absolute flex items-center"
        onClick={() => setActiveField('nombre')}
        style={{
          width: 855,
          height: 110,
          left: '50%',
          top: 561,
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.15)',
          border:
            activeField === 'nombre'
              ? '4px solid #06adbf'
              : '1.5px solid white',
          borderRadius: 24,
          padding: '0 36px',
          gap: 20,
          cursor: 'pointer',
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="rgba(255,255,255,0.5)" />
        </svg>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          readOnly
          inputMode="none"
          onFocus={() => setActiveField('nombre')}
          onChange={(event) => setNombre(event.target.value)}
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

      <div
        className="absolute flex items-center"
        onClick={() => setActiveField('correo')}
        style={{
          width: 855,
          height: 110,
          left: '50%',
          top: 703,
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.15)',
          border:
            activeField === 'correo'
              ? '4px solid #06adbf'
              : '1.5px solid white',
          borderRadius: 24,
          padding: '0 36px',
          gap: 20,
          cursor: 'pointer',
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="rgba(255,255,255,0.5)" />
        </svg>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          readOnly
          inputMode="none"
          onFocus={() => setActiveField('correo')}
          onChange={(event) => setCorreo(event.target.value)}
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
        Continuar
      </button>

      <TouchKeyboard
        value={activeField === 'nombre' ? nombre : correo}
        onChange={activeField === 'nombre' ? setNombre : setCorreo}
        onEnter={() => {
          if (activeField === 'nombre') {
            setActiveField('correo')
            return
          }

          handleSubmit()
        }}
      />
    </div>
  )
}
