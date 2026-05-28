export type Gender = 'caballero' | 'dama'

export type JerseyOption = {
  id: number
  gender: Gender
  option: 'A' | 'B' | 'C'
  src: string
  label: string
  promptHint: string
}

export const jerseys: JerseyOption[] = [
  // Caballero
  {
    id: 0,
    gender: 'caballero',
    option: 'A',
    src: '/jerseys/caballero-a.png',
    label: 'Opción A Caballero',
    promptHint: 'retro Mexico soccer jersey for men, classic fit, green and white',
  },
  {
    id: 1,
    gender: 'caballero',
    option: 'B',
    src: '/jerseys/caballero-b.png',
    label: 'Opción B Caballero',
    promptHint: 'Mexico home soccer jersey for men, modern athletic fit, green',
  },
  {
    id: 2,
    gender: 'caballero',
    option: 'C',
    src: '/jerseys/caballero-c.png',
    label: 'Opción C Caballero',
    promptHint: 'Mexico away soccer jersey for men, slim fit, white and green',
  },
  // Dama
  {
    id: 3,
    gender: 'dama',
    option: 'A',
    src: '/jerseys/dama-a.png',
    label: 'Opción A Dama',
    promptHint: 'retro Mexico soccer jersey for women, fitted silhouette, green and white',
  },
  {
    id: 4,
    gender: 'dama',
    option: 'B',
    src: '/jerseys/dama-b.png',
    label: 'Opción B Dama',
    promptHint: 'Mexico home soccer jersey for women, modern fitted cut, green',
  },
  {
    id: 5,
    gender: 'dama',
    option: 'C',
    src: '/jerseys/dama-c.png',
    label: 'Opción C Dama',
    promptHint: 'Mexico away soccer jersey for women, slim fit, white and green',
  },
]

export function jerseysByGender(gender: Gender) {
  return jerseys.filter((j) => j.gender === gender)
}
