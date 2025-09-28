import { createContext } from 'react'
import { AppRoutes } from '@renderer/routes'

// Type for NavButton parameters
export interface NavButtonConfig {
  to: AppRoutes
  children: React.ReactNode
  id?: string // Optional unique identifier
}

// Context value type
export interface DynamicNavContextValue {
  dynamicButtons: NavButtonConfig[]
  addButton: (buttonConfig: NavButtonConfig) => void
  removeButton: (index: number) => void
  removeButtonByRoute: (route: AppRoutes) => void
  removeButtonById: (id: string) => void
  clearButtons: () => void
  updateButton: (index: number, buttonConfig: NavButtonConfig) => void
  updateButtonById: (id: string, buttonConfig: NavButtonConfig) => void
}

// Create the context
export const DynamicNavContext = createContext<DynamicNavContextValue | undefined>(undefined)
