import React, { useCallback, useMemo } from 'react'
import type { SubproductsContext } from '@/types'
import { createGenericContext } from '@/hooks/useGenericContext'
import { useProductsContext } from '@/context/ProductsContext'
import { useNewItems } from '@/hooks/useNewItems'
import usePostData from '@/hooks/usePostData'
import { API_CONFIG } from '@/utils/config'
import { useSubproductActions } from './useSubProductActions'
import { useSubproductsInitialState } from './useSubproductsInitialState'

const [useSubproductsContext, SubproductsProviderBase] = createGenericContext<SubproductsContext>()

const SubproductsProvider: React.FC<{
  children: React.ReactNode
  selectedSubcategoryId: number
}> = ({ children, selectedSubcategoryId }) => {
  const { allSubproducts, updateCacheKeySuffixForRefetchingData } = useProductsContext()
  const { postData } = usePostData()

  const {
    allSubProductsState,
    setAllSubProductsState,
    filteredSubProducts,
    setFilteredSubProducts,
  } = useSubproductsInitialState(allSubproducts, selectedSubcategoryId)

  const { isNewItemFormOpen, setIsNewItemFormOpen, inputValue, setInputValue } = useNewItems()

  const { handleSubproductSearch, addNewSubproductOptimistically } = useSubproductActions(
    allSubProductsState,
    setAllSubProductsState,
    setFilteredSubProducts,
    selectedSubcategoryId
  )

  const handleNewSubproduct = useCallback(() => {
    if (!inputValue) return setIsNewItemFormOpen(false)

    // 💡 optimistical UI update.
    // the new subproduct item gets added instantly
    // without waiting for the api call to resolve.
    addNewSubproductOptimistically(inputValue)

    setInputValue('')
    setIsNewItemFormOpen(false)
    // hook for POST api req for the new subproduct created
    postData(API_CONFIG.SUBPRODUCTS_URL, {
      subProductName: inputValue,
      subCategoryId: selectedSubcategoryId,
    }).then(() =>
      updateCacheKeySuffixForRefetchingData(
        // creating a unique str in order to
        // append & bypass the cache and refetch new data
        // so as to keep the state in sync with the server (after the optimistic UI update)
        `${selectedSubcategoryId}-${selectedSubcategoryId}-${inputValue.charAt(0)}`
      )
    )
  }, [inputValue, setIsNewItemFormOpen, setIsNewItemFormOpen, setInputValue])

  const memoizedSubproductContextValues = useMemo(
    () => ({
      filteredSubProducts,
      setFilteredSubProducts,
      handleSubproductSearch,
      handleNewSubproduct,
      isNewSubproductFormOpen: isNewItemFormOpen,
      setIsNewSubproductFormOpen: setIsNewItemFormOpen,
      inputValue,
      setInputValue,
    }),
    [
      filteredSubProducts,
      setFilteredSubProducts,
      handleSubproductSearch,
      handleNewSubproduct,
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
