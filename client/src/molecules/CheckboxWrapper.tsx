import React from 'react'
import styles from '@/molecules/molecules.module.css'
import { combineClassNames } from '@/utils/combineClassNames'

type CheckboxWrapperProps = {
  innermostCheckbox?: boolean
  children: React.ReactNode
}

const CheckboxWrapper = ({ children, innermostCheckbox }: CheckboxWrapperProps) => (
  <div
    className={combineClassNames([
      styles['form__checkboxContainer'],
      innermostCheckbox && styles['form__checkboxContainer--last'],
    ])}
  >
    {children}
  </div>
)

export default CheckboxWrapper
