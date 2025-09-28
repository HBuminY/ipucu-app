import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

const Layout: React.FC = () => {
  return (
    <div className="layout h-screen w-full flex flex-col">
      <div className="w-full flex flex-row justify-center items-center p-3 flex-shrink-0">
        <Navbar />
      </div>

      <main className="flex-1 overflow-auto p-10">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
