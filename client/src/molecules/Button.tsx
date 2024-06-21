import React from 'react'
import styles from '@/molecules/molecules.module.css'

export const Button = ({
  children,
  onClick,
  Icon,
  isModal,
}: {
  children: React.ReactNode
  onClick?: (event: React.FormEvent<HTMLFormElement>) => void
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  isModal?: boolean
}) => (
  <button
    type="submit"
    className={isModal ? styles['modal__button-save'] : styles['form__button']}
    onClick={(e) => onClick?.(e as unknown as React.FormEvent<HTMLFormElement>)}
  >
    <span className={styles['form__buttonText']}>
      {Icon && <Icon />} {children}
    </span>
  </button>
)

export default Button
