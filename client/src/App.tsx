import React from 'react'

import { Main } from '@/components'
import Products from './components/Products/Products'
import { ToggleItemProvider } from './context/ToggleItemContext'

const App: React.FC = () => {
  return (
    <Main>
      <ToggleItemProvider>
        <Products>products</Products>
      </ToggleItemProvider>
    </Main>
  )
}

export default App
