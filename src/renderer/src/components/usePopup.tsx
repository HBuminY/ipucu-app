import { useState, useCallback } from 'react'
import Popup, { PopupProps } from './Popup'
import React from 'react'

type UsePopupOptions = Omit<PopupProps, 'children' | 'isOpen' | 'onClose'>

type UsePopupReturn = {
  isOpen: boolean
  open: () => void
  close: (customLogic?: () => void) => void
  Popup: ({ children }: { children: React.ReactNode }) => React.JSX.Element
}

export const usePopup = (options: UsePopupOptions = {}): UsePopupReturn => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])

  const close = useCallback((customLogic?: () => void) => {
    // Run custom logic if provided
    customLogic?.()
    setIsOpen(false)
  }, [])

  const PopupComponent = useCallback(
    ({ children }: { children: React.ReactNode }) => (
      <Popup {...options} isOpen={isOpen} onClose={() => close()}>
        {children}
      </Popup>
    ),
    [isOpen, close, options]
  )

  return {
    isOpen,
    open,
    close,
    Popup: PopupComponent
  }
}
