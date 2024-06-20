import React from 'react'
import styles from '@/molecules/molecules.module.css'

export const Header = ({ children }: { children: React.ReactNode }) => (
  <div className={styles['form__header']}>{children}</div>
)

export const HeaderTitle = ({ children }: { children: React.ReactNode }) => (
  <div className={styles['form__headerTitle']}>
    <span>{children}</span>
  </div>
)
