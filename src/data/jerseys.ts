export type JerseyOption = {
  id: number
  src: string
  label: string
  promptHint: string
}

export const jerseys: JerseyOption[] = [
  {
    id: 0,
    src: 'https://www.figma.com/api/mcp/asset/11cdee6f-edf0-4d05-a859-08baf10083d4',
    label: 'Retro Hombre',
    promptHint: 'retro soccer jersey for men, classic fit, blue and white palette',
  },
  {
    id: 1,
    src: 'https://www.figma.com/api/mcp/asset/ba8ddda0-c833-4527-9da9-b48fa3c2fe50',
    label: 'Retro Mujer',
    promptHint: 'retro soccer jersey for women, fitted silhouette, blue and white palette',
  },
  {
    id: 2,
    src: 'https://www.figma.com/api/mcp/asset/ada4af37-c40e-4303-b634-832633b2f1c0',
    label: 'Local Mujer',
    promptHint: 'women home soccer jersey, modern fit, adidas blue and white palette',
  },
  {
    id: 3,
    src: 'https://www.figma.com/api/mcp/asset/dddc51a4-4a22-4950-a353-235190e91c4d',
    label: 'Local Hombre',
    promptHint: 'men home soccer jersey, athletic fit, adidas blue and white palette',
  },
]
