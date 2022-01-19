import { useQuery } from 'react-query'
import axios from '~/lib/axios'
import { Product, GetProductResponseDTO } from '../types'

export const productsMock: Product[] = [
  {
    id: 1,
    label: 'Coca cola',
    value: 'coca cola',
    price: 5,
    available: 10,
  },
  {
    id: 2,
    label: 'Sprite',
    value: 'sprite',
    price: 10,
    available: 20,
  },
  {
    id: 3,
    label: 'Arroz',
    value: 'arroz',
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
    value: product.description.toLowerCase(),
  }))

  return products
}

export const getProductsMock = (): Promise<Product[]> => {
  const succeed = true
  const timeout = 2

  return new Promise<Product[]>((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve(productsMock)
      } else {
        reject(new Error("couldn't fetch"))
      }
    }, timeout)
  })
}

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: () => getProductsMock(),
  })
