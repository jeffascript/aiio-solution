import { useCallback, useMemo, useState } from 'react'
import type { Subcategory } from '@/types'

export const useSubcategoryInitialState = (
  allSubcategories: Subcategory[],
  selectedProductId: number
) => {
  const getFilteredSubcategories = useCallback(() => {
    return selectedProductId
      ? allSubcategories.filter(({ productId }) => productId === selectedProductId)
      : []
  }, [selectedProductId, allSubcategories])

  const initialFilteredSubcategories = useMemo(
    () => getFilteredSubcategories(),
    [getFilteredSubcategories]
  )

  const [allSubcategoriesState, setAllSubcategoriesState] = useState<Subcategory[]>(
    initialFilteredSubcategories
  )
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>(
    initialFilteredSubcategories
  )

  return {
    allSubcategoriesState,
    setAllSubcategoriesState,
    filteredSubcategories,
    setFilteredSubcategories,
  }
}
