/* eslint-disable react/react-in-jsx-scope */

import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Subcategories } from '@/components/Subcategories'

// Mock the necessary components and functions
jest.mock('@/context/SubcategoryContext', () => ({
  SubcategoriesProvider: jest.fn(({ children }) => <div>{children}</div>),
}))

jest.mock('@/components/Subcategories/SubcategoriesFactory', () => ({
  SubcategoriesBody: jest.fn(() => <div>SubcategoriesBody</div>),
  SubcategoriesFooter: jest.fn(({ children }) => <div>{children}</div>),
  SubcategoriesHeader: jest.fn(({ children }) => <div>{children}</div>),
}))

jest.mock('@/molecules/Container', () => jest.fn(({ children }) => <div>{children}</div>))

jest.mock('@/utils/token', () => ({
  getStyleToken: jest.fn(() => 'mockedColor'),
}))

describe('Subcategories Component', () => {
  it('renders correctly with the given selectedProductId', () => {
    const selectedProductId = 1
    const { getByText } = render(<Subcategories selectedProductId={selectedProductId} />)

    // Check if the SubcategoriesHeader, SubcategoriesBody, and SubcategoriesFooter components are rendered
    expect(getByText('Select Categories')).toBeInTheDocument()
    expect(getByText('SubcategoriesBody')).toBeInTheDocument()
    expect(getByText('Add Category')).toBeInTheDocument()
  })
})
