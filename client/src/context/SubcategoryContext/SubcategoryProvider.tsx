import React, { useCallback, useMemo } from 'react'
import type { SubcategoriesContext } from '@/types'

import { createGenericContext } from '@/hooks/useGenericContext'
import { useProductsContext } from '@/context/ProductsContext'
import { useNewItems } from '@/hooks/useNewItems'
import { useSubcategoryActions } from './useSubcategoryActions'
import { useSubcategoryInitialState } from './useSubcategoryInitialState'

const [useSubcatergoriesContext, SubcategoriesProviderBase] =
  createGenericContext<SubcategoriesContext>()

const SubcategoriesProvider: React.FC<{
  children: React.ReactNode
  selectedProductId: number
}> = ({ children, selectedProductId }) => {
  const { allSubcategories } = useProductsContext()

  const {
    allSubcategoriesState,
    setAllSubcategoriesState,
    filteredSubcategories,
    setFilteredSubcategories,
  } = useSubcategoryInitialState(allSubcategories, selectedProductId)

  const { isNewItemFormOpen, setIsNewItemFormOpen, inputValue, setInputValue } = useNewItems()

  const { handleSubcategorySearch, addNewSubCategoryOptimistically } = useSubcategoryActions(
    allSubcategoriesState,
    setAllSubcategoriesState,
    setFilteredSubcategories,
    selectedProductId
  )

  const handleNewSubCategory = useCallback(() => {
    if (!inputValue) return setIsNewItemFormOpen(false)

    // 💡 optimistical UI update.
    // the new subproduct item gets added instantly
    // without waiting for the api call to resolve.
    addNewSubCategoryOptimistically(inputValue)

    setInputValue('')
    setIsNewItemFormOpen(false)
  }, [inputValue, addNewSubCategoryOptimistically, setIsNewItemFormOpen, setInputValue])

  const memoizedSubcategoryContextValues = useMemo(
    () => ({
      filteredSubcategories,
      setFilteredSubcategories,
      handleSubcategorySearch,
      handleNewSubCategory,
      isNewSubCategoryFormOpen: isNewItemFormOpen,
      setIsNewSubCategoryFormOpen: setIsNewItemFormOpen,
      inputValue,
      setInputValue,
    }),
    [
      filteredSubcategories,
      setFilteredSubcategories,
      handleSubcategorySearch,
      handleNewSubCategory,
      setIsNewItemFormOpen,
      isNewItemFormOpen,
      inputValue,
      setInputValue,
    ]
  )

  return (
    <SubcategoriesProviderBase value={memoizedSubcategoryContextValues}>
      {children}
    </SubcategoriesProviderBase>
  )
}

export { SubcategoriesProvider, useSubcatergoriesContext }
