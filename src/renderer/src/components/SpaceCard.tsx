import React from 'react'

export type SpaceCardProps = {
  id: number
  title: string
  description: string | null
}

const SpaceCard: React.FC<SpaceCardProps> = ({ title, description, id }) => {
  return (
    <div className="h-full aspect-square bg-white/10 outline-4 outline-white/10 rounded-2xl text-white">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <p className="text-xs text-gray-400">ID: {id}</p>
    </div>
  )
}

export default SpaceCard
