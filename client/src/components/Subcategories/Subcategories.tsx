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
import { SubcatergoriesProvider } from '@/context/SubcategoryContext'
import { getStyleToken } from '@/utils/token'

const Subcategories = ({
  children,
  selectedProductId,
}: {
  children?: React.ReactNode
  selectedProductId: number | null
}) => {
  return (
    <Container backgroundColor={getStyleToken('darkerColor')}>
      <Header>
        <HeaderTitle>Select Categories</HeaderTitle>
        <HeaderIcon />
      </Header>

      <Body>
        <SubcatergoriesProvider selectedProductId={selectedProductId}>
          <SearchBar type="subcategories">Search ...</SearchBar>
          <SubcategoriesListView> {children}</SubcategoriesListView>
        </SubcatergoriesProvider>
      </Body>

      <Footer>
        <Button Icon={PlusIcon}>Add Product</Button>
      </Footer>
    </Container>
  )
}

export default Subcategories
