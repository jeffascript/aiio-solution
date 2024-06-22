import React, { useCallback, useMemo } from 'react'
import type { Subproduct, SubproductsContext } from '@/types'
import { createGenericContext } from '@/hooks/useGenericContext'
import { useProductsContext } from '@/context/ProductsContext'
import { useNewItems } from '@/hooks/useNewItems'
import usePostData from '@/hooks/usePostData'
import { API_CONFIG } from '@/utils/config'
import { useFilteredItems } from '@/hooks/useFilteredItems'
import { useItemSearch } from '@/hooks/useItemSearch'
import { useAddNewItem } from '@/hooks/useAddNewItem'

const [useSubproductsContext, SubproductsProviderBase] = createGenericContext<SubproductsContext>()

const SubproductsProvider: React.FC<{
  children: React.ReactNode
  selectedSubcategoryId: number
}> = ({ children, selectedSubcategoryId }) => {
  const { allSubproducts, updateCacheKeySuffixForRefetchingData } = useProductsContext()
  const { postData } = usePostData()

  const {
    allItemsState: allSubProductsState,
    setAllItemsState: setAllSubProductsState,
    filteredItems: filteredSubProducts,
    setFilteredItems: setFilteredSubProducts,
  } = useFilteredItems<Subproduct>(allSubproducts, selectedSubcategoryId, 'subCategoryId')

  const handleSubproductSearch = useItemSearch<Subproduct>(
    allSubProductsState,
    setFilteredSubProducts,
    'subProductName'
  )

  const handleAddNewSubproduct = useAddNewItem<Subproduct>(
    allSubProductsState,
    setAllSubProductsState,
    setFilteredSubProducts,
    selectedSubcategoryId,
    'subProductId'
  )

  const { isNewItemFormOpen, setIsNewItemFormOpen, inputValue, setInputValue } = useNewItems()

  const handleNewItem = useCallback(() => {
    if (!inputValue) return setIsNewItemFormOpen(false)

    // Optimistic UI update
    handleAddNewSubproduct(inputValue)

    setInputValue('')
    setIsNewItemFormOpen(false)

    // POST the new item
    postData(API_CONFIG.SUBPRODUCTS_URL, {
      subProductName: inputValue,
      subCategoryId: selectedSubcategoryId,
    }).then(() =>
      updateCacheKeySuffixForRefetchingData(
        `${selectedSubcategoryId}-${selectedSubcategoryId}-${inputValue.charAt(0)}`
      )
    )
  }, [
    inputValue,
    handleAddNewSubproduct,
    setIsNewItemFormOpen,
    setInputValue,
    postData,
    selectedSubcategoryId,
    updateCacheKeySuffixForRefetchingData,
  ])

  const memoizedSubproductContextValues = useMemo(
    () => ({
      filteredSubProducts,
      setFilteredSubProducts,
      handleSubproductSearch,
      handleNewItem,
      isNewItemFormOpen,
      setIsNewItemFormOpen,
      inputValue,
      setInputValue,
    }),
    [
      filteredSubProducts,
      setFilteredSubProducts,
      handleSubproductSearch,
      handleNewItem,
      isNewItemFormOpen,
      setIsNewItemFormOpen,
      inputValue,
      setInputValue,
    ]
  )

  return (
    <SubproductsProviderBase value={memoizedSubproductContextValues}>
      {children}
    </SubproductsProviderBase>
  )
}

export { SubproductsProvider, useSubproductsContext }
