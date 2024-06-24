/* eslint-disable react/react-in-jsx-scope */
import { useToggleItemContext } from '@/context/ToggleItemContext'
import { ModalContainer } from '@/molecules'
import '@testing-library/jest-dom/extend-expect'

import { act, fireEvent, render, screen } from '@testing-library/react'

jest.mock('@/context/ToggleItemContext')
describe('ModalContainer Component', () => {
  it('should render children when isModalOpen is true', () => {
    const mockSetIsModalOpen = jest.fn()
    const mockContextValue = { isModalOpen: true, setIsModalOpen: mockSetIsModalOpen }
    ;(useToggleItemContext as jest.Mock).mockReturnValue(mockContextValue)

    const { getByText } = render(
      <ModalContainer>
        <div>Test Child</div>
      </ModalContainer>
    )
    expect(getByText('Test Child')).toBeInTheDocument()
  })

  // Modal does not render children when isModalOpen is false
  it('should not render children when isModalOpen is false', () => {
    const mockSetIsModalOpen = jest.fn()
    const mockContextValue = { isModalOpen: false, setIsModalOpen: mockSetIsModalOpen }
    ;(useToggleItemContext as jest.Mock).mockReturnValue(mockContextValue)

    render(
      <ModalContainer>
        <div>Test Child</div>
      </ModalContainer>
    )

    const modal = screen.getByTestId('modal-done-showcase')
    // expect classname to have changed
    expect(modal).not.toHaveClass('modal__overlay-show')
  })

  // Modal closes when clicking outside the modal content
  it('should close modal when clicking outside', () => {
    const mockSetIsModalOpen = jest.fn()
    const mockContextValue = { isModalOpen: true, setIsModalOpen: mockSetIsModalOpen }
    ;(useToggleItemContext as jest.Mock).mockReturnValue(mockContextValue)

    render(
      <ModalContainer>
        <div>Test Child</div>
      </ModalContainer>
    )

    fireEvent.mouseDown(document)

    expect(mockSetIsModalOpen).toHaveBeenCalled()
  })

  it('should handle rapid open/close state changes gracefully', () => {
    const mockSetIsModalOpen = jest.fn()
    const mockContextValue = { isModalOpen: true, setIsModalOpen: mockSetIsModalOpen }
    ;(useToggleItemContext as jest.Mock).mockReturnValue(mockContextValue)

    const { rerender } = render(
      <ModalContainer>
        <div>Test Child</div>
      </ModalContainer>
    )

    // Simulate rapid open/close state changes
    act(() => {
      mockContextValue.isModalOpen = false
      rerender(
        <ModalContainer>
          <div>Test Child</div>
        </ModalContainer>
      )
    })

    const modal = screen.getByTestId('modal-done-showcase')

    expect(modal).not.toHaveClass('modal__overlay-show')

    act(() => {
      mockContextValue.isModalOpen = true
      rerender(
        <ModalContainer>
          <div>Test Child</div>
        </ModalContainer>
      )
    })

    // expect classname to have changed
    expect(modal).toHaveClass('modal__overlay-show')
  })
})
