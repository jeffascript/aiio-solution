import React from 'react'
import Body from '@/molecules/Body'
import Button from '@/molecules/Button'
import Container from '@/molecules/Container'
import { HeaderTitle, Header } from '@/molecules/Header'
import PlusIcon from '@/assets/plus.svg?react'
import Footer from '@/molecules/Footer'

import SearchBar from '@/molecules/SearchBar'
import SubProductsListView from './SubProductsListView'
import HeaderIcon from '@/molecules/HeaderIcon'
import { SubproductsProvider } from '@/context/SubProductContext'
import { getStyleToken } from '@/utils/token'

const SubProducts = ({
  children,
  subCategoryId,
}: {
  children?: React.ReactNode
  subCategoryId: number
}) => {
  return (
    <Container backgroundColor={getStyleToken('greyColor')}>
      <Header>
        <HeaderTitle>Select Sub-Products</HeaderTitle>
        <HeaderIcon />
      </Header>

      <Body>
        <SubproductsProvider selectedSubcategoryId={subCategoryId}>
          <SearchBar>Search ...</SearchBar>
          <SubProductsListView subCategoryId={subCategoryId}> {children}</SubProductsListView>
        </SubproductsProvider>
      </Body>

      <Footer>
        <Button onClick={() => console.log('hello ')} Icon={PlusIcon}>
          Add Product
        </Button>
      </Footer>
    </Container>
  )
}

export default SubProducts
