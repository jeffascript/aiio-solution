import CheckboxWrapper from '@/molecules/CheckboxWrapper'
import React from 'react'

import products from '../../../public/data/products.json'
import PolymorphicInput from '@/atoms/PolyMorphicInput'
import { Subcategories } from '@/components/Subcategories'
import { useToggleItem } from '@/hooks/useToggleItem'
import ConditionalRender from '@/molecules/ConditionalRender'

const ProductsListView = ({ children }: { children: React.ReactNode }) => {
  const allProducts = products.products

  const { handleToggleSelectedItem, selectedItem } = useToggleItem('products')

  return (
    <>
      {allProducts.map((product) => (
        <React.Fragment key={`${product.productId}-${product.productName}`}>
          <CheckboxWrapper>
            <label htmlFor={product.productId.toString()}>{product.productName}</label>

            <PolymorphicInput
              type="checkbox"
              name={product.productName}
              checked={!!selectedItem?.[`${product.productId}-${product.productName}`]}
              onChange={() => {
                handleToggleSelectedItem(`${product.productId}-${product.productName}`)
              }}
              id={product.productId}
            />
          </CheckboxWrapper>

          <ConditionalRender
            condition={!!selectedItem?.[`${product.productId}-${product.productName}`]}
          >
            {<Subcategories productId={product.productId} />}
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
