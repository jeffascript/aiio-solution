/* eslint-disable react/react-in-jsx-scope */
import { useSubcatergoriesContext } from '@/context/SubcategoryContext'
import { useSubproductsContext } from '@/context/SubProductContext'
import useInput from '@/hooks/useInput'
import SearchBar from '@/molecules/SearchBar'
import { customDebounce } from '@/utils/debounce'
import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render } from '@testing-library/react'

jest.mock('@/context/SubcategoryContext')
jest.mock('@/context/SubProductContext')
jest.mock('@/hooks/useInput')
jest.mock('@/utils/debounce')

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly with subcategories type', () => {
    const mockHandleSubcategorySearch = jest.fn()
    ;(useSubcatergoriesContext as jest.Mock).mockReturnValue({
      handleSubcategorySearch: mockHandleSubcategorySearch,
    })
    ;(useInput as jest.Mock).mockReturnValue({
      value: '',
      setValue: jest.fn(),
    })
    ;(customDebounce as jest.Mock).mockImplementation((fn) => fn)

    const { getByLabelText } = render(<SearchBar type="subcategories" />)

    expect(getByLabelText('Search through subcategory contents')).toBeInTheDocument()
  })

  it('should call handleSubcategorySearch on input change', () => {
    const mockHandleSubcategorySearch = jest.fn()
    const mockSetValue = jest.fn()
    ;(useSubcatergoriesContext as jest.Mock).mockReturnValue({
      handleSubcategorySearch: mockHandleSubcategorySearch,
    })
    ;(useInput as jest.Mock).mockReturnValue({
      value: '',
      setValue: mockSetValue,
    })
    ;(customDebounce as jest.Mock).mockImplementation((fn) => fn)

    const { getByLabelText } = render(<SearchBar type="subcategories" />)
    const input = getByLabelText('Search through subcategory contents')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(mockSetValue).toHaveBeenCalledWith('test')
    expect(mockHandleSubcategorySearch).toHaveBeenCalledWith('test')
  })

  it('should call handleSubproductSearch on input change', () => {
    const mockHandleSubproductSearch = jest.fn()
    const mockSetValue = jest.fn()
    ;(useSubproductsContext as jest.Mock).mockReturnValue({
      handleSubproductSearch: mockHandleSubproductSearch,
    })
    ;(useInput as jest.Mock).mockReturnValue({
      value: '',
      setValue: mockSetValue,
    })
    ;(customDebounce as jest.Mock).mockImplementation((fn) => fn)

    const { getByLabelText } = render(<SearchBar type="subproducts" />)
    const input = getByLabelText('Search through subcategory contents')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(mockSetValue).toHaveBeenCalledWith('test')
    expect(mockHandleSubproductSearch).toHaveBeenCalledWith('test')
  })
})
