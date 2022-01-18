import axios from 'axios'
import { useQuery } from 'react-query'
import { Product } from '../types'

export const products: Product[] = [
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
]

export const getProducts = async (): Promise<Product[]> => axios.get('/users')

export const getProductsMock = (): Promise<Product[]> => {
  const succeed = true
  const timeout = 2

  return new Promise<Product[]>((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve(products)
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
