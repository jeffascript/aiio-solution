import React from 'react'
import styles from '@/molecules/molecules.module.css'

type ContainerProps = {
  children?: React.ReactNode
  backgroundColor?: string
}

// use --primary-color as default if none is provided
const Container = ({ children, backgroundColor = `var(--primary-color)` }: ContainerProps) => (
  <div className={styles['form']}>
    <div className={styles['form__inner']} style={{ backgroundColor }}>
      {children}
    </div>
  </div>
)

export default Container
