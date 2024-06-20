import React from 'react'
import Body from '@/molecules/Body'
import Button from '@/molecules/Button'
import Container from '@/molecules/Container'
import { HeaderTitle, Header } from '@/molecules/Header'
import PlusIcon from '@/assets/plus.svg?react'
import Footer from '@/molecules/Footer'

import SearchBar from '@/molecules/SearchBar'
import SubcategoriesListView from './SubcategoriesListView'
import HeaderIcon from '@/molecules/HeaderIcon'

const Subcategories = ({
  children,
  productId,
}: {
  children?: React.ReactNode
  productId: number
}) => {
  return (
    <Container backgroundColor="var(--darker-color)">
      <Header>
        <HeaderTitle>Select Categories</HeaderTitle>
        <HeaderIcon />
      </Header>

      <Body>
        <SearchBar>Search ...</SearchBar>
        <SubcategoriesListView productId={productId}> {children}</SubcategoriesListView>
      </Body>

      <Footer>
        <Button onClick={() => console.log('hello ')} Icon={PlusIcon}>
          Add Product
        </Button>
      </Footer>
    </Container>
  )
}

export default Subcategories
