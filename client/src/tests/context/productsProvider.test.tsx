import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ProductsProvider, useProductsContext } from '@/context/ProductsContext'
import { useFetchWithCache } from '@/hooks/useFetchWithCache'

// Mock the useFetchWithCache hook
jest.mock('@/hooks/useFetchWithCache')

const mockUseFetchWithCache = useFetchWithCache as jest.MockedFunction<typeof useFetchWithCache>

const TestComponent: React.FC = () => {
  const context = useProductsContext()
  return (
    <div>
      <div data-testid="products">{JSON.stringify(context.allProducts)}</div>
      <div data-testid="subcategories">{JSON.stringify(context.allSubcategories)}</div>
      <div data-testid="subproducts">{JSON.stringify(context.allSubproducts)}</div>
      <div data-testid="isLoading">{JSON.stringify(context.isLoading)}</div>
      <div data-testid="error">{JSON.stringify(context.error)}</div>
    </div>
  )
}

describe('ProductsProvider', () => {
  it('should provide loading state', () => {
    mockUseFetchWithCache.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      updateCacheKeySuffixForRefetchingData: jest.fn(),
      refetch: jest.fn(),
    })

    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    )

    expect(screen.getByTestId('isLoading')).toHaveTextContent('true')
    expect(screen.getByTestId('error')).toHaveTextContent('null')
  })

  it('should provide error state', () => {
    const mockError = 'Network error'
    mockUseFetchWithCache.mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
      updateCacheKeySuffixForRefetchingData: jest.fn(),
      refetch: jest.fn(),
    })

    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    )

    expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    expect(screen.getByTestId('error')).toHaveTextContent(mockError)
  })

  it('should provide data when fetch is successful', () => {
    const mockData = [
      { products: [{ id: 1, name: 'Product 1' }] },
      { subcategories: [{ id: 1, name: 'Subcategory 1' }] },
      { subproducts: [{ id: 1, name: 'Subproduct 1' }] },
    ]
    mockUseFetchWithCache.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      updateCacheKeySuffixForRefetchingData: jest.fn(),
      refetch: jest.fn(),
    })

    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    )

    expect(screen.getByTestId('products')).toHaveTextContent(JSON.stringify(mockData[0].products))
    expect(screen.getByTestId('subcategories')).toHaveTextContent(
      JSON.stringify(mockData[1].subcategories)
    )
    expect(screen.getByTestId('subproducts')).toHaveTextContent(
      JSON.stringify(mockData[2].subproducts)
    )
    expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    expect(screen.getByTestId('error')).toHaveTextContent('null')
  })
})
