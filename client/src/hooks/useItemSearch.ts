import { useCallback } from 'react'

export const useItemSearch = <T extends { [key: string]: unknown }>(
  allItemsState: T[],
  setFilteredItems: React.Dispatch<React.SetStateAction<T[]>>,
  LookupKey: keyof T
) => {
  const handleItemSearch = useCallback(
    (query: string) => {
      const lowerCaseQuery = query.toLowerCase()
      setFilteredItems(
        allItemsState.filter((item) =>
          (item[LookupKey] as string).toLowerCase().includes(lowerCaseQuery)
        )
      )
    },
    [allItemsState, setFilteredItems]
  )

  return handleItemSearch
}
