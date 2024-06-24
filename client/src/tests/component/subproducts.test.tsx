/* eslint-disable react/react-in-jsx-scope */
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SubProducts } from '@/components/SubProducts'

// Mock the necessary components and functions
jest.mock('@/context/SubProductContext', () => ({
  SubproductsProvider: jest.fn(({ children }) => <div>{children}</div>),
}))

jest.mock('@/components/SubProducts/SubProductsFactory', () => ({
  SubProductsBody: jest.fn(() => <div>SubProductsBody</div>),
  SubProductsFooter: jest.fn(({ children }) => <div>{children}</div>),
  SubProductsHeader: jest.fn(({ children }) => <div>{children}</div>),
}))

jest.mock('@/molecules/Container', () => jest.fn(({ children }) => <div>{children}</div>))

jest.mock('@/utils/token', () => ({
  getStyleToken: jest.fn(() => 'mockedColor'),
}))

describe('SubProducts Component', () => {
  it('renders correctly with the given subCategoryId', () => {
    const subCategoryId = 1
    const { getByText } = render(<SubProducts subCategoryId={subCategoryId} />)

    // Check if the SubProductsHeader, SubProductsBody, and SubProductsFooter components are rendered
    expect(getByText('Select Sub-Products')).toBeInTheDocument()
    expect(getByText('SubProductsBody')).toBeInTheDocument()
    expect(getByText('Add Sub-Product')).toBeInTheDocument()
  })
})
