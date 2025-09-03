import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewSpace: React.FC = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!title) {
      // Here you could show an error to the user
      console.error('Title is required')
      return
    }
    try {
      await window.api.callFunction('createNewSpace', title, description)
      navigate('/')
    } catch (error) {
      console.error('Error creating space:', error)
    }
  }

  return (
    <div className="w-full h-full py-10 px-12 flex flex-row justify-center items-center">
      <div className="h-full w-full outline-8 outline-white/10 bg-white/10 rounded-lg p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold mb-4">Create a New Space</h1>
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/10 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/10 rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md self-end"
          >
            Create Space
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewSpace
