import React from 'react'
import Body from '@/molecules/Body'
import Button from '@/molecules/Button'
import { HeaderTitle, Header } from '@/molecules/Header'
import PlusIcon from '@/assets/plus.svg?react'
import Footer from '@/molecules/Footer'

import SearchBar from '@/molecules/SearchBar'
import SubcategoriesListView from './SubcategoriesListView'
import HeaderIcon from '@/molecules/HeaderIcon'
import { useSubcatergoriesContext } from '@/context/SubcategoryContext'
import ConditionalRender from '@/molecules/ConditionalRender'
import NewItemForm from '@/molecules/NewItemForm'

export const SubcategoriesHeader = ({ children }: { children: React.ReactNode }) => (
  <Header>
    <HeaderTitle>{children}</HeaderTitle>
    <HeaderIcon />
  </Header>
)

export const SubcategoriesBody = () => {
  const { handleNewSubCategory, isNewSubCategoryFormOpen, inputValue, setInputValue } =
    useSubcatergoriesContext()
  return (
    <Body>
      <SearchBar type="subcategories">Search ...</SearchBar>
      <SubcategoriesListView />
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

export const SubcategoriesFooter = ({ children }: { children: React.ReactNode }) => {
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
