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

const SubcategoriesHeader = ({ children }: { children: React.ReactNode }) => (
  <Header>
    <HeaderTitle>{children}</HeaderTitle>
    <HeaderIcon />
  </Header>
)

const SubcategoriesBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <Body>
      <SearchBar type="subcategories">Search ...</SearchBar>
      <SubcategoriesListView>{children}</SubcategoriesListView>
    </Body>
  )
}

const SubcategoriesFooter = ({ children }: { children: React.ReactNode }) => (
  <Footer>
    <Button Icon={PlusIcon}>{children}</Button>
  </Footer>
)

const Subcategories: React.FC<{ children?: React.ReactNode; selectedProductId: number | null }> = ({
  children,
  selectedProductId,
}) => {
  return (
    <Container backgroundColor={getStyleToken('darkerColor')}>
      <SubcatergoriesProvider selectedProductId={selectedProductId}>
        <SubcategoriesHeader> Select Categories </SubcategoriesHeader>
        <SubcategoriesBody>{children}</SubcategoriesBody>
        <SubcategoriesFooter> Add Category</SubcategoriesFooter>
      </SubcatergoriesProvider>
    </Container>
  )
}

export default Subcategories
