import { Discount } from '~/features/discounts/types'
import { Product } from '~/features/products/types'

export type SaleItem = {
  id: number
  product: Product
  quantity: number
  price: number
  discount?: Discount
}

export type Sale = {
  items: SaleItem[]
}

export type CreateSaleItemRequestDTO = {
  id: number
  productId: number
  quantity: number
}

export type CreateSaleRequestDTO = {
  items: CreateSaleItemRequestDTO[]
}
