/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { useToggleItemContext } from '@/context/ToggleItemContext'
import { useToggleItem } from '@/hooks/useToggleItem'
import usePostData from '@/hooks/usePostData'
import { ModalDoneShowcase } from '@/components/Modal'
import { API_CONFIG } from '@/utils/config'

// Mock the context and hooks
jest.mock('@/context/ToggleItemContext')
jest.mock('@/hooks/useToggleItem')
jest.mock('@/hooks/usePostData')

describe('ModalDoneShowcase', () => {
  const mockToggleModal = jest.fn()
  const mockHandleCloseAllForms = jest.fn()
  const mockPostData = jest.fn()

  beforeEach(() => {
    ;(useToggleItemContext as jest.Mock).mockReturnValue({
      toggleModal: mockToggleModal,
      doneResult: {
        selectedProducts: ['Product1', 'Product2'],
        selectedSubcategories: ['Subcategory1'],
        selectedSubproducts: ['Subproduct1', 'Subproduct2'],
      },
      doneResultAsNode: { key: 'value' },
    })
    ;(useToggleItem as jest.Mock).mockReturnValue({
      handleCloseAllForms: mockHandleCloseAllForms,
    })
    ;(usePostData as jest.Mock).mockReturnValue({
      postData: mockPostData,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the modal with the correct items', () => {
    render(<ModalDoneShowcase />)

    expect(
      screen.getByText(
        (content, element) => element?.tagName === 'H5' && content.includes('Products')
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        (content, element) => element?.tagName === 'H5' && content.includes('Sub categories')
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        (content, element) => element?.tagName === 'H5' && content.includes('Sub products')
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        (content, element) => element?.tagName === 'SMALL' && content.includes('Product1')
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        (content, element) => element?.tagName === 'SMALL' && content.includes('Product2')
      )
    ).toBeInTheDocument()

    expect(screen.getByText(/Sub products/i)).toBeInTheDocument()

    expect(
      screen.getByText(
        (content, element) => element?.tagName === 'SMALL' && content.includes('Subproduct1')
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        (content, element) => element?.tagName === 'SMALL' && content.includes('Subproduct2')
      )
    ).toBeInTheDocument()
  })

  it('calls handleSave on Save button click', () => {
    render(<ModalDoneShowcase />)

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    expect(mockToggleModal).toHaveBeenCalled()
    expect(mockPostData).toHaveBeenCalledWith(API_CONFIG.SAVE_DATA_URL, { key: 'value' })
    expect(mockHandleCloseAllForms).toHaveBeenCalled()
  })

  it('does not call postData if doneResultAsNode is empty', () => {
    ;(useToggleItemContext as jest.Mock).mockReturnValue({
      toggleModal: mockToggleModal,
      doneResult: {
        selectedProducts: ['Product1', 'Product2'],
        selectedSubcategories: ['Subcategory1'],
        selectedSubproducts: ['Subproduct1', 'Subproduct2'],
      },
      doneResultAsNode: {},
    })

    render(<ModalDoneShowcase />)

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    expect(mockToggleModal).toHaveBeenCalled()
    expect(mockPostData).not.toHaveBeenCalled()
    expect(mockHandleCloseAllForms).toHaveBeenCalled()
  })
})
