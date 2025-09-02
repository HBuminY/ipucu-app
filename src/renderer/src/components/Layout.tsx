import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

function NavButton({
  to,
  children
}: {
  to: string
  children: React.ReactNode
}): React.ReactElement {
  const location = useLocation()
  const isActive = location.pathname === to || (to === '/' && location.pathname === '/')

  return (
    <Link
      to={to}
      className={`
        px-3 py-2 rounded-md
        transition-all duration-200 ease-in-out
        transform hover:scale-105
        ${
          isActive
            ? 'text-green-200 bg-white/20 shadow-md font-medium'
            : 'text-green-600 hover:text-green-200 hover:bg-white/10'
        }
        hover:shadow-lg
      `}
    >
      {children}
    </Link>
  )
}

function Navbar(): React.ReactElement {
  return (
    <div className="w-8/12 h-14 flex flex-row items-center gap-2 shadow-2xl shadow-black/30">
      <div className="h-full rounded-sm mr-5 py-1 px-4 bg-white/20">
        <Logo className="h-11" />
      </div>

      <nav className="h-full rounded-l-sm rounded-r-4xl py-1 px-4 bg-white/20 text-green-950 flex flex-row items-center gap-3 grow shadow-2xl shadow-black/30">
        <NavButton to="/">Home</NavButton>
        <span className="text-green-600">|</span>
        <NavButton to="/spaces">Spaces</NavButton>
      </nav>
    </div>
  )
}

const Layout: React.FC = () => {
  return (
    <div className="layout h-screen w-full flex flex-col">
      <div className="w-full flex flex-row justify-center items-center p-3 flex-shrink-0">
        <Navbar />
      </div>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
