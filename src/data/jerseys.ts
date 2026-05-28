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
    src: 'https://www.figma.com/api/mcp/asset/11cdee6f-edf0-4d05-a859-08baf10083d4',
    label: 'Opción A Caballero',
    promptHint: 'retro Mexico soccer jersey for men, classic fit, green and white',
  },
  {
    id: 1,
    gender: 'caballero',
    option: 'B',
    src: 'https://www.figma.com/api/mcp/asset/ba8ddda0-c833-4527-9da9-b48fa3c2fe50',
    label: 'Opción B Caballero',
    promptHint: 'Mexico home soccer jersey for men, modern athletic fit, green',
  },
  {
    id: 2,
    gender: 'caballero',
    option: 'C',
    src: 'https://www.figma.com/api/mcp/asset/dddc51a4-4a22-4950-a353-235190e91c4d',
    label: 'Opción C Caballero',
    promptHint: 'Mexico away soccer jersey for men, slim fit, white and green',
  },
  // Dama
  {
    id: 3,
    gender: 'dama',
    option: 'A',
    src: 'https://www.figma.com/api/mcp/asset/ada4af37-c40e-4303-b634-832633b2f1c0',
    label: 'Opción A Dama',
    promptHint: 'retro Mexico soccer jersey for women, fitted silhouette, green and white',
  },
  {
    id: 4,
    gender: 'dama',
    option: 'B',
    src: 'https://www.figma.com/api/mcp/asset/11cdee6f-edf0-4d05-a859-08baf10083d4',
    label: 'Opción B Dama',
    promptHint: 'Mexico home soccer jersey for women, modern fitted cut, green',
  },
  {
    id: 5,
    gender: 'dama',
    option: 'C',
    src: 'https://www.figma.com/api/mcp/asset/ba8ddda0-c833-4527-9da9-b48fa3c2fe50',
    label: 'Opción C Dama',
    promptHint: 'Mexico away soccer jersey for women, slim fit, white and green',
  },
]

export function jerseysByGender(gender: Gender) {
  return jerseys.filter((j) => j.gender === gender)
}
