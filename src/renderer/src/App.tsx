import React, { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import routedPages, { RouteConfig, RouteChild } from './routes'

// Type declaration for maskAPI
declare global {
  interface Window {
    maskAPI?: {
      onSetMaskVisibility: (callback: (value: boolean) => void) => void
    }
  }
}

// Helper function to render routes with children
const renderRoutes = (routes: RouteConfig[]): React.JSX.Element[] => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children &&
        route.children.map((child: RouteChild, childIndex: number) => (
          <Route key={childIndex} index={child.index} path={child.path} element={child.element} />
        ))}
    </Route>
  ))
}

function App(): React.JSX.Element {
  // Add visibility state
  const [isMaskVisible, setIsMaskVisible] = useState(false)

  useEffect(() => {
    if (window.maskAPI && typeof window.maskAPI.onSetMaskVisibility === 'function') {
      window.maskAPI.onSetMaskVisibility((value) => {
        console.log('Mask visibility:', value)
        setIsMaskVisible(value)
      })
    }
  }, [])

  return (
    <HashRouter>
      <div
        className="fixed h-full w-full bg-gray-400 z-50"
        style={{ display: isMaskVisible ? 'block' : 'none' }}
      ></div>

      <Routes>{renderRoutes(routedPages)}</Routes>
    </HashRouter>
  )
}

export default App
