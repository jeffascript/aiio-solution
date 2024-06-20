import React, { forwardRef } from 'react'

type SearchInputProps = {
  name: string
  placeholder?: string
} & React.ComponentPropsWithoutRef<'input'>

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = 'Search...', ...props }, ref) => {
    return <input type="search" ref={ref} placeholder={placeholder} {...props} />
  }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
