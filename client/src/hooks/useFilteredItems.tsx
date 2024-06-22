import { useCallback, useMemo, useState } from 'react'

export const useFilteredItems = <T extends { [key: string]: unknown }>(
  allItems: T[],
  selectedCategoryId: number,
  lookupKey: keyof T
) => {
  const getFilteredItemsByCategoryId = useCallback((): T[] => {
    return selectedCategoryId
      ? allItems.filter((item) => item[lookupKey] === selectedCategoryId)
      : []
  }, [allItems, selectedCategoryId])

  const initialFilteredItems = useMemo(getFilteredItemsByCategoryId, [getFilteredItemsByCategoryId])

  const [allItemsState, setAllItemsState] = useState<T[]>(initialFilteredItems)
  const [filteredItems, setFilteredItems] = useState<T[]>(initialFilteredItems)

  return {
    allItemsState,
    setAllItemsState,
    filteredItems,
    setFilteredItems,
  }
}
