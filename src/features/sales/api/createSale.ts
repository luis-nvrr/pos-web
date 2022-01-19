import { useMutation } from 'react-query'
import axios from '~/lib/axios'
import { MutationConfig, queryClient } from '~/lib/react-query'
import useTicketItemsStore from '../hooks'
import { CreateSaleRequestDTO, Sale } from '../types'
import { showSuccessNotification } from '~/components/Notification'

export const createSale = async (
  sale: CreateSaleRequestDTO,
): Promise<CreateSaleRequestDTO> => {
  await axios.post('/sales', sale)
  return sale
}

export const createSaleMock = ({
  items,
}: CreateSaleRequestDTO): Promise<CreateSaleRequestDTO> => {
  const succeed = true
  const timeout = 2

  return new Promise<CreateSaleRequestDTO>((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve({ items })
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
    onMutate: async (newSale: CreateSaleRequestDTO) => {
      const previousSales = queryClient.getQueryData<Sale[]>(['sales'])
      queryClient.setQueryData(['sales'], [...(previousSales || []), newSale])
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
