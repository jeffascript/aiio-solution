import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { useProductsContext } from '@/context/ProductsContext'
import { useNewItems } from '@/hooks/useNewItems'
import { useSubcategoryActions } from '@/context/SubcategoryContext/useSubcategoryActions'
import { useSubcategoryInitialState } from '@/context/SubcategoryContext/useSubcategoryInitialState'
import { SubcategoriesProvider, useSubcatergoriesContext } from '@/context/SubcategoryContext'

// Mock the hooks
jest.mock('@/context/ProductsContext')
jest.mock('@/hooks/useNewItems')
jest.mock('@/context/SubcategoryContext/useSubcategoryActions')
jest.mock('@/context/SubcategoryContext/useSubcategoryInitialState')

const mockUseProductsContext = useProductsContext as jest.MockedFunction<typeof useProductsContext>
const mockUseNewItems = useNewItems as jest.MockedFunction<typeof useNewItems>
const mockUseSubcategoryActions = useSubcategoryActions as jest.MockedFunction<
  typeof useSubcategoryActions
>
const mockUseSubcategoryInitialState = useSubcategoryInitialState as jest.MockedFunction<
  typeof useSubcategoryInitialState
>

const TestComponent: React.FC = () => {
  const context = useSubcatergoriesContext()
  return (
    <div>
      <div data-testid="filteredSubcategories">{JSON.stringify(context.filteredSubcategories)}</div>
      <div data-testid="isNewSubCategoryFormOpen">
        {JSON.stringify(context.isNewSubCategoryFormOpen)}
      </div>
      <div data-testid="inputValue">{JSON.stringify(context.inputValue)}</div>
      <button data-testid="handleNewSubCategory" onClick={context.handleNewSubCategory}>
        Add Subcategory
      </button>
    </div>
  )
}

describe('SubcategoriesProvider', () => {
  beforeEach(() => {
    mockUseProductsContext.mockReturnValue({
      allSubcategories: [{ productId: 1, subCategoryName: 'Subcategory 1', subCategoryId: 1 }],
      allProducts: [],
      allSubproducts: [],
      isLoading: false,
      error: null,
      updateCacheKeySuffixForRefetchingData: function (): void {
        throw new Error('Function not implemented.')
      },
    })

    mockUseNewItems.mockReturnValue({
      isNewItemFormOpen: false,
      setIsNewItemFormOpen: jest.fn(),
      inputValue: '',
      setInputValue: jest.fn(),
      newItem: [],
    })

    mockUseSubcategoryActions.mockReturnValue({
      handleSubcategorySearch: jest.fn(),
      addNewSubCategoryOptimistically: jest.fn(),
    })

    mockUseSubcategoryInitialState.mockReturnValue({
      allSubcategoriesState: [{ productId: 1, subCategoryName: 'Subcategory 1', subCategoryId: 1 }],
      setAllSubcategoriesState: jest.fn(),
      filteredSubcategories: [{ productId: 1, subCategoryName: 'Subcategory 1', subCategoryId: 1 }],
      setFilteredSubcategories: jest.fn(),
    })
  })

  it('should provide initial state', () => {
    render(
      <SubcategoriesProvider selectedProductId={1}>
        <TestComponent />
      </SubcategoriesProvider>
    )

    expect(screen.getByTestId('filteredSubcategories')).toHaveTextContent(
      JSON.stringify([{ productId: 1, subCategoryName: 'Subcategory 1', subCategoryId: 1 }])
    )
    expect(screen.getByTestId('isNewSubCategoryFormOpen')).toHaveTextContent('false')
    expect(screen.getByTestId('inputValue')).toHaveTextContent('""')
  })

  it('should handle adding a new subcategory', () => {
    const setIsNewItemFormOpen = jest.fn()
    const setInputValue = jest.fn()
    const addNewSubCategoryOptimistically = jest.fn()

    mockUseNewItems.mockReturnValue({
      isNewItemFormOpen: true,
      setIsNewItemFormOpen,
      inputValue: 'New Subcategory',
      setInputValue,
      newItem: [],
    })

    mockUseSubcategoryActions.mockReturnValue({
      handleSubcategorySearch: jest.fn(),
      addNewSubCategoryOptimistically,
    })

    render(
      <SubcategoriesProvider selectedProductId={1}>
        <TestComponent />
      </SubcategoriesProvider>
    )

    fireEvent.click(screen.getByTestId('handleNewSubCategory'))

    expect(addNewSubCategoryOptimistically).toHaveBeenCalledWith('New Subcategory')
    expect(setInputValue).toHaveBeenCalledWith('')
    expect(setIsNewItemFormOpen).toHaveBeenCalledWith(false)
  })
})
