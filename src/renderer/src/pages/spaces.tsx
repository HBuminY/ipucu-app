import SpaceCard from '@renderer/components/SpaceCard'
import React from 'react'
//import SpaceCard from '../components/SpaceCard'

const Spaces: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-10">
      <div className="w-full h-1/2 flex flex-row justify-start gap-10">
        {Array.from({ length: 10 }, (_, i) => (
          <SpaceCard key={i} />
        ))}
      </div>

      <div className="w-full h-1/2 flex flex-row justify-start gap-10">
        {Array.from({ length: 10 }, (_, i) => (
          <SpaceCard key={i} />
        ))}
      </div>
    </div>
  )
}

export default Spaces
