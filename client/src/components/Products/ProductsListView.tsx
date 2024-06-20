import CheckboxWrapper from '@/molecules/CheckboxWrapper'
import React from 'react'

import products from '../../../public/data/products.json'
import PolymorphicInput from '@/atoms/PolyMorphicInput'
import { Subcategories } from '@/components/Subcategories'

const ProductsListView = ({ children }: { children: React.ReactNode }) => {
  const allProducts = products.products

  const [selectedProduct, setSelectedProduct] = React.useState<Record<number, boolean>>({})

  const handleSelectedProduct = (productId: number) => {
    setSelectedProduct((prev) => ({ ...prev, [productId]: !prev[productId] }))
  }

  return (
    <>
      {allProducts.map((product) => (
        <React.Fragment key={`${product.productId}.${product.productName}`}>
          <CheckboxWrapper>
            <label htmlFor={product.productId.toString()}>{product.productName}</label>

            <PolymorphicInput
              type="checkbox"
              name={product.productName}
              checked={!!selectedProduct?.[product.productId]}
              onChange={() => {
                handleSelectedProduct(product.productId)
                //   handleToggleItem(`1.${product.productId}`);
              }}
              id={product.productId}
            />
          </CheckboxWrapper>

          {selectedProduct?.[product.productId] && <Subcategories productId={product.productId} />}

          {/* <ConditionalRender condition={!!selectedProduct?.[product.productId]}>
              {childrenWithExtraProp(product.productId)}
            </ConditionalRender> */}

          {/* <Switcher
              condition={!!selectedProduct?.[product.productId]}
              // allOpen={selectedProduct}
              id={product.productId}
              children={children}
            /> */}
        </React.Fragment>
      ))}
      {/* {selectedProduct && Object.keys(selectedProduct).length ? (
          <div> hello </div>
        ) : null} */}
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
