import CheckboxWrapper from '@/molecules/CheckboxWrapper'
import React from 'react'

import { Subcategories } from '@/components/Subcategories'
import { useToggleItem } from '@/hooks/useToggleItem'
import ConditionalRender from '@/molecules/ConditionalRender'
import CheckboxInput from '@/atoms/CheckboxInput'
import { useProductsContext } from '@/context/ProductsContext'

const ProductsListView = ({ children }: { children: React.ReactNode }) => {
  const { allProducts, isLoading, error } = useProductsContext()

  const { handleToggleSelectedItem, selectedItem } = useToggleItem('products')

  if (error) return <p>{error}</p>
  if (isLoading) return <p>Loading...</p>
  if (!allProducts || allProducts.length === 0) return <p>No Product to show!</p>

  return (
    <>
      {allProducts.map(({ productId, productName }) => (
        <React.Fragment key={`${productId}-${productName}`}>
          <CheckboxWrapper>
            <CheckboxInput
              label={productName}
              name={productName}
              checked={!!selectedItem?.[`${productId}-${productName}`]}
              onChange={() => {
                handleToggleSelectedItem(`${productId}-${productName}`)
              }}
              id={`${productId}-${productName}`}
            />
          </CheckboxWrapper>

          <ConditionalRender condition={!!selectedItem?.[`${productId}-${productName}`]}>
            <Subcategories selectedProductId={productId} />
          </ConditionalRender>
        </React.Fragment>
      ))}
    </>
  )
}

// Products.Container = Container
// Products.List = UsersList
// Products.Card = UserCard
// Products.Header = UsersHeader
// Products.BodyContents = UsersBodyContents
// Products.LoadMoreButton = LoadMoreUsersButton

export default ProductsListView
