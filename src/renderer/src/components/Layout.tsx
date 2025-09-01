import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <nav className="navbar">
        <Link to="/">Home</Link> | <Link to="/spaces">Spaces</Link>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
