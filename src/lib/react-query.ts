/* eslint-disable no-unused-vars */
import { AxiosError } from 'axios'
import {
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
} from 'react-query'

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type QueryConfig<FetcherFnType extends (...args: any) => any> =
  UseQueryOptions<Awaited<ReturnType<FetcherFnType>>>

export type MutationConfig<FetcherFnType extends (...args: any) => any> =
  UseMutationOptions<
    Awaited<ReturnType<FetcherFnType>>,
    AxiosError,
    Parameters<FetcherFnType>[0]
  >
