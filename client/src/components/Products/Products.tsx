import React from 'react'
import Body from '@/molecules/Body'
import Button from '@/molecules/Button'
import Container from '@/molecules/Container'
import { HeaderTitle, Header } from '@/molecules/Header'
import PlusIcon from '@/assets/plus.svg?react'
import Footer from '@/molecules/Footer'
import ProductsListView from './ProductsListView'

const Products = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container backgroundColor="var(--primary-color)">
      <Header>
        <HeaderTitle>Products</HeaderTitle>
        <Button onClick={() => console.log('hello ')}>Done</Button>
      </Header>

      <Body>
        <ProductsListView> {children}</ProductsListView>
      </Body>

      <Footer>
        <Button onClick={() => console.log('hello ')} Icon={PlusIcon}>
          Add Product
        </Button>
      </Footer>
    </Container>
  )
}

export default Products
