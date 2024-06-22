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

import ConditionalRender from '@/molecules/ConditionalRender'
import NewItemForm from '@/molecules/NewItemForm'
import { useSubproductsContext } from '@/context/SubProductContext'

const SubProductsBody = ({ children }: { children: React.ReactNode }) => {
  const { isNewItemFormOpen, inputValue, setInputValue, handleNewItem } = useSubproductsContext()

  return (
    <Body>
      <SearchBar type="subproducts">Search ...</SearchBar>
      <SubProductsListView>{children}</SubProductsListView>
      <ConditionalRender condition={isNewItemFormOpen}>
        <NewItemForm
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onAdd={handleNewItem}
        />
      </ConditionalRender>
    </Body>
  )
}

const SubProductsHeader = ({ children }: { children: React.ReactNode }) => (
  <Header>
    <HeaderTitle>{children}</HeaderTitle>
    <HeaderIcon />
  </Header>
)

const SubProductsFooter = ({ children }: { children: React.ReactNode }) => {
  const { isNewItemFormOpen, setIsNewItemFormOpen } = useSubproductsContext()

  return (
    <Footer>
      <ConditionalRender condition={!isNewItemFormOpen}>
        <Button onClick={() => setIsNewItemFormOpen(true)} Icon={PlusIcon}>
          {children}
        </Button>
      </ConditionalRender>
    </Footer>
  )
}

const SubProducts: React.FC<{ children?: React.ReactNode; subCategoryId: number }> = ({
  children,
  subCategoryId,
}) => {
  return (
    <Container backgroundColor={getStyleToken('greyColor')}>
      <SubproductsProvider selectedSubcategoryId={subCategoryId}>
        <SubProductsHeader>Select Sub-Products</SubProductsHeader>
        <SubProductsBody>{children}</SubProductsBody>
        <SubProductsFooter>Add Sub-Product </SubProductsFooter>
      </SubproductsProvider>
    </Container>
  )
}

export default SubProducts
