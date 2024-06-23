import { useCallback } from 'react'
import type { Subproduct } from '@/types'

export const useSubproductActions = (
  allSubProductsState: Subproduct[],
  setAllSubProductsState: React.Dispatch<React.SetStateAction<Subproduct[]>>,
  setFilteredSubProducts: React.Dispatch<React.SetStateAction<Subproduct[]>>,
  selectedSubcategoryId: number
) => {
  const handleSubproductSearch = useCallback(
    (query: string) => {
      const lowerCaseQuery = query.toLowerCase()
      setFilteredSubProducts(
        allSubProductsState.filter(({ subProductName }) =>
          subProductName.toLowerCase().includes(lowerCaseQuery)
        )
      )
    },
    [allSubProductsState, setFilteredSubProducts]
  )

  const addNewSubproductOptimistically = useCallback(
    (value: string) => {
      const newSubProduct = {
        subProductId: allSubProductsState.length,
        subProductName: value,
        subCategoryId: selectedSubcategoryId,
      }

      setAllSubProductsState((prev) => [...prev, newSubProduct])
      setFilteredSubProducts((prev) => [...prev, newSubProduct])
    },
    [allSubProductsState, selectedSubcategoryId, setAllSubProductsState, setFilteredSubProducts]
  )

  return {
    handleSubproductSearch,
    addNewSubproductOptimistically,
  }
}
