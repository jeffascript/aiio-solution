import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { useProductsContext } from '@/context/ProductsContext'
import { useNewItems } from '@/hooks/useNewItems'
import usePostData from '@/hooks/usePostData'
import { useSubproductActions } from '@/context/SubProductContext/useSubProductActions'
import { useSubproductsInitialState } from '@/context/SubProductContext/useSubproductsInitialState'
import { SubproductsProvider, useSubproductsContext } from '@/context/SubProductContext'

// Mock the hooks
jest.mock('@/context/ProductsContext')
jest.mock('@/hooks/useNewItems')
jest.mock('@/hooks/usePostData')
jest.mock('@/context/SubProductContext/useSubProductActions')
jest.mock('@/context/SubProductContext/useSubproductsInitialState')

const mockUseProductsContext = useProductsContext as jest.MockedFunction<typeof useProductsContext>
const mockUseNewItems = useNewItems as jest.MockedFunction<typeof useNewItems>
const mockUsePostData = usePostData as jest.MockedFunction<typeof usePostData>
const mockUseSubproductActions = useSubproductActions as jest.MockedFunction<
  typeof useSubproductActions
>
const mockUseSubproductsInitialState = useSubproductsInitialState as jest.MockedFunction<
  typeof useSubproductsInitialState
>

const TestComponent: React.FC = () => {
  const context = useSubproductsContext()
  return (
    <div>
      <div data-testid="filteredSubProducts">{JSON.stringify(context.filteredSubProducts)}</div>
      <div data-testid="isNewSubproductFormOpen">
        {JSON.stringify(context.isNewSubproductFormOpen)}
      </div>
      <div data-testid="inputValue">{JSON.stringify(context.inputValue)}</div>
      <button data-testid="handleNewSubproduct" onClick={context.handleNewSubproduct}>
        Add Subproduct
      </button>
    </div>
  )
}

describe('SubproductsProvider', () => {
  beforeEach(() => {
    mockUseProductsContext.mockReturnValue({
      allSubproducts: [{ subCategoryId: 1, subProductName: 'Subproduct 1', subProductId: 1 }],
      updateCacheKeySuffixForRefetchingData: jest.fn(),
      allProducts: [],
      allSubcategories: [],
      isLoading: false,
      error: null,
    })

    mockUseNewItems.mockReturnValue({
      isNewItemFormOpen: false,
      setIsNewItemFormOpen: jest.fn(),
      inputValue: '',
      setInputValue: jest.fn(),
      newItem: [],
    })

    mockUsePostData.mockReturnValue({
      postData: jest.fn().mockResolvedValue({}),
      isLoading: false,
      error: undefined,
    })

    mockUseSubproductActions.mockReturnValue({
      handleSubproductSearch: jest.fn(),
      addNewSubproductOptimistically: jest.fn(),
    })

    mockUseSubproductsInitialState.mockReturnValue({
      allSubProductsState: [{ subCategoryId: 1, subProductName: 'Subproduct 1', subProductId: 1 }],
      setAllSubProductsState: jest.fn(),
      filteredSubProducts: [{ subCategoryId: 1, subProductName: 'Subproduct 1', subProductId: 1 }],
      setFilteredSubProducts: jest.fn(),
    })
  })

  it('should provide initial state', () => {
    render(
      <SubproductsProvider selectedSubcategoryId={1}>
        <TestComponent />
      </SubproductsProvider>
    )

    expect(screen.getByTestId('filteredSubProducts')).toHaveTextContent(
      JSON.stringify([{ subCategoryId: 1, subProductName: 'Subproduct 1', subProductId: 1 }])
    )
    expect(screen.getByTestId('isNewSubproductFormOpen')).toHaveTextContent('false')
    expect(screen.getByTestId('inputValue')).toHaveTextContent('""')
  })

  it('should handle adding a new subproduct', async () => {
    const setIsNewItemFormOpen = jest.fn()
    const setInputValue = jest.fn()
    const addNewSubproductOptimistically = jest.fn()
    const updateCacheKeySuffixForRefetchingData = jest.fn()
    const postData = jest.fn().mockResolvedValue({})

    mockUseNewItems.mockReturnValue({
      isNewItemFormOpen: true,
      setIsNewItemFormOpen,
      inputValue: 'New Subproduct',
      setInputValue,
      newItem: [],
    })

    mockUseSubproductActions.mockReturnValue({
      handleSubproductSearch: jest.fn(),
      addNewSubproductOptimistically,
    })

    mockUseProductsContext.mockReturnValue({
      allSubproducts: [{ subCategoryId: 1, subProductName: 'Subproduct 1', subProductId: 1 }],
      updateCacheKeySuffixForRefetchingData,
      allProducts: [],
      allSubcategories: [],
      isLoading: false,
      error: null,
    })

    mockUsePostData.mockReturnValue({
      postData,
      isLoading: false,
      error: undefined,
    })

    render(
      <SubproductsProvider selectedSubcategoryId={1}>
        <TestComponent />
      </SubproductsProvider>
    )

    fireEvent.click(screen.getByTestId('handleNewSubproduct'))

    expect(addNewSubproductOptimistically).toHaveBeenCalledWith('New Subproduct')
    expect(setInputValue).toHaveBeenCalledWith('')
    expect(setIsNewItemFormOpen).toHaveBeenCalledWith(false)

    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith('http://localhost:8000/api/v1/subproducts', {
        subProductName: 'New Subproduct',
        subCategoryId: 1,
      })
    })

    await waitFor(() => {
      expect(updateCacheKeySuffixForRefetchingData).toHaveBeenCalledWith('1-1-N')
    })
  })
})
