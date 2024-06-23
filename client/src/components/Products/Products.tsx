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

export const ProductsHeader = ({ children }: { children: React.ReactNode }) => {
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

export const ProductsBody = () => (
  <Body>
    <ProductsProvider>
      <ProductsListView />
    </ProductsProvider>
  </Body>
)

export const ProductsFooter = ({ children }: { children: React.ReactNode }) => (
  <Footer>
    <Button Icon={PlusIcon}>{children}</Button>
  </Footer>
)

export function Products({ children }: { children: React.ReactNode }) {
  return (
    <Container backgroundColor={getStyleToken('primaryColor')}>
      <ProductsProvider> {children}</ProductsProvider>
    </Container>
  )
}

// Assign the subcomponents to the Products component
Products.Header = ProductsHeader
Products.Body = ProductsBody
Products.Footer = ProductsFooter
