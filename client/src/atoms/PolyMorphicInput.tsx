import React, { forwardRef } from 'react'
import CheckBoxInput from '@/atoms/CheckboxInput'
import SelectInput from '@/atoms/SelectInput'
import SearchInput from '@/atoms/SearchInput'

type PolymorphicInputProps<T extends React.ElementType> = {
  as?: T
  type?: 'checkbox' | 'select' | 'search'
  options?: string[] // Only for select type
  name: string
} & React.ComponentPropsWithoutRef<T>

const InputFactories = {
  checkbox: CheckBoxInput,
  select: SelectInput,
  search: SearchInput,
}

const PolymorphicInput = forwardRef(
  <T extends React.ElementType = 'input'>(
    { as, type, options = [], name, ...props }: PolymorphicInputProps<T>,
    ref: React.Ref<HTMLInputElement | HTMLSelectElement | HTMLDivElement>
  ) => {
    const Component = as || 'input'

    const InputComponent = type ? InputFactories[type] : Component
    return (
      <InputComponent ref={ref} name={name} {...props} {...(type === 'select' && { options })} />
    )
  }
)

PolymorphicInput.displayName = 'PolymorphicInput'

export default PolymorphicInput
