import { useContext } from 'react'
import { DynamicNavContext, DynamicNavContextValue } from '../context/DynamicNavTypes'

// Custom hook to use the context
export const useDynamicNav = (): DynamicNavContextValue => {
  const context = useContext(DynamicNavContext)
  if (context === undefined) {
    throw new Error('useDynamicNav must be used within a DynamicNavProvider')
  }
  return context
}
