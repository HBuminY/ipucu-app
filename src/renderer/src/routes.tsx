import React from 'react'
import Home from './pages/home'
import Spaces from './pages/spaces'
import Layout from './components/Layout'

// Define types for routes
export interface RouteChild {
  index?: boolean
  path?: string
  element: React.JSX.Element
}

export interface RouteConfig {
  path: string
  element: React.JSX.Element
  children?: RouteChild[]
}

const routedPages: RouteConfig[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'spaces',
        element: <Spaces />
      }
    ]
  }
]

export default routedPages
