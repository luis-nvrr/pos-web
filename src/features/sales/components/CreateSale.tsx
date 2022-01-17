import React from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import SearchProduct from '~/features/products/components/SearchProduct'
import { SaleItem } from '../types'
import { Select, SelectItem } from '~/components/Select/Select'
import { Product } from '~/features/products/types'
import useTicketItemsStore from '../hooks'

const headers = [
  { id: 1, description: 'código' },
  { id: 2, description: 'descripción' },
  { id: 3, description: 'precio' },
  { id: 4, description: 'cantidad' },
  { id: 5, description: 'disponible' },
  { id: 6, description: 'subtotal' },
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

  const increaseStyle = {
    color: '#16a34a',
    fontSize: '1.5rem',
  }

  const decreaseStyle = {
    color: '#dc2626',
    fontSize: '1.5rem',
  }

  const handleIncreaseItemClick = (event: any) => {
    const productItemId: number = Number(
      event.target.parentNode.parentNode.parentNode.getAttribute('id'),
    )
    increaseItem(productItemId)
  }

  const handleDecreaseItemClick = (event: any) => {
    const productItemId: number = Number(
      event.target.parentNode.parentNode.parentNode.getAttribute('id'),
    )
    decreaseItem(productItemId)
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
                      {item.price}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap ">
                    <div
                      id={`${item.product.id}`}
                      className="flex items-center justify-center space-x-2"
                    >
                      <button type="button" onClick={handleDecreaseItemClick}>
                        <AiFillMinusCircle style={decreaseStyle} />
                      </button>
                      <div className="font-medium text-gray-800">
                        {item.quantity}
                      </div>
                      <button type="button" onClick={handleIncreaseItemClick}>
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
                      {item.price * item.quantity}
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

export const SummaryCard: React.FC = () => (
  <div className="max-w-md rounded-sm shadow-lg border border-gray-200 bg-gray-100">
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="uppercase text-gray-500 font-semibold text-sm">
          Total:
        </div>
        <div className="text-4xl font-bold text-center">$100</div>
      </div>
      <div className="space-y-2">
        <div className="uppercase text-gray-500 font-semibold text-sm">
          Método de pago:
        </div>
        <Select items={selectItems} />
      </div>
      <div>
        <button
          type="button"
          className="bg-orange-500 rounded-xl p-2 text-white w-full"
        >
          Vender
        </button>
      </div>
    </div>
  </div>
)

export const CreateSale: React.FC = () => {
  const addItemToTicket = useTicketItemsStore((state) => state.addItemToTicket)

  const items = useTicketItemsStore((state) => state.items)

  const handleSelectChange = (product: Product) => {
    addItemToTicket(product)
  }

  return (
    <div className="mt-4 flex flex-col items-start space-y-4">
      <SearchProduct handleSelectChange={handleSelectChange} />
      <div className="flex flex-row space-x-10">
        <ItemsTable itemsToSale={items} />
        <SummaryCard />
      </div>
    </div>
  )
}
