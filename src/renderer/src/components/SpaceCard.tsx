import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useDynamicNav } from '@renderer/hooks/useDynamicNav'

export type SpaceCardProps = {
  id: number
  title: string
  description: string | null
  onDeleted?: () => void
  onDeleteRequest?: (id: number, title: string) => void
}

const SpaceCard: React.FC<SpaceCardProps> = ({
  title,
  description,
  id,
  onDeleted,
  onDeleteRequest
}) => {
  const navigate = useNavigate()
  const { addButton } = useDynamicNav()

  const handleCardClick = (): void => {
    const editPath = `/edit-spaces/${id}/`
    navigate(editPath)
    addButton({ to: '/edit-spaces/', children: title, id: `space-${id}` })
  }

  const handleDeleteClick = (event: React.MouseEvent): void => {
    event.stopPropagation() // Prevent card click when delete is clicked
    onDeleteRequest?.(id, title)
    onDeleted?.()
  }

  return (
    <div
      className="h-full aspect-square bg-white/10 outline-4 outline-white/10 rounded-2xl text-white flex flex-col justify-start items-start gap-4 p-4 cursor-pointer transition-all hover:bg-white/20 hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          className="text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
          onClick={handleDeleteClick}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <p className="text-sm grow">{description}</p>

      <p className="text-xs text-gray-400">ID: {id}</p>
    </div>
  )
}

export default SpaceCard
