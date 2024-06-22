import React, { useMemo } from 'react'
import { Products, SubCategories, Subproducts, ProductsContext } from '@/types'
import { API_CONFIG } from '@/utils/config'
import { useFetchWithCache } from '@/hooks/useFetchWithCache'
import { createGenericContext } from '@/hooks/useGenericContext'

const [useProductsContext, ProductsProviderBase] = createGenericContext<ProductsContext>()

const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 💡 Decision: Eager Loading against Lazy loading, since the dataset is relatively & mostly static.
  // the custom hook `useFetchWithCache` is used to fetch the data from the server.
  // It has a cache to store the data, to avoid multiple API calls.
  // The hook returns the data in an array (sequentially due to promise.all), loading state, and error,
  // and refetch method(skip the cache).
  const { data, isLoading, error, updateCacheKeySuffixForRefetchingData } = useFetchWithCache<
    Array<Record<string, unknown>>
  >([API_CONFIG.PRODUCTS_URL, API_CONFIG.SUBCATEGORIES_URL, API_CONFIG.SUBPRODUCTS_URL])

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
      updateCacheKeySuffixForRefetchingData,
    }),
    [productsResponse, subCategoryResponse, subProductResponse, isLoading, error]
  )

  return <ProductsProviderBase value={productsContextValues}>{children}</ProductsProviderBase>
}
export { ProductsProvider, useProductsContext }
