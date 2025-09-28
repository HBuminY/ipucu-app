import React from 'react'
import Logo from './Logo'
import TypedLink from './TypedLink'
import { useLocation } from 'react-router-dom'
import { useDynamicNav } from '../hooks/useDynamicNav'
import { NavButtonConfig } from '../context/DynamicNavTypes'

function NavButton({ to, children }: NavButtonConfig): React.ReactElement {
  const location = useLocation()
  const isActive = location.pathname === to || (to === '/' && location.pathname === '/')

  return (
    <TypedLink
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
    </TypedLink>
  )
}

function PageButton({ to, children }: NavButtonConfig): React.ReactElement {
  const location = useLocation()
  const isActive = location.pathname === to || (to === '/' && location.pathname === '/')

  return (
    <TypedLink
      to={to}
      className={`
        px-3 py-2 rounded-md
        transition-all duration-200 ease-in-out
        transform hover:scale-105
        ${
          isActive
            ? 'text-blue-200 bg-blue-500/30 shadow-md font-medium border border-blue-300/50'
            : 'text-blue-600 hover:text-blue-200 hover:bg-blue-500/20 border border-transparent hover:border-blue-300/30'
        }
        hover:shadow-lg
      `}
    >
      {children}
    </TypedLink>
  )
}

function ActivePages(): React.ReactElement {
  const { dynamicButtons } = useDynamicNav()

  return (
    <div className="flex items-center gap-3">
      {dynamicButtons.map((buttonConfig, index) => (
        <React.Fragment key={`${buttonConfig.to}-${index}`}>
          {index > 0 && <span className="text-blue-400">|</span>}
          <PageButton to={buttonConfig.to}>{buttonConfig.children}</PageButton>
        </React.Fragment>
      ))}
    </div>
  )
}

export function Navbar(): React.ReactElement {
  return (
    <div className="w-8/12 h-14 flex flex-row items-center gap-2 shadow-2xl shadow-black/30">
      <div className="h-full rounded-sm mr-5 py-1 px-4 bg-white/20">
        <Logo className="h-11" />
      </div>

      <nav className="h-full rounded-l-sm rounded-r-4xl py-1 px-4 bg-white/20 text-green-950 flex flex-row items-center gap-3 grow shadow-2xl shadow-black/30">
        <NavButton to="/">Home</NavButton>
        <span className="text-green-600">|</span>
        <NavButton to="spaces">Spaces</NavButton>
        <span className="text-green-600">|</span>
        <ActivePages />
      </nav>
    </div>
  )
}
