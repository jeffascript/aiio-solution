import React from 'react'
import styles from '@/molecules/molecules.module.css'

export const Footer = ({ children }: { children: React.ReactNode }) => (
  <div className={styles['form__footer']}>{children}</div>
)

export default Footer
