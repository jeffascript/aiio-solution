import { useCallback } from 'react'
import { useToggleItemContext } from '@/context/ToggleItemContext/ToggleItemProvider'

type GroupType = 'products' | 'subcategories' | 'subproducts'

export const useToggleItem = (group = '' as GroupType) => {
  const {
    dispatch,
    selectedInputs: { selectedItems },
  } = useToggleItemContext()

  const handleToggleSelectedItem = useCallback(
    (item: string) => {
      dispatch({ type: 'TOGGLE_ITEM', payload: { group, item } })
    },
    [dispatch, group]
  )

  const handleCloseAllForms = useCallback(() => {
    dispatch({
      type: 'RESET_FORM_STATE',
      payload: {
        group: '',
        item: '',
      },
    })
  }, [dispatch, group])

  return { handleToggleSelectedItem, selectedItem: selectedItems[group], handleCloseAllForms }
}
