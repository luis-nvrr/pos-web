export type Product = {
  id: number
  label: string
  value: string
  price: number
  available: number
}

export type GetProductResponseDTO = {
  barCode: number
  description: string
  price: number
  available: number
}
