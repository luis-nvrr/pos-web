import axios from 'axios'
import { useMutation } from 'react-query'
import { MutationConfig, queryClient } from '~/lib/react-query'
import useTicketItemsStore from '../hooks'
import { Sale, SaleItem } from '../types'
import { showSuccessNotification } from '~/components/Notification'

export type CreateSaleDTO = {
  data: {
    items: SaleItem[]
  }
}

export const createSale = ({ data }: CreateSaleDTO): Promise<Sale> =>
  axios.post('/sales', data)

export const createSaleMock = ({ data }: CreateSaleDTO): Promise<Sale> => {
  const succeed = true
  const timeout = 2
  const newSale: Sale = {
    id: 1,
    items: data.items,
  }

  return new Promise<Sale>((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve(newSale)
      } else {
        reject(new Error("couldn't fetch"))
      }
    }, timeout)
  })
}

type UseCreateSaleOptions = {
  config?: MutationConfig<typeof createSale>
}

export const useCreateSale = ({ config }: UseCreateSaleOptions) => {
  const { removeAllItems } = useTicketItemsStore()

  return useMutation({
    onMutate: async (newSale: CreateSaleDTO) => {
      const previousSales = queryClient.getQueryData<Sale[]>(['sales'])
      queryClient.setQueryData(
        ['sales'],
        [...(previousSales || []), newSale.data],
      )
      return { previousSales }
    },
    onError: (noUsed1, noUsed2, context: any) => {
      if (context?.previousSales) {
        queryClient.setQueryData(['sales'], context.previousSales)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sales'])
      showSuccessNotification('Venta registrada')
      removeAllItems()
    },
    ...config,
    mutationFn: createSaleMock,
  })
}
