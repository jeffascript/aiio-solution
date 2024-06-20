import { forwardRef } from 'react'
import styles from '@/atoms/atoms.module.css'

type CheckboxInputProps = {
  name: string
  label: string
  id: number | string
} & React.ComponentPropsWithoutRef<'input'>

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <>
        <label htmlFor={id.toString()}>{label}</label>
        <input type="checkbox" ref={ref} {...props} className={styles['input__checkbox']} />
      </>
    )
  }
)

export default CheckboxInput
