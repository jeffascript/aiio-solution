import CheckboxWrapper from '@/molecules/CheckboxWrapper'
import React from 'react'

import products from '../../../public/data/products.json'
import PolymorphicInput from '@/atoms/PolyMorphicInput'
import { Subcategories } from '@/components/Subcategories'
import { useToggleItem } from '@/hooks/useToggleItem'
import ConditionalRender from '@/molecules/ConditionalRender'
import CheckboxInput from '@/atoms/CheckboxInput'
import { useProductsContext } from '@/context/ProductsContext'

const ProductsListView = ({ children }: { children: React.ReactNode }) => {
  const { allProducts, isLoading, error } = useProductsContext()

  const { handleToggleSelectedItem, selectedItem } = useToggleItem('products')

  if (error) return <div>{error}</div>
  if (isLoading) return <div>Loading...</div>
  if (!allProducts || allProducts.length === 0) return <div>No Product to show!</div>

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
            {<Subcategories productId={productId} />}
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
