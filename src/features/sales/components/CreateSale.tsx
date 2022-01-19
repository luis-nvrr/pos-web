import React, { FormEvent } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { RiDeleteBin2Line } from 'react-icons/ri'
import SearchProduct from '~/features/products/components/SearchProduct'
import { CreateSaleRequestDTO, Sale, SaleItem } from '../types'
import { Select, SelectItem } from '~/components/Select/Select'
import { Product } from '~/features/products/types'
import useTicketItemsStore from '../hooks'
import { useCreateSale } from '../api/createSale'

const headers = [
  { id: 1, description: 'código' },
  { id: 2, description: 'descripción' },
  { id: 3, description: 'precio' },
  { id: 4, description: 'cantidad' },
  { id: 5, description: 'disponible' },
  { id: 6, description: 'subtotal' },
  { id: 7, description: 'acciones' },
]

type ItemsTableProps = {
  itemsToSale: SaleItem[]
}

export const ItemsTable: React.FC<ItemsTableProps> = ({ itemsToSale }) => {
  const increaseItem = useTicketItemsStore(
    (state) => state.increaseItemInTicket,
  )

  const decreaseItem = useTicketItemsStore(
    (state) => state.decreaseItemInTicket,
  )

  const removeItem = useTicketItemsStore((state) => state.removeItemFromTicket)

  const increaseStyle = {
    color: '#16a34a',
    fontSize: '1.5rem',
  }

  const decreaseStyle = {
    color: '#dc2626',
    fontSize: '1.5rem',
  }

  const deleteStyle = {
    color: '#dc2626',
    fontSize: '1.5rem',
  }

  const handleIncreaseItemClick = (productId: number) => {
    increaseItem(productId)
  }

  const handleDecreaseItemClick = (productId: number) => {
    decreaseItem(productId)
  }

  const handleRemoveItemClick = (productId: number) => {
    removeItem(productId)
  }

  return (
    <div className="bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-3 py-2 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Ticket</h2>
      </header>
      <div className="px-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-sm font-semibold uppercase text-gray-500 bg-gray-100">
              <tr>
                {headers.map((header) => (
                  <th className="p-2 whitespace-nowrap" key={header.id}>
                    <div className="font-semibold text-center">
                      {header.description}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-md divide-y divide-gray-100">
              {itemsToSale.map((item) => (
                <tr key={item.product.id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <div className="font-medium text-gray-800">
                        {item.product.id}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center font-medium">
                      {item.product.label}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center font-medium text-green-500">
                      {`$${item.price}`}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap ">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleDecreaseItemClick(item.product.id)}
                      >
                        <AiFillMinusCircle style={decreaseStyle} />
                      </button>
                      <div className="font-medium text-gray-800">
                        {item.quantity}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleIncreaseItemClick(item.product.id)}
                      >
                        <AiFillPlusCircle style={increaseStyle} />
                      </button>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center font-medium">
                      {item.product.available}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-lg text-center text-green-500">
                      {`$${item.price * item.quantity}`}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveItemClick(item.product.id)}
                      >
                        <RiDeleteBin2Line style={deleteStyle} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const selectItems: SelectItem[] = [
  { id: 1, description: 'Efectivo', value: 'cash' },
  { id: 2, description: 'Crédito', value: 'credit' },
  { id: 3, description: 'Débito', value: 'debit' },
  { id: 4, description: 'Mercadopago', value: 'mercadopago' },
]

type SummaryCardProps = {
  items: SaleItem[]
  // eslint-disable-next-line no-unused-vars
  handleSubmitSale: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  items,
  handleSubmitSale,
}) => {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  return (
    <div className="max-w-md rounded-sm shadow-lg border border-gray-200 bg-gray-100">
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="uppercase text-gray-500 font-semibold text-sm">
            Total:
          </div>
          <div className="text-4xl font-bold text-center">{`$${totalPrice}`}</div>
        </div>
        <div className="space-y-2">
          <div className="uppercase text-gray-500 font-semibold text-sm">
            Método de pago:
          </div>
          <Select items={selectItems} />
        </div>
        <form onSubmit={handleSubmitSale}>
          <button
            type="submit"
            className="bg-orange-500 rounded-xl p-2 text-white w-full"
          >
            Vender
          </button>
        </form>
      </div>
    </div>
  )
}

export const CreateSale: React.FC = () => {
  const addItemToTicket = useTicketItemsStore((state) => state.addItemToTicket)
  const createSaleMutation = useCreateSale({})
  const items = useTicketItemsStore((state) => state.items)

  const handleSelectChange = (product: Product) => {
    addItemToTicket(product)
  }

  const handleSubmitSale = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()

    const newSale: CreateSaleRequestDTO = {
      items: items.map((item) => ({
        id: item.id,
        productId: item.product.id,
        quantity: item.quantity,
      })),
    }

    await createSaleMutation.mutateAsync(newSale)
  }

  return (
    <div className="mt-4 flex flex-col items-start space-y-4">
      <SearchProduct handleSelectChange={handleSelectChange} />
      <div className="flex flex-row space-x-10">
        <ItemsTable itemsToSale={items} />
        <SummaryCard items={items} handleSubmitSale={handleSubmitSale} />
      </div>
    </div>
  )
}
