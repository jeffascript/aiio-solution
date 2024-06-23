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
import { SubcategoriesProvider, useSubcatergoriesContext } from '@/context/SubcategoryContext'
import { getStyleToken } from '@/utils/token'
import ConditionalRender from '@/molecules/ConditionalRender'
import NewItemForm from '@/molecules/NewItemForm'

const SubcategoriesHeader = ({ children }: { children: React.ReactNode }) => (
  <Header>
    <HeaderTitle>{children}</HeaderTitle>
    <HeaderIcon />
  </Header>
)

const SubcategoriesBody = ({ children }: { children: React.ReactNode }) => {
  const { handleNewSubCategory, isNewSubCategoryFormOpen, inputValue, setInputValue } =
    useSubcatergoriesContext()
  return (
    <Body>
      <SearchBar type="subcategories">Search ...</SearchBar>
      <SubcategoriesListView>{children}</SubcategoriesListView>
      <ConditionalRender condition={isNewSubCategoryFormOpen}>
        <NewItemForm
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onAdd={handleNewSubCategory}
        />
      </ConditionalRender>
    </Body>
  )
}

const SubcategoriesFooter = ({ children }: { children: React.ReactNode }) => {
  const { setIsNewSubCategoryFormOpen, isNewSubCategoryFormOpen } = useSubcatergoriesContext()

  return (
    <Footer>
      <ConditionalRender condition={!isNewSubCategoryFormOpen}>
        <Button onClick={() => setIsNewSubCategoryFormOpen(true)} Icon={PlusIcon}>
          {children}
        </Button>
      </ConditionalRender>
    </Footer>
  )
}

const Subcategories: React.FC<{ children?: React.ReactNode; selectedProductId: number }> = ({
  children,
  selectedProductId,
}) => {
  return (
    <Container backgroundColor={getStyleToken('darkerColor')}>
      <SubcategoriesProvider selectedProductId={selectedProductId}>
        <SubcategoriesHeader> Select Categories </SubcategoriesHeader>
        <SubcategoriesBody>{children}</SubcategoriesBody>
        <SubcategoriesFooter> Add Category</SubcategoriesFooter>
      </SubcategoriesProvider>
    </Container>
  )
}

export default Subcategories
