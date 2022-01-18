import { useQuery } from 'react-query'

import axios from 'axios'
import { Sale } from '../types'

const sales: Sale[] = []

export const getSales = (): Promise<Sale[]> => axios.get('/sales')
export const getSalesMock = (): Promise<Sale[]> => {
  const succeed = true
  const timeout = 2

  return new Promise<Sale[]>((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve(sales)
      } else {
        reject(new Error("couldn't fetch"))
      }
    }, timeout)
  })
}

export const useSales = ({ config }: any) =>
  useQuery({
    ...config,
    queryKey: ['sales'],
    queryFn: () => getSalesMock(),
  })
