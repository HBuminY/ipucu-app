import React, { useEffect, useState } from 'react'
import { Trash2, AlertTriangle } from 'lucide-react'
import SpaceCard, { SpaceCardProps } from './SpaceCard'
import NewSpaceButton from './NewSpaceButton'
import Popup from './Popup'

const SpaceGallery: React.FC = () => {
  const [spaces, setSpaces] = useState<SpaceCardProps[]>([])
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [spaceToDelete, setSpaceToDelete] = useState<{ id: number; title: string } | null>(null)

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
  }, [refreshTrigger])

  const handleSpaceDeleted = (): void => {
    // Trigger a re-fetch by updating the refreshTrigger
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleDeleteRequest = (id: number, title: string): void => {
    setSpaceToDelete({ id, title })
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = async (): Promise<void> => {
    if (!spaceToDelete) return

    try {
      await window.api.callFunction('deleteSpace', spaceToDelete.id)
      console.log(`Space with ID ${spaceToDelete.id} deleted successfully`)
      setShowDeleteConfirm(false)
      setSpaceToDelete(null)
      handleSpaceDeleted()
    } catch (error) {
      console.error('Failed to delete space:', error)
      setShowDeleteConfirm(false)
    }
  }

  const handleCancelDelete = (): void => {
    setShowDeleteConfirm(false)
    setSpaceToDelete(null)
  }

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
            onDeleted={handleSpaceDeleted}
            onDeleteRequest={handleDeleteRequest}
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
            onDeleted={handleSpaceDeleted}
            onDeleteRequest={handleDeleteRequest}
          />
        ))}
      </div>

      {/* Delete Confirmation Popup */}
      <Popup
        isOpen={showDeleteConfirm}
        onClose={handleCancelDelete}
        className="max-w-md"
        showCloseButton={false}
        closeOnOverlayClick={false}
        closeOnEscape={true}
      >
        <div className="text-center text-white">
          <div className="flex justify-center mb-4">
            <AlertTriangle size={48} className="text-yellow-400" />
          </div>

          <h3 className="text-lg font-bold mb-2">Delete Space</h3>
          <p className="text-sm text-white/80 mb-6">
            Are you sure you want to delete &ldquo;<strong>{spaceToDelete?.title}</strong>&rdquo;?
            <br />
            This action cannot be undone.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleCancelDelete}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default SpaceGallery
