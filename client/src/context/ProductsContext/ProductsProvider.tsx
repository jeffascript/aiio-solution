import React, { useMemo } from 'react'
import { Products, SubCategories, Subproducts, ProductsContext } from '@/types'

import { useFetchWithCache } from '@/hooks/useFetchWithCache'
import { createGenericContext } from '@/hooks/useGenericContext'

const [useProductsContext, ProductsProviderBase] = createGenericContext<ProductsContext>()

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  // 💡 Decision: Eager Loading against Lazy loading, since the dataset is relatively & mostly static.
  // the custom hook `useFetchWithCache` is used to fetch the data from the server.
  // It has a cache to store the data, to avoid multiple API calls.
  // The hook returns the data in an array (sequentially due to promise.all), loading state, and error,
  // and refetch method(skip the cache).
  const { data, isLoading, error } = useFetchWithCache<Array<Record<string, unknown>>>([
    '/data/products.json',
    '/data/subcategories.json',
    '/data/subproducts.json',
  ])

  const [productsResponse, subCategoryResponse, subProductResponse] = (data || []) as [
    Products | null,
    SubCategories | null,
    Subproducts | null
  ]

  const productsContextValues = useMemo(
    () => ({
      allProducts: productsResponse?.products || [],
      allSubcategories: subCategoryResponse?.subcategories || [],
      allSubproducts: subProductResponse?.subproducts || [],
      isLoading,
      error,
    }),
    [productsResponse, subCategoryResponse, subProductResponse, isLoading, error]
  )

  return <ProductsProviderBase value={productsContextValues}>{children}</ProductsProviderBase>
}
export { ProductsProvider, useProductsContext }
