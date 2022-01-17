import React, { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { CreateSale } from '~/features/sales/components/CreateSale'
import { MainLayout } from '~/components/Layout'
import ContentLayout from '~/components/Layout/ContentLayout'

const App: React.FC = () => (
  <MainLayout>
    <ContentLayout>
      <Suspense fallback={<div>Cargando</div>}>
        <Outlet />
      </Suspense>
    </ContentLayout>
  </MainLayout>
)

const protectedRoutes = [
  {
    path: '/app/',
    element: <App />,
    children: [
      { path: 'sales', element: <CreateSale /> },
      { path: '', element: <Navigate to="sales" /> },
      { path: '*', element: <Navigate to="sales" /> },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/app/sales/" />,
  },
  {
    path: '*',
    element: <Navigate to="/app/sales/" />,
  },
]

export default protectedRoutes
