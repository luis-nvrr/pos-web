import React from 'react'
import { useRoutes } from 'react-router-dom'
import protectedRoutes from './Protected'

const AppRoutes: React.FC = () => {
  const routes = protectedRoutes
  const element = useRoutes([...routes])

  return element
}

export default AppRoutes
