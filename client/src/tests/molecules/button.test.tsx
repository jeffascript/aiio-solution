/* eslint-disable react/react-in-jsx-scope */
import { Button } from '@/molecules'
import '@testing-library/jest-dom/extend-expect'

import { cleanup, fireEvent, render } from '@testing-library/react'

// clean up after each
beforeEach(() => {
  cleanup()
})

jest.mock('@/molecules/molecules.module.css', () => ({
  'modal__button-save': 'modal__button-save',
  'form__button': 'form__button',
  'form__buttonText': 'form__buttonText',
}))

describe('Button Component', () => {
  it('should render correctly with children', () => {
    const { getByText } = render(<Button>Click Me</Button>)
    expect(getByText('Click Me')).toBeInTheDocument()
  })

  it('should apply the correct class based on isModal prop', () => {
    const { container: modalContainer } = render(<Button isModal={true}>Modal Button</Button>)
    expect(modalContainer.firstChild).toHaveClass('modal__button-save')

    const { container: formContainer } = render(<Button isModal={false}>Form Button</Button>)
    expect(formContainer.firstChild).toHaveClass('form__button')
  })

  it('should call onClick when button is clicked', () => {
    const mockOnClick = jest.fn()
    const { getByText } = render(<Button onClick={mockOnClick}>Click Me</Button>)

    const button = getByText('Click Me')
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalled()
  })

  it('should render with an icon if provided', () => {
    const MockIcon = () => <svg data-testid="mock-icon" />
    const { getByTestId } = render(<Button Icon={MockIcon}>Click Me</Button>)

    expect(getByTestId('mock-icon')).toBeInTheDocument()
  })
})
