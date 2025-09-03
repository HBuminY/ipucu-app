import React from 'react'
import Home from './pages/home'
import Spaces from './pages/spaces'
import Layout from './components/Layout'
import NewSpace from './pages/newSpace'

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
      },
      {
        path: 'new-space',
        element: <NewSpace />
      }
    ]
  }
]

export default routedPages
