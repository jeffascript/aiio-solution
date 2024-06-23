import React from 'react'
import Container from '@/molecules/Container'

import { SubcategoriesProvider } from '@/context/SubcategoryContext'
import { getStyleToken } from '@/utils/token'
import { SubcategoriesBody, SubcategoriesFooter, SubcategoriesHeader } from './SubcategoriesFactory'

function Subcategories({ selectedProductId }: { selectedProductId: number }) {
  return (
    <Container backgroundColor={getStyleToken('darkerColor')}>
      <Subcategories.Provider selectedProductId={selectedProductId}>
        <Subcategories.Header> Select Categories </Subcategories.Header>
        <Subcategories.Body />
        <Subcategories.Footer> Add Category</Subcategories.Footer>
      </Subcategories.Provider>
    </Container>
  )
}

Subcategories.Provider = SubcategoriesProvider
Subcategories.Header = SubcategoriesHeader
Subcategories.Body = SubcategoriesBody
Subcategories.Footer = SubcategoriesFooter

export default Subcategories
