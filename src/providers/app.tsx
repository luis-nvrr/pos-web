import { ReactNode, Suspense } from 'react'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { queryClient } from '~/lib/react-query'

type AppProviderProps = {
  children: ReactNode
}
const AppProvider = ({ children }: AppProviderProps) => (
  <Suspense fallback={<div>cargando...</div>}>
    <QueryClientProvider client={queryClient}>
      <Router>{children}</Router>
    </QueryClientProvider>
  </Suspense>
)

export default AppProvider
