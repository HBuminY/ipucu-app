import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export type PopupProps = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
  overlayClassName?: string
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

const Popup: React.FC<PopupProps> = ({
  children,
  isOpen,
  onClose,
  className = '',
  overlayClassName = '',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true
}) => {
  // Handle escape key press
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeOnEscape, isOpen, onClose])

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close popup"
          >
            <X size={24} />
          </button>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export default Popup
