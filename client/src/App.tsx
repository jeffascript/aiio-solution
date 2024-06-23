import React from 'react'

import { Main } from '@/components/Main'
import { Products } from '@/components/Products/Products'
import { ToggleItemProvider } from '@/context/ToggleItemContext'
import { DoneShowcaseModal } from '@/components/Modal'

const App: React.FC = () => {
  return (
    <Main>
      <ToggleItemProvider>
        <Products>
          <Products.Header>Products</Products.Header>
          <Products.Body />
          <Products.Footer>Add Product</Products.Footer>
        </Products>
        <DoneShowcaseModal />
      </ToggleItemProvider>
    </Main>
  )
}

export default App
