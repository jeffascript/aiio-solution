/* eslint-disable react/react-in-jsx-scope */
import Body from '@/molecules/Body'
import '@testing-library/jest-dom/extend-expect'

import { cleanup, render, screen } from '@testing-library/react'

// clean up after each
beforeEach(() => {
  cleanup()
})

describe('Body Component', () => {
  // renders children correctly
  it('should render children correctly', () => {
    render(
      <Body>
        <div>Test Child</div>
      </Body>
    )

    const body = screen.getByText('Test Child')
    expect(body).toBeInTheDocument()
  })

  it('should handle null or undefined children gracefully', () => {
    const { container } = render(<Body>{null}</Body>)
    expect(container.firstChild).toBeEmpty()
    const { container: container2 } = render(<Body>{undefined}</Body>)
    expect(container2.firstChild).toBeEmpty()
  })

  it('applies the correct class name', () => {
    const { container } = render(<Body>Test Content</Body>)
    expect(container.firstChild).toHaveClass('form__body')
  })
})
