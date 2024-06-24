/* eslint-disable react/react-in-jsx-scope */
import NewItemForm from '@/molecules/NewItemForm'
import { getStyleToken } from '@/utils/token'
import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render } from '@testing-library/react'

jest.mock('@/atoms/PolyMorphicInput')
jest.mock('@/molecules')
jest.mock('@/utils/token')
jest.mock('@/assets/plus.svg?react', () => 'svg')

describe('NewItemForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    ;(getStyleToken as jest.Mock).mockReturnValue('greyColor')

    const { getByText, getByRole } = render(
      <NewItemForm value="" onChange={jest.fn()} onAdd={jest.fn()} />
    )

    expect(getByRole('button')).toBeInTheDocument()
    expect(getByText('Add')).toBeInTheDocument()
  })

  it('should call onAdd when button is clicked', () => {
    const mockOnAdd = jest.fn()
    ;(getStyleToken as jest.Mock).mockReturnValue('greyColor')

    const { getByText } = render(<NewItemForm value="" onChange={jest.fn()} onAdd={mockOnAdd} />)

    const button = getByText('Add')
    fireEvent.click(button)

    expect(mockOnAdd).toHaveBeenCalled()
  })
})
