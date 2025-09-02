import React from 'react'
import LogoSvg from '../assets/ipucu_logo_transparent.svg'

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img
      src={LogoSvg}
      alt="Ipucu Logo"
      className={`w-auto inline-block ${className || ''}`.trim()}
    />
  )
}

export default Logo
