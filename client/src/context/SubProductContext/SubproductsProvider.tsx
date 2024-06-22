import React, { useCallback, useMemo, useState } from 'react'
import type { Subproduct, SubproductsContext } from '@/types'
import { createGenericContext } from '@/hooks/useGenericContext'
import { useProductsContext } from '@/context/ProductsContext'
import { useNewItems } from '@/hooks/useNewItems'

const [useSubproductsContext, SubproductsProviderBase] = createGenericContext<SubproductsContext>()

const SubproductsProvider = ({
  children,
  selectedSubcategoryId,
}: {
  children: React.ReactNode
  selectedSubcategoryId: number
}) => {
  const { allSubproducts } = useProductsContext()

  const getFilteredSubProductsBySubcategoryId = useCallback((): Subproduct[] => {
    return selectedSubcategoryId
      ? allSubproducts.filter(({ subCategoryId }) => subCategoryId === selectedSubcategoryId)
      : []
  }, [allSubproducts, selectedSubcategoryId])

  const initialFilteredSubProducts = useMemo(getFilteredSubProductsBySubcategoryId, [
    getFilteredSubProductsBySubcategoryId,
  ])

  // State hook for managing the fetched subproduct data & filtering it based on the selected subcategory.
  // the selected subcategory also matches the subcategory id of the subproduct

  const [allSubProductsState, setAllSubProductsState] = useState<Subproduct[]>(
    initialFilteredSubProducts
  )
  const [filteredSubProducts, setFilteredSubProducts] = useState<Subproduct[]>(
    initialFilteredSubProducts
  )

  const { isNewItemFormOpen, setIsNewItemFormOpen, value, setValue } = useNewItems()

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
    if (!value) return setIsNewItemFormOpen(false)

    handleAddNewSubproduct(value)

    setValue('')
    setIsNewItemFormOpen(false)
  }, [value, handleAddNewSubproduct, setIsNewItemFormOpen, setValue])

  const memoizedSubproductContextValues = useMemo(
    () => ({
      filteredSubProducts,
      setFilteredSubProducts,
      handleSubproductSearch,
      handleNewItem,
      isNewItemFormOpen,
      setIsNewItemFormOpen,
      value,
      setValue,
    }),
    [
      filteredSubProducts,
      setFilteredSubProducts,
      handleSubproductSearch,
      handleNewItem,
      isNewItemFormOpen,
      setIsNewItemFormOpen,
      value,
      setValue,
    ]
  )

  return (
    <SubproductsProviderBase value={memoizedSubproductContextValues}>
      {children}
    </SubproductsProviderBase>
  )
}

export { SubproductsProvider, useSubproductsContext }
