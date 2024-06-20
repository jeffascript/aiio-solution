import React, { forwardRef } from 'react'

type SelectInputProps = {
  name: string
  options: string[]
  placeholder?: string
} & React.ComponentPropsWithoutRef<'select'>

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ placeholder = 'Select...', options, ...props }, ref) => {
    return (
      <select ref={ref} {...props}>
        <option value="">{placeholder} </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
)

SelectInput.displayName = 'SelectInput'

export default SelectInput
