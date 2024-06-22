import { useCallback, useMemo, useState } from 'react'
import type { Subproduct } from '@/types'

export const useFilteredSubProducts = (
  allSubproducts: Subproduct[],
  selectedSubcategoryId: number
) => {
  const getFilteredSubProductsBySubcategoryId = useCallback((): Subproduct[] => {
    return selectedSubcategoryId
      ? allSubproducts.filter(({ subCategoryId }) => subCategoryId === selectedSubcategoryId)
      : []
  }, [allSubproducts, selectedSubcategoryId])

  const initialFilteredSubProducts = useMemo(getFilteredSubProductsBySubcategoryId, [
    getFilteredSubProductsBySubcategoryId,
  ])

  const [allSubProductsState, setAllSubProductsState] = useState<Subproduct[]>(
    initialFilteredSubProducts
  )
  const [filteredSubProducts, setFilteredSubProducts] = useState<Subproduct[]>(
    initialFilteredSubProducts
  )

  return {
    allSubProductsState,
    setAllSubProductsState,
    filteredSubProducts,
    setFilteredSubProducts,
  }
}
