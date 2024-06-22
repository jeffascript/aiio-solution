import React, { useCallback, useMemo, useState } from 'react'
import type { Subproduct, SubproductsContext } from '@/types'
import { createGenericContext } from '@/hooks/useGenericContext'
import { useProductsContext } from '@/context/ProductsContext'
import { useNewItems } from '@/hooks/useNewItems'
import usePostData from '@/hooks/usePostData'
import { API_CONFIG } from '@/utils/config'

const [useSubproductsContext, SubproductsProviderBase] = createGenericContext<SubproductsContext>()

const SubproductsProvider: React.FC<{
  children: React.ReactNode
  selectedSubcategoryId: number
}> = ({ children, selectedSubcategoryId }) => {
  const { allSubproducts, updateCacheKeySuffixForRefetchingData } = useProductsContext()
  const { postData } = usePostData()

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

  const { isNewItemFormOpen, setIsNewItemFormOpen, inputValue, setInputValue } = useNewItems()

  const handleSubproductSearch = useCallback(
    (query: string) => {
      const lowerCaseQuery = query.toLowerCase()
      setFilteredSubProducts(
        allSubProductsState.filter(({ subProductName }) =>
          subProductName.toLowerCase().includes(lowerCaseQuery)
        )
      )
    },
    [allSubProductsState]
  )

  const handleAddNewSubproduct = useCallback(
    (value: string) => {
      const newSubProduct = {
        subProductId: allSubProductsState.length,
        subProductName: value,
        subCategoryId: selectedSubcategoryId,
      }

      setAllSubProductsState((prev) => [...prev, newSubProduct])
      setFilteredSubProducts((prev) => [...prev, newSubProduct])
    },
    [allSubProductsState, selectedSubcategoryId]
  )

  const handleNewItem = useCallback(() => {
    if (!inputValue) return setIsNewItemFormOpen(false)

    // 💡 optimistical UI update.
    // the new subproduct item gets added instantly
    // without waiting for the api call to resolve.
    handleAddNewSubproduct(inputValue)

    setInputValue('')
    setIsNewItemFormOpen(false)
    // hook for POST of the new item created
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
  }, [inputValue, handleAddNewSubproduct, setIsNewItemFormOpen, setInputValue])

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
