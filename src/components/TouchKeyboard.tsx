import { useState } from 'react'

type TouchKeyboardProps = {
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
}

type KeyDefinition = {
  label: string
  value?: string
  action?: 'backspace' | 'space' | 'shift' | 'symbols' | 'letters' | 'enter'
  flex?: number
}

const letterRows: KeyDefinition[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((value) => ({
    label: value,
    value,
  })),
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((value) => ({
    label: value,
    value,
  })),
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '\u00f1'].map((value) => ({
    label: value,
    value,
  })),
  [
    { label: 'Mayus', action: 'shift', flex: 1.75 },
    ...['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((value) => ({
      label: value,
      value,
    })),
    { label: 'Borrar', action: 'backspace', flex: 1.65 },
  ],
  [
    { label: '!#1', action: 'symbols', flex: 1.95 },
    { label: '@', value: '@' },
    { label: '-', value: '-' },
    { label: '_', value: '_' },
    { label: 'Espacio', action: 'space', flex: 3.2 },
    { label: '.', value: '.' },
    { label: '.com', value: '.com', flex: 1.55 },
    { label: 'Listo', action: 'enter', flex: 1.65 },
  ],
]

const symbolRows: KeyDefinition[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((value) => ({
    label: value,
    value,
  })),
  ['@', '#', '$', '&', '*', '(', ')', "'", '"', ':'].map((value) => ({
    label: value,
    value,
  })),
  ['%', '+', '=', '/', '\\', '?', '!', ',', '.', ';'].map((value) => ({
    label: value,
    value,
  })),
  [
    { label: 'ABC', action: 'letters', flex: 1.75 },
    ...['-', '_', '~', '[', ']', '{', '}'].map((value) => ({
      label: value,
      value,
    })),
    { label: 'Borrar', action: 'backspace', flex: 1.65 },
  ],
  [
    { label: 'ABC', action: 'letters', flex: 1.95 },
    { label: '@', value: '@' },
    { label: '.com', value: '.com', flex: 1.55 },
    { label: 'Espacio', action: 'space', flex: 3.2 },
    { label: '.', value: '.' },
    { label: 'Listo', action: 'enter', flex: 1.65 },
  ],
]

export default function TouchKeyboard({
  value,
  onChange,
  onEnter,
}: TouchKeyboardProps) {
  const [isShifted, setIsShifted] = useState(false)
  const [mode, setMode] = useState<'letters' | 'symbols'>('letters')
  const rows = mode === 'letters' ? letterRows : symbolRows

  const pressKey = (key: KeyDefinition) => {
    if (key.action === 'backspace') {
      onChange(value.slice(0, -1))
      return
    }

    if (key.action === 'space') {
      onChange(`${value} `)
      return
    }

    if (key.action === 'shift') {
      setIsShifted((current) => !current)
      return
    }

    if (key.action === 'symbols') {
      setMode('symbols')
      return
    }

    if (key.action === 'letters') {
      setMode('letters')
      return
    }

    if (key.action === 'enter') {
      onEnter?.()
      return
    }

    if (!key.value) {
      return
    }

    const nextValue =
      mode === 'letters' && isShifted ? key.value.toUpperCase() : key.value
    onChange(`${value}${nextValue}`)
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 1096,
        transform: 'translateX(-50%)',
        width: 855,
        minHeight: 660,
        borderRadius: 36,
        background: 'rgba(8, 12, 34, 0.94)',
        border: '2px solid rgba(255,255,255,0.22)',
        boxShadow: '0 32px 90px rgba(0,0,0,0.42)',
        padding: 24,
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
            }}
          >
            {row.map((key) => {
              const label =
                mode === 'letters' && key.value && isShifted
                  ? key.label.toUpperCase()
                  : key.label
              const isAction = Boolean(key.action)

              return (
                <button
                  key={`${rowIndex}-${key.label}`}
                  type="button"
                  onClick={() => pressKey(key)}
                  style={{
                    flex: key.flex ?? 1,
                    minWidth: 0,
                    height: 98,
                    borderRadius: 20,
                    border:
                      key.action === 'shift' && isShifted
                        ? '3px solid #06adbf'
                        : '1.5px solid rgba(255,255,255,0.22)',
                    background: isAction
                      ? 'rgba(255,255,255,0.22)'
                      : 'rgba(255,255,255,0.12)',
                    color: 'white',
                    cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize:
                      key.action === 'shift' ||
                      key.action === 'symbols' ||
                      key.action === 'letters' ||
                      key.action === 'enter'
                        ? 24
                        : label === '.com'
                          ? 28
                          : label.length > 5
                            ? 23
                            : 34,
                    lineHeight: 1,
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
