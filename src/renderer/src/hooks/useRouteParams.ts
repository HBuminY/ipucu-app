import { useParams } from 'react-router-dom'

/**
 * Specific hook for space-related routes that need spaceId
 */
export const useSpaceParams = (): { spaceId?: string } => {
  return useParams<{ spaceId?: string }>()
}

interface UseSpaceIdReturn {
  spaceId: number | null
  spaceIdString: string | undefined
  isValid: boolean
  isInvalid: boolean
}

/**
 * Hook that returns the spaceId as a number
 * @returns Object with spaceId as number and helper functions
 */
export const useSpaceId = (): UseSpaceIdReturn => {
  const { spaceId } = useSpaceParams()

  const id = spaceId ? parseInt(spaceId, 10) : null
  const isValid = id !== null && !isNaN(id) && id > 0

  return {
    spaceId: id,
    spaceIdString: spaceId,
    isValid,
    isInvalid: !isValid
  }
}
