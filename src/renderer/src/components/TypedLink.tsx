import { AppRoutes } from '@renderer/routes'
import React from 'react'
import { Link } from 'react-router-dom'

interface TypedLinkProps {
  to: AppRoutes
  children: React.ReactNode
  className?: string
}

const TypedLink: React.FC<TypedLinkProps> = ({ to, children, className }) => {
  const combinedClassName = className
    ? `text-blue-500 hover:underline ${className}`
    : 'text-blue-500 hover:underline'

  let newTo = '/'
  if (to != '/') {
    newTo = `/${to}`
  }

  return (
    <Link to={newTo} className={combinedClassName}>
      {children}
    </Link>
  )
}

export default TypedLink
