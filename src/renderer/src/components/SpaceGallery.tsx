import React, { useEffect, useState } from 'react'
import SpaceCard, { SpaceCardProps } from './SpaceCard'
import NewSpaceButton from './NewSpaceButton'

const SpaceGallery: React.FC = () => {
  const [spaces, setSpaces] = useState<SpaceCardProps[]>([])

  useEffect(() => {
    const fetchSpaces = async (): Promise<void> => {
      try {
        const fetchedSpaces = await window.api.callFunction('getAllSpaces')
        setSpaces(fetchedSpaces)
      } catch (error) {
        console.error('Error fetching spaces:', error)
      }
    }

    fetchSpaces()
  }, [])

  const topRowSpaces = spaces.filter((_, index) => index % 2 === 0)
  const bottomRowSpaces = spaces.filter((_, index) => index % 2 !== 0)

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-10">
      <div className="w-full h-1/2 flex flex-row justify-start gap-10">
        <NewSpaceButton />
        {topRowSpaces.map((space) => (
          <SpaceCard
            key={space.id}
            title={space.title}
            description={space.description}
            id={space.id}
          />
        ))}
      </div>

      <div className="w-full h-1/2 flex flex-row justify-start gap-10">
        {bottomRowSpaces.map((space) => (
          <SpaceCard
            key={space.id}
            title={space.title}
            description={space.description}
            id={space.id}
          />
        ))}
      </div>
    </div>
  )
}

export default SpaceGallery
