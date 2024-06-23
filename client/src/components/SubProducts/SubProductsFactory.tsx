import React from 'react'
import Body from '@/molecules/Body'
import Button from '@/molecules/Button'
import { HeaderTitle, Header } from '@/molecules/Header'
import PlusIcon from '@/assets/plus.svg?react'
import Footer from '@/molecules/Footer'
import SearchBar from '@/molecules/SearchBar'
import SubProductsListView from './SubProductsListView'
import HeaderIcon from '@/molecules/HeaderIcon'
import ConditionalRender from '@/molecules/ConditionalRender'
import NewItemForm from '@/molecules/NewItemForm'
import { useSubproductsContext } from '@/context/SubProductContext'

export const SubProductsBody = () => {
  const { isNewSubproductFormOpen, inputValue, setInputValue, handleNewSubproduct } =
    useSubproductsContext()

  return (
    <Body>
      <SearchBar type="subproducts">Search ...</SearchBar>
      <SubProductsListView />
      <ConditionalRender condition={isNewSubproductFormOpen}>
        <NewItemForm
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onAdd={handleNewSubproduct}
        />
      </ConditionalRender>
    </Body>
  )
}

export const SubProductsHeader = ({ children }: { children: React.ReactNode }) => (
  <Header>
    <HeaderTitle>{children}</HeaderTitle>
    <HeaderIcon />
  </Header>
)

export const SubProductsFooter = ({ children }: { children: React.ReactNode }) => {
  const { isNewSubproductFormOpen, setIsNewSubproductFormOpen } = useSubproductsContext()

  return (
    <Footer>
      <ConditionalRender condition={!isNewSubproductFormOpen}>
        <Button onClick={() => setIsNewSubproductFormOpen(true)} Icon={PlusIcon}>
          {children}
        </Button>
      </ConditionalRender>
    </Footer>
  )
}
