import create, { SetState } from 'zustand'
import { Product } from '~/features/products/types'
import { SaleItem } from '../types'

type TicketItemsStore = {
  items: SaleItem[]
  addItemToTicket: (product: Product) => void
  increaseItemInTicket: (productId: number) => void
  decreaseItemInTicket: (productId: number) => void
  removeItemFromTicket: (itemId: number) => void
}

const sortItemsByCreationOrder = (items: SaleItem[]): SaleItem[] =>
  items.sort((a, b) => a.id - b.id)

const increaseItemInTicket = (state: TicketItemsStore, productId: number) => {
  const itemToIncrease: SaleItem | undefined = state.items.find(
    (item) => item.product.id === productId,
  )

  if (!itemToIncrease) {
    console.error('no item to increase')
    console.log(productId)
    return {
      items: [...state.items],
    }
  }

  const newQuantity = itemToIncrease.quantity + 1
  const otherItems = state.items.filter((item) => item.product.id !== productId)
  const updatedTicketItem: SaleItem = {
    ...itemToIncrease,
    quantity: newQuantity,
  }

  return {
    items: sortItemsByCreationOrder([...otherItems, updatedTicketItem]),
  }
}

const handleIncreaseItemInTicket = (
  set: SetState<TicketItemsStore>,
  productId: number,
): void => set((state) => increaseItemInTicket(state, productId))

const handleAddItemToTicket = (
  set: SetState<TicketItemsStore>,
  product: Product,
): void => {
  set((state) => {
    const existingItem = state.items.find(
      (item) => item.product.id === product.id,
    )

    if (existingItem) {
      const newState = increaseItemInTicket(state, existingItem.product.id)
      return newState
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

const removeItemFromTicket = (state: TicketItemsStore, productId: number) => {
  const remainingItems = state.items.filter(
    (item) => item.product.id !== productId,
  )

  return {
    items: sortItemsByCreationOrder([...remainingItems]),
  }
}

const handleRemoveItemFromTicket = (
  set: SetState<TicketItemsStore>,
  productId: number,
): void => set((state) => removeItemFromTicket(state, productId))

const handleDecreaseItemInTicket = (
  set: SetState<TicketItemsStore>,
  productId: number,
): void => {
  set((state) => {
    const itemToDecrease: SaleItem | undefined = state.items.find(
      (item) => item.product.id === productId,
    )

    if (!itemToDecrease) {
      return { items: [...state.items] }
    }

    const newQuantity = itemToDecrease.quantity - 1

    if (newQuantity === 0) {
      return removeItemFromTicket(state, productId)
    }

    const otherItems: SaleItem[] = state.items.filter(
      (item) => item.product.id !== productId,
    )

    const updatedTicketItem: SaleItem = {
      ...itemToDecrease,
      quantity: newQuantity,
    }

    return {
      items: sortItemsByCreationOrder([...otherItems, updatedTicketItem]),
    }
  })
}

const useTicketItemsStore = create<TicketItemsStore>((set) => ({
  items: [],
  addItemToTicket: (product) => handleAddItemToTicket(set, product),
  increaseItemInTicket: (productId) =>
    handleIncreaseItemInTicket(set, productId),
  decreaseItemInTicket: (productId) =>
    handleDecreaseItemInTicket(set, productId),
  removeItemFromTicket: (productId) =>
    handleRemoveItemFromTicket(set, productId),
}))

export default useTicketItemsStore
