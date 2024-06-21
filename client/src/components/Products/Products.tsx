import React from 'react'
import Body from '@/molecules/Body'
import Button from '@/molecules/Button'
import Container from '@/molecules/Container'
import { HeaderTitle, Header } from '@/molecules/Header'
import PlusIcon from '@/assets/plus.svg?react'
import Footer from '@/molecules/Footer'
import ProductsListView from './ProductsListView'

import { ProductsProvider } from '@/context/ProductsContext'
import { getStyleToken } from '@/utils/token'
import { useToggleItemContext } from '@/context/ToggleItemContext'

const Products = ({ children }: { children: React.ReactNode }) => {
  const { toggleModal, getAllSelectedData } = useToggleItemContext()

  return (
    <Container backgroundColor={getStyleToken('primaryColor')}>
      <Header>
        <HeaderTitle>Products</HeaderTitle>
        <Button
          onClick={() => {
            getAllSelectedData()
            toggleModal()
          }}
        >
          Done
        </Button>
      </Header>

      <Body>
        <ProductsProvider>
          <ProductsListView> {children}</ProductsListView>
        </ProductsProvider>
      </Body>

      <Footer>
        <Button Icon={PlusIcon}>Add Product</Button>
      </Footer>
    </Container>
  )
}

export default Products
