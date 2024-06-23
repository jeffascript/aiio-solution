import { useCallback } from 'react'
import type { Subcategory } from '@/types'

export const useSubcategoryActions = (
  allSubcategoriesState: Subcategory[],
  setAllSubcategoriesState: React.Dispatch<React.SetStateAction<Subcategory[]>>,
  setFilteredSubcategories: React.Dispatch<React.SetStateAction<Subcategory[]>>,
  selectedProductId: number
) => {
  const handleSubcategorySearch = useCallback(
    (query: string) => {
      const lowerCaseQuery = query.toLowerCase()
      setFilteredSubcategories(
        allSubcategoriesState.filter(({ subCategoryName }) =>
          subCategoryName.toLowerCase().includes(lowerCaseQuery)
        )
      )
    },
    [allSubcategoriesState, setFilteredSubcategories]
  )

  const addNewSubCategoryOptimistically = useCallback(
    (value: string) => {
      const newSubCategory = {
        // just to have longer number for this optimistic feature,
        // DB generates its own index number
        // its a dummy data, so no need to use array length
        subCategoryId: allSubcategoriesState.length * 100,
        subCategoryName: value,
        productId: selectedProductId,
      }

      setAllSubcategoriesState((prev) => [...prev, newSubCategory])
      setFilteredSubcategories((prev) => [...prev, newSubCategory])
    },
    [allSubcategoriesState, selectedProductId, setAllSubcategoriesState, setFilteredSubcategories]
  )

  return {
    handleSubcategorySearch,
    addNewSubCategoryOptimistically,
  }
}
