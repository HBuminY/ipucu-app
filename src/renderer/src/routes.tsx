import React from 'react'
import Home from './pages/home'
import Spaces from './pages/spaces'
import Layout from './components/Layout'
import NewSpace from './pages/newSpace'

// Define types for routes
export interface RouteChild {
  readonly index?: boolean
  readonly path?: string
  readonly element: React.JSX.Element
}

export interface RouteConfig {
  readonly path: string
  readonly element: React.JSX.Element
  readonly children?: readonly RouteChild[]
}

const routedPages = [
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
] as const

export type AppRoutes = {
  [K in keyof typeof routedPages]: (typeof routedPages)[K] extends infer T
    ? T extends { path: string; children: readonly unknown[] }
      ? T['children'][number] extends infer C
        ? C extends { path: string }
          ? C['path']
          : C extends { index: true }
            ? T['path']
            : never
        : never
      : T extends { path: string }
        ? T['path']
        : never
    : never
}[keyof typeof routedPages]

export default routedPages
