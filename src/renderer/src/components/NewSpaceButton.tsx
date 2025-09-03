import { Plus } from 'lucide-react'
import React from 'react'
import TypedLink from './TypedLink'

const NewSpaceButton: React.FC = () => {
  return (
    <TypedLink to="new-space">
      <div
        className="h-full aspect-square bg-white/10 outline-4 outline-white/10 rounded-2xl text-white flex flex-col justify-center items-center gap-2 cursor-pointer transition-all hover:bg-white/20 hover:scale-105"
        //   onClick={() => {
        //     window.api
        //       .callFunction('createNewSpace', 'New Space', 'This is a new space')
        //       .then((newSpace) => {
        //         console.log('New space created:', newSpace)
        //       })
        //   }}
      >
        <Plus size={48} />
        <p>make new space</p>
      </div>
    </TypedLink>
  )
}

export default NewSpaceButton
