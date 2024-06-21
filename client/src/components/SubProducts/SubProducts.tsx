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
import CheckboxInput from '@/atoms/CheckboxInput'
import { useProductsContext } from '@/context/ProductsContext'
import { useNewItems } from '@/hooks/useNewItems'
import ConditionalRender from '@/molecules/ConditionalRender'
import NewItemForm from '@/molecules/NewItemForm'

const SubProducts = ({
  children,
  subCategoryId,
}: {
  children?: React.ReactNode
  subCategoryId: number
}) => {
  const { isNewItemFormOpen, setIsNewItemFormOpen, value, setValue, newItem, handleNewItem } =
    useNewItems(subCategoryId)

  const { refetch } = useProductsContext()
  // subProductId= filteredSubProducts.length - 1
  // subProductName={e.target.value}
  // subCategoryId=props.selectedSubcategoryId

  return (
    <Container backgroundColor={getStyleToken('greyColor')}>
      <Header>
        <HeaderTitle>Select Sub-Products</HeaderTitle>
        <HeaderIcon />
      </Header>

      <Body>
        <SubproductsProvider selectedSubcategoryId={subCategoryId}>
          <SearchBar type="subproducts">Search ...</SearchBar>
          <SubProductsListView> {children}</SubProductsListView>
          {newItem &&
            newItem.length > 0 &&
            newItem.map((item) => (
              <React.Fragment
                key={`${item.subCategoryId}-${item.subProductId}-${item.subProductName}`}
              >
                <CheckboxInput
                  id={`${item.subCategoryId}-${item.subProductId}-${item.subProductName}`}
                  label={item.subProductName as string}
                  name={item.subProductName as string}
                />
              </React.Fragment>
            ))}

          <ConditionalRender condition={isNewItemFormOpen}>
            <NewItemForm
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onAdd={handleNewItem}
            />
          </ConditionalRender>
        </SubproductsProvider>
      </Body>

      <Footer>
        <ConditionalRender condition={!isNewItemFormOpen}>
          <Button onClick={() => setIsNewItemFormOpen(!isNewItemFormOpen)} Icon={PlusIcon}>
            Add Sub-Product
          </Button>
        </ConditionalRender>
      </Footer>
    </Container>
  )
}

export default SubProducts
