import React, { useCallback, useMemo, useState } from 'react'

import type { Subproduct, SubproductsContext } from '@/types'

import { createGenericContext } from '@/hooks/useGenericContext'
import { useProductsContext } from '@/context/ProductsContext'

const [useSubproductsContext, SubproductsProviderBase] = createGenericContext<SubproductsContext>()

const SubproductsProvider = ({
  children,
  selectedSubcategoryId,
}: {
  children: React.ReactNode
  selectedSubcategoryId: number
}) => {
  const { allSubproducts } = useProductsContext()

  const getFilteredSubProducts = useCallback((): Subproduct[] => {
    return selectedSubcategoryId
      ? allSubproducts.filter(({ subCategoryId }) => subCategoryId === selectedSubcategoryId)
      : []
  }, [allSubproducts, selectedSubcategoryId])

  const initialFilteredSubProducts = useMemo(getFilteredSubProducts, [getFilteredSubProducts])

  // State hook for managing the fetched subproduct data & filtering it based on the selected subcategory.
  // the selected subcategory also matches the subcategory id of the subproduct

  const [filteredSubProducts, setFilteredSubProducts] = useState<Subproduct[]>(
    initialFilteredSubProducts
  )

  const handleSubproductSearch = useCallback(
    (query: string) => {
      const lowerCaseQuery = query.toLowerCase()
      setFilteredSubProducts(
        initialFilteredSubProducts.filter(({ subProductName }) =>
          subProductName.toLowerCase().includes(lowerCaseQuery)
        )
      )
    },
    [initialFilteredSubProducts]
  )

  const memoizedSubproductContextValues = useMemo(
    () => ({
      filteredSubProducts,
      setFilteredSubProducts,
      handleSubproductSearch,
    }),
    [filteredSubProducts, setFilteredSubProducts, handleSubproductSearch]
  )

  return (
    <SubproductsProviderBase value={memoizedSubproductContextValues}>
      {children}
    </SubproductsProviderBase>
  )
}

export { SubproductsProvider, useSubproductsContext }
