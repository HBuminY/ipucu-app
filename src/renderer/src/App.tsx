import React, { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'

// Type declaration for maskAPI
declare global {
  interface Window {
    maskAPI?: {
      onSetMaskVisibility: (callback: (value: boolean) => void) => void
    }
  }
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
        className="fixed h-full w-full bg-black z-50"
        style={{ display: isMaskVisible ? 'block' : 'none' }}
      ></div>

      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<div className="h-full w-full text-7xl">Home Page</div>} />
        <Route path="/about" element={<div className="h-full w-full text-7xl">About Page</div>} />
      </Routes>
    </HashRouter>
  )
}

export default App
