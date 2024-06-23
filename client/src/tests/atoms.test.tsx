/* eslint-disable react/react-in-jsx-scope */
import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
// import { screen } from '@testing-library/dom'

import CheckboxInput from '../atoms/CheckboxInput'
import SearchInput from '../atoms/SearchInput'
import SelectInput from '../atoms/SelectInput'
import PolymorphicInput from '../atoms/PolyMorphicInput'
import React from 'react'
// import Main from './components/Main'

const checkBoxProps = {
  'name': 'testCheckbox',
  'label': 'Test Checkbox',
  'id': 'testCheckbox',
  'aria-labelledby': 'testCheckbox',
  'data-testid': 'testCheckbox',
}

const selectProps = {
  'name': 'testSelect',
  'label': 'Test Select',
  'id': 'testSelect',
  'aria-labelledby': 'test-select-label',
  'data-testid': 'testSelect',
  'options': ['Option 1', 'Option 2'],
}

const searchProps = {
  'name': 'testSearch',
  'label': 'Test Search',
  'id': 'testSearch',
  'aria-labelledby': 'test-search-label',
  'data-testid': 'testSearch',
}

describe('PolymorphicInput Component', () => {
  it('should render a checkbox input when type is "checkbox"  & pass the correct props', () => {
    const { getByTestId } = render(<PolymorphicInput {...checkBoxProps} type="checkbox" />)
    const checkbox = getByTestId('testCheckbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('type', 'checkbox')
  })

  it('should render a select input when type is "select"  & pass the correct props', () => {
    const { getByTestId } = render(<PolymorphicInput {...selectProps} type="select" />)
    const select = getByTestId('testSelect')
    expect(select).toBeInTheDocument()
    expect(select.tagName).toBe('SELECT')
  })

  it('should render a search input when type is "search"  & pass the correct props', () => {
    const { getByTestId } = render(<PolymorphicInput {...searchProps} type="search" />)
    const searchInput = getByTestId('testSearch')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'search')
  })

  it('should render a default input when no type is provided', () => {
    const { getByTestId } = render(<PolymorphicInput data-testid="testInput" />)
    const defaultInput = getByTestId('testInput')
    expect(defaultInput).toBeInTheDocument()
    expect(defaultInput.tagName).toBe('INPUT')
  })
})

describe('SearchInput Component', () => {
  it('should render a search input', () => {
    const { getByTestId } = render(<SearchInput {...searchProps} />)
    const searchInput = getByTestId('testSearch')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'search')
  })

  it('should render input element with default placeholder', () => {
    const { getByPlaceholderText } = render(<SearchInput name="test" />)
    expect(getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('should forward ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<SearchInput name="test" ref={ref} />)
    expect(ref.current).toBeInTheDocument()
  })
})
describe('CheckboxInput Component', () => {
  it('should render a checkbox input ', () => {
    const { getByTestId } = render(<CheckboxInput {...checkBoxProps} />)
    const checkbox = getByTestId('testCheckbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('type', 'checkbox')
  })

  it('should render checkbox input with correct label', () => {
    render(<CheckboxInput {...checkBoxProps} />)
    const label = screen.getByText('Test Checkbox')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'testCheckbox')
  })
})
describe('SelectInput Component', () => {
  it('should render a checkbox input when type is "checkbox"  & pass the correct props', () => {
    render(<SelectInput {...selectProps} />)
    const select = screen.getByTestId('testSelect')
    expect(select).toBeInTheDocument()
    expect(select.tagName).toBe('SELECT')
  })
})
