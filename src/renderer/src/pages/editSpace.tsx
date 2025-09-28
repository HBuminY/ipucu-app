import React from 'react'
import { useSpaceId } from '../hooks/useRouteParams'
//import SpaceCard from '../components/SpaceCard'

const EditSpace: React.FC = () => {
  const { spaceId, isInvalid } = useSpaceId()

  if (isInvalid) {
    return <div className="w-full h-full">Invalid space ID</div>
  }

  return <div className="w-full h-full">Edit Space: (ID: {spaceId})</div>
}

export default EditSpace
