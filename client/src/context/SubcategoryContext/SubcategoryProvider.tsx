import React, { useCallback, useMemo, useState } from 'react'
import type { SubcatergoriesContext, Subcategory } from '@/types'

import { createGenericContext } from '@/hooks/useGenericContext'
import { useProductsContext } from '@/context/ProductsContext'

const [useSubcatergoriesContext, SubcatergoriesProviderBase] =
  createGenericContext<SubcatergoriesContext>()

const SubcatergoriesProvider: React.FC<{
  children: React.ReactNode
  selectedProductId: number | null
}> = ({ children, selectedProductId }) => {
  const { allSubcategories } = useProductsContext()

  const getFilteredSubcategories = useCallback(() => {
    return selectedProductId
      ? allSubcategories.filter(({ productId }) => productId === selectedProductId)
      : []
  }, [selectedProductId, allSubcategories])

  const initialFilteredSubcategories = useMemo(
    () => getFilteredSubcategories(),
    [getFilteredSubcategories]
  )

  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>(
    initialFilteredSubcategories
  )

  const handleSubcategorySearch = useCallback(
    (query: string) => {
      const lowerCaseQuery = query.toLowerCase()
      setFilteredSubcategories(
        initialFilteredSubcategories.filter(({ subCategoryName }) =>
          subCategoryName.toLowerCase().includes(lowerCaseQuery)
        )
      )
    },
    [initialFilteredSubcategories]
  )

  const memoizedSubcategoryContextValues = useMemo(
    () => ({
      filteredSubcategories,
      setFilteredSubcategories,
      handleSubcategorySearch,
    }),
    [filteredSubcategories, setFilteredSubcategories, handleSubcategorySearch]
  )

  return (
    <SubcatergoriesProviderBase value={memoizedSubcategoryContextValues}>
      {children}
    </SubcatergoriesProviderBase>
  )
}

export { SubcatergoriesProvider, useSubcatergoriesContext }
