import { useState } from 'react'
import useInput from './useInput'

// The hook manages the state and behavior for adding new items to a subproduct.
export const useNewItems = () => {
  const [isNewItemFormOpen, setIsNewItemFormOpen] = useState(false)
  const [newItem] = useState<Array<Record<string, number | string>>>([])
  const { value, setValue } = useInput('')

  return {
    isNewItemFormOpen,
    value,
    newItem,
    setIsNewItemFormOpen,
    setValue,
  }
}
