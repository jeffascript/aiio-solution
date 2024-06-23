/* eslint-disable react/react-in-jsx-scope */
import Container from '@/molecules/Container'

import { SubproductsProvider } from '@/context/SubProductContext'
import { getStyleToken } from '@/utils/token'

import { SubProductsBody, SubProductsFooter, SubProductsHeader } from './SubProductsFactory'

function SubProducts({ subCategoryId }: { subCategoryId: number }) {
  return (
    <Container backgroundColor={getStyleToken('greyColor')}>
      <SubProducts.Provider selectedSubcategoryId={subCategoryId}>
        <SubProducts.Header>Select Sub-Products</SubProducts.Header>
        <SubProducts.Body />
        <SubProducts.Footer>Add Sub-Product </SubProducts.Footer>
      </SubProducts.Provider>
    </Container>
  )
}

SubProducts.Provider = SubproductsProvider
SubProducts.Header = SubProductsHeader
SubProducts.Body = SubProductsBody
SubProducts.Footer = SubProductsFooter

export default SubProducts
