import { useState } from 'react'
import useInput from './useInput'

export const useNewItems = (subCategoryId: number) => {
  const [isNewItemFormOpen, setIsNewItemFormOpen] = useState(false)
  const [newItem, setNewItem] = useState<Array<Record<string, number | string>>>([])
  const { value, setValue } = useInput('')

  const handleNewItem = () => {
    setNewItem((prev) => [
      ...prev,
      {
        subProductId: prev.length - 1,
        subProductName: value,
        subCategoryId,
      },
    ])
    setValue('')
    setIsNewItemFormOpen(false)
  }

  return {
    isNewItemFormOpen,
    value,
    newItem,
    setIsNewItemFormOpen,
    setValue,
    handleNewItem,
  }
}
