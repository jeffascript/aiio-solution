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

const ProductsHeader = ({ children }: { children: React.ReactNode }) => {
  const { toggleModal, getAllSelectedData } = useToggleItemContext()

  return (
    <Header>
      <HeaderTitle>{children}</HeaderTitle>
      <Button
        onClick={() => {
          getAllSelectedData()
          toggleModal()
        }}
      >
        Done
      </Button>
    </Header>
  )
}

const ProductsBody = ({ children }: { children: React.ReactNode }) => (
  <Body>
    <ProductsProvider>
      <ProductsListView>{children}</ProductsListView>
    </ProductsProvider>
  </Body>
)

const ProductsFooter = ({ children }: { children: React.ReactNode }) => (
  <Footer>
    <Button Icon={PlusIcon}>{children}</Button>
  </Footer>
)

const Products: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Container backgroundColor={getStyleToken('primaryColor')}>
      <ProductsProvider>
        <ProductsHeader>Products</ProductsHeader>
        <ProductsBody>{children}</ProductsBody>
        <ProductsFooter>Add Product</ProductsFooter>
      </ProductsProvider>
    </Container>
  )
}

export default Products
