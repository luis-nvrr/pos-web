import create, { SetState } from 'zustand'
import { Product } from '~/features/products/types'
import { SaleItem } from '../types'

type TicketItemsStore = {
  items: SaleItem[]
  addItemToTicket: (product: Product) => void
  increaseItemInTicket: (productId: number) => void
}

const sortItemsByCreationOrder = (items: SaleItem[]): SaleItem[] =>
  items.sort((a, b) => a.id - b.id)

const increaseItemInTicket = (state: TicketItemsStore, productId: number) => {
  const itemToIncrease: SaleItem = state.items.filter(
    (item) => item.product.id === productId,
  )[0]

  const newQuantity = itemToIncrease.quantity + 1
  const otherItems = state.items.filter((item) => item.product.id !== productId)

  return {
    items: sortItemsByCreationOrder([
      ...otherItems,
      { ...itemToIncrease, quantity: newQuantity },
    ]),
  }
}

const handleIncreaseItemInTicket = (
  set: SetState<TicketItemsStore>,
  productId: number,
): void => {
  set((state) => increaseItemInTicket(state, productId))
}

const handleAddItemToTicket = (
  set: SetState<TicketItemsStore>,
  product: Product,
): void => {
  set((state) => {
    const existingItem = state.items.find(
      (item) => item.product.id === product.id,
    )

    if (existingItem) {
      return increaseItemInTicket(state, existingItem.product.id)
    }

    const ticketItem: SaleItem = {
      id: state.items.length,
      product,
      quantity: 1,
      price: product.price,
    }

    return { items: [...state.items, ticketItem] }
  })
}

const useTicketItemsStore = create<TicketItemsStore>((set) => ({
  items: [],
  addItemToTicket: (product) => handleAddItemToTicket(set, product),
  increaseItemInTicket: (productId) =>
    handleIncreaseItemInTicket(set, productId),
}))

export default useTicketItemsStore

/*
  decreaseItemInTicket: (itemId: number) => void
  removeItemFromTicket: (itemId: number) => void

        const newQuantity = existingItem.quantity + 1
      const otherItems = state.items.filter(
        (item) => item.product.id !== existingItem.product.id,
      )
      return {
        items: [...otherItems, { ...existingItem, quantity: newQuantity }],
      }
  */
