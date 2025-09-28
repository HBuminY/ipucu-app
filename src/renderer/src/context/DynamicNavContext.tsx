import React, { useState, ReactNode } from 'react'
import { AppRoutes } from '@renderer/routes'
import { DynamicNavContext, DynamicNavContextValue, NavButtonConfig } from './DynamicNavTypes'

// Provider component
export const DynamicNavProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dynamicButtons, setDynamicButtons] = useState<NavButtonConfig[]>([])

  const addButton = (buttonConfig: NavButtonConfig): void => {
    setDynamicButtons((prev) => {
      // Prevent duplicate routes (optional)
      const exists = prev.some((btn) => btn.to === buttonConfig.to)
      if (exists) {
        // Update existing button instead of adding duplicate
        return prev.map((btn) => (btn.to === buttonConfig.to ? buttonConfig : btn))
      }
      return [...prev, buttonConfig]
    })
  }

  const removeButton = (index: number): void => {
    setDynamicButtons((prev) => prev.filter((_, i) => i !== index))
  }

  const removeButtonByRoute = (route: AppRoutes): void => {
    setDynamicButtons((prev) => prev.filter((button) => button.to !== route))
  }

  const removeButtonById = (id: string): void => {
    setDynamicButtons((prev) => prev.filter((button) => button.id !== id))
  }

  const clearButtons = (): void => {
    setDynamicButtons([])
  }

  const updateButton = (index: number, buttonConfig: NavButtonConfig): void => {
    setDynamicButtons((prev) => prev.map((btn, i) => (i === index ? buttonConfig : btn)))
  }

  const updateButtonById = (id: string, buttonConfig: NavButtonConfig): void => {
    setDynamicButtons((prev) => prev.map((btn) => (btn.id === id ? buttonConfig : btn)))
  }

  const value: DynamicNavContextValue = {
    dynamicButtons,
    addButton,
    removeButton,
    removeButtonByRoute,
    removeButtonById,
    clearButtons,
    updateButton,
    updateButtonById
  }

  return <DynamicNavContext.Provider value={value}>{children}</DynamicNavContext.Provider>
}
