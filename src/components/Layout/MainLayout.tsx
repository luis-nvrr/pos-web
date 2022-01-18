import React from 'react'
import { Toaster } from 'react-hot-toast'

type NavbarAction = {
  id: number
  name: string
  link: string
}

type TabItemProps = {
  name: string
  link: string
  current: string
}

export const TabItem: React.FC<TabItemProps> = ({ name, link, current }) => (
  <li>
    <a
      className={`py-3 px-4 block border-b-2 border-transparent hover:border-orange-500 ${
        current === link ? 'border-orange-500' : ''
      }`}
      href={link}
    >
      {name}
    </a>
  </li>
)

type HeaderProps = {
  tabs: NavbarAction[]
}

export const Header: React.FC<HeaderProps> = ({ tabs }) => (
  <div className="flex flex-row items-center space-x-10">
    <div className="font-bold text-xl">POLUS</div>
    <ul className="flex items-center justify-center text-base text-gray-700 pt-4 ">
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          name={tab.name}
          link={tab.link}
          current="/app/sales/"
        />
      ))}
    </ul>
  </div>
)

const actions: NavbarAction[] = [
  { id: 1, name: 'ventas', link: '/app/sales/' },
  { id: 2, name: 'clientes', link: '/app/clients/' },
  { id: 3, name: 'productos', link: '/app/products/' },
  { id: 4, name: 'inventario', link: '/app/catalog/' },
  { id: 5, name: 'configuracion', link: '/app/configuration/' },
  { id: 6, name: 'facturas', link: '/app/invoices/' },
  { id: 7, name: 'corte', link: '/app/cut/' },
]

type MainProps = {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainProps> = ({ children }) => (
  <div className="h-screen px-6 space-y-2">
    <Header tabs={actions} />
    <Toaster />
    <main className="h-4/5">{children}</main>
  </div>
)
