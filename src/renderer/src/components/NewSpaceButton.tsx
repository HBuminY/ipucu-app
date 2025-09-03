import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import React from 'react'

const NewSpaceButton: React.FC = () => {
  return (
    <Link to="/new-space">
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
    </Link>
  )
}

export default NewSpaceButton
