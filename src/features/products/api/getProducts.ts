import { useQuery } from 'react-query'
import axios from '~/lib/axios'
import { Product, GetProductResponseDTO } from '../types'

export const productsMock: Product[] = [
  {
    id: 1,
    label: 'Coca cola',
    value: '1',
    price: 5,
    available: 10,
  },
  {
    id: 2,
    label: 'Sprite',
    value: '2',
    price: 10,
    available: 20,
  },
  {
    id: 3,
    label: 'Arroz',
    value: '3',
    price: 5,
    available: 12,
  },
]

export const getProducts = async (): Promise<Product[]> => {
  const data: GetProductResponseDTO[] = await axios.get('/products')
  const products: Product[] = data.map((product) => ({
    ...product,
    id: product.barCode,
    label: product.description,
    value: product.barCode.toString(),
  }))

  return products
}

export const getProductsMock = (): Promise<Product[]> => {
  const succeed = true
  const timeout = 2

  return new Promise<Product[]>((resolve) => {
    setTimeout(() => {
      if (succeed) {
        resolve(productsMock)
      } else {
        resolve([])
      }
    }, timeout)
  })
}

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: getProductsMock,
  })
