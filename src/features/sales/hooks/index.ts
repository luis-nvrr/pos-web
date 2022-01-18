import create, { SetState } from 'zustand'
import { Product } from '~/features/products/types'
import { SaleItem } from '../types'

type TicketItemsStore = {
  items: SaleItem[]
  // eslint-disable-next-line no-unused-vars
  addItemToTicket: (product: Product) => void
  // eslint-disable-next-line no-unused-vars
  increaseItemInTicket: (productId: number) => void
  // eslint-disable-next-line no-unused-vars
  decreaseItemInTicket: (productId: number) => void
  // eslint-disable-next-line no-unused-vars
  removeItemFromTicket: (itemId: number) => void
  removeAllItems: () => void
}

const sortItemsByCreationOrder = (items: SaleItem[]): SaleItem[] =>
  items.sort((a, b) => a.id - b.id)

const increaseItemInTicket = (state: TicketItemsStore, productId: number) => {
  const itemToIncrease: SaleItem | undefined = state.items.find(
    (item) => item.product.id === productId,
  )

  if (!itemToIncrease || itemToIncrease.product.available === 0) {
    return {
      items: sortItemsByCreationOrder([...state.items]),
    }
  }

  const newAvailable = itemToIncrease.product.available - 1
  const newQuantity = itemToIncrease.quantity + 1
  const otherItems = state.items.filter((item) => item.product.id !== productId)

  const updatedTicketItem: SaleItem = {
    ...itemToIncrease,
    quantity: newQuantity,
    product: { ...itemToIncrease.product, available: newAvailable },
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
    const existingItem: SaleItem | undefined = state.items.find(
      (item) => item.product.id === product.id,
    )

    if (existingItem) {
      return increaseItemInTicket(state, existingItem.product.id)
    }

    if (product.available <= 0) {
      return { items: [] }
    }

    const newAvailable = product.available - 1
    const ticketItem: SaleItem = {
      id: state.items.length,
      product: { ...product, available: newAvailable },
      quantity: 1,
      price: product.price,
    }

    return { items: [...state.items, ticketItem] }
  })
}

const removeItemFromTicket = (state: TicketItemsStore, productId: number) => {
  const remainingItems: SaleItem[] = state.items.filter(
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
      return { items: sortItemsByCreationOrder([...state.items]) }
    }

    const newQuantity = itemToDecrease.quantity - 1
    const newAvailable = itemToDecrease.product.available + 1

    if (newQuantity === 0) {
      return removeItemFromTicket(state, productId)
    }

    const otherItems: SaleItem[] = state.items.filter(
      (item) => item.product.id !== productId,
    )

    const updatedTicketItem: SaleItem = {
      ...itemToDecrease,
      quantity: newQuantity,
      product: { ...itemToDecrease.product, available: newAvailable },
    }

    return {
      items: sortItemsByCreationOrder([...otherItems, updatedTicketItem]),
    }
  })
}

const handleRemoveAllItems = (set: SetState<TicketItemsStore>) => {
  set({ items: [] })
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
  removeAllItems: () => handleRemoveAllItems(set),
}))

export default useTicketItemsStore
