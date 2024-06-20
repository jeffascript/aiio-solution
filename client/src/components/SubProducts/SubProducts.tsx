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

const SubProducts = ({
  children,
  subCategoryId,
}: {
  children?: React.ReactNode
  subCategoryId: number
}) => {
  return (
    <Container backgroundColor="var(--grey-color)">
      <Header>
        <HeaderTitle>Select Sub-Products</HeaderTitle>
        <HeaderIcon />
      </Header>

      <Body>
        <SearchBar>Search ...</SearchBar>
        <SubProductsListView subCategoryId={subCategoryId}> {children}</SubProductsListView>
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
