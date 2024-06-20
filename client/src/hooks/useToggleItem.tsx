import { useCallback } from 'react'
import { useToggleItemContext } from '@/context/ToggleItemContext'

type GroupType = 'products' | 'subcategories' | 'subproducts'

export const useToggleItem = (group: GroupType) => {
  const {
    dispatch,
    toggleState: { selectedItems },
  } = useToggleItemContext()

  const handleToggleItem = useCallback(
    (item: string) => {
      dispatch({ type: 'TOGGLE_ITEM', payload: { group, item } })
    },
    [dispatch, group]
  )

  return { handleToggleItem, selectedItem: selectedItems[group] }
}
